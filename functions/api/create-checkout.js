// Cloudflare Pages Function — POST /api/create-checkout
// Creates a Stripe Checkout Session for either the e-book or the cheat sheet PDF.
// Requires env var: STRIPE_SECRET_KEY

export async function onRequestPost({ request, env }) {
  try {
    const origin = new URL(request.url).origin;
    const { product, book, email } = await request.json();

    if (!product || !book) {
      return json({ error: 'Missing product or book' }, 400);
    }

    // Load canonical product data from the same site
    const booksRes = await fetch(`${origin}/data/books.json`);
    const data = await booksRes.json();
    const b = data.books.find((x) => x.slug === book);
    if (!b) return json({ error: `Unknown book: ${book}` }, 404);
    if (!b.published) return json({ error: 'This title is not available yet.' }, 400);

    // Product config
    const productMap = {
      ebook: {
        name: `${b.title} — E-book (PDF)`,
        description: `Complete PDF edition of ${b.title}. Includes access code for ${b.testCount} free timed online practice tests with ${b.totalQuestions} questions.`,
        unitAmount: Math.round((b.ebookPrice ?? 14.99) * 100),
      },
      cheatsheet: {
        name: `${b.shortName} — Formula Cheat Sheet (PDF)`,
        description: `Printable ${b.shortName} formula cheat sheet. Every key formula, lookup table, and reference for the ${b.shortName} exam.`,
        unitAmount: Math.round((b.cheatsheetPrice ?? 1.99) * 100),
      },
    };
    const p = productMap[product];
    if (!p) return json({ error: `Unknown product: ${product}` }, 400);

    // Build Stripe form-encoded body
    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.append('payment_method_types[]', 'card');
    params.set('line_items[0][price_data][currency]', 'usd');
    params.set('line_items[0][price_data][product_data][name]', p.name);
    params.set('line_items[0][price_data][product_data][description]', p.description);
    params.set('line_items[0][price_data][unit_amount]', String(p.unitAmount));
    params.set('line_items[0][quantity]', '1');
    params.set('success_url', `${origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`);
    params.set('cancel_url', `${origin}/#books`);
    params.set('metadata[book_slug]', book);
    params.set('metadata[product]', product);
    params.set('metadata[title]', b.title);
    if (email) params.set('customer_email', email);
    params.set('billing_address_collection', 'auto');
    params.set('allow_promotion_codes', 'true');

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await stripeRes.json();
    if (!stripeRes.ok) {
      return json({ error: session.error?.message || 'Stripe error', raw: session.error }, 500);
    }

    return json({ url: session.url, id: session.id });
  } catch (err) {
    return json({ error: err.message || 'Server error' }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

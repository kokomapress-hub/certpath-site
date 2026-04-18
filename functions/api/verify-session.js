// Cloudflare Pages Function — GET /api/verify-session?session_id=xxx
// Verifies a completed Stripe Checkout Session and returns the download URL
// plus customer details. Used by /checkout-success.html after Stripe redirect.
// Requires env var: STRIPE_SECRET_KEY

export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const sid = url.searchParams.get('session_id');
    if (!sid) return json({ error: 'Missing session_id' }, 400);

    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sid)}`,
      { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } }
    );
    const session = await stripeRes.json();
    if (!stripeRes.ok) return json({ error: session.error?.message || 'Stripe error' }, 500);

    if (session.payment_status !== 'paid') {
      return json({ error: 'Payment not completed', status: session.payment_status }, 402);
    }

    const { book_slug, product, title } = session.metadata || {};
    let downloadUrl = null;
    if (product === 'cheatsheet' && book_slug) {
      downloadUrl = `/bonus-pdfs/${book_slug}-cheatsheet.pdf`;
    } else if (product === 'ebook' && book_slug) {
      downloadUrl = `/ebooks/${book_slug}-ebook.pdf`;
    }

    return json({
      success: true,
      email: session.customer_details?.email || session.customer_email || null,
      name: session.customer_details?.name || null,
      amount: (session.amount_total || 0) / 100,
      currency: session.currency || 'usd',
      product,
      book: book_slug,
      title,
      downloadUrl,
    });
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

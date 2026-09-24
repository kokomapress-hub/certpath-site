// Site-wide Google Analytics 4 (GA4) for certpathpublishing.store.
// Injects the gtag snippet into every HTML page served by Cloudflare Pages,
// so no individual .html file needs editing. Non-HTML responses pass through.
const GA_ID = 'G-BFJGKDL998';

const TAG = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
  // Key events: Amazon, Payhip and sample/practice-test clicks
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a || !a.href) return;
    if (a.href.indexOf('amazon.') > -1) gtag('event', 'amazon_click', { link_url: a.href });
    else if (a.href.indexOf('payhip.com') > -1) gtag('event', 'payhip_click', { link_url: a.href });
    else if (['/sample', '/quiz', '/access'].some(function (p) { return a.pathname.indexOf(p) === 0; })) gtag('event', 'practice_click', { link_url: a.href });
  }, true);
</script>`;

export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;
  return new HTMLRewriter()
    .on('head', { element(el) { el.append(TAG, { html: true }); } })
    .transform(response);
}

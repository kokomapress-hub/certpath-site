# Stripe Checkout Setup

Live at `/api/create-checkout` (POST) and `/api/verify-session` (GET). No Stripe Products or Price IDs need to be pre-created — sessions use inline `price_data` derived from `data/books.json`.

## 1. Get your Stripe API key

1. Sign in at https://dashboard.stripe.com
2. Go to **Developers → API keys**
3. Copy your **Secret key** (starts with `sk_live_...` for production or `sk_test_...` for testing)

## 2. Add the key to Cloudflare Pages

1. Open your Cloudflare dashboard → **Pages** → `certpath-publishing` project
2. **Settings → Environment variables**
3. Add a new **Production** variable:
   - Name: `STRIPE_SECRET_KEY`
   - Value: paste your `sk_live_...` key
4. Click **Save**
5. Optionally add a **Preview** variable with your `sk_test_...` key so preview deployments charge test cards
6. Trigger a redeploy (push any commit, or hit "Retry deployment" in the Pages dashboard)

## 3. Test the flow

- Visit `https://certpathpublishing.store`
- Click **E-book** on any book card, or **Buy PDF** on any cheat sheet
- You should be redirected to `checkout.stripe.com`
- In test mode, use card `4242 4242 4242 4242` with any future expiry and any CVC
- After payment, Stripe redirects to `/checkout-success?session_id=...`
- The success page calls `/api/verify-session` and reveals the download link

## 4. Prices

Edit `data/books.json` — no Stripe dashboard update needed.

- `ebookPrice` (currently $14.99 per book)
- `cheatsheetPrice` (currently $1.99 per book)
- `paperbackPrice` is informational only; Amazon handles paperback sales

## 5. Where customer downloads come from

- **Cheat sheets:** `/bonus-pdfs/{slug}-cheatsheet.pdf` (already deployed)
- **E-books:** `/ebooks/{slug}-ebook.pdf` (**not yet uploaded — upload these to the repo before accepting e-book orders**)

The download URL is only revealed by `/api/verify-session` after Stripe confirms `payment_status: paid`. URLs are still publicly reachable if guessed, so prices should stay low-ticket. For stronger protection, swap `/bonus-pdfs/` into an R2 bucket and serve via a signed URL.

## 6. Refunds & disputes

Handled entirely in the Stripe dashboard. Refund the payment, then email the customer that their download link is void.

## 7. Going live checklist

- [ ] Switch Cloudflare env var from `sk_test_...` to `sk_live_...`
- [ ] Turn off Stripe test mode in the dashboard
- [ ] Upload all 6 e-book PDFs to `/ebooks/{slug}-ebook.pdf`
- [ ] Verify `checkout-success.html` works end-to-end with a $0.50 real transaction
- [ ] Add Stripe's payout bank account under **Settings → Payouts**

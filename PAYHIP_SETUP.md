# Payment Setup — Payhip

The site uses **Payhip** for all e-book and cheat-sheet purchases. No backend code: each Buy button is a direct link to a Payhip-hosted product page, and Payhip handles checkout, PDF delivery, refunds, and the customer email list.

## Where the URLs live

In `data/books.json`, every published book has:

```json
"payhipEbookUrl":      "https://payhip.com/b/Fphcy",
"payhipCheatsheetUrl": "https://payhip.com/b/mcNUK"
```

Currently wired (CertPath Publishing store):

| Slug | E-book | Cheat sheet |
|---|---|---|
| cast | Fphcy | mcNUK |
| mech-apt | AURvd | Ww7Gn |
| journeyman-elec | 32MKx | zh2ct |
| poss | 2eG41 | nHbBm |
| csp | CXKYO | 2btkV |
| chst | F51cp | Z4jNR |

## Adding a product (e.g. when Home Inspector goes live)

1. Create the product in your Payhip dashboard (`https://app.payhip.com/products`)
2. Copy the share URL (looks like `https://payhip.com/b/XYZ12`)
3. Open `data/books.json`, find that book's entry, fill in `payhipEbookUrl` / `payhipCheatsheetUrl`
4. Set `"published": true` for the book if it's the first time
5. Commit and push — Cloudflare auto-deploys

## Editing prices

Update `ebookPrice` or `cheatsheetPrice` in `books.json` AND in the Payhip dashboard for the matching product. The site uses the `books.json` value for display; Payhip uses its own value at checkout. Keep them in sync.

## Payouts

- **Method:** PayPal Business (linked to Qatar bank)
- **Cycle:** Payhip pays out per-transaction directly to your connected PayPal balance
- **Fees:** Payhip 5% + PayPal 4.4% + $0.30 cross-border
  - On a $9.99 e-book → you net ~$8.70
  - On a $1.99 cheat sheet → you net ~$1.50

## Refunds

Issue from the Payhip dashboard → Sales → find the order → Refund. Payhip refunds the buyer and reverses fees automatically. Customer's download access is revoked.

## Customer list

Every Payhip purchase adds the buyer to your customer list under **Customers**. Use this for follow-up emails, new-product launches, or coupon campaigns.

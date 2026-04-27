# MailerLite Welcome Sequence — CertPath Site Signups

3-email post-unlock automation. Triggers when someone joins the **CertPath Site Signups** group (which happens automatically when they enter a valid access code on the site).

## How to set it up in MailerLite

1. Sidebar → **Automations** → **Create new automation**
2. Name it `CertPath Welcome Sequence`
3. **Trigger:** *Joins group(s)* → select `CertPath Site Signups`
4. Add the 3 email steps below, with `Wait` blocks between them
5. Click **Activate** when done

Use these MailerLite merge tags inside any email:
- `{$fields.book_unlocked}` → e.g. `CAST` (the book they unlocked)
- `{$fields.unlock_date}` → ISO date they signed up
- `{$email}` → their email

---

## EMAIL 1 — Welcome (send: immediately)

**Subject:** Welcome to CertPath — your practice tests are ready
**Preview text:** Here's how to actually pass on the first try.
**From name:** CertPath Publishing
**Reply-to:** prasadgceb@gmail.com

**Body:**

> Hi there,
>
> You just unlocked free online practice tests for the **{$fields.book_unlocked}** exam — welcome.
>
> Three things to make sure you actually pass on the first try:
>
> **1. Take a practice test today**
> Even if you haven't finished the book. Your first attempt gives you a baseline — you'll know which chapters need the most attention before you waste time re-reading material you already know.
>
> [Take a Practice Test →](https://certpathpublishing.store/access)
>
> **2. Read every explanation — including on questions you got right**
> The explanations are where exam-day pattern recognition is built. Skipping them is the most common mistake we see.
>
> **3. Bookmark your access URL**
> Your tests are tied to your access code, so come back any time:
> https://certpathpublishing.store/access
>
> ---
>
> **One last thing — the cheat sheet**
>
> We also publish a 2-page Formula Cheat Sheet for the {$fields.book_unlocked} exam. Every formula, code reference, and quick-lookup table on a single printable PDF. **$1.99.** Most candidates use it as their final-week review tool.
>
> [Get the {$fields.book_unlocked} Cheat Sheet →](https://certpathpublishing.store/#cheat-sheets)
>
> Pass on the first try.
>
> — The CertPath Team
>
> P.S. Hit reply with any questions — a real person reads every email.

---

## WAIT — 3 days

---

## EMAIL 2 — Study tip + review ask (send: day 3)

**Subject:** The single highest-yield study tactic
**Preview text:** Most candidates skip this. Don't be one of them.
**From name:** CertPath Publishing
**Reply-to:** prasadgceb@gmail.com

**Body:**

> Hi again,
>
> By now you should have taken at least one practice test. (If not, [go do that first](https://certpathpublishing.store/access) — this email won't make sense otherwise.)
>
> Here's the single most underused study tactic for certification exams:
>
> **Re-take the same practice test 48 hours later.**
>
> Most people take a test once, see their score, and move on. That's a mistake. Your second attempt is where retention actually happens — your brain has to *dig* for the answer instead of recognizing the question.
>
> The rule of thumb: if you can't beat your first score by 10+ points on the second pass, you don't really know the material yet. Go back to the chapter and re-read it.
>
> Your CertPath tests are unlimited and re-randomized, so re-take any of them as often as you need.
>
> [Take Another Test →](https://certpathpublishing.store/access)
>
> ---
>
> **One small ask**
>
> If our **{$fields.book_unlocked}** guide has been useful so far, would you take 30 seconds to leave an honest review on Amazon? We're a small independent publisher — every review helps the next candidate find the book and pass their exam.
>
> [Leave a Review on Amazon →](https://www.amazon.com/s?k=CertPath+Publishing+{$fields.book_unlocked})
>
> Thank you.
>
> — The CertPath Team

---

## WAIT — 7 days

---

## EMAIL 3 — Final-week + cross-sell (send: day 10)

**Subject:** One more thing before your exam
**Preview text:** A 2-minute resource that pays for itself.
**From name:** CertPath Publishing
**Reply-to:** prasadgceb@gmail.com

**Body:**

> Hi,
>
> Assuming a typical 4-week study window, you should be hitting full-length practice tests now and starting to feel ready.
>
> Two things that have helped CertPath candidates in their final week:
>
> **1. The {$fields.book_unlocked} Formula Cheat Sheet ($1.99)**
> A single printable PDF — every formula, code reference, and quick-lookup table you need on exam day. Print it. Stick it on your wall. Carry it on the morning of the exam (right up until you walk into the test centre).
>
> [Get the Cheat Sheet →](https://certpathpublishing.store/#cheat-sheets)
>
> **2. Take all 3 practice tests fully timed**
> The third test in your book is intentionally the hardest. If you can hit 75% on it under timed conditions, you're ready.
>
> ---
>
> **Studying for a second certification?**
>
> Many of our readers prep for two related exams in the same year. CertPath now publishes guides for:
>
> - CAST (Construction & Skilled Trades)
> - Mechanical Aptitude
> - Journeyman Electrician
> - POSS (Power & Utilities)
> - CSP (Safety Professional)
> - CHST (Construction Health & Safety)
>
> [Browse all Study Guides →](https://certpathpublishing.store/#books)
>
> Good luck with your exam. Hit reply and let us know how it goes — we love hearing pass stories.
>
> — The CertPath Team

---

## End of automation — exit to subscriber list

After Email 3, subscribers stay in the `CertPath Site Signups` group for one-off broadcast emails (new book launches, promotions, etc.).

---

## Optional upgrade: per-book Amazon review links

The Email 2 review link uses an Amazon search URL. For better conversion, swap the link per `book_unlocked` value using MailerLite **conditions**:

| `book_unlocked` value | Direct review URL |
|---|---|
| CAST | `https://www.amazon.com/dp/B0GWWTVNPM#customerReviews` |
| Mechanical Aptitude | `https://www.amazon.com/dp/B0GX5BKYDB#customerReviews` |
| Journeyman Electrician | `https://www.amazon.com/dp/B0GX5PYHC9#customerReviews` |
| POSS | `https://www.amazon.com/dp/B0GX9TQMQ5#customerReviews` |
| CSP | `https://www.amazon.com/dp/B0GXDZ91DZ#customerReviews` |
| CHST | `https://www.amazon.com/dp/B0GXJ74XG7#customerReviews` |

In MailerLite: split Email 2 into 6 conditional branches, one per book. Worth doing once you have 50+ subscribers.

---

## Metrics to watch

- **Open rate:** target >40% for transactional welcome emails
- **Click rate on "Take a Practice Test":** target >15%
- **Cheat sheet conversions:** track via Payhip dashboard, attribute to Email 1 + Email 3 timing
- **Amazon review delta:** count reviews on each book before vs. 30 days after sequence goes live

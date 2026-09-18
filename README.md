# CertPath Publishing — Free Online Practice Tests

Static website serving timed practice tests for verified book owners of CertPath Publishing study guides.

## Live Site

`https://certpathpublishing.store`

## Architecture

- **Static HTML/CSS/JS** — no backend required
- **localStorage** — saves user's email and unlocked book codes
- **JSON data files** — one per book, contains all practice test questions

## Access Codes

Access codes are **not** stored in this repository or on the site. `data/books.json` holds only SHA-256 hashes of each code.
The plaintext list (and the owner super code) lives in `private/access-codes.json`, which is git-ignored — keep a backup of it somewhere safe.

## Local Dev

```bash
npx serve . -l 8768
# Open http://localhost:8768
```

## Deploy to Cloudflare Pages

### Option A: Direct Upload (Fastest)

1. Log in to https://dash.cloudflare.com → Pages
2. Click "Create a project" → "Direct Upload"
3. Project name: `certpath-publishing`
4. Drag and drop the entire `certpath-website/` folder
5. Click Deploy

### Option B: GitHub Auto-Deploy

1. Push this folder to a new GitHub repo
2. In Cloudflare Pages: "Connect to Git" → select repo
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave blank)*
   - Output directory: *(leave blank — uses root)*
4. Click "Save and Deploy"

### Custom Domain

After deploy, in Pages → Custom domains:
- Add `certpathpublishing.store`
- Cloudflare auto-provisions SSL

## Regenerating Question Data

If you update any book's source files, re-run:

```bash
node extract-questions.js
```

This re-extracts all 1,920 questions into the `data/` folder.

## File Structure

```
certpath-website/
├── index.html          # Landing page (lists 10 books)
├── access.html         # Access code + email entry
├── quiz.html           # Quiz runner (single test)
├── bonus.html          # Amazon review bonus content
├── css/style.css       # Brand: navy + gold
├── js/
│   ├── app.js          # Access code validation
│   └── quiz.js         # Quiz engine
├── data/
│   ├── books.json      # Master metadata + admin code
│   ├── cast.json       # 330 questions
│   ├── mech-apt.json   # 180 questions
│   ├── ... (8 more)    # 180 each (STS = 150)
├── _headers            # Cloudflare security headers
├── _redirects          # Clean URLs (no .html)
└── extract-questions.js # Question extraction script
```

## Stats

- 10 books
- 30 practice tests
- 1,920 questions
- All timed, scored, with detailed answer explanations

# NivellCat – Catalan C1/C2 Exam Prep Landing Page

A simple, clean static landing page to validate demand for a Catalan C1/C2 exam-preparation service.

## What's Here

- **index.html** – Main landing page with hero, sections, FAQ, and signup form
- **gracies.html** – Thank-you page after signup (with optional survey link)
- **privacitat.html** – Privacy policy (in Catalan, GDPR-compliant)
- **css/style.css** – Mobile-first, accessible styling
- **robots.txt** & **sitemap.xml** – SEO basics
- **.gitignore** – Excludes .claude/ and CLAUDE.md

## Configuration

### Domain

The domain is set to `https://nivellcat.net/` in:
- All `<link rel="canonical">` tags in HTML files
- Open Graph meta tags in `index.html`
- `robots.txt` and `sitemap.xml`

To change the domain, update these files:
1. `index.html` – canonical and og:url meta tags, form action placeholder
2. `gracies.html` – canonical meta tag
3. `privacitat.html` – canonical meta tag
4. `robots.txt` – sitemap URL
5. `sitemap.xml` – URL entries

### Form Endpoint

**File:** `index.html` (two form instances)

Both forms post to the MailerLite embedded form "Interessades" (account `2695335`, form `200752097212236903`) via `fetch`, and redirect to `gracies.html` only when MailerLite answers `{"success": true}`.

The form sends the field names MailerLite expects:
- `fields[email]` – the subscriber's email address
- `fields[nivell][]` – radio value (C1 or C2), mapped to the `nivell` custom field
- `gdpr[]` – consent checkbox; its value must match the permission text configured in MailerLite
- `ml-submit`, `anticsrf`, `ajax` – hidden fields required by the MailerLite endpoint

If you change the form in MailerLite (fields, permission text), copy the new embed code and update these names and values.

### Survey Link

**File:** `gracies.html`

Find and replace `SURVEY_URL` with your survey platform URL (Google Forms, Typeform, etc.).

## Deployment: Cloudflare Pages

### 1. Create a Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
```

(Don't push yet; this repo can stay local or go to GitHub/GitLab.)

### 2. Deploy to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Pages** → **Create a project** → **Connect to Git** (or **Deploy manually**)
3. **For Git deployment:**
   - Connect your GitHub/GitLab repo
   - Set **Build command:** (leave blank – no build needed)
   - Set **Output directory:** `.` (repo root)
   - Deploy
4. **For manual deployment:**
   - Drag & drop your project files directly into Cloudflare Pages

### 3. Attach Custom Domain

1. In Cloudflare Pages project settings, go to **Custom domains**
2. Click **Add custom domain**
3. Enter `nivellcat.net`
4. Cloudflare will show you nameserver records to add to your domain registrar
5. Update your domain's nameservers or DNS to point to Cloudflare
6. Once DNS propagates (15 mins–2 hours), your site is live at https://nivellcat.net/

## Tech Stack

- **HTML5** – semantic markup
- **CSS3** – mobile-first, responsive, system fonts
- **Vanilla JavaScript** – simple form submission handler
- **No dependencies** – no build tools, package manager, or frameworks

## Accessibility

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<fieldset>`, `<legend>`, `<dl>`)
- Form labels, ARIA labels, and proper fieldset structure
- Focus indicators and keyboard navigation
- Color contrast WCAG AA compliant
- Responsive on mobile, tablet, desktop
- Language tag: `<html lang="ca">`

## Privacy & Security

- No analytics, no tracking, no cookies
- No third-party scripts (form submission uses `fetch` only)
- HTTPS enforced via Cloudflare
- Privacy policy covers GDPR rights, consent, data retention, and AEPD contact

## Local Testing

Open `index.html` in your browser or run a local server:

```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

## Notes

- The form currently redirects to `gracies.html` on success. Update the JavaScript in `index.html` if your endpoint returns different responses.
- For MailerLite, you may need to set up a double opt-in; adjust form handling accordingly.
- The privacy policy references the Catalan data protection authority (AAPD); verify compliance with local counsel if needed.

---

Built with plain HTML, CSS, and JavaScript. No AI tooling, build steps, or frameworks.

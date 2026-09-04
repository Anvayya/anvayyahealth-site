# anvayya.in — website

The anvayya.in marketing site: 8 static HTML pages styled with Tailwind CSS, deployed on Netlify.

## Pages

`index.html` (home), `offerings.html`, `plans.html`, `about.html`, `contact.html`, `privacy.html`, `terms.html`, and `404.html` (Netlify's not-found page).

## Editing content or copy

For a text/content change only, you can still edit an `.html` file directly on GitHub (pencil icon → edit → commit) — no new Tailwind classes needed, no local setup required. Netlify rebuilds and redeploys within a minute or two.

## Changing styles or adding new Tailwind classes

Styling now comes from a compiled stylesheet (`assets/styles.css`) instead of the Tailwind CDN script, so the site loads faster and doesn't show the CDN's "not for production" console warning. If you add a **new** Tailwind utility class to any page that wasn't already used elsewhere on the site, that class won't render until the CSS is rebuilt:

```bash
npm install
npm run build      # one-off build
npm run watch       # rebuild automatically while you work locally
```

This regenerates `assets/styles.css` from `src/input.css` + whatever classes appear in the `*.html` files (see `tailwind.config.js`). Netlify also runs `npm run build` automatically on every deploy (see `netlify.toml`), so even if you forget to rebuild locally before pushing, the live site will still pick up new classes — but the copy committed to `assets/styles.css` is the fallback if that build step is ever skipped, so it's good practice to run `npm run build` and commit the result.

Custom (non-Tailwind) CSS lives in `src/input.css` under `@layer components` — e.g. the reveal-on-scroll animation, the mobile nav, the grain texture.

## Shared JavaScript

`assets/site.js` — mobile nav toggle, scroll-reveal animation, footer year — loaded on every page.
`assets/contact-form.js` — the early-access waitlist form's submit handler (contact page only).

## Waitlist form → leads

The "Request early access" form on `contact.html` is a [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) form (`data-netlify="true"`). Submissions land in the Netlify dashboard under **Site configuration → Forms** — no backend required. To get notified of new leads or pipe them into a CRM, add a notification (email/Slack) or an outgoing webhook there. That webhook is the natural next step when CRM integration happens.

## Brand assets

`assets/favicon.svg` is the source mark. Run `node scripts/render-assets.js` (needs Playwright, already used elsewhere in this environment) to regenerate the favicon PNGs/ICO and the Open Graph social-share image if the brand mark ever changes.

## Legal pages

`privacy.html` and `terms.html` are professional-standard drafts covering the data currently collected (the waitlist form) and what will be collected once the membership and health-data product launches. They're marked "pending legal review" in-page — have a lawyer qualified in Indian data protection law review them, and fill in the placeholders (Grievance Officer name, final membership/billing/refund terms) before relying on them commercially.

## Contact details on file

- Email: `info@anvayya.in`
- Office: A-302 Privilon, Bopal-Ambli Rd, Behind Iskcon, Ahmedabad, Gujarat, India
- WhatsApp: `+91 8320 6249 41` (see `contact.html`'s "Get in touch" section and the `wa.me` link there).

## Cookie consent

`assets/site.js` injects a small cookie-consent banner (`.cookie-banner*` styles in `src/input.css`) on every page. It sets one first-party cookie (`anvayya_cookie_consent`) once the visitor accepts, valid for 12 months. See `privacy.html` Section 8 for the cookie types disclosed. `tailwind.config.js`'s `content` array includes `./assets/*.js` so Tailwind's build doesn't purge the banner's classes (they only appear in JS-built markup, not in any `.html` file).

## SEO / sharing

Every page has a canonical URL, Open Graph and Twitter Card tags, and a favicon. `sitemap.xml` and `robots.txt` are at the site root. `privacy.html` and `terms.html` are set `noindex` so they don't show up in search results but can still be linked to and crawled.

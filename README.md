# ascendtogether.co.uk

Concept website for Ascend Together: a small, mobile-first static site built from the visual concept. Plain HTML, CSS and a little JavaScript, with no build step.

**This is a concept.** "Ask for a seat" on the home page and the Events page both use the Luma registration button, which opens Luma's form over the page. The other forms are placeholders and send nothing. Copy in `[square brackets]` is still to be written. The logo and fonts (Fraunces, DM Sans) are placeholders too. The whole site is set to `noindex` until launch.

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | Home page: 01 Home, 02 Join us (Luma "Ask for a seat" embed), 05 Get involved |
| `events.html`, `about.html`, `contact.html` | 03 Events, 04 About ("Why I started this") and 06 Contact, served at `/events`, `/about`, `/contact` |
| `privacy.html`, `cookies.html`, `terms.html` | Policy page placeholders (served at `/privacy`, `/cookies`, `/terms`) |
| `404.html` | Not-found page |
| `assets/css/site.css` | All styles, mobile first, with breakpoints at 600px and 960px |
| `assets/js/site.js` | Mobile menu, cookie banner, placeholder form and Luma behaviour |
| `_headers` | Cloudflare Pages headers (noindex and basic security headers) |
| `robots.txt` | Blocks crawlers while this is a concept |

## Rules this site follows

- Venue details never appear on the site. They go to confirmed members only.
- Pink is only for buttons and highlights.
- No food mentions and no mountain imagery.

## Going live later

- **Luma:** the Events button links to the Luma event. `site.js` loads Luma's checkout script only after cookie consent; without it the button opens the event on luma.com. The "Ask for a seat" embed (`.js-luma-embed`) loads after consent too, or when the visitor presses "Show the booking form". For a new event, change the event ID in the button's `href` and `data-luma-event-id`, and in the embed's `data-src` and fallback link. Keep the Luma event set to require approval, with the location hidden until approved.
- **Forms:** replace each `.js-placeholder-form` with the chosen form embed (HubSpot, Luma or other).
- **Luma consent (staging):** `STAGING_AUTO_LOAD_LUMA` in `assets/js/site.js` is `true`, so Luma loads without waiting for cookie consent. Set it to `false` before launch.
- **Social links:** replace the `href="#"` LinkedIn and Instagram links in each page's footer.
- **Sharing preview:** `assets/img/og-image.png` (1200×630) is set as `og:image` and `twitter:image` on every page. The `og:url` and image URLs use `https://ascendtogether.pixel-north.co.uk`; change them to the live domain at launch.
- **Launch:** remove the `noindex` meta tags, the `X-Robots-Tag` line in `_headers`, the `robots.txt` block and the concept bar at the top of `index.html`.

## Run it locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git, and pick this repository.
2. Production branch: `main`. Framework preset: None. Build command: leave empty. Build output directory: `/`.
3. After the first deploy, open the project's Custom domains tab and add `ascendtogether.pixel-north.co.uk`. Cloudflare adds the CNAME record if `pixel-north.co.uk` is on the same account.

Every pull request gets its own preview URL once the project is connected.

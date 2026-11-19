# ascendtogether.co.uk

Concept website for Ascend Together: a one-page, mobile-first static site built from the visual concept. Plain HTML, CSS and a little JavaScript, with no build step.

**This is a concept.** The forms are placeholders and send nothing. The Events section has the real Luma registration button. Copy in `[square brackets]` is still to be written. The logo and fonts (Fraunces, DM Sans) are placeholders too. The whole site is set to `noindex` until launch.

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | The one-page site: 01 Home, 02 Join us, 03 Events, 04 About, 05 Get involved, 06 Contact |
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

- **Luma:** the Events button links to the Luma event. `site.js` loads Luma's checkout script only after cookie consent; without it the button opens the event on luma.com. For a new event, change the event ID in the button's `href` and `data-luma-event-id`. Keep the Luma event set to require approval, with the location hidden until approved.
- **Forms:** replace each `.js-placeholder-form` with the chosen form embed (HubSpot, Luma or other).
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

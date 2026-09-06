# MECHONOVATE — Hackathon Website

A frontend + backend split of the MECHONOVATE hackathon site. The frontend is
plain HTML/CSS/JS (no build step), and the backend is a small Node/Express
server that currently just serves the site as static files.

```
mechonovate-project/
├── backend/
│   ├── server.js          Express server (static file server)
│   └── package.json
└── frontend/
    ├── index.html
    ├── css/style.css
    ├── js/main.js
    └── assets/images/
        ├── logo/           mech.webp, gear.webp, novate.webp — the wordmark
        ├── gears/          gear-1.webp, gear-2.webp, gear-3.webp — hero background decor
        ├── favicon.webp
        ├── gallery/        photo-1.jpg … photo-6.jpg — your own event photos
        └── themes/         theme-01.jpg … theme-09.jpg — one photo per theme, shown in the Details modal
```

## Running it

You need [Node.js](https://nodejs.org) installed (v18+ recommended).

```bash
cd backend
npm install
npm start
```

Then open **http://localhost:3000**. You can also just open
`frontend/index.html` directly in a browser without running the backend at
all — there's no dynamic feature left that needs a server right now.

## Registration

Registration is handled by an external Google Form, not this codebase.
Once your form is ready, set its URL in **one** of these two places:

- `frontend/js/main.js` → set `GOOGLE_FORM_URL = 'https://forms.gle/xxxxxxxxxxxx'`, or
- directly on the button in `frontend/index.html`: `<a href="#" id="register-link" ...>` → replace the `#`

Until you do, clicking "Register now" shows a friendly "not set up yet" message
instead of going nowhere silently.

## Theme details

Each theme card has a **Details** button that opens a modal with a photo and
a description. Edit the text in `frontend/js/main.js` inside the
`THEME_DETAILS` object — each entry has a `title`, `image` path, and
`description`. Drop matching photos into
`frontend/assets/images/themes/` (see the filenames listed in that folder's
README) and they'll appear automatically; until a file exists, the modal
shows a plain placeholder instead of a broken image.

## Adding your own photos

### Gallery section
Drop JPG/PNG files into `frontend/assets/images/gallery/` named exactly:

```
photo-1.jpg
photo-2.jpg
photo-3.jpg
photo-4.jpg
photo-5.jpg
photo-6.jpg
```

Any slot without a matching file shows a dashed placeholder with the expected
filename, so you always know what's missing. Any image size works — they're
cropped to a consistent 4:3 tile automatically. To add more than 6, copy a
`<div class="gallery-item">…</div>` block in `index.html` and add a matching
line to `.gallery-grid` in `style.css` if you want a different column count.

### Logo / background gears
These live in `frontend/assets/images/logo/` and `frontend/assets/images/gears/`.
You can replace any of them with your own artwork — just keep the same
filenames, or update the `src="assets/images/..."` paths in `index.html` if
you rename them. For the logo to keep its "rotating gear" effect, keep the
gear as its own separate image file (don't merge it back into one flat logo
image).

## Customizing content

Team/coordinator info, rules, dates, and theme names are plain text in
`frontend/index.html` — search for the section (`<!-- COORDINATORS -->`,
`<!-- RULES -->`, etc.) and edit directly. Colors and fonts are CSS variables
at the top of `frontend/css/style.css` under `:root`.

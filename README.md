# Hurairah Trades — Official Website

Professional multi-page website for **Muhammad Hurayrah (Hurairah Trades)** —
forex trader, mentor and entrepreneur.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero with photo background, stats, services & results preview, testimonials, FAQ |
| About | `about.html` | His story, journey timeline, trading principles, lifestyle |
| Services | `services.html` | Free Telegram channel, Team Hurairah mentorship, content |
| Results | `results.html` | Trade receipts gallery + community testimonials |
| Contact | `contact.html` | Official channels + business enquiry form |

## Tech

- Pure HTML/CSS/JS — no build step, no framework. Open `index.html` in a
  browser or host anywhere (GitHub Pages, Netlify, Vercel).
- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) +
  [Manrope](https://fonts.google.com/specimen/Manrope) via Google Fonts.
- Fully responsive (desktop / tablet / mobile), reduced-motion friendly.

## Adding his real photos

See **`assets/img/photos/README.md`** — replace the placeholder images with
his photos using the same filenames. That's it.

## Things to customise

- **Stats** (566K followers etc.): edit the numbers in the stats strip in
  `index.html` (`data-count` attributes).
- **Contact form email**: in `contact.html`, change the `data-email`
  attribute on the `<form id="contact-form">` tag.
- **Testimonials**: sample quotes are placeholders — swap in real community
  messages.
- **Ticker prices**: decorative, in each page's `.ticker-track` block.

## Deploying to GitHub Pages

Repo Settings → Pages → Source: deploy from branch → pick the branch, root
folder → Save. The site goes live at `https://<user>.github.io/<repo>/`.

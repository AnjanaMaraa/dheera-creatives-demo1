# Dheera Creatives - Website

A premium, responsive website for Dheera Creatives, a handcrafted Aari embroidery and custom stitching brand.

## Project Overview

This website showcases handcrafted Aari embroidery, custom blouse designs, and personalized stitching services. Built with vanilla HTML5, CSS3, and JavaScript, the site focuses on elegance, craftsmanship, and converting visitors into custom order enquiries.

## Features

- Responsive design (desktop, tablet, mobile)
- Premium hero section with floating credibility cards
- Product/collection gallery
- About, Process, Testimonials, FAQ sections
- Contact and enquiry functionality
- Dynamic configuration via config.js
- SEO optimized with meta tags, robots.txt, sitemap.xml
- Accessible design with proper ARIA attributes

## Tech Stack

- HTML5 (Semantic)
- CSS3 (Custom Properties, Flexbox, CSS Grid)
- Vanilla JavaScript (ES6+)
- No frameworks or build systems

## Project Structure

```
dheera_creatives_demo1/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # Interactive functionality
├── config.js           # Centralized configuration
├── robots.txt          # SEO robots file
├── sitemap.xml         # SEO sitemap
├── manifest.json       # PWA manifest
├── assets/             # Images, logos, icons
│   ├── hero-placeholder.jpg
│   ├── logo.svg
│   └── favicon.svg
└── README.md           # This file
```

## How to Update

### Update Hero Image
1. Replace `assets/hero-placeholder.jpg` with your own high-quality Aari embroidery image
2. Keep the filename the same so the existing composition still applies
3. Use a legitimate, non-watermarked image (own photography or a licensed/properly attributed source)
4. Recommended: landscape orientation, at least 1600×1200, compressed to roughly 200–400 KB

The hero `<img>` is the **only** place the hero photo is referenced, and the surrounding
comment in `index.html` marks the location for quick editing.

### Update Contact Information
All contact details live in `config.js` and are rendered by `script.js`. Nothing is hardcoded
in `index.html` (the values present in the HTML are non-authoritative fallbacks shown only if
JavaScript is disabled). Editing `config.js` updates:

- The Instagram link used by every CTA
- The DigiMaraa address, phone and email links in the contact section
- The enquiry form recipient
- The footer, including the dynamic copyright year and the development credit
- The document `<title>` and meta description

### Enquiry Form Configuration
The enquiry form has **no backend**. On submit it validates the fields in the browser and then
opens a pre-filled email draft in the visitor's own mail app using a `mailto:` link. Nothing is
transmitted or stored by this website.

The recipient is resolved in this order from `config.js`:

1. `enquiry.recipientEmail` — if set to a non-empty address
2. `agency.newBusinessEmail` — the default fallback
3. `agency.enquiriesEmail`

To send enquiries somewhere else, set `enquiry.recipientEmail` in `config.js`:

```js
enquiry: {
  recipientEmail: "orders@example.com",
  subjectPrefix: "Custom Order Enquiry"
}
```

**Important limitation:** a `mailto:` form depends on the visitor having a mail client
configured. If real server-side delivery is required later, the form should be connected to a
form-handling service or backend endpoint and this README updated accordingly.

### Customization
- Colors: edit the CSS custom properties in the `:root` block of `styles.css`
- Typography: update the Google Fonts link in `index.html` (system fallbacks are already defined)
- Content: edit copy directly in `index.html`

### SEO / Deployment Configuration
Before going live, replace these placeholders with the final production domain:

- `REPLACE_WITH_FINAL_CANONICAL_URL` in `index.html` (canonical, `og:url`, JSON-LD)
- `REPLACE_WITH_ABSOLUTE_HERO_IMAGE_URL` in `index.html` (Open Graph and Twitter images)
- `https://REPLACE_WITH_FINAL_CANONICAL_URL/` in `sitemap.xml`
- The `Sitemap:` line in `robots.txt`

The Open Graph / Twitter image must be an absolute URL once the domain is known.

### Placeholder Assets To Replace
| Asset | Purpose |
| --- | --- |
| `assets/hero-placeholder.jpg` | Hero image (replace first) |
| `assets/about-image.jpg` | "Crafted with Passion" section image |
| `assets/contact-embroidery.jpg` | Image at the top of the Dheera Creatives contact card |
| `assets/products/embroidery_detail_1.jpg` ... `_6.jpg` | Collection cards 1-6 |
| `assets/testimonials/` | Empty — add authentic customer photos here |
| `assets/process/`, `assets/embroidery/`, `assets/icons/` | Empty — reserved for future real assets |

Placeholder review content is clearly labelled in the testimonials section. Replace it with
verified customer feedback before launch.


## Development

To run locally, simply open `index.html` in a web browser. No server or build step required.

## Credits

Website developed by DigiMaraa Technologies (https://digimaraa.com)

## License

All rights reserved by Dheera Creatives and DigiMaraa Technologies.
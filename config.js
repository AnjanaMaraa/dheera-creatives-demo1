const siteConfig = {
  client: {
    name: "Dheera Creatives",
    tagline: "Handcrafted Aari Embroidery & Stitching",
    instagramHandle: "dheera_creatives",
    instagramUrl: "https://www.instagram.com/dheera_creatives/",
    shippingMessage: "Free Shipping Across Tamil Nadu",

    // ── WhatsApp enquiry channel ───────────────────────────────────────
    // Opened by the "Enquire Now" button inside the gallery lightbox.
    //
    // ⚠⚠ TEMPORARY — THIS IS THE DEVELOPER'S NUMBER, NOT THE CLIENT'S. ⚠⚠
    // DigiMaraa's own number is only here as a stand-in so the demo button
    // works. REPLACE IT WITH DHEERA CREATIVES' OWN WHATSAPP NUMBER BEFORE
    // LAUNCH — otherwise every customer enquiry lands with the developer
    // instead of the brand. This is the only place the number is defined.
    // Stored in display format; script.js strips non-digits to build the
    // wa.me link, so "+91 72002 51560" and "+917200251560" both work.
    whatsapp: "+91 72002 51560",

    // Logo variations. Paths are relative to index.html.
    //
    // ⚠ KEEP FILENAMES LOWERCASE-WITH-HYPHENS. Spaces, parentheses and capitals
    // are a deployment hazard: they break on case-sensitive hosts and need
    // URL-encoding. If you re-export a logo, save it as the name used below.
    //
    // header   -> "Primary (Horizontal)" artwork, site header (1000x530 JPEG).
    // footer   -> "Secondary (Stacked)" artwork trimmed to its ink bounds (the
    //             supplied square canvas had large empty margins) and downscaled.
    // wordmark -> "Wordmark" artwork, reserved for a compact brand placement.
    logo: {
      header: "assets/logo/primary-horizontal.jpg",
      footer: "assets/logo/secondary-stacked-trimmed.jpg",
      wordmark: "assets/logo/wordmark.jpg"
    }
  },

  agency: {
    brandName: "DigiMaraa Aari Embroidery & Stitching",
    companyName: "DigiMaraa Technologies",
    website: "https://digimaraa.com",

    address: {
      line1: "#1, First Floor, Ambalam Street",
      city: "Srivaikundam",
      district: "Tuticorin",
      postalCode: "628 601",
      state: "Tamil Nadu",
      country: "India"
    },

    phone: "+91 72002 51560",
    email: "info@digimaraa.com",

    enquiriesEmail: "info@digimaraa.com",
    newBusinessEmail: "maraa.care@gmail.com",
    careerEmail: "akash@digimaraa.com"
  },

  website: {
    // ── Public origin of the site ──────────────────────────────────────
    // The single place the domain is defined. No trailing slash.
    //
    // index.html's <head> — canonical, Open Graph, Twitter and both JSON-LD
    // blocks — is built from this at runtime by applySiteUrl() in script.js,
    // so index.html itself never has to contain a domain.
    //
    // The live production origin is https://dheera.digimaraa.in. If this value
    // is ever left as REPLACE_WITH..., the runtime falls back to the browser's
    // own origin, so any deployed or previewed copy self-corrects without edits.
    url: "https://dheera.digimaraa.in",

    title: "Dheera Creatives | Aari Embroidery & Custom Stitching",
    defaultDescription:
      "Discover handcrafted Aari embroidery, custom blouse designs and personalized stitching by Dheera Creatives. Explore bespoke creations for your special moments with shipping across Tamil Nadu.",

    // Default social-share image. NOTE: no code currently reads this value —
    // og:image / twitter:image are hard-coded in index.html (see README, "Site
    // domain") because social crawlers do not run JavaScript. Kept in sync as
    // the intended single source if a build step is ever added.
    defaultImage: "assets/logo/og-image.jpg"
  },

  // Settings for the on-page enquiry form.
  // There is no backend: the form validates the fields and opens a
  // pre-filled email draft in the visitor's own mail app.
  // Leave recipientEmail empty ("") to automatically use
  // agency.newBusinessEmail. Set it to override the recipient.
  enquiry: {
    recipientEmail: "",
    subjectPrefix: "Custom Order Enquiry",

    // ── Gallery lightbox → WhatsApp ────────────────────────────────────
    // Prefilled text for the lightbox's "Enquire Now" button.
    // {image} is replaced at click time with the absolute URL of the photo
    // the visitor is looking at, so the brand can see which design the
    // enquiry refers to. (WhatsApp click-to-chat can only prefill TEXT —
    // it cannot attach a file — so the image is sent as a link.)
    whatsappMessage:
      "Hi Dheera Creatives! I would like to enquire about this design from your gallery: {image}"
  }
};
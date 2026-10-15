const siteConfig = {
  client: {
    name: "Dheera Creatives",
    tagline: "Handcrafted Aari Embroidery & Stitching",
    instagramHandle: "dheera_creatives",
    instagramUrl: "https://www.instagram.com/dheera_creatives/",
    shippingMessage: "Free Shipping Across Tamil Nadu"
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
    title: "Dheera Creatives | Aari Embroidery & Custom Stitching",
    defaultDescription:
      "Discover handcrafted Aari embroidery, custom blouse designs and personalized stitching by Dheera Creatives. Explore bespoke creations for your special moments with shipping across Tamil Nadu.",
    defaultImage: "assets/hero-placeholder.jpg"
  },

  // Settings for the on-page enquiry form.
  // There is no backend: the form validates the fields and opens a
  // pre-filled email draft in the visitor's own mail app.
  // Leave recipientEmail empty ("") to automatically use
  // agency.newBusinessEmail. Set it to override the recipient.
  enquiry: {
    recipientEmail: "",
    subjectPrefix: "Custom Order Enquiry"
  }
};
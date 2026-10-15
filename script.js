/* ==========================================================================
   Dheera Creatives — Interactive Functionality (vanilla JS)
   Requires config.js to be loaded first (siteConfig).
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Utilities
     ------------------------------------------------------------------ */
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ------------------------------------------------------------------
     Config guard — the site must remain usable without config.js.
     Note: config.js declares `const siteConfig` at top level, which is a
     global lexical binding and is NOT attached to `window`. It must be
     read by name, guarded with typeof.
     ------------------------------------------------------------------ */
  var config = null;
  try {
    if (typeof siteConfig !== 'undefined' && siteConfig) {
      config = siteConfig;
    }
  } catch (err) {
    config = null;
  }

  if (!config) {
    console.warn('[Dheera Creatives] config.js not found — dynamic contact details were not applied.');
  }

  /* ------------------------------------------------------------------
     Header: solid background after scroll (rAF-throttled)
     ------------------------------------------------------------------ */
  function initHeader() {
    var header = document.getElementById('header');
    if (!header) return;

    var ticking = false;

    function update() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */
  function initNavigation() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
      menu.classList.add('active');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on any nav link activation
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close when clicking outside the menu
    document.addEventListener('click', function (event) {
      if (!menu.classList.contains('active')) return;
      if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('active')) {
        closeMenu();
        toggle.focus();
      }
    });

    // Reset when resizing up to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && menu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  /* ------------------------------------------------------------------
     Smooth scrolling with sticky-header offset
     ------------------------------------------------------------------ */
  function initSmoothScroll() {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        var targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();

        var header = document.getElementById('header');
        var offset = header ? header.offsetHeight + 12 : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: top < 0 ? 0 : top,
          behavior: reduceMotion ? 'auto' : 'smooth'
        });

        // Keep focus/keyboard context sensible
        if (history.replaceState) {
          history.replaceState(null, '', targetId);
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     Active navigation highlighting (IntersectionObserver)
     ------------------------------------------------------------------ */
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var links = document.querySelectorAll('.nav-menu .nav-link');
    if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

    var linkMap = {};
    links.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.charAt(0) === '#') linkMap[id.slice(1)] = link;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = linkMap[entry.target.id];
        if (!link) return;
        links.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ------------------------------------------------------------------
     FAQ accordion (accessible, keyboard friendly)
     ------------------------------------------------------------------ */
  function initFAQ() {
    var items = document.querySelectorAll('.faq-item');

    items.forEach(function (item) {
      var button = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!button || !answer) return;

      // Link button to panel for assistive technology
      var panelId = 'faq-panel-' + Math.random().toString(36).slice(2, 9);
      answer.id = panelId;
      button.setAttribute('aria-controls', panelId);

      button.addEventListener('click', function () {
        var expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        answer.classList.toggle('active', !expanded);
      });
    });
  }

  /* ------------------------------------------------------------------
     Testimonial carousel (keyboard + touch + auto-advance)
     ------------------------------------------------------------------ */
  function initCarousel() {
    var carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    var slides = carousel.querySelectorAll('.testimonial-slide');
    var indicators = carousel.querySelectorAll('.carousel-indicator');
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    if (!slides.length) return;

    var current = 0;
    var total = slides.length;
    var timer = null;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(index) {
      if (index >= total) current = 0;
      else if (index < 0) current = total - 1;
      else current = index;

      slides.forEach(function (slide, i) {
        slide.classList.toggle('active', i === current);
      });

      indicators.forEach(function (dot, i) {
        var isActive = i === current;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    }

    function start() {
      if (reduceMotion) return;
      stop();
      timer = window.setInterval(function () { show(current + 1); }, 6000);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { show(current - 1); start(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { show(current + 1); start(); });

    indicators.forEach(function (dot, i) {
      dot.addEventListener('click', function () { show(i); start(); });
    });

    carousel.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') { show(current - 1); start(); }
      if (event.key === 'ArrowRight') { show(current + 1); start(); }
    });

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    // Touch swipe
    var startX = 0;
    carousel.addEventListener('touchstart', function (event) {
      startX = event.changedTouches[0].clientX;
      stop();
    }, { passive: true });

    carousel.addEventListener('touchend', function (event) {
      var deltaX = event.changedTouches[0].clientX - startX;
      if (Math.abs(deltaX) > 45) {
        show(deltaX < 0 ? current + 1 : current - 1);
      }
      start();
    }, { passive: true });

    show(0);
    start();
  }

  /* ------------------------------------------------------------------
     Scroll reveal (respects reduced motion)
     ------------------------------------------------------------------ */
  function initReveal() {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var targets = document.querySelectorAll(
      '.differentiator-card, .collection-card, .process-step, .faq-item, .about-image-wrapper, .about-content'
    );
    if (!targets.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      return;
    }

    // Enable the reveal styles only once JS is ready, so content
    // remains fully visible if JavaScript fails.
    document.body.classList.add('js-reveal');

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------------
     Dynamic content from config.js
     ------------------------------------------------------------------ */
  function applyConfig() {
    if (!config) return;

    var client = config.client || {};
    var agency = config.agency || {};
    var website = config.website || {};

    // Document metadata
    if (website.title) document.title = website.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && website.defaultDescription) {
      metaDesc.setAttribute('content', website.defaultDescription);
    }

    // Instagram links across the page
    document.querySelectorAll('[data-instagram-link]').forEach(function (link) {
      if (client.instagramUrl) {
        link.setAttribute('href', client.instagramUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    document.querySelectorAll('[data-instagram-handle]').forEach(function (el) {
      if (client.instagramHandle) el.textContent = '@' + client.instagramHandle;
    });

    document.querySelectorAll('[data-client-name]').forEach(function (el) {
      if (client.name) el.textContent = client.name;
    });

    document.querySelectorAll('[data-agency-brand]').forEach(function (el) {
      if (agency.brandName) el.textContent = agency.brandName;
    });

    document.querySelectorAll('[data-shipping-message]').forEach(function (el) {
      if (client.shippingMessage) el.textContent = client.shippingMessage;
    });

    // Agency (DigiMaraa) contact details
    var addr = agency.address || {};
    var addressParts = [
      addr.line1,
      addr.city,
      addr.district ? addr.district + '-' + (addr.postalCode || '') : addr.postalCode,
      addr.state,
      addr.country
    ].filter(Boolean);

    var addressEl = document.getElementById('agencyAddress');
    if (addressEl && addressParts.length) {
      addressEl.textContent = addressParts.join(', ');
    }

    var phoneEl = document.getElementById('agencyPhone');
    if (phoneEl && agency.phone) {
      phoneEl.textContent = agency.phone;
      phoneEl.setAttribute('href', 'tel:' + agency.phone.replace(/[^\d+]/g, ''));
    }

    setMailto('agencyEmail', agency.enquiriesEmail);
    setMailto('newBusinessEmail', agency.newBusinessEmail);
    setMailto('careerEmail', agency.careerEmail);

    var agencyWebsiteEl = document.getElementById('agencyWebsite');
    if (agencyWebsiteEl && agency.website) {
      agencyWebsiteEl.setAttribute('href', agency.website);
      if (agency.companyName) agencyWebsiteEl.textContent = agency.companyName;
    }

    // Footer
    renderFooter(client, agency);
  }

  function setMailto(id, email) {
    var el = document.getElementById(id);
    if (!el || !email) return;
    el.textContent = email;
    el.setAttribute('href', 'mailto:' + email);
  }

  /* ------------------------------------------------------------------
     Footer rendering
     ------------------------------------------------------------------ */
  function renderFooter(client, agency) {
    var footer = document.getElementById('siteFooter');
    if (!footer) return;

    var year = new Date().getFullYear();

    footer.innerHTML =
      '<div class="footer-container container">' +
        '<div class="footer-main">' +
          '<div class="footer-brand">' +
            '<span class="footer-logo-text">' + escapeHtml(client.name) + '</span>' +
            '<p class="footer-description">' + escapeHtml(client.tagline) + '</p>' +
            '<div class="footer-instagram">' +
              '<a class="footer-social-link" href="' + escapeHtml(client.instagramUrl) + '" target="_blank" rel="noopener noreferrer">' +
                instagramIcon() +
                '<span>' + escapeHtml('@' + client.instagramHandle) + '</span>' +
              '</a>' +
            '</div>' +
            '<p class="footer-shipping">' + escapeHtml(client.shippingMessage) + '</p>' +
          '</div>' +
          '<div class="footer-links">' +
            footerColumn('Navigation', [
              ['Home', '#home'],
              ['Collections', '#collections'],
              ['Our Craft', '#about'],
              ['Process', '#process'],
              ['Reviews', '#testimonials'],
              ['FAQs', '#faq'],
              ['Contact', '#contact']
            ]) +
            footerColumn('Collections', [
              ['Aari Embroidered Blouses', '#collections'],
              ['Bridal Embroidery', '#collections'],
              ['Sleeve Designs', '#collections'],
              ['Custom Stitching', '#collections'],
              ['Personalized Occasion Wear', '#collections'],
              ['Custom Embroidery Details', '#collections']
            ]) +
            '<div class="footer-column">' +
              '<h3 class="footer-heading">Get In Touch</h3>' +
              '<ul class="footer-list">' +
                '<li><a href="' + escapeHtml(client.instagramUrl) + '" target="_blank" rel="noopener noreferrer">Message on Instagram</a></li>' +
                '<li><a href="tel:' + escapeHtml((agency.phone || '').replace(/[^\d+]/g, '')) + '">' + escapeHtml(agency.phone) + '</a></li>' +
                '<li><a href="mailto:' + escapeHtml(agency.enquiriesEmail) + '">' + escapeHtml(agency.enquiriesEmail) + '</a></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<div class="footer-copyright">' +
            '<p>&copy; <span id="currentYear">' + year + '</span> ' + escapeHtml(client.name) + '. All rights reserved.</p>' +
          '</div>' +
          '<div class="footer-credit">' +
            '<p>Website developed by <a class="footer-credit-link" href="' + escapeHtml(agency.website) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(agency.companyName) + '</a></p>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function footerColumn(heading, links) {
    var html = '<div class="footer-column"><h3 class="footer-heading">' + escapeHtml(heading) + '</h3><ul class="footer-list">';
    links.forEach(function (pair) {
      html += '<li><a href="' + escapeHtml(pair[1]) + '">' + escapeHtml(pair[0]) + '</a></li>';
    });
    html += '</ul></div>';
    return html;
  }

  function instagramIcon() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>' +
      '</svg>';
  }

  /* ------------------------------------------------------------------
     Enquiry form — client-side only.
     There is no backend. Submitting validates the fields and opens a
     pre-filled mail draft in the visitor's own email client (mailto:).
     ------------------------------------------------------------------ */
  function getEnquiryRecipient() {
    if (config && config.enquiry && config.enquiry.recipientEmail) {
      return config.enquiry.recipientEmail;
    }
    if (config && config.agency) {
      return config.agency.newBusinessEmail || config.agency.enquiriesEmail || '';
    }
    return '';
  }

  function initEnquiryForm() {
    var form = document.getElementById('enquiryForm');
    if (!form) return;

    var recipient = getEnquiryRecipient();
    var recipientLink = document.getElementById('formRecipient');
    if (recipientLink && recipient) {
      recipientLink.textContent = recipient;
      recipientLink.setAttribute('href', 'mailto:' + recipient);
    }

    var statusEl = document.getElementById('formStatus');

    var fields = {
      name: {
        input: document.getElementById('enqName'),
        error: document.getElementById('enqNameError'),
        validate: function (value) {
          return value.trim().length >= 2 ? '' : 'Please enter your name.';
        }
      },
      email: {
        input: document.getElementById('enqEmail'),
        error: document.getElementById('enqEmailError'),
        validate: function (value) {
          var trimmed = value.trim();
          if (!trimmed) return 'Please enter your email address.';
          return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)
            ? ''
            : 'Please enter a valid email address.';
        }
      },
      message: {
        input: document.getElementById('enqMessage'),
        error: document.getElementById('enqMessageError'),
        validate: function (value) {
          return value.trim().length >= 10
            ? ''
            : 'Please add a short description of your requirements.';
        }
      }
    };

    function showError(field, message) {
      if (!field.input) return;
      if (message) {
        field.input.setAttribute('aria-invalid', 'true');
        if (field.error) {
          field.error.textContent = message;
          field.error.hidden = false;
        }
      } else {
        field.input.removeAttribute('aria-invalid');
        if (field.error) {
          field.error.textContent = '';
          field.error.hidden = true;
        }
      }
    }

    function validateField(field) {
      if (!field.input) return true;
      var message = field.validate(field.input.value);
      showError(field, message);
      return !message;
    }

    // Clear an error as soon as the visitor corrects the field
    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      if (!field.input) return;
      field.input.addEventListener('blur', function () { validateField(field); });
      field.input.addEventListener('input', function () {
        if (field.input.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });
    });

    if (statusEl) {
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var firstInvalid = null;
      var isValid = true;

      Object.keys(fields).forEach(function (key) {
        var field = fields[key];
        var ok = validateField(field);
        if (!ok) {
          isValid = false;
          if (!firstInvalid) firstInvalid = field.input;
        }
      });

      if (!isValid) {
        if (statusEl) {
          statusEl.textContent = 'Please correct the highlighted fields.';
          statusEl.className = 'form-status is-error';
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (!recipient) {
        if (statusEl) {
          statusEl.textContent = 'No enquiry email is configured. Please try Instagram instead.';
          statusEl.className = 'form-status is-error';
        }
        return;
      }

      var topicInput = document.getElementById('enqTopic');
      var phoneInput = document.getElementById('enqPhone');

      var topic = topicInput ? topicInput.value : 'General enquiry';
      var prefix = (config && config.enquiry && config.enquiry.subjectPrefix)
        ? config.enquiry.subjectPrefix
        : 'Custom Order Enquiry';

      var lines = [
        'Name: ' + fields.name.input.value.trim(),
        'Email: ' + fields.email.input.value.trim()
      ];

      if (phoneInput && phoneInput.value.trim()) {
        lines.push('Phone / WhatsApp: ' + phoneInput.value.trim());
      }

      lines.push('Enquiry type: ' + topic);
      lines.push('');
      lines.push('Requirements:');
      lines.push(fields.message.input.value.trim());

      var subject = prefix + ' — ' + topic;
      var mailto = 'mailto:' + recipient +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      if (statusEl) {
        statusEl.textContent = 'Opening your email app with a pre-filled draft. If nothing opens, email ' + recipient + ' directly.';
        statusEl.className = 'form-status is-success';
      }

      window.location.href = mailto;
    });
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  function init() {
    initHeader();
    initNavigation();
    initSmoothScroll();
    initActiveNav();
    initFAQ();
    initCarousel();
    initReveal();
    applyConfig();
    initEnquiryForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

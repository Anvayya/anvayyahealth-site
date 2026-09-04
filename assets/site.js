// Shared behaviour for every Anvayya page: mobile nav toggle, reveal-on-scroll
// animation, and the footer copyright year. Loaded with `defer`, so the DOM
// is ready by the time this runs.
(function () {
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
    io.observe(el);
  });

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
// Cookie consent banner: shown once per visitor until they accept. Stores
// the choice in an actual cookie (not just localStorage) for 12 months.
// See privacy.html Section 8 for what anvayya.in uses cookies for.
(function () {
  var COOKIE_NAME = 'anvayya_cookie_consent';

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function setCookie(name, value, days) {
    var expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  if (getCookie(COOKIE_NAME)) return;

  var banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-label', 'Cookie notice');
  banner.innerHTML =
    '<p class="cookie-banner__text">We use a couple of cookies to run anvayya.in — including one that remembers this choice — and to load Google Fonts. We don’t use analytics or advertising cookies. See our <a href="privacy.html">Privacy Policy</a>.</p>' +
    '<div class="cookie-banner__actions">' +
      '<button type="button" class="cookie-banner__btn cookie-banner__btn--accept" id="cookieAccept">Got it</button>' +
    '</div>';

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(banner);
    var acceptBtn = document.getElementById('cookieAccept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        setCookie(COOKIE_NAME, 'accepted', 365);
        banner.classList.add('cookie-banner--hide');
        window.setTimeout(function () {
          if (banner.parentNode) banner.parentNode.removeChild(banner);
        }, 320);
      });
    }
  });
})();

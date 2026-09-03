// Early-access waitlist form. The form itself is a Netlify Forms form
// (see the data-netlify attribute in contact.html) — Netlify's build bots
// parse the static HTML to register it, and this script submits it via
// fetch so we can show the in-page success/error state instead of a full
// page reload. Submissions land in the Netlify dashboard (Site
// configuration > Forms); wire up a notification or outgoing webhook there
// to route new leads into a CRM when that's ready.
(function () {
  var form = document.getElementById('accessForm');
  if (!form) return;
  var success = document.getElementById('accessSuccess');
  var errorMsg = document.getElementById('formError');

  function encode(data) {
    return Object.keys(data)
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
      })
      .join('&');
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    errorMsg.classList.add('hidden');

    var required = ['name', 'email', 'whatsapp', 'city'];
    var ok = true;
    required.forEach(function (n) {
      var f = form.elements[n];
      if (!f.value.trim()) {
        ok = false;
        f.classList.add('border-marigold');
      } else {
        f.classList.remove('border-marigold');
      }
    });
    if (!ok) return;

    var payload = Object.fromEntries(new FormData(form).entries());
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(payload),
    })
      .then(function () {
        form.classList.add('hidden');
        success.classList.remove('hidden');
      })
      .catch(function () {
        errorMsg.classList.remove('hidden');
      });
  });
})();

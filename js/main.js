(function () {
  'use strict';

  // =========================================================================
  // 1) SIGN-UP FORM → GOOGLE SHEETS (via Google Apps Script Web App)
  // -------------------------------------------------------------------------
  // Paste the Web App URL you get from Google Apps Script here.
  // See SETUP.md in this repo for the full step-by-step walkthrough —
  // it explains exactly where this URL comes from and how to deploy it.
  // Until you replace this, the form will show a friendly error instead
  // of silently failing.
  // =========================================================================
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyF5Wr2L4QjpHRQjB9LtjyaybVF2chkSq4dOb7Tk4vPcrUofMeLAVN7eVyx-j8VwNIl/exec';

  var form = document.getElementById('signup-form');
  if (form) {
    var msg = document.getElementById('form-msg');
    var submitBtn = document.getElementById('signup-submit');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstName = document.getElementById('first-name').value.trim();
      var lastName = document.getElementById('last-name').value.trim();
      var email = document.getElementById('email').value.trim();

      if (!firstName || !lastName || !email) {
        msg.textContent = 'Please fill in every field.';
        msg.className = 'form-msg error';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = 'That email doesn\'t look right — please check it.';
        msg.className = 'form-msg error';
        return;
      }

      if (SCRIPT_URL.indexOf('PASTE_YOUR') === 0) {
        msg.textContent = 'Sign-up isn\'t connected yet — see SETUP.md to finish the Google Sheets setup.';
        msg.className = 'form-msg error';
        console.warn('JTKias signup: SCRIPT_URL in js/main.js has not been set yet. See SETUP.md.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      msg.textContent = '';
      msg.className = 'form-msg loading';

      var body = new URLSearchParams({
        firstName: firstName,
        lastName: lastName,
        email: email,
        source: 'jtkias-landing'
      });

      // Apps Script Web Apps don't send CORS headers back to fetch(), so we
      // POST in "no-cors" mode. We can't read the response, but the request
      // still reaches your script and runs (appends the row + sends the
      // email) — see SETUP.md for why this is the standard pattern here.
      fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: body })
        .then(function () {
          var params = new URLSearchParams({ name: firstName });
          window.location.href = 'thank-you.html?' + params.toString();
        })
        .catch(function (err) {
          console.error('JTKias signup error:', err);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Get My Free Access →';
          msg.textContent = 'Something went wrong sending that — please try again, or message J.T. Kias on WhatsApp below.';
          msg.className = 'form-msg error';
        });
    });
  }

  // =========================================================================
  // 2) Thank-you page — personalize the greeting from ?name=
  // =========================================================================
  var tyName = document.getElementById('ty-name');
  if (tyName) {
    var params = new URLSearchParams(window.location.search);
    var name = params.get('name');
    if (name) tyName.textContent = name;
  }

  // =========================================================================
  // 3) Copy phone number
  // =========================================================================
  var copyBtn = document.getElementById('copy-phone');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = document.getElementById('phone-number').textContent.trim();
      var done = function () {
        var original = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(function () { copyBtn.textContent = original; }, 1600);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done).catch(function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  }

  // =========================================================================
  // 4) Footer year
  // =========================================================================
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================================================================
  // 5) Scroll-reveal (single, quiet pass — respects reduced-motion via CSS)
  // =========================================================================
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
})();

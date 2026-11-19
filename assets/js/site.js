// Ascend Together concept site: small progressive enhancements only.
// The page works without this script; nothing here sends data anywhere.
(function () {
  'use strict';

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Placeholder forms: validate, then show the thank-you wording without sending.
  document.querySelectorAll('.js-placeholder-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var note = form.querySelector('.form-note');
      var nameField = form.querySelector('[name="name"]');
      var name = nameField && nameField.value.trim() ? nameField.value.trim().split(' ')[0] : 'there';
      if (note) {
        note.textContent = (note.getAttribute('data-thanks') || 'Thanks.').replace('{name}', name);
        note.hidden = false;
      }
      form.reset();
    });
  });

  // Cookie banner. The only third-party script is Luma's registration embed,
  // loaded once the visitor accepts. Until then the Luma button is a plain link.
  var KEY = 'at-cookie-consent';
  var loadLumaEmbed = function () {
    document.querySelectorAll('.js-luma-embed').forEach(function (box) {
      if (box.querySelector('iframe')) return;
      var f = document.createElement('iframe');
      f.src = box.getAttribute('data-src');
      f.title = 'Ask for a seat: Luma registration form';
      f.setAttribute('allow', 'fullscreen; payment');
      f.setAttribute('loading', 'lazy');
      box.innerHTML = '';
      box.appendChild(f);
      box.classList.add('is-loaded');
    });
  };
  document.querySelectorAll('[data-luma-load]').forEach(function (btn) {
    btn.addEventListener('click', loadLumaEmbed);
  });
  var loadLuma = function () {
    if (!document.querySelector('.luma-checkout--button') || document.getElementById('luma-checkout')) return;
    var s = document.createElement('script');
    s.id = 'luma-checkout';
    s.src = 'https://embed.lu.ma/checkout-button.js';
    s.async = true;
    document.body.appendChild(s);
    document.querySelectorAll('.luma-checkout--button').forEach(function (a) { a.removeAttribute('target'); });
    loadLumaEmbed();
  };
  var banner = document.getElementById('cookie-banner');
  var read = function () { try { return localStorage.getItem(KEY); } catch (err) { return null; } };
  var write = function (v) { try { localStorage.setItem(KEY, v); } catch (err) { /* private mode */ } };
  if (banner) {
    if (!read()) banner.hidden = false;
    if (read() === 'accepted') loadLuma();
    banner.addEventListener('click', function (e) {
      var choice = e.target.closest('[data-consent]');
      if (!choice) return;
      write(choice.getAttribute('data-consent'));
      banner.hidden = true;
      if (choice.getAttribute('data-consent') === 'accepted') loadLuma();
    });
  }
  document.querySelectorAll('.js-cookie-settings').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!banner) { try { localStorage.removeItem(KEY); } catch (err) {} window.location.href = '/'; return; }
      banner.hidden = false;
      var first = banner.querySelector('button');
      if (first) first.focus();
    });
  });

  var year = document.querySelector('.js-year');
  if (year) year.textContent = new Date().getFullYear();
})();

/* Semplicemente Vino — main.js
   PLUMBING_V 1 (da Agenzia/Toolkit/boilerplate). Enoteca di quartiere: orari
   spezzati (pausa pranzo), domenica chiusa. GSAP SUBITO; reveal once; watchdog 1,5s. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'semplicemente-vino',
    hours: {
      0: [],
      1: [['15:30', '20:30']],
      2: [['10:30', '13:00'], ['15:30', '20:30']],
      3: [['10:30', '13:00'], ['15:30', '20:30']],
      4: [['10:30', '13:00'], ['15:30', '20:30']],
      5: [['10:30', '13:00'], ['15:30', '20:30']],
      6: [['10:30', '13:00'], ['15:30', '20:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1900,
    inViewClass: 'in-view',
    breakpointMenu: 920,
    EN: {
      'nav.sfuso': 'Bulk wine', 'nav.trovi': 'What we sell', 'nav.oste': 'The host', 'nav.dove': 'Where & hours', 'nav.chiama': 'Call',
      'hero.rec': '206 reviews',
      'hero.kicker': 'The neighbourhood wine shop, with bulk wine',
      'hero.sub': 'Loose <strong>bulk wine</strong> from Piave to Piemonte at honest prices, bottles, platters and a glass among friends. In San Siro, <strong>like the old days</strong>.',
      'hero.cta1': 'Call: 333 748 0015', 'hero.cta2': 'The bulk wine',
      'tk.1': 'bulk wine', 'tk.2': 'a litre for a few euros', 'tk.3': 'from Piave to Piemonte', 'tk.4': 'bottles at honest prices', 'tk.5': 'platters & a glass', 'tk.6': 'like home',
      'tk.1b': 'bulk wine', 'tk.2b': 'a litre for a few euros', 'tk.3b': 'from Piave to Piemonte', 'tk.4b': 'bottles at honest prices', 'tk.5b': 'platters & a glass', 'tk.6b': 'like home',
      'sfuso.kicker': 'Bulk wine', 'sfuso.t1': 'Like', 'sfuso.t2': 'the old days',
      'sfuso.p1': 'Bring your own container, we fill it up. The <strong>bulk wine</strong> of the old days, good and honest, to drink every day without a second thought.',
      'sfuso.p2': 'And if you haven’t got a demijohn, no problem: there’s the bottle, or a glass at the counter over a chat.',
      'lav.1': 'from Piave', 'lav.2': 'from Piemonte', 'lav.3': 'from Oltrepò', 'lav.4': 'from Tuscany', 'lav.prezzo': 'a litre of red',
      'trovi.kicker': 'What we sell', 'trovi.t1': 'Not just', 'trovi.t2': 'bulk wine',
      'tc1.t': 'The bottles', 'tc1.p': 'A wide choice of labels at honest prices — «great wines, great value», as our customers say.',
      'tc2.t': 'Platters & aperitivo', 'tc2.p': 'Platters from small producers and a couple of corners for aperitivo: a glass, a few nibbles and the tables outside in summer.',
      'tc3.t': 'Gift boxes', 'tc3.p': 'Lovely gift boxes to put together with Alessandro: the right thought for anyone who loves good wine.',
      'oste.kicker': 'The host', 'oste.t1': 'Alessandro,', 'oste.t2': 'the one you trust',
      'oste.p1': 'Running the shop is <strong>Alessandro</strong>, a kind and knowledgeable host: «you can trust him on the choice of wines», customers write. Tell him what you like and what you’re eating, and he’ll sort you out.',
      'oste.p2': 'A family-run wine shop where, after the first glass, you feel <em>at home</em>. That’s why it’s the «wine shop of the heart» for half of San Siro.',
      'gal.kicker': 'The shop', 'gal.t1': 'A look', 'gal.t2': 'inside',
      'rec.kicker': 'What people say', 'rec.t2': 'from 206 reviews',
      'rec.r1': '«A really easy place to grab good bulk wine. Alessandro is a kind and knowledgeable host: you can trust him on the choice of wines.»',
      'rec.r2': '«The wine shop of the heart. A place in Milan where you can drink good wine at human prices. Friendly, kind staff.»',
      'rec.r3': '«It’s my favourite wine shop in the San Siro area. The staff are lovely and there’s a wide choice of wines at an absolutely honest price.»',
      'rec.r4': '«It feels like home: the owners are lovely and helpful, with tables outside. It’s become our regular spot.»',
      'dove.kicker': 'Where & hours', 'dove.t1': 'On Via Domokos,', 'dove.t2': 'in San Siro',
      'dove.metro': 'Via Domokos 4, corner of Piazza Carlo Amati, 20147 Milan · San Siro area, on the first stretch of Via Novara',
      'dove.chiama': 'Call 333 748 0015', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday', 'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'Do you do bulk wine?', 'faq.a1': 'Yes, it’s our speciality: bulk wine from Piave, Piemonte, Oltrepò and Tuscany, at honest prices. Bring your container and we fill it up — a litre of red costs just a few euros.',
      'faq.q2': 'Can I have a glass on site?', 'faq.a2': 'Yes: we have a couple of corners for aperitivo with a glass and nibbles, and tables outside in summer. Just call to book a table.',
      'faq.q3': 'Do you sell bottles and gift boxes too?', 'faq.a3': 'Yes: a wide choice of bottles at honest prices, platters from small producers and lovely gift boxes.',
      'faq.q4': 'What are your opening hours?', 'faq.a4': 'Monday 3:30–8:30pm; Tuesday to Saturday 10:30am–1pm and 3:30–8:30pm. We’re closed on Sundays.',
      'faq.q5': 'Where are you?', 'faq.a5': 'At Via Domokos 4, corner of Piazza Carlo Amati, in Milan, San Siro / Via Novara area. Call 333 748 0015.',
      'foot.dove': 'Via Domokos 4, 20147 Milan · <a href="tel:+393337480015">333 748 0015</a>',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) { gsap.set(els, { opacity: 1, y: 0 }); }
    else { els.forEach(function (el) { el.style.opacity = 1; }); }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.fromTo('.trovi-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .7, stagger: .14, ease: 'power2.out', scrollTrigger: { trigger: '.trovi-grid', start: 'top 82%', once: true } });
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero-badge', { opacity: 1, y: 0, duration: .5 }, .05)
      .to('.hero-kicker', { opacity: 1, y: 0, duration: .5 }, .15)
      .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8 }, .25)
      .to('.hero-sub', { opacity: 1, y: 0, duration: .6 }, .55)
      .to('.hero-cta', { opacity: 1, y: 0, duration: .6 }, .75);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 700); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'); var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari dinamici Europe/Rome (PLUMBING_V 1) */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[g('weekday')], mins: parseInt(g('hour'), 10) * 60 + parseInt(g('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = ((m % 1440) + 1440) % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DIT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId), st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    if (!el) return;
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours(); setInterval(renderHours, 60000);

  /* i18n overlay (innerHTML per <strong>/<em>/<a>) */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var t = document.getElementById('langToggle'); if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* action-bar mobile */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () { actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();

// FikraWeb · site behaviour (no dependencies)
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const desktop = window.matchMedia('(min-width: 981px)');
  const canHover = window.matchMedia('(hover: hover)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---------- dark / light theme ----------
  // The saved choice is applied in <head> before the page paints; this only handles the switch.
  const root = document.documentElement;
  const themeMeta = $('meta[name="theme-color"]');
  const syncTheme = () => {
    const dark = root.dataset.theme !== 'light';
    $$('.theme-toggle').forEach((b) => b.setAttribute('aria-label', dark ? b.dataset.labelLight : b.dataset.labelDark));
    if (themeMeta) themeMeta.content = dark ? '#050816' : '#FFFFFF';
  };
  $$('.theme-toggle').forEach((b) => b.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* private mode */ }
    syncTheme();
  }));
  syncTheme();

  // ---------- products dropdown (desktop) ----------
  const trigger = $('.nav-trigger');
  const menu = trigger && document.getElementById(trigger.getAttribute('aria-controls'));
  if (trigger && menu) {
    const setMenu = (open) => {
      trigger.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    };
    trigger.addEventListener('click', () => setMenu(menu.hidden));
    document.addEventListener('click', (e) => {
      if (!menu.hidden && !menu.contains(e.target) && !trigger.contains(e.target)) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); trigger.focus(); }
    });
    menu.addEventListener('focusout', (e) => {
      if (!menu.contains(e.relatedTarget) && e.relatedTarget !== trigger) setMenu(false);
    });
  }

  // ---------- mobile menu ----------
  const toggle = $('.menu-toggle');
  const mobile = toggle && document.getElementById(toggle.getAttribute('aria-controls'));
  if (toggle && mobile) {
    const setMobile = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
      mobile.hidden = !open;
      document.body.classList.toggle('menu-open', open);
      if (open) $('a', mobile)?.focus();
    };
    toggle.addEventListener('click', () => setMobile(mobile.hidden));
    mobile.addEventListener('click', (e) => { if (e.target.closest('a')) setMobile(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobile.hidden) { setMobile(false); toggle.focus(); }
    });
    desktop.addEventListener('change', (e) => { if (e.matches) setMobile(false); });
  }

  // ---------- product showcase: tabs on desktop, accordion on mobile ----------
  $$('[data-showcase]').forEach((sc) => {
    const tabs = $$('.sc-tab', sc);
    const panelOf = (t) => document.getElementById(t.getAttribute('aria-controls'));
    const open = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-expanded', String(on));
        panelOf(t).hidden = !on;
      });
    };
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const isOpen = tab.getAttribute('aria-expanded') === 'true';
        if (desktop.matches) { if (!isOpen) open(tab); return; }
        if (isOpen) { tab.setAttribute('aria-expanded', 'false'); panelOf(tab).hidden = true; }
        else {
          open(tab);
          if (!reduceMotion.matches) tab.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
      tab.addEventListener('mouseenter', () => { if (desktop.matches && canHover.matches) open(tab); });
      tab.addEventListener('focus', () => { if (desktop.matches) open(tab); });
      tab.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        e.preventDefault();
        const i = tabs.indexOf(tab);
        tabs[(i + (e.key === 'ArrowDown' ? 1 : tabs.length - 1)) % tabs.length].focus();
      });
    });
    // Going back to desktop with everything closed: reopen the first product.
    desktop.addEventListener('change', (e) => {
      if (e.matches && !tabs.some((t) => t.getAttribute('aria-expanded') === 'true')) open(tabs[0]);
    });
  });

  // ---------- product listing: filter by sector ----------
  // Without JavaScript the filters stay hidden and every product is listed.
  $$('[data-filters]').forEach((bar) => {
    bar.hidden = false;
    const buttons = $$('[data-filter]', bar);
    const blocks = $$('[data-group-block]');
    buttons.forEach((btn) => btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      blocks.forEach((bl) => { bl.hidden = f !== 'all' && bl.dataset.groupBlock !== f; });
    }));
  });

  // ---------- forms → WhatsApp (or e-mail) ----------
  // Any <form data-wa-form>. Each field declares data-label (its name in the message);
  // data-block puts a long answer on its own lines. Rules come from required, minlength and type="tel".
  $$('[data-wa-form]').forEach((form) => {
    const inputs = $$('[data-label]', form);
    const valid = (el) => {
      const v = el.value.trim();
      if (el.required && v === '') return false;
      if (v && el.type === 'tel') { const d = v.replace(/\D/g, ''); if (d.length < 9 || d.length > 13) return false; }
      if (v && el.minLength > 0 && v.length < el.minLength) return false;
      return true;
    };
    const showError = (el, bad) => {
      el.setAttribute('aria-invalid', String(bad));
      const err = document.getElementById(`${el.id}-err`);
      if (err) err.hidden = !bad;
    };
    // re-validate a field once the visitor has been told it was wrong
    inputs.forEach((el) => el.addEventListener('input', () => {
      if (el.getAttribute('aria-invalid') === 'true') showError(el, !valid(el));
    }));
    const validate = () => {
      let first = null;
      inputs.forEach((el) => { const bad = !valid(el); showError(el, bad); if (bad && !first) first = el; });
      if (first) first.focus();
      return !first;
    };
    // French puts a space before ":"; Arabic and English don't.
    const sep = document.documentElement.lang === 'fr' ? ' :' : ':';
    const message = () => {
      const lines = [form.dataset.intro, ''];
      const blocks = [];
      inputs.forEach((el) => {
        const v = el.value.trim();
        if (!v) return;
        if ('block' in el.dataset) blocks.push('', `${el.dataset.label}${sep}`, v);
        else lines.push(`${el.dataset.label}${sep} ${v}`);
      });
      return [...lines, ...blocks].join('\n');
    };
    const done = $('.pform-done', form);
    const fallback = $('[data-wa-fallback]', form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;
      const url = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(message())}`;
      if (fallback) fallback.href = url;
      if (done) done.hidden = false;
      window.open(url, '_blank', 'noopener');
    });
    const emailBtn = $('[data-send-email]', form);
    if (emailBtn) emailBtn.addEventListener('click', () => {
      if (!validate()) return;
      const subjectField = $('[data-subject-field]', form);
      const subject = [form.dataset.subject, subjectField && subjectField.value].filter(Boolean).join(' : ');
      window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message())}`;
    });
  });

  // ---------- reveal on scroll ----------
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  // ---------- floating WhatsApp: visible once the page has been scrolled ----------
  const fab = $('.wa-float');
  if (fab) {
    const onScroll = () => fab.classList.toggle('is-visible', window.scrollY > 640);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();

/* Fil S.C. / UC (option C) : bulle flottante sur ROUTE et ATTERRIR, qui ouvre une feuille avec le fil de communication.
   Alimenté par log() dans script.js : PopupSMS.add(sender, text). */
(function () {
  const PopupSMS = {};
  const SHOW_ON = ['route', 'debarquer'];
  const threads = [];
  let unread = 0, fab, badge, sheet, thread;

  function time() {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  function makeRow(sender, text) {
    const isSC = sender === 'SPACE COMPUTER';
    const row = document.createElement('div');
    row.className = 'popup-sms-row ' + (isSC ? 'sc' : 'uc');
    const who = document.createElement('div');
    who.className = 'popup-sms-who';
    who.textContent = isSC ? 'S.C.' : 'UC';
    const bubble = document.createElement('div');
    bubble.className = 'popup-sms-bubble';
    bubble.innerHTML = text; // même source que le journal (contenu du jeu)
    const t = document.createElement('div');
    t.style.cssText = 'font-size:.6rem;color:var(--pop-time);margin:3px 4px 0;';
    t.textContent = time();
    row.append(who, bubble, t);
    return row;
  }

  PopupSMS.add = function (sender, text) {
    threads.forEach(th => { th.prepend(makeRow(sender, text)); th.scrollTop = 0; });
    if (!sheet.classList.contains('open')) { unread++; updateBadge(); }
  };

  function updateBadge() {
    badge.textContent = unread;
    badge.style.display = unread ? '' : 'none';
  }

  function activeTabId() {
    const m = document.querySelector('main.active');
    return m ? m.id.replace('tab-', '') : '';
  }

  function openSheet() { sheet.classList.add('open'); unread = 0; updateBadge(); }
  function closeSheet() { sheet.classList.remove('open'); }
  function toggleSheet() { sheet.classList.contains('open') ? closeSheet() : openSheet(); }

  function majBarPasser() {
    const b = document.getElementById('bar-passer');
    if (b) b.style.display = activeTabId() === 'planetes' ? '' : 'none';
  }

  function refresh() {
    const onTab = SHOW_ON.includes(activeTabId());
    fab.style.display = onTab ? '' : 'none';
    if (!onTab) closeSheet();
    majBarPasser();
  }

  function layout() {
    const nav = document.querySelector('nav');
    if (nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  }

  function build() {
    fab = document.createElement('button');
    fab.id = 'fil-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Ouvrir le fil S.C. / UC');
    fab.textContent = 'Fil';
    badge = document.createElement('span');
    badge.className = 'fil-badge';
    badge.style.display = 'none';
    fab.appendChild(badge);
    fab.addEventListener('click', toggleSheet);

    sheet = document.createElement('div');
    sheet.id = 'fil-sheet';
    const head = document.createElement('div');
    head.className = 'fil-sheet-head';
    const title = document.createElement('span');
    title.textContent = 'Fil S.C. / UC';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'fil-close';
    close.setAttribute('aria-label', 'Fermer le fil');
    close.textContent = '×';
    close.addEventListener('click', closeSheet);
    head.append(title, close);
    thread = document.createElement('div');
    thread.className = 'thread fil-thread-sheet';
    sheet.append(head, thread);
    threads.push(thread);

    document.body.append(fab, sheet);

    // Reprend les messages déjà présents dans le journal (le plus ancien d'abord)
    const log = document.getElementById('log-container');
    if (log) {
      Array.from(log.children).reverse().forEach(entry => {
        const sender = entry.querySelector('.log-sender');
        const body = entry.children[1];
        if (sender && body) PopupSMS.add(sender.textContent, body.innerHTML);
      });
      unread = 0; updateBadge();
    }

    document.querySelectorAll('main').forEach(m =>
      new MutationObserver(refresh).observe(m, { attributes: true, attributeFilter: ['class'] }));
    layout();
    window.addEventListener('resize', layout);
    refresh();
  }

  document.addEventListener('DOMContentLoaded', build);
  window.PopupSMS = PopupSMS;
})();

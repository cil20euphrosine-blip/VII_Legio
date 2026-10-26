/* Pop-up SMS : affiche le journal de bord en bulles sur l'onglet ATTERRIR.
   Alimenté par log() dans script.js : PopupSMS.add(sender, text). */
(function () {
  const PopupSMS = {};
  let thread, panel, toggle;

  function time() {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  PopupSMS.add = function (sender, text) {
    if (!thread) return;
    const isSC = sender === 'SPACE COMPUTER';
    const row = document.createElement('div');
    row.className = 'popup-sms-row ' + (isSC ? 'sc' : 'uc');
    const who = document.createElement('div');
    who.className = 'popup-sms-who';
    who.textContent = isSC ? 'SPACE COMPUTER' : 'OFFICIER COMMANDANT';
    const bubble = document.createElement('div');
    bubble.className = 'popup-sms-bubble';
    bubble.innerHTML = text; // même source que le journal (contenu du jeu)
    const t = document.createElement('div');
    t.style.cssText = 'font-size:.6rem;color:var(--pop-time);margin:3px 4px 0;';
    t.textContent = time();
    row.append(who, bubble, t);
    thread.prepend(row); // plus récent en haut, comme le journal de bord
    thread.scrollTop = 0;
  };

  // Onglets où le bouton Messages et le fil sont accessibles
  const SHOW_ON = ['tab-vaisseau', 'tab-route', 'tab-planetes', 'tab-debarquer'];
  function isAllowedTabActive() {
    return SHOW_ON.some(id => {
      const tab = document.getElementById(id);
      return !!tab && tab.classList.contains('active');
    });
  }

  // Zone de défilement validée : démarre à 36 % de la hauteur de l'écran,
  // s'arrête à 68 px au-dessus de la barre de navigation.
  const TOP_RATIO = 0.36;
  const GAP_ABOVE_NAV = 68;
  function layout() {
    if (!panel) return;
    const nav = document.querySelector('nav');
    panel.style.top = Math.round(window.innerHeight * TOP_RATIO) + 'px';
    if (nav) {
      const navTop = nav.getBoundingClientRect().top;
      panel.style.bottom = Math.max(0, window.innerHeight - (navTop - GAP_ABOVE_NAV)) + 'px';
    }
  }

  function togglePanel() {
    const hidden = panel.dataset.userHidden ? false : true;
    if (hidden) panel.dataset.userHidden = '1'; else delete panel.dataset.userHidden;
    toggle.classList.toggle('off', hidden);
    toggle.setAttribute('aria-expanded', String(!hidden));
    refreshVisibility();
  }

  function refreshVisibility() {
    if (!panel) return;
    layout();
    const allowed = isAllowedTabActive();
    const show = allowed && !panel.dataset.userHidden;
    panel.classList.toggle('hidden', !show);
    toggle.style.display = allowed ? '' : 'none';
  }

  function build() {
    toggle = document.createElement('button');
    toggle.id = 'popup-sms-toggle';
    toggle.className = 'status-item popup-sms-chip';
    toggle.textContent = 'Messages';
    toggle.setAttribute('aria-expanded', 'true');
    panel = document.createElement('div');
    panel.id = 'popup-sms';
    thread = document.createElement('div');
    thread.className = 'thread';
    panel.appendChild(thread);
    const bar = document.querySelector('.status-bar');
    (bar || document.body).appendChild(toggle);
    document.body.appendChild(panel);

    toggle.addEventListener('click', togglePanel);

    // Reprend les messages déjà présents dans le journal (le plus ancien d'abord)
    const log = document.getElementById('log-container');
    if (log) {
      Array.from(log.children).reverse().forEach(entry => {
        const sender = entry.querySelector('.log-sender');
        const body = entry.children[1];
        if (sender && body) PopupSMS.add(sender.textContent, body.innerHTML);
      });
    }

    // Affiche le pop-up sur VAISSEAU, ROUTE, PLANÈTES et ATTERRIR
    document.querySelectorAll('main').forEach(m =>
      new MutationObserver(refreshVisibility).observe(m, { attributes: true, attributeFilter: ['class'] }));
    refreshVisibility();
    window.addEventListener('resize', layout);
  }

  document.addEventListener('DOMContentLoaded', build);
  window.PopupSMS = PopupSMS;
})();

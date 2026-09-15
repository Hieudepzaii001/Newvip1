/* HieuSubViP - Performance optimized */
(function () {
  'use strict';

  // Auth
  function isLoggedIn() {
    try {
      const raw = localStorage.getItem('hsv_user');
      if (!raw) return false;
      const u = JSON.parse(raw);
      return !!(u && (u.username || u.email || u.name));
    } catch (e) { return false; }
  }
  function getUser() {
    try { return JSON.parse(localStorage.getItem('hsv_user') || 'null'); } catch (e) { return null; }
  }
  function setUser(u) {
    localStorage.setItem('hsv_user', JSON.stringify(u));
  }
  function logout() {
    localStorage.removeItem('hsv_user');
    location.href = 'index.html';
  }
  function showToast(msg, warn) {
    const t = document.getElementById('toast');
    if (!t) return;
    const span = t.querySelector('span');
    if (span) span.textContent = msg;
    t.classList.toggle('warn', !!warn);
    t.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove('show'), 2800);
  }
  window.HSV = { isLoggedIn, getUser, setUser, logout, showToast };

  // Particles - reduced on mobile, pause when tab hidden
  const canvas = document.getElementById('particles'); const isAuthPage = /login|register/.test(location.pathname);
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: true });
    const isMobile = window.matchMedia('(max-width: 768px)').matches || navigator.maxTouchPoints > 1;
    const count = isAuthPage ? (isMobile ? 8 : 14) : (isMobile ? 18 : 36);
    let particles = [];
    let raf = 0;
    let running = true;
    let w = 0, h = 0;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    function create() {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.4,
          sx: (Math.random() - 0.5) * 0.28,
          sy: (Math.random() - 0.5) * 0.28,
          o: Math.random() * 0.4 + 0.08
        });
      }
    }
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const maxD = isMobile ? 80 : 100;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = 'rgba(168,85,247,' + p.o + ')';
        ctx.fill();
        // fewer connections on mobile
        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x, dy = p.y - p2.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < maxD * maxD) {
              const d = Math.sqrt(d2);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = 'rgba(168,85,247,' + (0.1 * (1 - d / maxD)) + ')';
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
        p.x += p.sx;
        p.y += p.sy;
        if (p.x < 0 || p.x > w) p.sx *= -1;
        if (p.y < 0 || p.y > h) p.sy *= -1;
      }
      raf = requestAnimationFrame(draw);
    }
    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    create();
    draw();

    // throttle resize
    let resizeT;
    window.addEventListener('resize', () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => { resize(); create(); }, 150);
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
  }

  // Navbar scroll - rAF throttle
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
    }, { passive: true });
  }

  // Drawer
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('nav-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const userMenuBtn = document.getElementById('user-menu-btn');

  function openDrawer() {
    drawer && drawer.classList.add('open');
    overlay && overlay.classList.add('show');
    hamburger && hamburger.classList.add('active');
  }
  function closeDrawer() {
    drawer && drawer.classList.remove('open');
    overlay && overlay.classList.remove('show');
    hamburger && hamburger.classList.remove('active');
  }
  hamburger && hamburger.addEventListener('click', () => {
    drawer && drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  overlay && overlay.addEventListener('click', closeDrawer);
  userMenuBtn && userMenuBtn.addEventListener('click', openDrawer);
  document.querySelectorAll('.drawer-link, #nav-drawer a[href^="#"]').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  function updateAuthUI() {
    const logged = isLoggedIn();
    const user = getUser();
    const btnLogin = document.getElementById('btn-login');
    const btnRegister = document.getElementById('btn-register');
    const userBtn = document.getElementById('user-menu-btn');
    const drawerGuest = document.getElementById('drawer-guest');
    const drawerAuth = document.getElementById('drawer-auth');
    const drawerUser = document.getElementById('drawer-user');
    const loginBanner = document.getElementById('login-banner');
    const heroLogin = document.getElementById('hero-cta-login');
    const heroOrder = document.getElementById('hero-cta-order');
    const name = (user && user.name) ? user.name : 'User';
    const initial = name.charAt(0).toUpperCase();

    if (logged) {
      if (btnLogin) btnLogin.style.display = 'none';
      if (btnRegister) btnRegister.style.display = 'none';
      if (userBtn) {
        userBtn.classList.add('visible');
        const av = document.getElementById('user-avatar');
        const nm = document.getElementById('user-name-short');
        if (av) av.textContent = initial;
        if (nm) nm.textContent = name.split(' ')[0];
      }
      if (drawerGuest) drawerGuest.style.display = 'none';
      if (drawerAuth) drawerAuth.style.display = 'block';
      if (drawerUser) {
        drawerUser.style.display = 'flex';
        const dav = document.getElementById('drawer-av');
        const dnm = document.getElementById('drawer-name');
        if (dav) dav.textContent = initial;
        if (dnm) dnm.textContent = name;
      }
      if (loginBanner) loginBanner.style.display = 'none';
      if (heroLogin) heroLogin.style.display = 'none';
      if (heroOrder) heroOrder.style.display = 'inline-flex';
      const scLogin = document.getElementById('services-cta-login');
      const scOrder = document.getElementById('services-cta-order');
      if (scLogin) scLogin.style.display = 'none';
      if (scOrder) scOrder.style.display = 'inline-flex';
      const adminLink = document.getElementById('drawer-admin-link');
      if (adminLink) adminLink.style.display = (user && user.role === 'admin') ? 'flex' : 'none';
      if (hamburger && window.innerWidth > 768) hamburger.style.display = 'flex';
    } else {
      if (btnLogin) btnLogin.style.display = '';
      if (btnRegister) btnRegister.style.display = '';
      if (userBtn) userBtn.classList.remove('visible');
      if (drawerGuest) drawerGuest.style.display = 'block';
      if (drawerAuth) drawerAuth.style.display = 'none';
      if (drawerUser) drawerUser.style.display = 'none';
      if (loginBanner) loginBanner.style.display = '';
      if (heroLogin) heroLogin.style.display = '';
      if (heroOrder) heroOrder.style.display = 'none';
      const scLogin2 = document.getElementById('services-cta-login');
      const scOrder2 = document.getElementById('services-cta-order');
      if (scLogin2) scLogin2.style.display = '';
      if (scOrder2) scOrder2.style.display = 'none';
      const adminLink2 = document.getElementById('drawer-admin-link');
      if (adminLink2) adminLink2.style.display = 'none';
    }
  }

  document.getElementById('btn-logout')?.addEventListener('click', e => {
    e.preventDefault();
    logout();
  });

  document.querySelectorAll('.order-gate').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      if (isLoggedIn()) {
        location.href = 'dashboard.html#order';
      } else {
        location.href = 'login.html';
      }
    });
  });
  // Đã login → đổi href sẵn để không bị đá về login
  if (isLoggedIn()) {
    document.querySelectorAll('.order-gate').forEach(a => {
      a.setAttribute('href', 'dashboard.html#order');
    });
  }

  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!isLoggedIn()) {
        showToast('Vui lòng đăng nhập để đặt hàng!', true);
        setTimeout(() => { location.href = 'login.html'; }, 800);
        return;
      }
      sessionStorage.setItem('hsv_order_service', btn.dataset.service || '');
      location.href = 'dashboard.html#order';
    });
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.pricing-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab)?.classList.add('active');
    });
  });

  document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Đã gửi yêu cầu!');
    e.target.reset();
  });

  // Smooth scroll only for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Force banner video play
  document.querySelectorAll('video.banner-video, #banner-video').forEach(v => {
    v.muted = true;
    const p = v.play();
    if (p && p.catch) p.catch(() => {
      document.addEventListener('touchstart', () => v.play().catch(()=>{}), { once: true });
      document.addEventListener('click', () => v.play().catch(()=>{}), { once: true });
    });
  });

  
  // Banner: show poster if video fails
  document.querySelectorAll('video.banner-video, #banner-video').forEach(v => {
    const showPoster = () => {
      const fb = v.parentElement && v.parentElement.querySelector('.banner-poster-fallback');
      if (fb) { fb.style.display = 'block'; v.style.display = 'none'; }
    };
    v.addEventListener('error', showPoster);
    v.addEventListener('stalled', () => setTimeout(() => { if (v.readyState < 2) showPoster(); }, 2500));
  });

  updateAuthUI();
  let resizeAuthT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeAuthT);
    resizeAuthT = setTimeout(updateAuthUI, 120);
  }, { passive: true });
})();

/* Lightweight page transition */
(function(){
  var fade = document.createElement('div');
  /* page-fade disabled — caused full-screen flash */
  fade.className = 'page-fade'; fade.style.display='none';
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('javascript') || a.target === '_blank') return;
    if (href.indexOf('http') === 0 && href.indexOf(location.host) === -1) return;
    e.preventDefault();
    /* fade disabled */
    setTimeout(function(){ location.href = href; }, 220);
  }, true);
})();


/* Feedback widget + drawer tap */
(function(){
  var fab=document.getElementById('fb-fab');
  var panel=document.getElementById('fb-panel');
  if(fab&&panel){
    var stars=0;
    fab.addEventListener('click',function(){ panel.classList.toggle('open'); });
    var close=document.getElementById('fb-close');
    if(close) close.addEventListener('click',function(){ panel.classList.remove('open'); });
    document.querySelectorAll('#fb-stars button').forEach(function(b){
      b.addEventListener('click',function(){
        stars=+b.getAttribute('data-s')||0;
        document.querySelectorAll('#fb-stars button').forEach(function(x){
          x.classList.toggle('on', +x.getAttribute('data-s')<=stars);
        });
      });
    });
    var send=document.getElementById('fb-send');
    if(send) send.addEventListener('click',function(){
      var text=(document.getElementById('fb-text')||{}).value||'';
      if(!stars){ alert('Chọn số sao'); return; }
      var list=[];
      try{ list=JSON.parse(localStorage.getItem('hsv_feedback')||'[]'); }catch(e){}
      list.unshift({stars:stars,text:text,date:new Date().toISOString()});
      localStorage.setItem('hsv_feedback', JSON.stringify(list.slice(0,50)));
      panel.classList.remove('open');
      if(window.HSV&&HSV.showToast) HSV.showToast('Cảm ơn đánh giá của bạn!');
      else alert('Cảm ơn bạn đã gửi đánh giá!');
      stars=0;
      document.querySelectorAll('#fb-stars button').forEach(function(x){x.classList.remove('on')});
      var ta=document.getElementById('fb-text'); if(ta) ta.value='';
    });
  }
  document.querySelectorAll('.nav-drawer .drawer-link, .nav-drawer a').forEach(function(a){
    a.addEventListener('click',function(){
      a.classList.remove('tap-flash');
      void a.offsetWidth;
      a.classList.add('tap-flash');
    });
  });
})();

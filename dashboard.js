(function () {
  'use strict';
  if (!window.HSV || !HSV.isLoggedIn()) {
    location.href = 'login.html';
    return;
  }

  const user = HSV.getUser() || {};
  const PLAT = {
    facebook: { name: 'Facebook', icon: 'fab fa-facebook-f' },
    tiktok: { name: 'TikTok', icon: 'fab fa-tiktok' },
    instagram: { name: 'Instagram', icon: 'fab fa-instagram' },
    youtube: { name: 'YouTube', icon: 'fab fa-youtube' },
    telegram: { name: 'Telegram', icon: 'fab fa-telegram' },
    spotify: { name: 'Spotify', icon: 'fab fa-spotify' },
    threads: { name: 'Threads', icon: 'fas fa-at' },
    x: { name: 'X – Twitter', icon: 'fab fa-x-twitter' }
  };

  // Detailed server packages — each group has cat for exact filtering
  const SERVERS = {
    facebook: [
      { group: 'Tăng Sub / Theo Dõi', cat: 'follow', items: [
        { id: 'fb_sub1', name: 'Sub Cực VIP (Chạy bằng Link FB)', price: 15, status: 'ok', bh: 'BH 30 Day', hot: true },
        { id: 'fb_sub2', name: 'Sub Sale – Hàng giá rẻ', price: 8, status: 'off', bh: 'BH 7 Day', hot: false },
        { id: 'fb_sub3', name: 'Sub Siêu VIP (HOT)', price: 20, status: 'ok', bh: 'BH 30 Day', hot: true },
        { id: 'fb_sub4', name: 'Sub Via + Avatar đẹp 5k-10k/ngày', price: 35, status: 'ok', bh: 'BH 30 Day', hot: true },
        { id: 'fb_sub5', name: 'Sub Beta tốc độ cao 20k/ngày', price: 45, status: 'ok', bh: 'BH 7 Day', hot: false }
      ]},
      { group: 'Tăng Like Page', cat: 'page', items: [
        { id: 'fb_page1', name: 'Like Page Cực VIP', price: 12, status: 'ok', bh: 'BH 15 Day', hot: true },
        { id: 'fb_page2', name: 'Like Page Sale – Giá rẻ', price: 7, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'fb_page3', name: 'Like Page Siêu VIP (HOT)', price: 18, status: 'ok', bh: 'BH 30 Day', hot: true }
      ]},
      { group: 'Like Cảm Xúc', cat: 'reaction', items: [
        { id: 'fb_react1', name: 'Like Cảm Xúc Cực VIP', price: 6, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'fb_react2', name: 'Like Cảm Xúc Sale', price: 4, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'fb_react3', name: 'Like Cảm Xúc Siêu VIP (HOT)', price: 10, status: 'ok', bh: 'BH 15 Day', hot: true }
      ]},
      { group: 'Tăng Bình Luận', cat: 'comment', items: [
        { id: 'fb_cmt1', name: 'Comment Cực VIP', price: 40, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'fb_cmt2', name: 'Comment Sale – Giá rẻ', price: 25, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'fb_cmt3', name: 'Comment Siêu VIP (HOT)', price: 55, status: 'ok', bh: 'BH 15 Day', hot: true }
      ]},
      { group: 'Thành Viên Nhóm', cat: 'member', items: [
        { id: 'fb_mem1', name: 'Member Group Cực VIP', price: 18, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'fb_mem2', name: 'Member Group Sale', price: 12, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'fb_mem3', name: 'Member Group Siêu VIP (HOT)', price: 28, status: 'ok', bh: 'BH 30 Day', hot: true }
      ]},
      { group: 'Tăng Chia Sẻ', cat: 'share', items: [
        { id: 'fb_share1', name: 'Share Cực VIP (Chạy bằng Link FB)', price: 25, status: 'ok', bh: 'BH 30 Day', hot: true },
        { id: 'fb_share2', name: 'Share Sale – Hàng giá rẻ', price: 15, status: 'off', bh: 'BH 7 Day', hot: false },
        { id: 'fb_share3', name: 'Share Siêu VIP (HOT)', price: 32, status: 'ok', bh: 'BH 30 Day', hot: true },
        { id: 'fb_share4', name: 'Share Via tốc độ cao', price: 40, status: 'ok', bh: 'BH 15 Day', hot: true },
        { id: 'fb_share5', name: 'Share Beta 10k/ngày', price: 48, status: 'ok', bh: 'BH 7 Day', hot: false }
      ]},
      { group: 'Tăng Mắt Live', cat: 'live', items: [
        { id: 'fb_live1', name: 'Mắt Live Cực VIP', price: 50, status: 'ok', bh: 'BH 1 Day', hot: true },
        { id: 'fb_live2', name: 'Mắt Live Sale', price: 35, status: 'ok', bh: 'BH 1 Day', hot: false },
        { id: 'fb_live3', name: 'Mắt Live Siêu VIP (HOT)', price: 70, status: 'ok', bh: 'BH 1 Day', hot: true }
      ]},
      { group: 'View Story', cat: 'story', items: [
        { id: 'fb_story1', name: 'View Story Cực VIP', price: 5, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'fb_story2', name: 'View Story Sale', price: 3, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'fb_story3', name: 'View Story Siêu VIP (HOT)', price: 8, status: 'ok', bh: 'BH 15 Day', hot: true }
      ]},
      { group: 'View Video/Reel', cat: 'reel', items: [
        { id: 'fb_reel1', name: 'View Video/Reel Cực VIP', price: 4, status: 'ok', bh: 'BH 7 Day', hot: true },
        { id: 'fb_reel2', name: 'View Video/Reel Sale', price: 2, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'fb_reel3', name: 'View Video/Reel Siêu VIP (HOT)', price: 6, status: 'ok', bh: 'BH 15 Day', hot: true }
      ]},
      { group: 'Review Page', cat: 'review', items: [
        { id: 'fb_rev1', name: 'Review Page Cực VIP', price: 80, status: 'ok', bh: 'BH 30 Day', hot: false },
        { id: 'fb_rev2', name: 'Review Page Sale', price: 50, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'fb_rev3', name: 'Review Page Siêu VIP (HOT)', price: 100, status: 'ok', bh: 'BH 30 Day', hot: true }
      ]}
    ],
    tiktok: [
      { group: 'Tăng Follow / Sub', cat: 'follow', items: [
        { id: 'tt_sub1', name: 'Sub Cực VIP TikTok', price: 25, status: 'ok', bh: 'BH 30 Day', hot: true },
        { id: 'tt_sub2', name: 'Sub Sale – Hàng giá rẻ', price: 18, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'tt_sub3', name: 'Sub Siêu VIP (HOT)', price: 38, status: 'ok', bh: 'BH 45 Day', hot: true },
        { id: 'tt_sub4', name: 'Sub tốc độ cao 5k-10k/ngày', price: 45, status: 'ok', bh: 'BH 30 Day', hot: false }
      ]},
      { group: 'Tăng Like', cat: 'like', items: [
        { id: 'tt_like1', name: 'Like Cực VIP TikTok', price: 12, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'tt_like2', name: 'Like Sale – Giá rẻ', price: 8, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'tt_like3', name: 'Like Siêu VIP (HOT)', price: 18, status: 'ok', bh: 'BH 30 Day', hot: true },
        { id: 'tt_like4', name: 'Like siêu tốc', price: 22, status: 'ok', bh: 'BH 7 Day', hot: true }
      ]},
      { group: 'Tăng View', cat: 'view', items: [
        { id: 'tt_view1', name: 'View Cực VIP TikTok', price: 2, status: 'ok', bh: 'BH 7 Day', hot: true },
        { id: 'tt_view2', name: 'View Sale – Giá rẻ', price: 1, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'tt_view3', name: 'View Siêu VIP retention (HOT)', price: 4, status: 'ok', bh: 'BH 15 Day', hot: true }
      ]},
      { group: 'Tăng Share / Save', cat: 'share', items: [
        { id: 'tt_share1', name: 'Share Cực VIP TikTok', price: 18, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'tt_share2', name: 'Share Sale – Giá rẻ', price: 12, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'tt_share3', name: 'Share Siêu VIP (HOT)', price: 25, status: 'ok', bh: 'BH 15 Day', hot: true },
        { id: 'tt_save1', name: 'Save Cực VIP TikTok', price: 15, status: 'ok', bh: 'BH 7 Day', hot: false }
      ]}
    ],
    instagram: [
      { group: 'Tăng Follow / Sub', cat: 'follow', items: [
        { id: 'ig_sub1', name: 'Sub Cực VIP Instagram', price: 22, status: 'ok', bh: 'BH 30 Day', hot: true },
        { id: 'ig_sub2', name: 'Sub Sale – Giá rẻ', price: 15, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'ig_sub3', name: 'Sub Siêu VIP ít drop (HOT)', price: 35, status: 'ok', bh: 'BH 60 Day', hot: true }
      ]},
      { group: 'Tăng Like', cat: 'like', items: [
        { id: 'ig_like1', name: 'Like Cực VIP Instagram', price: 10, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'ig_like2', name: 'Like Sale – Giá rẻ', price: 6, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'ig_like3', name: 'Like Siêu VIP Reels (HOT)', price: 14, status: 'ok', bh: 'BH 30 Day', hot: true }
      ]},
      { group: 'Tăng View', cat: 'view', items: [
        { id: 'ig_view1', name: 'View Cực VIP Reels', price: 3, status: 'ok', bh: 'BH 7 Day', hot: true },
        { id: 'ig_view2', name: 'View Sale – Giá rẻ', price: 2, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'ig_view3', name: 'View Story Cực VIP', price: 4, status: 'ok', bh: 'BH 7 Day', hot: false }
      ]}
    ],
    youtube: [
      { group: 'Tăng Sub', cat: 'sub', items: [
        { id: 'yt_sub1', name: 'Sub Cực VIP YouTube', price: 70, status: 'ok', bh: 'BH 90 Day', hot: true },
        { id: 'yt_sub2', name: 'Sub Sale – Giá rẻ', price: 50, status: 'ok', bh: 'BH 30 Day', hot: false },
        { id: 'yt_sub3', name: 'Sub Siêu VIP (HOT)', price: 95, status: 'ok', bh: 'BH 90 Day', hot: true }
      ]},
      { group: 'Tăng View', cat: 'view', items: [
        { id: 'yt_view1', name: 'View Cực VIP YouTube', price: 5, status: 'ok', bh: 'BH 30 Day', hot: false },
        { id: 'yt_view2', name: 'View Sale – Giá rẻ', price: 3, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'yt_view3', name: 'View Siêu VIP retention (HOT)', price: 8, status: 'ok', bh: 'BH 30 Day', hot: true }
      ]},
      { group: 'Tăng Like', cat: 'like', items: [
        { id: 'yt_like1', name: 'Like Cực VIP YouTube', price: 18, status: 'ok', bh: 'BH 30 Day', hot: false },
        { id: 'yt_like2', name: 'Like Sale – Giá rẻ', price: 12, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'yt_like3', name: 'Like Siêu VIP (HOT)', price: 25, status: 'ok', bh: 'BH 30 Day', hot: true }
      ]}
    ],
    telegram: [
      { group: 'Members', cat: 'member', items: [
        { id: 'tg_mem1', name: 'Member Cực VIP Channel/Group', price: 30, status: 'ok', bh: 'BH 30 Day', hot: true },
        { id: 'tg_mem2', name: 'Member Sale – Giá rẻ', price: 20, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'tg_mem3', name: 'Member Siêu VIP (HOT)', price: 42, status: 'ok', bh: 'BH 45 Day', hot: true }
      ]},
      { group: 'Post Views', cat: 'view', items: [
        { id: 'tg_view1', name: 'View Cực VIP Post', price: 4, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'tg_view2', name: 'View Sale – Giá rẻ', price: 2, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'tg_view3', name: 'View Siêu VIP (HOT)', price: 6, status: 'ok', bh: 'BH 15 Day', hot: true }
      ]}
    ],
    spotify: [
      { group: 'Followers', cat: 'follow', items: [
        { id: 'sp_fol1', name: 'Sub Cực VIP Spotify', price: 40, status: 'ok', bh: 'BH 30 Day', hot: false },
        { id: 'sp_fol2', name: 'Sub Sale – Giá rẻ', price: 28, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'sp_fol3', name: 'Sub Siêu VIP (HOT)', price: 55, status: 'ok', bh: 'BH 45 Day', hot: true }
      ]},
      { group: 'Plays', cat: 'play', items: [
        { id: 'sp_play1', name: 'Play Cực VIP', price: 7, status: 'ok', bh: 'BH 7 Day', hot: true },
        { id: 'sp_play2', name: 'Play Sale – Giá rẻ', price: 4, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'sp_play3', name: 'Play Siêu VIP (HOT)', price: 12, status: 'ok', bh: 'BH 15 Day', hot: true }
      ]}
    ],
    threads: [
      { group: 'Followers', cat: 'follow', items: [
        { id: 'th_fol1', name: 'Sub Cực VIP Threads', price: 28, status: 'ok', bh: 'BH 30 Day', hot: true },
        { id: 'th_fol2', name: 'Sub Sale – Giá rẻ', price: 18, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'th_fol3', name: 'Sub Siêu VIP (HOT)', price: 38, status: 'ok', bh: 'BH 45 Day', hot: true }
      ]},
      { group: 'Likes', cat: 'like', items: [
        { id: 'th_like1', name: 'Like Cực VIP Threads', price: 9, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'th_like2', name: 'Like Sale – Giá rẻ', price: 6, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'th_like3', name: 'Like Siêu VIP (HOT)', price: 14, status: 'ok', bh: 'BH 15 Day', hot: true }
      ]}
    ],
    x: [
      { group: 'Followers', cat: 'follow', items: [
        { id: 'x_fol1', name: 'Sub Cực VIP X/Twitter', price: 32, status: 'ok', bh: 'BH 30 Day', hot: true },
        { id: 'x_fol2', name: 'Sub Sale – Giá rẻ', price: 22, status: 'ok', bh: 'BH 15 Day', hot: false },
        { id: 'x_fol3', name: 'Sub Siêu VIP (HOT)', price: 45, status: 'ok', bh: 'BH 45 Day', hot: true }
      ]},
      { group: 'Likes', cat: 'like', items: [
        { id: 'x_like1', name: 'Like Cực VIP Tweet', price: 11, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'x_like2', name: 'Like Sale – Giá rẻ', price: 7, status: 'ok', bh: 'BH 7 Day', hot: false },
        { id: 'x_like3', name: 'Like Siêu VIP (HOT)', price: 16, status: 'ok', bh: 'BH 15 Day', hot: true }
      ]}
    ]
  };



  // Load services from admin (localStorage) or fallback DEFAULT
  function guessCat(group, name) {
    const t = ((group || '') + ' ' + (name || '')).toLowerCase();
    if (/share|chia sẻ/.test(t)) return 'share';
    if (/comment|bình luận/.test(t)) return 'comment';
    if (/member|nhóm|group/.test(t)) return 'member';
    if (/live|mắt live/.test(t)) return 'live';
    if (/story/.test(t)) return 'story';
    if (/reel|video\/reel/.test(t)) return 'reel';
    if (/review/.test(t)) return 'review';
    if (/page|fanpage/.test(t)) return 'page';
    if (/cảm xúc|reaction/.test(t)) return 'reaction';
    if (/\blike\b/.test(t) && !/page/.test(t)) return 'like';
    if (/view|views/.test(t)) return 'view';
    if (/play/.test(t)) return 'play';
    if (/follow|sub|theo dõi|subscriber/.test(t)) return 'follow';
    return 'follow';
  }
  function buildServersFromStorage() {
    try {
      const flat = JSON.parse(localStorage.getItem('hsv_services') || 'null');
      if (!flat || !flat.length) return null;
      const map = {};
      flat.forEach(s => {
        if (!map[s.plat]) map[s.plat] = {};
        const g = s.group || 'Server';
        const cat = s.cat || guessCat(g, s.name);
        const key = g + '||' + cat;
        if (!map[s.plat][key]) map[s.plat][key] = { group: g, cat, items: [] };
        map[s.plat][key].items.push({
          id: s.id, name: s.name, price: s.price,
          status: s.status || 'ok', bh: s.bh || '', hot: !!s.hot
        });
      });
      const out = {};
      Object.keys(map).forEach(plat => {
        out[plat] = Object.values(map[plat]);
      });
      return out;
    } catch (e) { return null; }
  }
  // Only merge admin services if explicitly saved; prefer built-in correct catalog
  const _stored = buildServersFromStorage();
  if (_stored && localStorage.getItem('hsv_services_prefer') === '1') {
    Object.keys(_stored).forEach(k => { SERVERS[k] = _stored[k]; });
  }
  // Clear outdated admin service cache that had wrong Sub names on Share
  // (one-time soft reset of bad cache — keeps orders/balance/users)
  try {
    const flat = JSON.parse(localStorage.getItem('hsv_services') || 'null');
    if (flat && flat.some(s => /share/i.test(s.group||'') && /^Sub /i.test(s.name||''))) {
      localStorage.removeItem('hsv_services');
    }
  } catch (e) {}


  // Ban check
  try {
    const users = JSON.parse(localStorage.getItem('hsv_users') || '[]');
    const cur = HSV.getUser() || {};
    const me = users.find(x => x.name === cur.name || x.email === cur.email);
    if (me && me.status === 'banned') {
      alert('Tài khoản của bạn đã bị cấm. Liên hệ Admin.');
      HSV.logout();
      return;
    }
  } catch (e) {}

  function money(n) { return (Math.round(n) || 0).toLocaleString('vi-VN') + 'đ'; }
  function load(key, def) {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(def)); } catch (e) { return def; }
  }
  function save(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function getBal() {
    const v = localStorage.getItem('hsv_balance');
    // New accounts start at 0 — only set when key exists
    if (v === null) {
      // initialize once per user session key
      const uid = (HSV.getUser() && HSV.getUser().name) || 'guest';
      const flag = 'hsv_bal_init_' + uid;
      if (!localStorage.getItem(flag)) {
        localStorage.setItem('hsv_balance', '0');
        localStorage.setItem(flag, '1');
        return 0;
      }
      return 0;
    }
    return +v;
  }
  function setBal(n) { localStorage.setItem('hsv_balance', String(n)); updateBal(); }

  let profile = Object.assign({ name: user.name || 'User', email: '', phone: '', telegram: '', avatar: '' }, load('hsv_profile', {}));
  let currentPlat = 'facebook';
  let selectedServer = null;

  // No demo orders — new accounts start empty


  function statusBadge(s) {
    const m = { success: 'Hoàn thành', processing: 'Đang chạy', pending: 'Chờ xử lý' };
    return `<span class="status-badge ${s}">${m[s] || s}</span>`;
  }
  function updateBal() {
    const b = getBal();
    ['bal-display', 'stat-bal', 'dep-bal', 'profile-bal'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = money(b);
    });
  }
  function refreshStats() {
    const orders = load('hsv_orders', []);
    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    set('stat-orders', orders.length);
    set('stat-run', orders.filter(o => o.status === 'processing').length);
    set('stat-done', orders.filter(o => o.status === 'success').length);
    set('profile-orders', orders.length);
  }
  function renderTables() {
    const orders = load('hsv_orders', []);
    const recent = document.querySelector('#recent-table tbody');
    if (recent) {
      recent.innerHTML = orders.slice(0, 5).map(o =>
        `<tr><td>${o.id}</td><td>${o.service}</td><td>${o.qty.toLocaleString('vi-VN')}</td><td>${statusBadge(o.status)}</td></tr>`
      ).join('') || '<tr><td colspan="4">Chưa có đơn</td></tr>';
    }
    const f = document.getElementById('hist-filter')?.value || 'all';
    const list = f === 'all' ? orders : orders.filter(o => o.status === f);
    const hist = document.querySelector('#hist-table tbody');
    if (hist) {
      hist.innerHTML = list.map(o =>
        `<tr><td>${o.id}</td><td>${(PLAT[o.platform]||{}).name||o.platform}</td><td>${o.service}</td><td>${o.qty.toLocaleString('vi-VN')}</td><td>${money(o.amount)}</td><td>${statusBadge(o.status)}</td><td>${o.date}</td></tr>`
      ).join('');
    }
    const deps = load('hsv_deposits', []);
    const depBody = document.querySelector('#dep-table tbody');
    if (depBody) {
      depBody.innerHTML = deps.map(d =>
        `<tr><td>${d.id}</td><td>${money(d.amount)}</td><td>${d.method}</td><td>${statusBadge(d.status)}</td><td>${d.date}</td></tr>`
      ).join('') || '<tr><td colspan="5">Chưa có lệnh nạp</td></tr>';
    }
  }

  function calcTotal() {
    const qty = +document.getElementById('order-qty').value || 0;
    const price = selectedServer ? selectedServer.price : 0;
    document.getElementById('total-price').textContent = money(price * qty);
  }

  function renderServers(plat, cat) {
    currentPlat = plat;
    let data = SERVERS[plat] || [];
    // optional category filter by keywords in name
    if (cat) {
      // Match by group.cat field first (accurate), fallback to name rules
      const byCat = data.filter(g => g.cat === cat);
      if (byCat.length) {
        data = byCat;
      } else {
        const alias = {
          follow: ['follow'], sub: ['follow', 'sub'], like: ['like', 'reaction'],
          share: ['share'], view: ['view', 'reel', 'story'], comment: ['comment'],
          page: ['page'], member: ['member'], live: ['live'], reaction: ['reaction'],
          story: ['story'], reel: ['reel'], review: ['review'], play: ['play']
        };
        const cats = alias[cat] || [cat];
        data = data.filter(g => cats.includes(g.cat));
        if (!data.length) data = SERVERS[plat] || [];
      }
    }
    const box = document.getElementById('server-list');
    let html = '';
    let firstOk = null;
    data.forEach(g => {
      html += `<div class="server-group-title"><i class="fas fa-server"></i> ${g.group}</div>`;
      g.items.forEach(item => {
        if (!firstOk && item.status === 'ok') firstOk = item;
        const disabled = item.status !== 'ok';
        html += `<label class="server-item ${disabled ? 'disabled' : ''}" data-id="${item.id}">
          <input type="radio" name="server" value="${item.id}" ${disabled ? 'disabled' : ''}>
          <div class="si-body">
            <div class="si-name">${item.name}</div>
            <div class="si-tags">
              <span class="tag tag-price">${item.price}đ</span>
              <span class="tag ${item.status === 'ok' ? 'tag-ok' : 'tag-off'}">${item.status === 'ok' ? 'Hoạt động' : 'Bảo trì'}</span>
              <span class="tag tag-bh">${item.bh}</span>
              ${item.hot ? '<span class="tag tag-hot">HOT</span>' : ''}
            </div>
          </div>
        </label>`;
      });
    });
    box.innerHTML = html;
    selectedServer = firstOk;
    if (firstOk) {
      const radio = box.querySelector(`input[value="${firstOk.id}"]`);
      if (radio) {
        radio.checked = true;
        radio.closest('.server-item').classList.add('active');
      }
    }
    box.querySelectorAll('.server-item').forEach(el => {
      el.addEventListener('click', () => {
        const input = el.querySelector('input');
        if (!input || input.disabled) return;
        box.querySelectorAll('.server-item').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
        input.checked = true;
        // find item
        for (const g of data) {
          const found = g.items.find(i => i.id === input.value);
          if (found) { selectedServer = found; break; }
        }
        calcTotal();
      });
    });
    const p = PLAT[plat];
    document.getElementById('order-heading').innerHTML = `<i class="${p.icon}"></i> ${p.name} · Đặt dịch vụ`;
    document.getElementById('order-crumb').textContent = `HieuSubViP > ${p.name}`;
    document.querySelectorAll('.svc-menu .svc').forEach(b => b.classList.toggle('active', b.dataset.plat === plat));
    calcTotal();
  }

  // Home platform buttons
  const homePlats = document.getElementById('home-plats');
  if (homePlats) {
    homePlats.innerHTML = Object.keys(PLAT).map(k =>
      `<button type="button" class="plat-q" data-plat="${k}"><i class="${PLAT[k].icon}"></i> ${PLAT[k].name}</button>`
    ).join('');
    homePlats.querySelectorAll('.plat-q').forEach(b => {
      b.addEventListener('click', () => { showView('order'); renderServers(b.dataset.plat); });
    });
  }


  document.getElementById('order-qty')?.addEventListener('input', calcTotal);

  document.getElementById('btn-create-order')?.addEventListener('click', () => {
    if (!selectedServer) { HSV.showToast('Chọn máy chủ còn hoạt động', true); return; }
    const qty = +document.getElementById('order-qty').value;
    if (!qty || qty < 50) { HSV.showToast('Số lượng tối thiểu 50', true); return; }
    const link = document.getElementById('order-link').value.trim();
    if (!link) { HSV.showToast('Vui lòng nhập link / ID', true); return; }
    calcTotal(); const total = window.__orderTotal || (selectedServer.price * qty);
    const bal = getBal();
    if (total > bal) { HSV.showToast('Số dư không đủ! Vui lòng nạp tiền.', true); showView('deposit'); return; }
    setBal(bal - total);
    const orders = load('hsv_orders', []);
    const now = new Date();
    const date = `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
    orders.unshift({
      id: 'HSV' + Date.now().toString().slice(-6),
      platform: currentPlat,
      service: selectedServer.name,
      qty, amount: total, status: 'pending', date, link
    });
    save('hsv_orders', orders);
    refreshStats(); renderTables();
    HSV.showToast('Tạo đơn thành công!');
    document.getElementById('order-link').value = '';
    document.getElementById('order-note').value = '';
  });

  // Views
  const titles = {
    home: ['Tổng quan', ''],
    order: ['Đặt hàng', ''],
    history: ['Lịch sử đơn', ''],
    deposit: ['Nạp tiền', ''],
    profile: ['Hồ sơ', ''],
    support: ['Hỗ trợ', ''],
    invite: ['Mời bạn bè', 'Hoa hồng CTV'],
    rank: ['Cấp bậc', '']
  };
  function showView(name) {
    document.querySelectorAll('.dash-view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + name)?.classList.add('active');
    document.querySelectorAll('.dash-nav-item[data-view]').forEach(b => {
      b.classList.toggle('active', b.dataset.view === name);
    });
    if (name !== 'order') {
      document.querySelectorAll('.svc-menu .svc').forEach(b => b.classList.remove('active'));
    }
    const t = titles[name] || ['Dashboard', ''];
    document.getElementById('view-title').textContent = t[0];
    document.getElementById('view-sub').innerHTML = `Xin chào, <span id="hello-name">${(profile.name || 'User').split(' ')[0]}</span>`;
    closeSide();
    if (name === 'history' || name === 'home') { renderTables(); if (name === 'home') refreshHome(); }
    if (name === 'rank') renderRank();
    if (name === 'invite') { /* static HTML */ }
    if (name === 'deposit') {
      renderPayMethods();
      try {
        const bank = JSON.parse(localStorage.getItem('hsv_bank')||'{}');
        if (bank.stk) {
          const s=document.getElementById('bank-stk'); if(s) s.textContent=bank.stk;
          document.querySelectorAll('.copy-btn[data-copy]').forEach(b=>{ if(b.dataset.copy && b.dataset.copy.match(/^\d+$/)) b.dataset.copy=bank.stk; });
        }
        if (bank.owner) { const o=document.getElementById('bank-owner'); if(o) o.textContent=bank.owner; }
        if (bank.bank) { const n=document.getElementById('bank-name'); if(n) n.textContent=bank.bank; }
        const nd='NAP HSV';
        const ndEl=document.getElementById('bank-nd'); if(ndEl) ndEl.textContent=nd;
        const cnd=document.getElementById('copy-nd'); if(cnd) cnd.dataset.copy=nd;
      } catch(e){}
    }
  }
  document.querySelectorAll('.dash-nav-item[data-view]').forEach(b => {
    b.addEventListener('click', () => showView(b.dataset.view));
  });
  document.querySelectorAll('.link-btn[data-view]').forEach(b => {
    b.addEventListener('click', () => showView(b.dataset.view));
  });


  // ===== 3 cách nạp (admin chỉnh qua hsv_pay_methods) =====
  function defaultPayMethods() {
    return [
      {
        id: 'bank',
        name: 'Chuyển khoản ngân hàng',
        icon: 'fa-university',
        enabled: true,
        bank: 'MB Bank',
        stk: '0123456789990',
        owner: 'TRAN BA HIEU',
        note: 'NAP HSV'
      },
      {
        id: 'momo',
        name: 'Ví MoMo',
        icon: 'fa-wallet',
        enabled: true,
        phone: '0964836058',
        owner: 'TRAN BA HIEU',
        note: 'NAP HSV'
      },
      {
        id: 'card',
        name: 'Thẻ cào / cổng khác',
        icon: 'fa-credit-card',
        enabled: true,
        info: 'Liên hệ Admin để nạp bằng thẻ cào hoặc cổng thanh toán.',
        note: 'IB Admin'
      }
    ];
  }
  function getPayMethods() {
    let m = load('hsv_pay_methods', null);
    if (!m || !Array.isArray(m) || m.length < 3) {
      m = defaultPayMethods();
      save('hsv_pay_methods', m);
    }
    return m;
  }
  let selectedPayId = 'bank';
  function renderPayMethods() {
    const grid = document.getElementById('pay-methods-grid');
    if (!grid) return;
    const methods = getPayMethods().filter(x => x.enabled !== false);
    // Migrate momo phone if still demo
    methods.forEach(m => {
      if (m.id === 'momo' && (m.phone === '0900000000' || !m.phone)) m.phone = '0964836058';
      if (m.note && m.note.indexOf('tên') >= 0) m.note = 'NAP HSV';
    });
    save('hsv_pay_methods', getPayMethods().map(m => {
      if (m.id === 'momo') { m.phone = m.phone === '0900000000' || !m.phone ? '0964836058' : m.phone; }
      if (m.note && String(m.note).indexOf('tên') >= 0) m.note = 'NAP HSV';
      return m;
    }));
    const list = getPayMethods().filter(x => x.enabled !== false);
    grid.innerHTML = list.map(m => {
      const active = m.id === selectedPayId ? 'active' : '';
      let rows = '';
      const u = HSV.getUser() || {};
      const uname = (u.username || u.name || 'USER').toString().replace(/\s+/g, '');
      const napContent = 'NAP HSV ' + uname;
      if (m.id === 'bank' || m.stk) {
        rows = `
          <div class="pay-row"><span class="pay-label">Ngân Hàng :</span><span class="pay-val">${m.bank || '—'}</span></div>
          <div class="pay-row"><span class="pay-label">Số Tài Khoản :</span>
            <span class="pay-val"><b class="pay-mono">${m.stk || '—'}</b> <button type="button" class="copy-btn" data-copy="${m.stk || ''}" aria-label="Copy"><i class="fas fa-copy"></i></button></span>
          </div>
          <div class="pay-row"><span class="pay-label">Chủ Tài Khoản :</span><span class="pay-val">${m.owner || '—'}</span></div>
          <div class="pay-row"><span class="pay-label">Nội Dung Nạp :</span>
            <span class="pay-val"><b class="pay-mono">${napContent}</b> <button type="button" class="copy-btn" data-copy="${napContent}" aria-label="Copy"><i class="fas fa-copy"></i></button></span>
          </div>`;
      } else if (m.id === 'momo' || m.phone) {
        rows = `
          <div class="pay-row"><span class="pay-label">SĐT MoMo :</span>
            <span class="pay-val"><b class="pay-mono">${m.phone || '0964836058'}</b> <button type="button" class="copy-btn" data-copy="${m.phone || '0964836058'}" aria-label="Copy"><i class="fas fa-copy"></i></button></span>
          </div>
          <div class="pay-row"><span class="pay-label">Chủ Ví :</span><span class="pay-val">${m.owner || '—'}</span></div>
          <div class="pay-row"><span class="pay-label">Nội Dung Nạp :</span>
            <span class="pay-val"><b class="pay-mono">${napContent}</b> <button type="button" class="copy-btn" data-copy="${napContent}" aria-label="Copy"><i class="fas fa-copy"></i></button></span>
          </div>`;
      } else {
        rows = `<p class="pay-info">${m.info || m.note || ''}</p>`;
      }
      return `<label class="pay-card ${active}" data-pay="${m.id}">
        <input type="radio" name="pay" value="${m.id}" ${m.id === selectedPayId ? 'checked' : ''} hidden>
        <div class="pay-card-head"><i class="fas ${m.icon || 'fa-wallet'}"></i><strong>${m.name}</strong></div>
        <div class="pay-detail">${rows}</div>
      </label>`;
    }).join('');
    grid.querySelectorAll('.pay-card').forEach(card => {
      card.addEventListener('click', () => {
        selectedPayId = card.dataset.pay;
        grid.querySelectorAll('.pay-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const inp = card.querySelector('input');
        if (inp) inp.checked = true;
      });
    });
    grid.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        navigator.clipboard?.writeText(btn.dataset.copy || '');
        HSV.showToast('Đã copy!');
      });
    });
  }

  // Deposit
  document.querySelectorAll('.amt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.amt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('dep-amount').value = btn.dataset.amt;
    });
  });
  document.querySelectorAll('.pay-m').forEach(l => {
    l.addEventListener('click', () => {
      document.querySelectorAll('.pay-m').forEach(x => x.classList.remove('active'));
      l.classList.add('active');
    });
  });
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => { navigator.clipboard?.writeText(btn.dataset.copy); HSV.showToast('Đã copy!'); });
  });
  document.getElementById('btn-deposit')?.addEventListener('click', () => {
    const amount = +document.getElementById('dep-amount').value;
    if (amount < 10000) { HSV.showToast('Tối thiểu 10.000đ', true); return; }
    const method = document.querySelector('input[name="pay"]:checked')?.value || selectedPayId || 'bank';
    const user = HSV.getUser() || {};
    const deps = load('hsv_deposits', []);
    const now = new Date();
    deps.unshift({
      id: 'NAP' + Date.now().toString().slice(-5),
      amount, method, status: 'pending',
      user: user.username || user.name || 'user',
      date: `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}`
    });
    save('hsv_deposits', deps);
    renderTables();
    const qrBox = document.getElementById('qr-box');
    if (qrBox) {
      qrBox.style.display = 'block';
      const qa = document.getElementById('qr-amount'); if (qa) qa.textContent = money(amount);
      const qc = document.getElementById('qr-content'); if (qc) { const uu=(HSV.getUser()||{}); qc.textContent='NAP HSV '+((uu.username||uu.name||'USER')+'').replace(/\s+/g,''); }
      const qi = document.getElementById('qr-img');
      if (qi) qi.src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent('NAP HSV ' + amount);
    }
    HSV.showToast('Đã tạo lệnh nạp — vui lòng chuyển đúng nội dung!');
  });

  // Profile
  function applyProfile() {
    const name = profile.name || 'User';
    document.getElementById('hello-name').textContent = name.split(' ')[0];
    document.getElementById('profile-display-name').textContent = name;
    const av = document.getElementById('profile-avatar');
    if (profile.avatar) { av.style.backgroundImage = `url(${profile.avatar})`; av.textContent = ''; }
    else { av.style.backgroundImage = ''; av.textContent = name.charAt(0).toUpperCase(); }
    const pfu = document.getElementById('pf-username');
    if (pfu) pfu.value = profile.username || (HSV.getUser()||{}).username || profile.name || '';
    document.getElementById('pf-name').value = profile.name || '';
    const tfa = document.getElementById('pf-2fa');
    const tfaBox = document.getElementById('pf-2fa-box');
    if (tfa) {
      tfa.checked = !!profile.twoFA;
      if (tfaBox) tfaBox.style.display = tfa.checked ? 'block' : 'none';
    }
    document.getElementById('pf-email').value = profile.email || '';
    document.getElementById('pf-phone').value = profile.phone || '';
    document.getElementById('pf-tg').value = profile.telegram || '';
  }
  document.getElementById('avatar-input')?.addEventListener('change', function () {
    const f = this.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { profile.avatar = r.result; save('hsv_profile', profile); applyProfile(); HSV.showToast('Đã cập nhật avatar!'); };
    r.readAsDataURL(f);
  });
  document.getElementById('profile-form')?.addEventListener('submit', e => {
    e.preventDefault();
    profile.name = document.getElementById('pf-name').value.trim() || profile.name;
    profile.email = document.getElementById('pf-email').value.trim();
    profile.phone = document.getElementById('pf-phone').value.trim();
    profile.telegram = document.getElementById('pf-tg').value.trim();
    const tfa = document.getElementById('pf-2fa');
    const pinEl = document.getElementById('pf-2fa-pin');
    if (tfa && tfa.checked) {
      const p = (pinEl && pinEl.value) ? pinEl.value.trim() : (profile.twoFAPin || '');
      if (!/^\d{4,6}$/.test(p)) { HSV.showToast('PIN 2FA phải 4–6 chữ số', true); return; }
      profile.twoFA = true;
      profile.twoFAPin = p;
    } else {
      profile.twoFA = false;
    }
    // avatar giữ nguyên trong profile object
    save('hsv_profile', profile);
    HSV.setUser(Object.assign({}, HSV.getUser() || {}, { name: profile.name, email: profile.email }));
    applyProfile();
    HSV.showToast('Đã lưu hồ sơ!');
  });

  document.getElementById('hist-filter')?.addEventListener('change', renderTables);

  const side = document.getElementById('dash-side');
  const overlay = document.getElementById('dash-overlay');
  function closeSide() { side?.classList.remove('open'); overlay?.classList.remove('show'); }
  document.getElementById('dash-menu')?.addEventListener('click', () => { side.classList.add('open'); overlay.classList.add('show'); });
  overlay?.addEventListener('click', closeSide);
  document.getElementById('dash-logout')?.addEventListener('click', () => HSV.logout());

  // Accordion service menu
  document.querySelectorAll('.svc-parent').forEach(btn => {
    btn.addEventListener('click', () => {
      const plat = btn.dataset.plat;
      const sub = document.getElementById('sub-' + plat);
      const isOpen = btn.classList.contains('open');
      // close others
      document.querySelectorAll('.svc-parent').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.svc-sub').forEach(s => s.classList.remove('open'));
      if (!isOpen) {
        btn.classList.add('open');
        sub && sub.classList.add('open');
      }
    });
  });
  document.querySelectorAll('.svc-sub button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.svc-sub button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showView('order');
      renderServers(btn.dataset.plat, btn.dataset.cat);
      const title = btn.textContent.trim();
      const p = PLAT[btn.dataset.plat];
      document.getElementById('order-heading').innerHTML = `<i class="${p.icon}"></i> ${p.name} · ${title}`;
      document.getElementById('order-crumb').textContent = `HieuSubViP > ${p.name} > ${title}`;
    });
  });

  // Theme
  const themeBtn = document.getElementById('theme-toggle');
  function applyTheme(mode) {
    document.body.classList.toggle('theme-light', mode === 'light');
    if (themeBtn) {
      themeBtn.innerHTML = mode === 'light'
        ? '<i class="fas fa-sun"></i> <span>Sáng</span>'
        : '<i class="fas fa-moon"></i> <span>Tối</span>';
    }
    localStorage.setItem('hsv_theme', mode);
  }
  applyTheme(localStorage.getItem('hsv_theme') || 'dark');
  themeBtn?.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light');
  });

  // (deposit handler above)

  // Rank system
  function getRank() {
    const total = +(localStorage.getItem('hsv_total_deposit') || 0);
    if (total >= 100000000) return {
      name: 'Nhà Phân Phối', discount: 10, next: null, need: 100000000,
      perks: [
        { ok: true,  text: 'Giảm giá dịch vụ' },
        { ok: true,  text: 'Có thể tạo website riêng' },
        { ok: false, text: 'Giao diện trang website riêng' },
        { ok: true,  text: 'Có nhóm chat hỗ trợ 24/7' },
        { ok: true,  text: 'Có các ưu đãi quyền lợi riêng' }
      ]
    };
    if (total >= 10000000) return {
      name: 'Đại Lý', discount: 5, next: 'Nhà Phân Phối', need: 100000000,
      perks: [
        { ok: true,  text: 'Giảm giá dịch vụ' },
        { ok: true,  text: 'Có thể tạo website riêng' },
        { ok: false, text: 'Giao diện trang website riêng' },
        { ok: true,  text: 'Có nhóm chat hỗ trợ 24/7' },
        { ok: true,  text: 'Có các ưu đãi quyền lợi riêng' }
      ]
    };
    if (total >= 500000) return {
      name: 'Cộng Tác Viên', discount: 2, next: 'Đại Lý', need: 10000000,
      perks: [
        { ok: true,  text: 'Giảm giá dịch vụ' },
        { ok: true,  text: 'Có thể tạo website riêng' },
        { ok: false, text: 'Giao diện trang website riêng' },
        { ok: true,  text: 'Có nhóm chat hỗ trợ 24/7' },
        { ok: false, text: 'Có các ưu đãi quyền lợi riêng' }
      ]
    };
    return {
      name: 'Thành viên', discount: 0, next: 'Cộng Tác Viên', need: 500000,
      perks: [
        { ok: false, text: 'Giảm giá dịch vụ' },
        { ok: false, text: 'Có thể tạo website riêng' },
        { ok: false, text: 'Giao diện trang website riêng' },
        { ok: false, text: 'Có nhóm chat hỗ trợ 24/7' },
        { ok: false, text: 'Có các ưu đãi quyền lợi riêng' }
      ]
    };
  }

  function perkIcon(ok) {
    return ok
      ? '<span class="perk-ico perk-yes" title="Có" aria-label="Có"><i class="fas fa-check-circle"></i></span>'
      : '<span class="perk-ico perk-no" title="Không" aria-label="Không"><i class="fas fa-times-circle"></i></span>';
  }

  function renderRank() {
    const el = document.getElementById('rank-box');
    if (!el) return;
    const r = getRank();
    const total = +(localStorage.getItem('hsv_total_deposit') || 0);

    const tiers = [
      {
        name: 'Cộng Tác Viên', need: '500.000đ', key: 'ctv',
        perks: [
          { ok: true,  text: 'Giảm giá dịch vụ' },
          { ok: true,  text: 'Có thể tạo website riêng' },
          { ok: false, text: 'Giao diện trang website riêng' },
          { ok: true,  text: 'Có nhóm chat hỗ trợ 24/7' },
          { ok: false, text: 'Có các ưu đãi quyền lợi riêng' }
        ]
      },
      {
        name: 'Đại Lý', need: '10.000.000đ', key: 'dl',
        perks: [
          { ok: true,  text: 'Giảm giá dịch vụ' },
          { ok: true,  text: 'Có thể tạo website riêng' },
          { ok: false, text: 'Giao diện trang website riêng' },
          { ok: true,  text: 'Có nhóm chat hỗ trợ 24/7' },
          { ok: true,  text: 'Có các ưu đãi quyền lợi riêng' }
        ]
      },
      {
        name: 'Nhà Phân Phối', need: '100.000.000đ', key: 'npp',
        perks: [
          { ok: true,  text: 'Giảm giá dịch vụ' },
          { ok: true,  text: 'Có thể tạo website riêng' },
          { ok: false, text: 'Giao diện trang website riêng' },
          { ok: true,  text: 'Có nhóm chat hỗ trợ 24/7' },
          { ok: true,  text: 'Có các ưu đãi quyền lợi riêng' }
        ]
      }
    ];

    const activeKey = r.name === 'Nhà Phân Phối' ? 'npp' : r.name === 'Đại Lý' ? 'dl' : r.name === 'Cộng Tác Viên' ? 'ctv' : '';

    el.innerHTML = `
      <div class="rank-card">
        <div class="rank-badge">${r.name}</div>
        <p>Tổng đã nạp (đã duyệt): <b>${money(total)}</b></p>
        <p>Giảm giá dịch vụ hiện tại: <b>${r.discount}%</b></p>
      </div>
      <div class="rank-tiers rank-tiers-v2">
        ${tiers.map(t => `
          <div class="rank-tier ${t.key === activeKey ? 'highlight' : ''}">
            <h4>${t.name}</h4>
            <b class="rank-need">${t.need}</b>
            <ul class="perk-list">
              ${t.perks.map(p => `<li class="perk-item"><span class="perk-ico-wrap">${perkIcon(p.ok)}</span><span class="perk-text">${p.text}</span></li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>`;
  }

  // apply discount on order total
  const _calc = calcTotal;
  calcTotal = function() {
    const qty = +document.getElementById('order-qty').value || 0;
    const price = selectedServer ? selectedServer.price : 0;
    const raw = price * qty;
    const rank = getRank();
    const disc = rank.discount || 0;
    const final = Math.round(raw * (1 - disc / 100));
    const el = document.getElementById('total-price');
    if (el) {
      if (disc > 0) el.innerHTML = money(final) + ' <small style="opacity:.85;font-weight:600">(-' + disc + '%)</small>';
      else el.textContent = money(final);
    }
    window.__orderTotal = final;
  };
  // order submit use __orderTotal


  // Patch renderServers to accept category (filter by name keywords)
  const _renderServers = renderServers;
  window.renderServers = renderServers;

  if (location.hash === '#order') { showView('order'); renderServers('facebook'); }
  else if (location.hash === '#history') showView('history');
  else if (location.hash === '#deposit') showView('deposit');
  else if (location.hash === '#profile') showView('profile');
  else if (location.hash === '#invite') showView('invite');

  
  // Home overview stats
  function refreshHome() {
    const bal = getBal();
    const totalIn = +(localStorage.getItem('hsv_total_deposit') || 0);
    const orders = load('hsv_orders', []);
    const totalOut = orders.reduce((s, o) => s + (o.amount || 0), 0);
    const rank = getRank();
    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    set('home-bal', money(bal));
    set('home-rank', rank.name);
    set('home-in', money(totalIn));
    set('home-out', money(totalOut));
    const big = document.getElementById('hello-name-big');
    if (big) big.textContent = (profile.name || 'User').split(' ')[0];

    // Top depositors — ONLY from approved deposits (status success), keyed by user id/name at deposit time
    let tops = [];
    try {
      const deps = load('hsv_deposits', []).filter(d => d.status === 'success' && (d.amount || 0) > 0);
      const map = {};
      deps.forEach(d => {
        const uname = (d.user || '').toLowerCase();
        const uid = (d.userId || '').toLowerCase();
        // Never show Admin on leaderboard
        if (uname === 'admin' || uname === 'admin hieu' || uname.includes('admin') || uid === 'admin' || uid.includes('admin@')) return;
        const key = d.userId || d.user || 'unknown';
        if (!map[key]) map[key] = { name: d.user || key, amount: 0 };
        map[key].amount += (d.amount || 0);
      });
      tops = Object.values(map).filter(t => t.amount > 0).sort((a, b) => b.amount - a.amount).slice(0, 10);
    } catch (e) {}
    if (!tops.length) {
      // Demo vinh danh (không phải số nạp ảo của user thật)
      tops = [
        { name: 'Sơn Tùng MTP', amount: 50000000 },
        { name: 'MoNo', amount: 28000000 },
        { name: 'HIEUTHUHAI', amount: 15000000 }
      ];
    }
    const box = document.getElementById('top-deposit-list');
    if (box) {
      box.innerHTML = tops.map((t, i) => {
        const cls = i === 0 ? 'r1' : i === 1 ? 'r2' : i === 2 ? 'r3' : 'rn';
        // Only show username style with * around
        const raw = (t.name || 'user').replace(/^\*+|\*+$/g, '');
        const display = '*' + raw + '*';
        return `<div class="top-row"><div class="top-rank ${cls}">${i + 1}</div><div class="top-name">${display}</div><div class="top-amt">${money(t.amount)}</div></div>`;
      }).join('');
    }
  }

  // Announcement popup (content editable by Admin)
  (function showAnn() {
    const key = 'hsv_ann_' + new Date().toISOString().slice(0, 10);
    if (localStorage.getItem(key)) return;
    const modal = document.getElementById('ann-modal');
    if (!modal) return;
    // Load custom announcement
    try {
      const ann = JSON.parse(localStorage.getItem('hsv_announcement') || 'null');
      if (ann && ann.html) {
        const body = document.getElementById('ann-body');
        if (body) body.innerHTML = ann.html;
      }
      if (ann && ann.enabled === false) return;
    } catch (e) {}
    modal.classList.add('show');
    const close = () => {
      if (document.getElementById('ann-hide')?.checked) localStorage.setItem(key, '1');
      modal.classList.remove('show');
    };
    document.getElementById('ann-close')?.addEventListener('click', close);
    document.getElementById('ann-ok')?.addEventListener('click', close);
  })();


  document.getElementById('pf-2fa')?.addEventListener('change', function () {
    const box = document.getElementById('pf-2fa-box');
    if (box) box.style.display = this.checked ? 'block' : 'none';
  });
  document.getElementById('btn-invite-ref')?.addEventListener('click', function () {
    const n = document.getElementById('invite-note');
    if (n) n.style.display = 'block';
    HSV.showToast('Hệ thống mời bạn bè đang bảo trì', true);
  });
  renderRank(); applyProfile(); updateBal(); refreshStats(); renderTables(); refreshHome();
})();

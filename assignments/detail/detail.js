/* =============================================================
   detail.js — 作業細節頁（單一 template，由 ?hw= 決定內容）
   位於 assignments/detail/，每個 HW 都有獨立網址：detail/?hw=hw1 … hw6
   返回總覽 → ../；上一個/下一個 → 同頁換 query（?hw=…）。
   內容目前為骨架佔位（sections 的 body 多為空）。
   ============================================================= */
(function () {
  'use strict';

  var mount = document.querySelector('[data-detail]');
  if (!mount) return;

  var list = window.ASSIGNMENTS || [];
  var STATUS = window.STATUS_META || {};

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var params = new URLSearchParams(window.location.search);
  var id = params.get('hw');
  var idx = list.findIndex(function (a) { return a.id === id; });

  // 找不到對應作業 → 友善退回
  if (idx === -1) {
    mount.innerHTML =
      '<div class="detail-head">' +
        '<a class="back-link" href="../">← 返回作業進度</a>' +
        '<h1>找不到這份作業</h1>' +
        '<p class="summary">請從作業進度頁重新選擇。</p>' +
      '</div>';
    return;
  }

  var a = list[idx];
  var st = STATUS[a.status] || { label: a.status, cls: '' };
  document.title = a.code + ' ' + a.title + ' · Group 9';

  var milestone = a.milestone
    ? '<span class="muted" style="font-size:.85rem">· ' + escapeHtml(a.milestone) + '</span>' : '';

  function listHtml(items) {
    return '<ul>' + (items || []).map(function (i) {
      return '<li>' + escapeHtml(i) + '</li>';
    }).join('') + '</ul>';
  }

  // 一個 section 可有：part（大段分隔）、body（段落）、bullets（清單）、
  // groups（小標+清單）、link（外部連結）；內容皆無 → 佔位
  function renderSection(s) {
    var part = s.part ? '<h2 class="detail-part">' + escapeHtml(s.part) + '</h2>' : '';
    var inner = '<h2>' + escapeHtml(s.heading) + '</h2>';
    var hasContent = false;
    if (s.body) { inner += '<p>' + escapeHtml(s.body) + '</p>'; hasContent = true; }
    if (s.bullets && s.bullets.length) { inner += listHtml(s.bullets); hasContent = true; }
    if (s.groups && s.groups.length) {
      s.groups.forEach(function (g) {
        inner += '<h3 class="detail-subhead">' + escapeHtml(g.subheading) + '</h3>' + listHtml(g.items);
      });
      hasContent = true;
    }
    if (s.link && s.link.label) {
      inner += '<p class="detail-link"><a href="' + escapeHtml(s.link.href || '#') + '">' +
        escapeHtml(s.link.label) + ' →</a></p>';
      hasContent = true;
    }
    if (!hasContent) inner += '<div class="placeholder">（內容待補）</div>';
    return part + '<section class="detail-section">' + inner + '</section>';
  }

  var sections = (a.sections || []).map(renderSection).join('');

  // 上一個 / 下一個（同頁換 query）
  function navLink(target, dir) {
    if (!target) return '<span class="disabled">' + (dir === 'prev' ? '← 沒有上一個' : '沒有下一個 →') + '</span>';
    var arrow = dir === 'prev' ? '← ' : '';
    var tail = dir === 'next' ? ' →' : '';
    return '<a href="?hw=' + encodeURIComponent(target.id) + '">' +
      arrow + target.code + '：' + escapeHtml(target.title) + tail + '</a>';
  }

  mount.innerHTML =
    '<div class="detail-head">' +
      '<a class="back-link" href="../">← 返回作業進度</a>' +
      '<span class="detail-code">' + escapeHtml(a.code) + '</span>' +
      '<h1>' + escapeHtml(a.title) + '</h1>' +
      '<div class="detail-meta">' +
        '<span class="tag ' + st.cls + '">' + st.label + '</span>' +
        '<span class="muted">' + escapeHtml(a.titleZh) + '</span>' + milestone +
      '</div>' +
      '<p class="summary">' + escapeHtml(a.summary) + '</p>' +
    '</div>' +
    sections +
    '<nav class="detail-nav">' +
      navLink(list[idx - 1], 'prev') +
      navLink(list[idx + 1], 'next') +
    '</nav>';
})();

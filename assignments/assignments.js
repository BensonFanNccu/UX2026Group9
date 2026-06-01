/* =============================================================
   assignments.js — 作業總覽：把 SCHEDULE 渲染成課程時間軸
   （對照課程進度表：HW 指派 + Due 里程碑交錯）
   HW 卡連到同層的 detail/ template（固定相對路徑）。
   ============================================================= */
(function () {
  'use strict';

  var mount = document.querySelector('[data-timeline]');
  if (!mount) return;

  var schedule = window.SCHEDULE || [];
  var byId = {};
  (window.ASSIGNMENTS || []).forEach(function (a) { byId[a.id] = a; });
  var STATUS = window.STATUS_META || {};

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function dueHtml(ev) {
    var note = ev.note ? '<span class="tl-note">' + escapeHtml(ev.note) + '</span>' : '';
    return '<div class="tl-due">📌 ' + escapeHtml(ev.label) + note + '</div>';
  }

  function hwHtml(ev) {
    var a = byId[ev.hw];
    if (!a) return '';
    var st = STATUS[a.status] || { label: a.status, cls: '' };
    return '' +
      '<a class="tl-hw" href="detail/?hw=' + encodeURIComponent(a.id) + '">' +
        '<div class="tl-hw-top">' +
          '<span class="tl-code">' + escapeHtml(a.code) + '</span>' +
          '<span class="tag ' + st.cls + '">' + st.label + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(a.title) + '</h3>' +
        '<div class="tl-hw-top">' +
          '<span class="tl-hw-zh">' + escapeHtml(a.titleZh) + '</span>' +
          '<span class="tl-arrow">查看細節 →</span>' +
        '</div>' +
      '</a>';
  }

  var html = schedule.map(function (session) {
    var events = session.events || [];
    var inner = events.map(function (ev) {
      return ev.type === 'due' ? dueHtml(ev) : hwHtml(ev);
    }).join('');
    var cls = 'tl-session' + (events.length ? ' has-events' : ' is-empty');
    return '<div class="' + cls + '"><div class="tl-events">' + inner + '</div></div>';
  }).join('');

  mount.innerHTML = html;
})();

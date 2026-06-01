/* =============================================================
   layout.js — 注入全站共用的導覽列與頁尾
   每頁只要：
     <body data-page="home"> … <div data-site-header></div> … <div data-site-footer></div>
   nav/footer 只維護這一份，所有頁面自動同步。
   ============================================================= */
(function () {
  'use strict';

  var page = document.body.getAttribute('data-page') || '';
  var S = window.SITE || { brand: 'UX', nav: [], footer: '' };

  /* ---------- 導覽列 ---------- */
  function renderHeader() {
    var mount = document.querySelector('[data-site-header]');
    if (!mount) return;

    var links = S.nav.map(function (item) {
      var active = item.page === page ? ' aria-current="page" class="is-active"' : '';
      return '<li><a href="' + item.href + '"' + active + '>' + item.label + '</a></li>';
    }).join('');

    mount.innerHTML =
      '<nav class="site-nav container-wide">' +
        '<a class="brand" href="index.html">' + S.brand + '</a>' +
        '<button class="nav-toggle" aria-label="開啟選單" aria-expanded="false">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<div class="nav-menu">' +
          '<ul class="nav-links">' + links + '</ul>' +
          '<a class="btn btn-primary nav-cta" href="' + S.appUrl + '">開啟 App ↗</a>' +
        '</div>' +
      '</nav>';

    // 行動版漢堡選單
    var toggle = mount.querySelector('.nav-toggle');
    var menu = mount.querySelector('.nav-menu');
    toggle.addEventListener('click', function () {
      var open = mount.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // 點選單連結後自動收合
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        mount.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 頁尾 ---------- */
  function renderFooter() {
    var mount = document.querySelector('[data-site-footer]');
    if (!mount) return;
    mount.innerHTML =
      '<div class="container">' +
        '<p>' + S.footer + '</p>' +
        '<a class="to-top" href="#top">回到頂部 ↑</a>' +
      '</div>';
  }

  renderHeader();
  renderFooter();
})();

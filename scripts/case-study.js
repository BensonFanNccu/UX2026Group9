/* =============================================================
   case-study.js — Case Study 頁：依章節自動建立側邊導覽 (TOC) + 捲動高亮
   章節只在 HTML 寫一次（.cs-section[id][data-title]），TOC 由此自動生成，
   避免 TOC 與內文兩份各自維護。
   ============================================================= */
(function () {
  'use strict';

  var tocMount = document.querySelector('[data-cs-toc]');
  var sections = Array.prototype.slice.call(document.querySelectorAll('.cs-section[id]'));
  if (!tocMount || !sections.length) return;

  // 1) 由章節生成 TOC
  var links = {};
  var ul = document.createElement('ul');
  sections.forEach(function (sec) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + sec.id;
    a.textContent = sec.getAttribute('data-title') || sec.id;
    li.appendChild(a);
    ul.appendChild(li);
    links[sec.id] = a;
  });
  tocMount.appendChild(ul);

  // 2) 捲動高亮目前章節
  function setActive(id) {
    Object.keys(links).forEach(function (k) {
      links[k].classList.toggle('is-active', k === id);
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (sec) { observer.observe(sec); });
  }

  setActive(sections[0].id);
})();

/* =============================================================
   data.js — 全站共用資料（單一資料來源）
   以全域變數提供，不用 fetch/模組 → 直接開檔(file://)或 http 都能跑。
   要改作業內容 / 進度，改這裡就好，列表頁、細節頁、時間軸會一起更新。
   ============================================================= */

/* 全站設定：導覽列、頁尾等
   nav/app 的 path 皆為 root-relative（相對站台根），實際 href 由 layout.js
   依各頁 <body data-root> 加上前綴，確保在任何資料夾深度都正確。 */
window.SITE = {
  brand: 'UX · GROUP 9',
  appPath: 'rehab-app/',             // 復健小助手（既有 build 產物，外連）
  nav: [
    { label: '首頁', path: '', page: 'home' },
    { label: '作業進度', path: 'assignments/', page: 'assignments' },
    { label: '期末專案', path: 'final-project/', page: 'final' },
  ],
  footer: '© 2026 UX Design Class · Group 9 · Made with ✨',
};

/* 六個作業（HW #1–#6）— 取自課程進度表
   status：'done' | 'in-progress' | 'upcoming'（佔位，請依實際進度更新）
   sections：細節頁的內容區塊，目前皆為骨架佔位（待填） */
window.ASSIGNMENTS = [
  {
    id: 'hw1',
    code: 'HW #1',
    title: 'CI and Models',
    titleZh: '脈絡訪查與模型',
    summary: '實地觀察與訪談使用者，建立流程、順序、文化等工作模型，找出真實情境中的需求。',
    status: 'done',
    milestone: '分階段繳交：HW #1.1、HW #1.2',
    sections: [
      { heading: '作業目標', body: '' },
      { heading: '研究方法（脈絡訪查）', body: '' },
      { heading: '工作模型（Models）', body: '' },
      { heading: '發現與洞察', body: '' },
    ],
  },
  {
    id: 'hw2',
    code: 'HW #2',
    title: 'Affinity Diagram',
    titleZh: '親和圖',
    summary: '將脈絡訪查蒐集到的質性資料逐筆分群，由下而上歸納出主題與設計洞察。',
    status: 'done',
    milestone: '與 HW #1.2 同期繳交',
    sections: [
      { heading: '作業目標', body: '' },
      { heading: '資料整理與分群', body: '' },
      { heading: '主題與洞察', body: '' },
    ],
  },
  {
    id: 'hw3',
    code: 'HW #3',
    title: 'Personas',
    titleZh: '人物誌',
    summary: '依研究結果建立代表性使用者輪廓，定義目標、痛點與使用情境，作為設計依據。',
    status: 'done',
    milestone: '與 HW #4 同期繳交',
    sections: [
      { heading: '作業目標', body: '' },
      { heading: '人物誌', body: '' },
      { heading: '使用情境', body: '' },
    ],
  },
  {
    id: 'hw4',
    code: 'HW #4',
    title: 'Lo-fi Prototypes',
    titleZh: '低保真原型',
    summary: '以快速草圖與紙上原型驗證資訊架構與核心流程，盡早暴露問題、低成本迭代。',
    status: 'in-progress',
    milestone: '繳交後收集同儕回饋，依回饋擬定修改計畫',
    sections: [
      { heading: '作業目標', body: '' },
      { heading: '低保真原型', body: '' },
      { heading: '同儕回饋與修改計畫', body: '' },
    ],
  },
  {
    id: 'hw5',
    code: 'HW #5',
    title: 'Hi-fi Prototypes',
    titleZh: '高保真原型',
    summary: '製作接近成品的高保真互動原型，確立視覺風格與互動細節（即復健小助手 App）。',
    status: 'upcoming',
    milestone: '',
    sections: [
      { heading: '作業目標', body: '' },
      { heading: '高保真原型', body: '' },
      { heading: '視覺與互動', body: '' },
    ],
  },
  {
    id: 'hw6',
    code: 'HW #6',
    title: 'Heuristic Evaluation',
    titleZh: '啟發式評估',
    summary: '以可用性原則（heuristics）系統性檢視介面，找出可用性問題並提出改善建議。',
    status: 'upcoming',
    milestone: '',
    sections: [
      { heading: '作業目標', body: '' },
      { heading: '評估方法與原則', body: '' },
      { heading: '問題清單與改善建議', body: '' },
    ],
  },
];

/* 課程進度表（時間軸）— 對照圖片逐格還原
   每個 session 是一堂課/一週；events 可含：
     { type:'assign', hw:'hwN', label } 指派作業（可點進細節）
     { type:'due', label, note } 繳交里程碑 */
window.SCHEDULE = [
  { events: [{ type: 'assign', hw: 'hw1', label: 'HW #1: CI and Models' }] },
  { events: [] },
  { events: [
    { type: 'due', label: 'HW #1.1 Due' },
    { type: 'assign', hw: 'hw2', label: 'HW #2: Affinity Diagram' },
  ] },
  { events: [] },
  { events: [
    { type: 'due', label: 'HW #1.2 & HW #2 Due' },
    { type: 'assign', hw: 'hw3', label: 'HW #3: Personas' },
  ] },
  { events: [{ type: 'assign', hw: 'hw4', label: 'HW #4: Lo-fi Prototypes' }] },
  { events: [
    { type: 'due', label: 'HW #3 & HW #4 Due', note: '收集同儕回饋，依回饋擬定修改計畫' },
  ] },
  { events: [{ type: 'assign', hw: 'hw5', label: 'HW #5: Hi-fi Prototypes' }] },
  { events: [] },
  { events: [] },
  { events: [{ type: 'assign', hw: 'hw6', label: 'HW #6: Heuristic Evaluation' }] },
];

/* 狀態標籤對應的中文與樣式 class */
window.STATUS_META = {
  'done': { label: '已完成', cls: 'is-done' },
  'in-progress': { label: '進行中', cls: 'is-progress' },
  'upcoming': { label: '未開始', cls: 'is-upcoming' },
};

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
  footer: '© 2026 User Experience Design Class · Group 9',
};

/* 六個作業（HW #1–#6）— 取自課程進度表
   status：'done' | 'in-progress' | 'upcoming'（佔位，請依實際進度更新）
   sections：細節頁的內容區塊，目前皆為骨架佔位（待填） */
window.ASSIGNMENTS = [
  {
    id: 'hw1',
    code: 'HW #1',
    title: 'Contextual Inquiry',
    titleZh: '情境探究',
    summary: '想做復健相關的 App，但市面上缺乏相似產品，於是我們以與長輩相關的居家運動 App「Tai Chi Workout at Home」為對象，對長輩做 Usability Test 與半結構訪談，找出設計時要避開的痛點。',
    status: 'done',
    milestone: 'HW #1.1：競品篩選 → 訪談問題設計 → 4 位長輩半結構訪談 → CI 報告',
    sections: [
      {
        part: 'HW #1.1 · 訪談設計',
        heading: '作業目標與範圍',
        body: '我們想做的是復健相關的 App，但市面上沒有相似的產品給我們做參考，因此退而求其次，選了與長輩高度相關的太極拳 App 作為研究對象。目標是了解長輩使用這類運動 App 時會遇到哪些不便，作為日後設計復健小助手時修正痛點的依據。',
        bullets: [
          '研究對象：Google Play 的「Tai Chi Workout at Home」',
          '目標族群：身邊 50 歲以上的長輩',
          '方法：Usability Test + 半結構訪談',
          '兩大核心任務：① 設定運動提醒　② 尋找高齡友善的坐姿太極課程',
        ],
      },
      {
        heading: '競品分析與篩選',
        body: '在選定研究對象前，我們先篩選了幾個相關產品：',
        bullets: [
          'AI 復健整合 App（Google Play）：似乎非開放給一般民眾使用，排除。',
          'Medisafe 藥物提醒（App Store）：與長輩運動／復健主題不符，排除。',
          'Tai Chi Workout at Home：最終選擇。課程選擇的設計不錯，但介面有點亂、字有點小——正好適合觀察長輩的操作痛點。',
        ],
      },
      {
        heading: '訪談設計（題目與情境）',
        body: '採半結構訪談，團隊分工為主持、副主持（追問）、錄影、錄音，全程錄音錄影（僅拍手部動作）。共訪談 4 位受訪者。',
        groups: [
          {
            subheading: '兩個情境任務',
            items: [
              '情境一：你原本習慣在晚上八點運動，因此你在下載App時理所當然選了在晚上八點提醒你運動，然而你的醫生建議你在早上運動對身體比較好，你的任務是找到運動提醒的功能，並且把運動提醒設到早上八點。',
              '情境二：你是一位剛開始復健的長輩，醫生建議你做一些溫和的運動，但你不能站太久，所以希望找到「可以坐著做的太極運動」。你的任務是搜尋可以坐著做的太極課程。',
            ],
          },
          {
            subheading: '代表性題目（共 10+ 題）',
            items: [
              '執行任務的流程順不順？哪一步最讓你困惑？',
              '你理想中的運動提醒功能長什麼樣子？',
              '你會從哪裡、依據什麼資訊判斷當前看到的課程適不適合你？',
              'App 有清楚標示哪些課程適合初學者嗎？',
              '3D 假人 vs 真人示範，你偏好哪一種？',
              '廣告頻繁程度、飲食紀錄是否實用？你會使用這個 App 嗎？',
            ],
          },
        ],
      },
      {
        part: 'HW #1.2 · 訪談結果與洞察',
        heading: '訪談執行與逐字稿',
        body: '依設計好的題目與情境，對 4 位長輩進行半結構訪談（含阿公、阿嬤、阿姨等），全程錄音錄影（僅拍手部動作）。以下為代表性金句，完整逐字稿見繳交文件。',
        groups: [
          {
            subheading: '受訪者金句',
            items: [
              '受訪者 1：「不直覺的地方就是因為要用選單，其他部分我也看不出來在哪裡」（功能藏在選單）',
              '受訪者 1：「3D 看起來像機器人；真人演示會比較有感覺」（偏好真人示範）',
              '受訪者 2：「我其實沒看到字，是看到封面圖」「白色字看不清楚」（靠圖不靠字、對比不足）',
              '受訪者 3：「設定時間那邊會搞亂掉」「直接說對老人友善，不然找很麻煩」「這個太小了」（流程繁瑣、畫面太小）',
              '受訪者 4：「藏得太深、太多關，應該在這畫面就能設」「不管點什麼都說要買正式版，這就有影響」（操作太深、付費牆）',
            ],
          },
        ],
        link: { href: 'https://docs.google.com/document/d/1NQ1pcci36FgwSR_GPZ0y8fVqCdNo0qONo75LeqAR3kA/edit', label: '完整逐字稿與 CI 報告（Google 文件）' },
      },
      {
        heading: 'CI 報告：總結',
        body: '本次針對 Tai Chi Workout at Home 的兩大任務（設定運動提醒、尋找高齡友善的坐姿太極課程）做 Usability Test 與半結構訪談。整體而言，產品立意良好，但在「無障礙設計」與「高齡友善」的體驗上仍有相當大的優化空間（細節見下方五大類）。',
      },
      {
        heading: '訪談洞察與發現',
        body: '產品立意良好（輔助復健與運動），但介面與互動流程的不足造成使用體驗有點挫折，痛點集中在操作容錯率低、資訊分類與中文翻譯品質不佳、廣告干擾，以及 3D 人物與附加功能未貼合長輩真實習慣。一共歸納為五大類：',
        groups: [
          {
            subheading: '1. 介面設計與操作流暢度',
            items: [
              '介面／字太小、白字看不清、色調黯淡、未依受眾分流',
              '功能很依賴選單但入口難找；時間設定困難、常常誤觸返回鍵、部分按鈕沒反應',
              '語言：設為中文但課程標題仍是英文、翻譯怪',
            ],
          },
          {
            subheading: '2. 分類與資訊充足程度',
            items: [
              'Beginner／Intermediate、日常／挑戰／level 等分類看不懂',
              '課程縮圖太概念性；人物年齡或性別與自己不符就不想點；希望直接標「高齡友善」',
            ],
          },
          {
            subheading: '3. 影片體驗與視覺呈現',
            items: [
              '3D 假人像機器人、單調，希望改真人示範',
              '希望假人比例更大、做得更好看',
            ],
          },
          {
            subheading: '4. 通知提醒與附加功能',
            items: [
              '單純通知容易被忽略；希望像 Google 日曆能提早預告',
              '飲食紀錄與太極關聯低、每餐設定麻煩，不會認真用',
            ],
          },
          {
            subheading: '5. 商業機制與廣告',
            items: [
              '大量課程需付費，未付費要看廣告才能用',
              '彈出式廣告干擾操作，甚至可能誤導到其他網站',
            ],
          },
        ],
      },
      {
        heading: '對復健小助手的啟發',
        body: '把上述痛點反推成我們復健小助手的設計原則：',
        bullets: [
          '大字體、大畫面、簡化流程，功能別藏進選單——對長輩友善',
          '清楚的分級與「高齡友善／坐姿」標籤，用圖示輔助、少依賴英文',
          '更清楚的動作示範，搭配安全（坐姿、溫和）與禁忌提醒',
          '主動、好懂的引導與提醒；避免廣告與付費牆干擾',
        ],
      },
    ],
  },
  {
    id: 'hw2',
    code: 'HW #2',
    title: 'Affinity Diagram',
    titleZh: '親和圖',
    summary: '將情境探究蒐集到的質性資料逐筆分群，由下而上歸納出主題與設計洞察。',
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
  { events: [{ type: 'assign', hw: 'hw1', label: 'HW #1: CI' }] },
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

const assignments = [
    { title: "User Research", desc: "理解使用者痛點與行為觀測。", status: "Done" },
    { title: "Persona & Journey Map", desc: "建立人物誌與使用者旅程圖。", status: "Done" },
    { title: "Information Architecture", desc: "網站資訊架構與 Sitemap 規劃。", status: "In Progress" },
    { title: "Wireframing", desc: "低保真原型設計與流程梳理。", status: "Upcoming" },
    { title: "Visual Design", desc: "介面視覺風格與 UI 元件定義。", status: "Upcoming" },
    { title: "Usability Testing", desc: "易用性測試與迭代修正。", status: "Upcoming" }
];

const grid = document.getElementById('assignment-grid');

assignments.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="num">ASSIGNMENT 0${index + 1}</div>
        <h3>${task.title}</h3>
        <p style="color: #8E8D8A; font-size: 0.9rem; margin: 1rem 0;">${task.desc}</p>
        <div class="status-tag" style="background: ${task.status === 'Done' ? '#E8F5E9' : '#FFF'}">
            ${task.status}
        </div>
    `;
    grid.appendChild(card);
});
# UX2026Group9 — UX 作品集入口網站 ＋ 復健小助手 App

> 一份就夠的專案說明：結構、開發、部署、雷區、設計決策。**動手前先讀這份。**

組別 UX 作品集（**純靜態多頁網站**，根目錄）＋ 期末專案「**復健小助手**」App（React/Vite，放在 `rehab-app/`），整包部署到 **GitHub Pages**。

**上線網址**
- 入口網站：`https://bensonfannccu.github.io/UX2026Group9/`
- 復健 App：`https://bensonfannccu.github.io/UX2026Group9/rehab-app/`

---

## 專案結構

```
UX2026Group9/
├─ index.html              首頁（根；Pages 入口）
├─ shared/                 共用：base.css · layout.css（nav/footer/hero） · data.js（資料） · layout.js（注入 nav/footer）
├─ home/                   首頁專屬：home.css · home.js
├─ assignments/            作業總覽（時間軸）
│   ├─ index.html · assignments.css · assignments.js
│   └─ detail/             作業細節 template（?hw=hw1…6）：index.html · detail.css · detail.js
├─ final-project/          期末 Case Study：index.html · final-project.css · final-project.js
├─ images/                 作品集圖片素材
│
├─ rehab-app/              ← App build 產物（刻意 commit，Pages 服務這個，勿手改）
├─ rehab-app-src/          ← App 原始碼（要改 App 改這裡；有自己的 .gitignore）
│     └─ src/app/…         React 元件（主畫面 components/AssistantScreen.tsx）
│
├─ .gitignore
└─ README.md               ← 本文件
```

---

## A. 入口網站（作品集，純靜態）

**頁面**（一頁一資料夾，網址乾淨）：`/` 首頁 ·  `/assignments/` 作業時間軸 ·  `/assignments/detail/?hw=hwN` 作業細節 ·  `/final-project/` 期末 Case Study。

**架構（一頁一 css/js，共用抽到 `shared/`）**
- **共用** 全在 `shared/`：`base.css`（token/元件）、`layout.css`（nav/footer/hero/grid）、`data.js`（資料）、`layout.js`（注入 nav/footer）。資料用全域變數、不靠 fetch，`file://` 或 http 都能跑。
- **每頁專屬** 一份 css + 一份 js，與該頁 `index.html` 放同資料夾（如 `assignments/assignments.css`、`assignments/assignments.js`）。
- **深度感知連結**：各頁 `<body data-root="…">` 標出到站台根的相對前綴（根=`""`、`/assignments/`=`"../"`、`/assignments/detail/`=`"../../"`）；`shared/layout.js` 依此組出 nav/CTA 連結，故任何資料夾深度都正確。**新增頁面記得設對 `data-root`。**
- Case Study 章節與作業 **HW #1–#6 一對一對應**。

**改內容**
- 作業名稱 / 進度 `status` / 細節 → 改 `shared/data.js`（`status` 目前是佔位，請依實際更新）。
- Case Study 各章內容 → 改 `final-project/index.html`（目前為佔位骨架）。
- 圖片 → 放 `images/`，用**相對路徑**引用、加 `loading="lazy"`。

**本機預覽**（純靜態，不需 build）
```powershell
python -m http.server 8099 --directory "C:\Users\Benson\Desktop\Projects\UX2026Group9"
# 開 http://localhost:8099/
```

---

## B. 復健小助手 App（React/Vite）

**本機開發**
```powershell
cd "C:\Users\Benson\Desktop\Projects\UX2026Group9\rehab-app-src"
npm install      # 第一次才需要
npm run dev
```
> ⚠️ **dev 網址含 base 路徑**：因 `vite.config.ts` 設了 `base`，dev 是
> **`http://localhost:5173/UX2026Group9/rehab-app/`**，開根目錄會空白/404。

**部署流程（改完 App 一定要做）** — Pages 服務的是 build 產物 `rehab-app/`，不是原始碼：
```powershell
# 1. 重新 build（重新產生 rehab-app/）
npm --prefix "C:\Users\Benson\Desktop\Projects\UX2026Group9\rehab-app-src" run build
# 2. commit + push
git -C "C:\Users\Benson\Desktop\Projects\UX2026Group9" add -A
git -C "C:\Users\Benson\Desktop\Projects\UX2026Group9" commit -m "更新復健 App"
git -C "C:\Users\Benson\Desktop\Projects\UX2026Group9" push
```
> **忘記 build 就 push → 網站不會更新**（最常見的坑）。

**驗證 build（可選，要在正確子路徑下測）**
```powershell
python -m http.server 8080 --directory "C:\Users\Benson\Desktop\Projects"
# 開 http://localhost:8080/UX2026Group9/rehab-app/
```

---

## C. 部署（GitHub Pages）

- Pages 設定：repo **Settings → Pages → Deploy from a branch → `main` / `(root)` → Save**。
- **入口網站**純靜態：`git push` 完等 ~1 分鐘自動更新。
- **App**：改完**一定要先 build** 再 commit/push。
- push 提醒：這是**共用組別 repo**，會影響組員。

---

## D. 關鍵設定與雷區

| 項目 | 內容 / 注意 |
|---|---|
| 入口網站連結 | **一律相對路徑**（`assignments.html`、`./rehab-app/`），**不要 `/` 開頭**。線上是子路徑，絕對路徑會 404。 |
| `vite.config.ts` → `base` | `'/UX2026Group9/rehab-app/'`，**必須對應 repo 名稱**。repo 改名要同步改，否則 Pages 資源全 404。 |
| `vite.config.ts` → `build.outDir` | `'../rehab-app'`（直接輸出給 Pages 服務），搭配 `emptyOutDir: true`。 |
| 路由 = `HashRouter`（`src/app/App.tsx`） | Pages 沒有 SPA 後備路由，用 hash (`#`) 才不會在重新整理/深層網址 404。**不要改回 BrowserRouter。** |
| `rehab-app/` 進 git | build 產物但**刻意 commit**（Pages 才服務得到），不是誤加。 |
| `node_modules` | 由 `rehab-app-src/.gitignore` 忽略；根 `.gitignore` 也再保險一次。 |
| 不要加根目錄 `.gitattributes` | 會把組員檔案重新正規化換行、造成大量無意義 diff。 |

---

## E. 設計決策紀錄（避免下個 session「改回去」）

- **身體圖上的藍色按鈕是刻意做成「不透明實心、蓋住底圖標籤」的**（`AssistantScreen.tsx` 的 `bodyParts` 陣列 + 兩個 `<button>` 區塊）。
  - 原因：標籤框（圓角框＋文字）是**燒進背景圖**（`src/imports/image-1.png` 正面、`image-2.png` 背面）裡的。早期試過「透明＋黑框」要跟印刷框邊對邊對齊，差幾 px 就露餡、很脆弱。改成不透明實心按鈕「蓋住」底圖標籤後，對齊誤差就看不見了。
  - 按鈕位置/尺寸是從 PNG 像素量出來的；要微調改 `bodyParts` 裡各項的 `box`（top/left/width/height，皆為百分比）。
  - 顏色為醫療藍 `#0066cc`（與 App 品牌一致），在兩個 `<button>` 的 className 裡。

---

## F. 其他 / 待辦

- **原始 Figma Make 專案**在 `C:\Users\Benson\Desktop\Projects\Medical Rehabilitation App Design`（自有獨立 git）。`rehab-app-src/` 是它的乾淨副本（`git archive` 取出，不含 .git/node_modules）。「弄回 Figma Make」這條路已放棄。
- **待辦**：填 Case Study 各章內容與圖、補 `images/` 素材、更新 `scripts/data.js` 的作業 `status`、（可選）作業細節頁的實際產出。
- **可選進階**：未來改用 GitHub Actions 自動 build + 部署（Pages 來源改成 GitHub Actions）。目前「commit build 產物 + branch 部署」最簡單穩定。
```


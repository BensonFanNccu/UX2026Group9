import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import bodyImageFront from "../../imports/image-1.png";
import bodyImageBack from "../../imports/image-2.png";

interface BodyPart {
  id: string;
  name: string;
  image: "front" | "back";
  // 不透明點擊框，蓋住底圖已印好的標籤（百分比定位，不隨縮放跑掉）
  box: { top: string; left: string; width: string; height: string };
}

// 與 AssistantScreen 相同的部位座標（同一張模板量出來的）
const bodyParts: BodyPart[] = [
  { id: "shoulder", name: "肩膀", image: "front", box: { top: "8.6%", left: "6.3%", width: "36.3%", height: "11.7%" } },
  { id: "arm", name: "手臂", image: "front", box: { top: "23%", left: "6.3%", width: "36.3%", height: "11.7%" } },
  { id: "wrist", name: "手部", image: "front", box: { top: "38.6%", left: "6.3%", width: "36.3%", height: "11.7%" } },
  { id: "thigh", name: "大腿", image: "front", box: { top: "55.3%", left: "6.3%", width: "36.3%", height: "11.7%" } },
  { id: "knee", name: "膝蓋", image: "front", box: { top: "69.7%", left: "6.3%", width: "36.3%", height: "11.7%" } },
  { id: "ankle", name: "腳踝/腳", image: "front", box: { top: "84.3%", left: "6.3%", width: "36.3%", height: "11.7%" } },
  { id: "neck", name: "頸部", image: "back", box: { top: "8.6%", left: "58.8%", width: "37.4%", height: "11.9%" } },
  { id: "chest", name: "背部", image: "back", box: { top: "24.4%", left: "58.8%", width: "37.4%", height: "11.9%" } },
  { id: "core", name: "腰部", image: "back", box: { top: "40%", left: "58.8%", width: "37.4%", height: "11.9%" } },
  { id: "hip", name: "臀部", image: "back", box: { top: "55.3%", left: "58.8%", width: "37.4%", height: "11.9%" } },
  { id: "calf", name: "小腿", image: "back", box: { top: "75.1%", left: "58.8%", width: "37.4%", height: "11.9%" } },
];

// 部位 → 現有運動資料分類（與 AssistantScreen 的推薦對應一致，確保每個部位都連得到運動）
const PART_TO_DATA: Record<string, string> = {
  neck: "neck",
  shoulder: "shoulder",
  arm: "arm",
  wrist: "arm",
  chest: "chest",
  core: "core",
  thigh: "ankle",
  knee: "ankle",
  ankle: "ankle",
  hip: "core",
  calf: "ankle",
};

export function BodySelector() {
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    navigate(`/exercises/${PART_TO_DATA[id] || id}`);
  };

  const renderButtons = (image: "front" | "back") =>
    bodyParts
      .filter((part) => part.image === image)
      .map((part) => (
        <button
          key={part.id}
          onClick={() => handleSelect(part.id)}
          className="absolute flex items-center justify-center bg-[#0066cc] text-white text-sm font-bold rounded-2xl shadow-md hover:bg-[#0052a3] active:scale-95 transition-all"
          style={{ top: part.box.top, left: part.box.left, width: part.box.width, height: part.box.height }}
        >
          {part.name}
        </button>
      ));

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-[480px] mx-auto">
      {/* 安全提醒欄 */}
      <div className="bg-[#fff8e1] border-b border-[#ffa000] px-4 py-1.5 flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#ffa000] flex-shrink-0" />
          <p className="text-[11px] leading-tight text-gray-800">
            <strong>提醒：</strong>⚠️ 安全提醒：跟著做如果覺得「越來越痛」或「關節熱痛」，請馬上停下來休息喔！
          </p>
        </div>
      </div>

      {/* 主內容 */}
      <div className="flex-1 px-4 py-4">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-[#1976d2] font-medium active:scale-95 mb-3"
        >
          ← 回到主頁
        </button>

        <div className="text-center mb-4">
          <h2 className="font-bold text-lg text-[#1976d2] mb-0.5">物理治療與居家復健</h2>
          <p className="text-xs text-gray-500">請點選身體部位查看運動</p>
        </div>

        {/* 真人體圖（正面 / 背面），點部位即查看該部位運動 */}
        <div className="bg-blue-50 rounded-xl p-4 space-y-4">
          <div className="relative w-full max-w-[320px] mx-auto">
            <img src={bodyImageFront} alt="人體正面示意圖" className="w-full h-auto" />
            {renderButtons("front")}
          </div>
          <div className="relative w-full max-w-[320px] mx-auto">
            <img src={bodyImageBack} alt="人體背面示意圖" className="w-full h-auto" />
            {renderButtons("back")}
          </div>
        </div>
      </div>
    </div>
  );
}

import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";

interface BodyPart {
  id: string;
  name: string;
  position: { top: string; left: string };
}

const bodyParts: BodyPart[] = [
  {
    id: "neck",
    name: "頭部與頸部",
    position: { top: "8%", left: "50%" },
  },
  {
    id: "shoulder",
    name: "肩膀",
    position: { top: "18%", left: "72%" },
  },
  {
    id: "chest",
    name: "胸部與上背",
    position: { top: "25%", left: "50%" },
  },
  {
    id: "arm",
    name: "手肘與手腕",
    position: { top: "35%", left: "75%" },
  },
  {
    id: "core",
    name: "核心與下背",
    position: { top: "42%", left: "50%" },
  },
  {
    id: "hip",
    name: "髖部與大腿",
    position: { top: "55%", left: "50%" },
  },
  {
    id: "knee",
    name: "膝蓋",
    position: { top: "68%", left: "50%" },
  },
  {
    id: "ankle",
    name: "小腿與腳踝",
    position: { top: "82%", left: "50%" },
  },
];

export function BodySelector() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white flex flex-col max-w-[480px] mx-auto overflow-hidden">
      {/* 緊湊型警示欄 */}
      <div className="bg-[#fff8e1] border-b border-[#ffa000] px-4 py-1.5 flex-shrink-0">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#ffa000] flex-shrink-0" />
          <p className="text-[11px] leading-tight text-gray-800">
            <strong>提醒：</strong>⚠️ 安全提醒：跟著做如果覺得「越來越痛」或「關節熱痛」，請馬上停下來休息喔！
          </p>
        </div>
      </div>

      {/* 主內容區 */}
      <div className="flex-1 flex flex-col px-4 py-4 overflow-hidden">
        {/* 上一頁按鈕 */}
        <div className="flex-shrink-0 mb-2">
          <button
            onClick={() => navigate("/home")}
            className="text-sm text-[#1976d2] font-medium active:scale-95"
          >
            ← 回到主頁
          </button>
        </div>

        <div className="text-center flex-shrink-0">
          <h2 className="font-bold text-lg text-[#1976d2] mb-0.5">
            物理治療與居家復健
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            請點擊部位查看運動
          </p>
        </div>

        {/* 人體圖容器 - 使用 flex-1 自動調整高度 */}
        <div className="relative w-full max-w-[300px] mx-auto flex-1 max-h-[60vh]">
          <svg
            viewBox="0 0 300 600"
            className="w-full h-full object-contain drop-shadow-md"
          >
            <ellipse
              cx="150"
              cy="50"
              rx="35"
              ry="40"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <rect
              x="135"
              y="85"
              width="30"
              height="25"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <ellipse
              cx="100"
              cy="120"
              rx="25"
              ry="20"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <ellipse
              cx="200"
              cy="120"
              rx="25"
              ry="20"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <rect
              x="120"
              y="110"
              width="60"
              height="100"
              rx="10"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <rect
              x="70"
              y="130"
              width="20"
              height="80"
              rx="8"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <rect
              x="210"
              y="130"
              width="20"
              height="80"
              rx="8"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <ellipse
              cx="135"
              cy="230"
              rx="30"
              ry="25"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <ellipse
              cx="165"
              cy="230"
              rx="30"
              ry="25"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <rect
              x="120"
              y="245"
              width="25"
              height="90"
              rx="8"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <rect
              x="155"
              y="245"
              width="25"
              height="90"
              rx="8"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <ellipse
              cx="132"
              cy="355"
              rx="15"
              ry="18"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <ellipse
              cx="168"
              cy="355"
              rx="15"
              ry="18"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <rect
              x="122"
              y="365"
              width="20"
              height="80"
              rx="8"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <rect
              x="158"
              y="365"
              width="20"
              height="80"
              rx="8"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <ellipse
              cx="132"
              cy="465"
              rx="18"
              ry="12"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
            <ellipse
              cx="168"
              cy="465"
              rx="18"
              ry="12"
              fill="#e3f2fd"
              stroke="#90caf9"
              strokeWidth="2"
            />
          </svg>

          {bodyParts.map((part) => (
            <button
              key={part.id}
              onClick={() => navigate(`/exercises/${part.id}`)}
              className="absolute -translate-x-1/2 -translate-y-1/2 bg-[#1976d2] text-white px-2.5 py-1.5 rounded-full shadow-md active:scale-95 whitespace-nowrap text-[12px] font-medium"
              style={{
                top: part.position.top,
                left: part.position.left,
              }}
            >
              {part.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
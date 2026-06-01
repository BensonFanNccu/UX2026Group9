import { Heart, MessageCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router';

export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--medical-blue-light)] to-white flex flex-col max-w-[480px] mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Logo/Icon Area */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-[var(--medical-blue)] rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-14 h-14 text-white" fill="white" />
          </div>
        </div>

        {/* Welcome Text - 加大字體 */}
        <h1 className="text-center mb-2 text-[var(--medical-blue)] text-3xl font-bold">
          歡迎使用
        </h1>
        <h2 className="text-center mb-4 text-[var(--medical-blue)] text-2xl">
          居家復健系統
        </h2>

        <p className="text-center text-gray-700 mb-12 max-w-sm text-base leading-relaxed font-medium">
          專業的復健運動指導<br />幫助您安全恢復健康
        </p>

        {/* 兩個核心功能按鈕 - 加大尺寸和字體 */}
        <div className="w-full max-w-sm space-y-4 mb-8">
          {/* AI 智慧推薦按鈕 */}
          <button
            onClick={() => navigate('/assistant')}
            className="w-full bg-[var(--medical-blue)] text-white rounded-2xl p-6 shadow-lg active:scale-95 transition-all border-4 border-[var(--medical-blue)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-9 h-9 text-[var(--medical-blue)]" />
              </div>
              <div className="text-left flex-1">
                <p className="text-xl font-bold mb-1">AI 智慧推薦</p>
                <p className="text-sm opacity-90">告訴我您哪裡不舒服</p>
              </div>
            </div>
          </button>

          {/* 依部位尋找按鈕 */}
          <button
            onClick={() => navigate('/exercises')}
            className="w-full bg-white text-[var(--medical-blue)] rounded-2xl p-6 shadow-lg active:scale-95 transition-all border-4 border-[var(--medical-blue)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[var(--medical-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-9 h-9 text-white" />
              </div>
              <div className="text-left flex-1">
                <p className="text-xl font-bold mb-1">依部位尋找</p>
                <p className="text-sm opacity-75">點選身體部位查看運動</p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer Note - 加大字體 */}
        <p className="text-sm text-gray-600 text-center max-w-sm font-medium">
          ⚠️ 本系統僅供參考<br />如有疑問請諮詢專業醫療人員
        </p>
      </div>
    </div>
  );
}

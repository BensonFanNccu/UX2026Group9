import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Send, Bot, AlertTriangle, Play, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import bodyImageFront from '../../imports/image-1.png';
import bodyImageBack from '../../imports/image-2.png';

type PainLevel = 'none' | 'mild' | 'moderate' | 'severe';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  showBodyMap?: boolean;
  showPainScale?: boolean;
  showExercises?: ExerciseRecommendation[];
  selectedPart?: string;
  painLevel?: PainLevel;
  isWarning?: boolean;
}

interface ExerciseRecommendation {
  id: string;
  bodyPartId: string;
  bodyPartName: string;
  exerciseName: string;
  difficulty: string;
  reason: string;
  exerciseIndex: number;
}

interface BodyPart {
  id: string;
  name: string;
  image: 'front' | 'back';
  // 透明點擊框，對齊圖片中已印好的標籤（百分比定位，不隨縮放跑掉）
  box: { top: string; left: string; width: string; height: string };
}

const bodyParts: BodyPart[] = [
  // 深色實心按鈕：比圖中印好的標籤框「略大」，直接蓋住它（不透明 → 對齊差幾 px 也看不出來）
  // 第一張圖（正面）- 左側標籤
  { id: 'shoulder', name: '肩膀', image: 'front', box: { top: '8.6%',  left: '6.3%', width: '36.3%', height: '11.7%' } },
  { id: 'arm',      name: '手臂', image: 'front', box: { top: '23%',   left: '6.3%', width: '36.3%', height: '11.7%' } },
  { id: 'wrist',    name: '手部', image: 'front', box: { top: '38.6%', left: '6.3%', width: '36.3%', height: '11.7%' } },
  { id: 'thigh',    name: '大腿', image: 'front', box: { top: '55.3%', left: '6.3%', width: '36.3%', height: '11.7%' } },
  { id: 'knee',     name: '膝蓋', image: 'front', box: { top: '69.7%', left: '6.3%', width: '36.3%', height: '11.7%' } },
  { id: 'ankle',    name: '腳踝/腳', image: 'front', box: { top: '84.3%', left: '6.3%', width: '36.3%', height: '11.7%' } },

  // 第二張圖（背面）- 右側標籤
  { id: 'neck',  name: '頸部', image: 'back', box: { top: '8.6%',  left: '58.8%', width: '37.4%', height: '11.9%' } },
  { id: 'chest', name: '背部', image: 'back', box: { top: '24.4%', left: '58.8%', width: '37.4%', height: '11.9%' } },
  { id: 'core',  name: '腰部', image: 'back', box: { top: '40%',   left: '58.8%', width: '37.4%', height: '11.9%' } },
  { id: 'hip',   name: '臀部', image: 'back', box: { top: '55.3%', left: '58.8%', width: '37.4%', height: '11.9%' } },
  { id: 'calf',  name: '小腿', image: 'back', box: { top: '75.1%', left: '58.8%', width: '37.4%', height: '11.9%' } },
];

const painLevels: { value: PainLevel; label: string; description: string; color: string }[] = [
  { value: 'mild', label: '輕微疼痛', description: '有點不舒服，可以忍受', color: 'bg-yellow-100 border-yellow-400 text-yellow-800' },
  { value: 'moderate', label: '明顯疼痛', description: '很不舒服，影響活動', color: 'bg-orange-100 border-orange-400 text-orange-800' },
  { value: 'severe', label: '非常劇痛', description: '痛到無法忍受', color: 'bg-red-100 border-red-500 text-red-800' },
];

// 根據部位獲取推薦運動
function getExerciseRecommendations(bodyPartId: string, painLevel: PainLevel): ExerciseRecommendation[] {
  const exerciseMap: Record<string, ExerciseRecommendation[]> = {
    neck: [
      {
        id: 'neck-1',
        bodyPartId: 'neck',
        bodyPartName: '頸部',
        exerciseName: '縮下巴運動',
        difficulty: '初級',
        reason: '改善頸部僵硬和烏龜頸姿勢',
        exerciseIndex: 0
      }
    ],
    shoulder: [
      {
        id: 'shoulder-1',
        bodyPartId: 'shoulder',
        bodyPartName: '肩膀',
        exerciseName: '鐘擺運動',
        difficulty: '初期/疼痛管理',
        reason: '緩解肩膀疼痛和僵硬',
        exerciseIndex: 0
      }
    ],
    arm: [
      {
        id: 'arm-1',
        bodyPartId: 'arm',
        bodyPartName: '手臂',
        exerciseName: '手腕伸展（手心朝下）',
        difficulty: '初級',
        reason: '改善網球肘和手臂僵硬',
        exerciseIndex: 0
      }
    ],
    wrist: [
      {
        id: 'wrist-1',
        bodyPartId: 'arm',
        bodyPartName: '手部',
        exerciseName: '手腕伸展（手心朝下）',
        difficulty: '初級',
        reason: '改善手腕疼痛和滑鼠手症狀',
        exerciseIndex: 0
      }
    ],
    chest: [
      {
        id: 'chest-1',
        bodyPartId: 'chest',
        bodyPartName: '背部',
        exerciseName: '胸肌伸展（門框伸展）',
        difficulty: '初級',
        reason: '改善圓肩駝背，打開胸腔',
        exerciseIndex: 0
      }
    ],
    core: [
      {
        id: 'core-1',
        bodyPartId: 'core',
        bodyPartName: '腰部',
        exerciseName: '骨盆後傾',
        difficulty: '初級',
        reason: '強化核心肌群，緩解下背疼痛',
        exerciseIndex: 0
      }
    ],
    thigh: [
      {
        id: 'thigh-1',
        bodyPartId: 'ankle',
        bodyPartName: '大腿',
        exerciseName: '小腿伸展',
        difficulty: '初級',
        reason: '改善大腿緊繃，增加靈活度',
        exerciseIndex: 0
      }
    ],
    knee: [
      {
        id: 'knee-1',
        bodyPartId: 'ankle',
        bodyPartName: '膝蓋',
        exerciseName: '小腿伸展',
        difficulty: '初級',
        reason: '改善膝蓋周圍肌肉緊繃',
        exerciseIndex: 0
      }
    ],
    ankle: [
      {
        id: 'ankle-1',
        bodyPartId: 'ankle',
        bodyPartName: '腳踝/腳',
        exerciseName: '小腿伸展',
        difficulty: '初級',
        reason: '改善小腿緊繃，增加踝關節活動度',
        exerciseIndex: 0
      }
    ],
    hip: [
      {
        id: 'hip-1',
        bodyPartId: 'core',
        bodyPartName: '臀部',
        exerciseName: '骨盆後傾',
        difficulty: '初級',
        reason: '緩解臀部和下背疼痛',
        exerciseIndex: 0
      }
    ],
    calf: [
      {
        id: 'calf-1',
        bodyPartId: 'ankle',
        bodyPartName: '小腿',
        exerciseName: '小腿伸展',
        difficulty: '初級',
        reason: '改善小腿緊繃和疲勞',
        exerciseIndex: 0
      }
    ]
  };

  return exerciseMap[bodyPartId] || [];
}

export function AssistantScreen() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '您好！我是復健小助手 👋\n\n請點選下方身體圖，告訴我哪個部位不舒服',
      showBodyMap: true
    }
  ]);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleBodyPartSelect = (partId: string) => {
    const part = bodyParts.find(p => p.id === partId);
    if (!part) return;

    setSelectedPart(partId);

    const userMessage: Message = {
      role: 'user',
      content: `我的${part.name}不舒服`,
      selectedPart: partId
    };

    const assistantMessage: Message = {
      role: 'assistant',
      content: `好的，我了解您的${part.name}不舒服。\n\n請選擇您的疼痛程度：`,
      showPainScale: true
    };

    setMessages([...messages, userMessage, assistantMessage]);
  };

  const handlePainLevelSelect = (level: PainLevel) => {
    const painInfo = painLevels.find(p => p.value === level);
    if (!painInfo || !selectedPart) return;

    const userMessage: Message = {
      role: 'user',
      content: painInfo.label,
      painLevel: level
    };

    // 如果是劇痛，只顯示警告，不推薦運動
    if (level === 'severe') {
      const warningMessage: Message = {
        role: 'assistant',
        content: '⚠️ 緊急警告\n\n您的疼痛程度非常高，這可能是嚴重問題的徵兆。\n\n請您立即：\n\n1. 停止所有運動和活動\n2. 盡快就醫尋求專業醫療協助\n3. 不建議在此疼痛程度下進行任何居家復健\n\n請在疼痛緩解並經醫師評估後，再使用本系統。',
        isWarning: true
      };

      setMessages([...messages, userMessage, warningMessage]);
    } else {
      // 一般疼痛，直接推薦運動
      const exercises = getExerciseRecommendations(selectedPart, level);
      const recommendMessage: Message = {
        role: 'assistant',
        content: `很好！根據您的${bodyParts.find(p => p.id === selectedPart)?.name}${painInfo.label}情況，\n\n助理為您規劃了以下專屬運動：`,
        showExercises: exercises
      };

      setMessages([...messages, userMessage, recommendMessage]);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputText
    };

    const assistantMessage: Message = {
      role: 'assistant',
      content: '感謝您的提問！\n\n如需重新評估，請點選下方身體圖選擇部位：',
      showBodyMap: true
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInputText('');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col max-w-[480px] mx-auto overflow-hidden relative">
      {/* 錄音遮罩層 */}
      <AnimatePresence>
        {isRecording && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleRecording}
              className="fixed inset-0 bg-black/60 z-30 cursor-pointer"
            />

            {/* 聲波動畫 - 定位在輸入框上方 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
            >
              <div className="flex items-center justify-center gap-1.5 h-24">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-white rounded-full"
                    animate={{
                      height: ['20px', '60px', '20px'],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
              <p className="text-white text-center mt-4 font-bold text-lg">正在聆聽...</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sticky 安全提醒欄 */}
      <div className="bg-[#fff8e1] border-b-2 border-[#ffa000] px-4 py-2.5 flex-shrink-0 sticky top-0 z-20">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-[#ffa000] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-800 leading-tight">
            <strong>提醒：</strong>若疼痛劇烈請立即停止，並尋求專業醫療協助
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0 sticky top-[52px] z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-10 h-10 bg-[var(--medical-blue)] rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">復健小助手</h2>
              <p className="text-xs text-gray-500">AI 智慧推薦</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-10 h-10 bg-[var(--medical-blue)] rounded-full flex-shrink-0 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}

            <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-[var(--medical-blue)] text-white' : msg.isWarning ? 'bg-red-50 border-2 border-red-500' : 'bg-white border border-gray-200'} rounded-2xl px-4 py-3`}>
              <p className="text-base whitespace-pre-line leading-relaxed font-medium">{msg.content}</p>

              {/* 身體部位選擇圖 */}
              {msg.showBodyMap && (
                <div className="mt-4 bg-blue-50 rounded-xl p-4 space-y-4">
                  {/* 第一張圖（正面）*/}
                  <div className="relative w-full max-w-[320px] mx-auto">
                    <img
                      src={bodyImageFront}
                      alt="人體正面示意圖"
                      className="w-full h-auto"
                    />
                    {bodyParts
                      .filter((part) => part.image === 'front')
                      .map((part) => (
                        <button
                          key={part.id}
                          onClick={() => handleBodyPartSelect(part.id)}
                          className="absolute flex items-center justify-center bg-[#0066cc] text-white text-sm font-bold rounded-2xl shadow-md hover:bg-[#0052a3] active:scale-95 transition-all"
                          style={{ top: part.box.top, left: part.box.left, width: part.box.width, height: part.box.height }}
                        >
                          {part.name}
                        </button>
                      ))}
                  </div>

                  {/* 第二張圖（背面）*/}
                  <div className="relative w-full max-w-[320px] mx-auto">
                    <img
                      src={bodyImageBack}
                      alt="人體背面示意圖"
                      className="w-full h-auto"
                    />
                    {bodyParts
                      .filter((part) => part.image === 'back')
                      .map((part) => (
                        <button
                          key={part.id}
                          onClick={() => handleBodyPartSelect(part.id)}
                          className="absolute flex items-center justify-center bg-[#0066cc] text-white text-sm font-bold rounded-2xl shadow-md hover:bg-[#0052a3] active:scale-95 transition-all"
                          style={{ top: part.box.top, left: part.box.left, width: part.box.width, height: part.box.height }}
                        >
                          {part.name}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* 疼痛程度選擇 */}
              {msg.showPainScale && (
                <div className="mt-4 space-y-3">
                  {painLevels.map((pain) => (
                    <button
                      key={pain.value}
                      onClick={() => handlePainLevelSelect(pain.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 active:scale-95 transition-all ${pain.color}`}
                    >
                      <p className="text-lg font-bold mb-1">{pain.label}</p>
                      <p className="text-sm opacity-80">{pain.description}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* 運動推薦卡片 - 在對話框中顯示 */}
              {msg.showExercises && msg.showExercises.length > 0 && (
                <div className="mt-4 space-y-3">
                  {msg.showExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-[var(--medical-blue)] rounded-xl p-4 shadow-md"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-14 h-14 bg-[var(--medical-blue)] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Play className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {exercise.exerciseName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            難度：<span className="text-[var(--medical-blue)] font-bold">{exercise.difficulty}</span>
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-4 bg-white/70 p-3 rounded-lg">
                        💡 {exercise.reason}
                      </p>

                      <button
                        onClick={() => navigate(`/exercises/${exercise.bodyPartId}/${exercise.exerciseIndex}?from=assistant`)}
                        className="w-full bg-[var(--medical-blue)] text-white py-3.5 rounded-xl font-bold text-base active:scale-95 transition-all shadow-lg"
                      >
                        開始這個運動 →
                      </button>
                    </div>
                  ))}

                  {/* 繼續評估其他部位 */}
                  <div className="mt-4 pt-4 border-t-2 border-gray-200">
                    <p className="text-sm text-gray-600 text-center mb-3">還有其他部位不舒服嗎？</p>
                    <button
                      onClick={() => {
                        setMessages([
                          {
                            role: 'assistant',
                            content: '好的！讓我們重新開始。\n\n請點選下方身體圖，告訴我哪個部位不舒服',
                            showBodyMap: true
                          }
                        ]);
                        setSelectedPart(null);
                      }}
                      className="w-full bg-white text-[var(--medical-blue)] border-2 border-[var(--medical-blue)] py-3 rounded-xl font-bold text-base active:scale-95"
                    >
                      評估其他部位
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 固定在底部的輸入框 */}
      <div className={`bg-white border-t-2 border-gray-200 px-4 py-3 flex-shrink-0 ${isRecording ? 'relative z-40' : ''}`}>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleRecording}
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-colors ${
              isRecording ? 'bg-red-500' : 'bg-[var(--medical-blue)]'
            }`}
          >
            <Mic className="w-5 h-5 text-white" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="輸入您的問題..."
            className="flex-1 min-w-0 px-4 py-3 bg-gray-100 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-[var(--medical-blue)]"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="flex-shrink-0 w-12 h-12 bg-[var(--medical-blue)] rounded-full flex items-center justify-center disabled:bg-gray-300 active:scale-95"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

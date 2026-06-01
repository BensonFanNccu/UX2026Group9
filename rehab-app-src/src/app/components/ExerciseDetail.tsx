import { useParams, useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface Exercise {
  name: string;
  difficulty: string;
  steps: string[];
  notes: string;
  contraindications: string;
  symptoms?: string;
}

interface BodyPartData {
  name: string;
  subParts: string[];
  exercises: Exercise[];
}

const exerciseData: Record<string, BodyPartData> = {
  neck: {
    name: '頸部',
    subParts: ['頸椎', '斜方肌', '枕下肌群'],
    exercises: [
      {
        name: '縮下巴運動',
        difficulty: '初級',
        symptoms: '僵硬、烏龜頸、上背疼痛',
        steps: [
          '端坐，肩膀放鬆',
          '將下巴向後縮（做出雙下巴）',
          '維持 5 秒，重複 10 次',
        ],
        notes: '移動方向是水平向後，而非向下。',
        contraindications: '急性椎間盤突出伴隨神經根病變。',
      },
    ],
  },
  shoulder: {
    name: '肩膀',
    subParts: ['旋轉肌群', '三角肌', '肩胛骨'],
    exercises: [
      {
        name: '鐘擺運動',
        difficulty: '初期/疼痛管理',
        symptoms: '五十肩、肩峰夾擠、僵硬',
        steps: [
          '身體前傾，手臂自然垂下',
          '以手臂畫小圓圈',
          '每次持續 30 秒',
        ],
        notes: '完全放鬆，利用慣性帶動手臂移動。',
        contraindications: '肩關節脫臼尚未復位前。',
      },
    ],
  },
  arm: {
    name: '手肘與手腕',
    subParts: ['肱二頭肌/肱三頭肌', '前臂屈肌/伸肌', '手腕關節'],
    exercises: [
      {
        name: '手腕伸展（手心朝下）',
        difficulty: '初級',
        symptoms: '網球肘、滑鼠手、手腕無力',
        steps: [
          '一手伸直，手心朝下',
          '用另一手輕壓手指向下',
          '感覺前臂上側拉伸',
          '維持 15 秒，換手重複',
        ],
        notes: '伸展時應感到舒適的拉伸，不應過度用力。',
        contraindications: '手腕或手肘急性損傷未癒合。',
      },
      {
        name: '手腕彎曲（手心朝上）',
        difficulty: '初級',
        symptoms: '網球肘、前臂緊繃',
        steps: [
          '一手伸直，手心朝上',
          '用另一手壓手指向下',
          '感覺前臂下側肌肉拉伸',
          '維持 15 秒，換手重複',
        ],
        notes: '動作緩慢，避免快速拉扯。',
        contraindications: '前臂肌腱炎急性期。',
      },
      {
        name: '握力訓練',
        difficulty: '初級',
        symptoms: '手腕無力、握力不足',
        steps: [
          '手握握力球或軟球',
          '用力握住維持 5 秒',
          '放鬆後重複',
          '每手重複 15 次',
        ],
        notes: '根據自身能力選擇適當硬度的握力球。',
        contraindications: '手指或手腕關節炎急性發作期。',
      },
    ],
  },
  chest: {
    name: '胸部與上背',
    subParts: ['胸大肌', '菱形肌', '斜方肌中下束'],
    exercises: [
      {
        name: '胸肌伸展（門框伸展）',
        difficulty: '初級',
        symptoms: '圓肩、駝背',
        steps: [
          '站在門框旁，手臂放在門框上',
          '身體慢慢往前傾',
          '感受胸口打開伸展',
          '維持 15 秒，重複 3 次',
        ],
        notes: '伸展時應感到舒適的拉伸感，不應有疼痛。',
        contraindications: '肩關節不穩定或近期肩部手術。',
      },
    ],
  },
  core: {
    name: '核心與下背',
    subParts: ['腹直肌', '腹橫肌', '豎脊肌'],
    exercises: [
      {
        name: '骨盆後傾',
        difficulty: '初級',
        symptoms: '下背疼痛、核心無力',
        steps: [
          '仰躺，雙膝彎曲',
          '將下背貼緊地面',
          '收緊腹部肌肉',
          '維持 5 秒，重複 10 次',
        ],
        notes: '動作輕柔，專注於腹部收縮，避免用力過猛。',
        contraindications: '急性腰椎損傷或椎間盤突出急性期。',
      },
      {
        name: '臀橋運動',
        difficulty: '初級',
        symptoms: '下背疼痛、核心無力',
        steps: [
          '仰躺，雙腳平放於地面',
          '抬起臀部使身體呈一直線',
          '維持 5 秒，重複 10 次',
        ],
        notes: '不要過度拱起下背。',
        contraindications: '嚴重脊椎滑脫症。',
      },
    ],
  },
  ankle: {
    name: '小腿與腳踝',
    subParts: ['腓腸肌', '比目魚肌', '踝關節'],
    exercises: [
      {
        name: '小腿伸展',
        difficulty: '初級',
        symptoms: '腳踝扭傷、小腿緊繃',
        steps: [
          '面向牆壁站立',
          '後腳保持打直',
          '雙手推牆，身體向前壓',
          '感受小腿後側伸展，維持 20 秒',
        ],
        notes: '後腳腳跟需保持貼地，膝蓋打直以伸展腓腸肌。',
        contraindications: '急性小腿拉傷或阿基里斯腱炎急性期。',
      },
      {
        name: '腳踝畫圈',
        difficulty: '初級',
        symptoms: '腳踝扭傷、踝關節僵硬',
        steps: [
          '採坐姿，抬起一腳',
          '用腳尖在空中畫圓圈',
          '順時針 10 圈，逆時針 10 圈',
          '換腳重複',
        ],
        notes: '動作緩慢，盡可能畫大圈以增加活動度。',
        contraindications: '踝關節急性扭傷未穩定前。',
      },
      {
        name: '踮腳運動',
        difficulty: '初級',
        symptoms: '小腿無力、踝關節不穩',
        steps: [
          '雙腳站立，可扶牆保持平衡',
          '慢慢抬起腳跟',
          '停留 3 秒後慢慢放下',
          '重複 15 次',
        ],
        notes: '動作需緩慢控制，避免快速彈跳。',
        contraindications: '阿基里斯腱斷裂或嚴重發炎。',
      },
    ],
  },
};

export function ExerciseDetail() {
  const { bodyPartId, exerciseId } = useParams<{ bodyPartId: string; exerciseId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromAssistant = searchParams.get('from') === 'assistant';
  const videoRef = useRef<HTMLVideoElement>(null);

  const bodyPartData = bodyPartId ? exerciseData[bodyPartId] : null;
  const exerciseIndex = exerciseId ? parseInt(exerciseId, 10) : 0;
  const exercise = bodyPartData?.exercises[exerciseIndex];

  // 全屏横向显示功能
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleFullscreenChange = async () => {
      if (document.fullscreenElement === video) {
        // 进入全屏时，尝试锁定为横向
        try {
          if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock('landscape');
          }
        } catch (err) {
          console.log('无法锁定屏幕方向:', err);
        }
      } else {
        // 退出全屏时，解锁屏幕方向
        try {
          if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
          }
        } catch (err) {
          console.log('无法解锁屏幕方向:', err);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      // 清理时解锁屏幕方向
      try {
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      } catch (err) {
        // 忽略错误
      }
    };
  }, []);

  if (!bodyPartData || !exercise) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center max-w-[480px] mx-auto">
        <div className="text-center px-4">
          <h2 className="text-gray-900 mb-4">找不到該運動</h2>
          <button
            onClick={() => navigate('/exercises')}
            className="text-[var(--medical-blue)] hover:underline"
          >
            返回部位選擇
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-[480px] mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <button
            onClick={() => navigate(fromAssistant ? '/' : `/exercises/${bodyPartId}`)}
            className="flex items-center gap-2 text-[var(--medical-blue)] active:text-[var(--medical-teal)] mb-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">{fromAssistant ? '返回復健小助手' : `返回 ${bodyPartData.name}`}</span>
          </button>
          <h1 className="text-[var(--medical-blue)]">{exercise.name}</h1>
          <p className="text-sm text-gray-600 mt-1">
            難度：<span className="text-[var(--medical-blue)]">{exercise.difficulty}</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {/* Video Demonstration */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <video
              ref={videoRef}
              controls
              className="absolute inset-0 w-full h-full object-cover"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect width='640' height='360' fill='%23bbdefb'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%231976d2' text-anchor='middle' dominant-baseline='middle'%3E%E5%8B%95%E4%BD%9C%E7%A4%BA%E7%AF%84%E5%BD%B1%E7%89%87%3C/text%3E%3C/svg%3E"
            >
              <source src="/videos/exercise-demo.mp4" type="video/mp4" />
              您的瀏覽器不支援影片播放
            </video>
          </div>
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-[var(--medical-blue)]">💡 提示：</span>
              請仔細觀看示範影片，注意動作要領
            </p>
          </div>
        </div>

        {/* Symptoms */}
        {exercise.symptoms && (
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-sm text-gray-700 mb-2">適用症狀：</h3>
            <p className="text-sm text-gray-600">{exercise.symptoms}</p>
          </div>
        )}

        {/* Steps */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-sm text-gray-700 mb-3">動作步驟：</h3>
          <ol className="space-y-3">
            {exercise.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[var(--medical-blue)] text-white rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-700 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Important Notes */}
        <div className="bg-[var(--safety-amber-bg)] border-l-4 border-[var(--safety-amber)] p-4 rounded">
          <div className="flex gap-2">
            <AlertTriangle className="w-5 h-5 text-[var(--safety-amber)] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm text-gray-800 mb-1">重要提醒：</h4>
              <p className="text-sm text-gray-700">{exercise.notes}</p>
            </div>
          </div>
        </div>

        {/* Contraindications */}
        <div className="bg-[var(--warning-red-bg)] border-l-4 border-[var(--warning-red)] p-4 rounded">
          <h4 className="text-sm text-gray-800 mb-1">禁忌症：</h4>
          <p className="text-sm text-gray-700">{exercise.contraindications}</p>
        </div>
      </div>
    </div>
  );
}

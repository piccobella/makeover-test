import { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface PersonalColorAnalysisProps {
  photoUrl: string;
  isUserUpload: boolean;
  onAnalysisComplete: (skinTone: 'warm' | 'cool' | 'mute') => void;
}

const QUESTIONS = [
  {
    id: 1,
    question: '내 피부는 햇빛에 어떻게 반응하나요?',
    options: [
      { text: '잘 타고 황금빛 태닝이 됩니다', tone: 'warm' },
      { text: '쉽게 붉어지고 잘 타지 않아요', tone: 'cool' },
      { text: '약간 타기도 하고 붉어지기도 해요', tone: 'mute' },
    ],
  },
  {
    id: 2,
    question: '내 손목 혈관 색은?',
    options: [
      { text: '초록빛이 도는 올리브색', tone: 'warm' },
      { text: '파란색 또는 보라색', tone: 'cool' },
      { text: '초록과 파랑이 섞인 듯해요', tone: 'mute' },
    ],
  },
  {
    id: 3,
    question: '어울리는 액세서리는?',
    options: [
      { text: '골드 계열이 더 잘 어울려요', tone: 'warm' },
      { text: '실버 계열이 더 잘 어울려요', tone: 'cool' },
      { text: '골드와 실버 둘 다 괜찮아요', tone: 'mute' },
    ],
  },
];

export function PersonalColorAnalysis({ photoUrl, isUserUpload, onAnalysisComplete }: PersonalColorAnalysisProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Array<'warm' | 'cool' | 'mute'>>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<'warm' | 'cool' | 'mute' | null>(null);

  const handleAnswer = (tone: 'warm' | 'cool' | 'mute') => {
    const newAnswers = [...answers, tone];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // 분석 시작
      setAnalyzing(true);
      setTimeout(() => {
        const toneCount = newAnswers.reduce((acc, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const dominantTone = Object.entries(toneCount).sort((a, b) => b[1] - a[1])[0][0] as 'warm' | 'cool' | 'mute';
        setResult(dominantTone);
        setAnalyzing(false);
        setShowResult(true);
      }, 2500);
    }
  };

  const getToneInfo = (tone: 'warm' | 'cool' | 'mute') => {
    const info = {
      warm: {
        name: '웜톤',
        description: '황금빛이 도는 따뜻한 피부톤',
        colors: ['코랄', '피치', '오렌지', '골드'],
        bgGradient: 'from-orange-100 to-yellow-50',
        textColor: 'text-orange-900',
      },
      cool: {
        name: '쿨톤',
        description: '푸른빛이 도는 시원한 피부톤',
        colors: ['핑크', '라벤더', '블루', '실버'],
        bgGradient: 'from-blue-100 to-purple-50',
        textColor: 'text-blue-900',
      },
      mute: {
        name: '뮤트톤',
        description: '중성적이고 은은한 피부톤',
        colors: ['베이지', '모브', '올리브', '로즈골드'],
        bgGradient: 'from-gray-100 to-pink-50',
        textColor: 'text-gray-900',
      },
    };
    return info[tone];
  };

  if (showResult && result) {
    const toneInfo = getToneInfo(result);
    return (
      <div className={`min-h-screen bg-gradient-to-br ${toneInfo.bgGradient} p-4 md:p-8`}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">퍼스널 컬러 진단 완료!</h1>
              <p className="text-gray-600">당신의 퍼스널 컬러를 분석했습니다</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <img src={photoUrl} alt="Your photo" className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col justify-center">
                <div className={`inline-flex items-center gap-2 mb-4`}>
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-600">당신의 퍼스널 컬러</span>
                </div>
                <h2 className={`text-5xl font-bold mb-4 ${toneInfo.textColor}`}>{toneInfo.name}</h2>
                <p className="text-lg text-gray-600 mb-6">{toneInfo.description}</p>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">추천 컬러</h3>
                  <div className="flex flex-wrap gap-2">
                    {toneInfo.colors.map((color) => (
                      <span
                        key={color}
                        className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                {isUserUpload && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      💡 <strong>팁:</strong> 더 정확한 진단을 위해서는 자연광에서 메이크업 없이 촬영한 정면 사진을 사용해주세요.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => onAnalysisComplete(result)}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  맞춤 메이크업 보러가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (analyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-ping"></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">AI 분석 중...</h2>
          <p className="text-gray-600">당신의 퍼스널 컬러를 진단하고 있습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                질문 {currentQuestion + 1} / {QUESTIONS.length}
              </span>
              <span className="text-sm font-medium text-purple-600">
                {Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Photo */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-8 max-w-md mx-auto">
            <img src={photoUrl} alt="Your photo" className="w-full h-full object-cover" />
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
              {QUESTIONS[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {QUESTIONS[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.tone)}
                  className="w-full p-6 bg-gray-50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-2 border-gray-200 hover:border-purple-300 rounded-2xl text-left transition-all group"
                >
                  <span className="text-lg font-medium text-gray-800 group-hover:text-purple-800">
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

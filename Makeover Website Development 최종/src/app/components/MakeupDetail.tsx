import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { MakeupLook } from './MakeupLookbook';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MakeupDetailProps {
  photoUrl: string;
  selectedLook: MakeupLook;
  skinTone: 'warm' | 'cool' | 'mute';
  onBack: () => void;
  onCheckout: (products: MakeupLook['products']) => void;
}

// 톤별, 스타일별 메이크업 색상 정의
const MAKEUP_COLORS: Record<'warm' | 'cool' | 'mute', Record<string, {
  eyeshadow: string;
  blush: string;
  lips: string;
}>> = {
  warm: {
    '내추럴': {
      eyeshadow: '#E8C9A0', // 연한 피치 베이지
      blush: '#FFD1C1', // 소프트 피치
      lips: '#FFAB91', // 라이트 코랄
    },
    '글램': {
      eyeshadow: '#C89A5C', // 진한 골드
      blush: '#FF9F80', // 코랄 오렌지
      lips: '#FF6F3C', // 선셋 오렌지
    },
    '로맨틱': {
      eyeshadow: '#E5B89F', // 로즈 골드
      blush: '#FFB8C1', // 로즈 피치
      lips: '#FF8A94', // 코랄 핑크
    },
    '볼드': {
      eyeshadow: '#A0643F', // 딥 브론즈
      blush: '#E86850', // 테라코타
      lips: '#D84315', // 번트 오렌지
    },
  },
  cool: {
    '내추럴': {
      eyeshadow: '#E8D4E8', // 연한 라벤더
      blush: '#FFD1E3', // 베이비 핑크
      lips: '#FFB3D9', // 라이트 로즈
    },
    '글램': {
      eyeshadow: '#B388C9', // 진한 퍼플
      blush: '#FF85B8', // 핫 핑크
      lips: '#E91E63', // 딥 핑크
    },
    '로맨틱': {
      eyeshadow: '#D5B8E0', // 소프트 모브
      blush: '#FFA7C7', // 로즈 핑크
      lips: '#FF6BA3', // 로즈
    },
    '볼드': {
      eyeshadow: '#8B4C9E', // 딥 플럼
      blush: '#D5476C', // 베리
      lips: '#C2185B', // 마젠타
    },
  },
  mute: {
    '내추럴': {
      eyeshadow: '#E5D8CF', // 연한 베이지
      blush: '#E8CCC4', // 소프트 모브
      lips: '#D9ABA3', // 누드 핑크
    },
    '글램': {
      eyeshadow: '#B39788', // 모카 브라운
      blush: '#C99A8F', // 더스티 로즈
      lips: '#A86F5F', // 메이플 브라운
    },
    '로맨틱': {
      eyeshadow: '#D4BFB3', // 더스티 베이지
      blush: '#DBAAA3', // 모브 핑크
      lips: '#C18B7F', // 로즈 브라운
    },
    '볼드': {
      eyeshadow: '#8E6F60', // 딥 모브
      blush: '#A67871', // 번트 모브
      lips: '#8B5A54', // 초콜릿 로즈
    },
  },
};

// 스타일별 메이크업 강도 설정 (투명도와 블러만)
const MAKEUP_STYLES: Record<string, {
  eyeshadow: { blur: number; opacity: number };
  blush: { blur: number; opacity: number };
  lips: { blur: number; opacity: number };
}> = {
  '내추럴': {
    eyeshadow: { blur: 20, opacity: 0.4 },
    blush: { blur: 35, opacity: 0.5 },
    lips: { blur: 5, opacity: 0.6 },
  },
  '글램': {
    eyeshadow: { blur: 15, opacity: 0.4 },
    blush: { blur: 30, opacity: 0.5 },
    lips: { blur: 3, opacity: 0.6 },
  },
  '로맨틱': {
    eyeshadow: { blur: 18, opacity: 0.4 },
    blush: { blur: 32, opacity: 0.5 },
    lips: { blur: 4, opacity: 0.6 },
  },
  '볼드': {
    eyeshadow: { blur: 12, opacity: 0.4 },
    blush: { blur: 25, opacity: 0.5 },
    lips: { blur: 2, opacity: 0.6 },
  },
};

// MediaPipe 얼굴 랜드마크 인덱스
const L_CHEEK = [116, 117, 118, 101, 203, 205, 123, 116];
const R_CHEEK = [345, 346, 347, 330, 423, 425, 352, 345];
const L_EYE = [133, 173, 157, 158, 159, 160, 161, 246, 33, 130, 247, 30, 29, 27, 28];
const R_EYE = [362, 398, 384, 385, 386, 387, 388, 466, 263, 359, 467, 260, 259, 257, 258];
const LIPS = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78, 191, 80, 81, 82, 13, 312, 311, 310, 415];

export function MakeupDetail({ photoUrl, selectedLook, skinTone, onBack, onCheckout }: MakeupDetailProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(selectedLook.products.map((p) => p.id))
  );
  const [showVirtualMakeup, setShowVirtualMakeup] = useState(false);
  const [faceMeshLoaded, setFaceMeshLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const faceMeshRef = useRef<any>(null);

  useEffect(() => {
    // MediaPipe FaceMesh 동적 로드
    const loadFaceMesh = async () => {
      try {
        const { FaceMesh } = await import('@mediapipe/face_mesh');
        
        faceMeshRef.current = new FaceMesh({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMeshRef.current.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        setFaceMeshLoaded(true);
      } catch (error) {
        console.error('FaceMesh 로드 실패:', error);
        setFaceMeshLoaded(false);
      }
    };

    loadFaceMesh();

    return () => {
      if (faceMeshRef.current) {
        faceMeshRef.current.close();
        faceMeshRef.current = null;
      }
    };
  }, []);

  // 메이크업 그리기 함수
  const drawMakeup = (ctx: CanvasRenderingContext2D, landmarks: any[], indices: number[], color: string, blur: number, opacity: number) => {
    ctx.save();
    ctx.filter = `blur(${blur}px)`;
    ctx.globalAlpha = opacity;
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = color;
    
    ctx.beginPath();
    indices.forEach((idx, i) => {
      const landmark = landmarks[idx];
      const x = landmark.x * ctx.canvas.width;
      const y = landmark.y * ctx.canvas.height;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  // 스케일이 적용된 메이크업 그리기 함수
  const drawMakeupScaled = (
    ctx: CanvasRenderingContext2D, 
    landmarks: any[], 
    indices: number[], 
    color: string, 
    blur: number, 
    opacity: number,
    scaleX: number,
    scaleY: number
  ) => {
    ctx.save();
    ctx.filter = `blur(${blur * Math.min(scaleX, scaleY)}px)`;
    ctx.globalAlpha = opacity;
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = color;
    
    ctx.beginPath();
    indices.forEach((idx, i) => {
      const landmark = landmarks[idx];
      const x = landmark.x * ctx.canvas.width;
      const y = landmark.y * ctx.canvas.height;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  // 얼굴 감지 및 메이크업 적용
  const applyMakeup = async () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    
    if (!canvas || !img || !faceMeshRef.current || !faceMeshLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 이미지가 로드될 때까지 대기
    if (!img.complete) {
      img.onload = () => applyMakeup();
      return;
    }

    // 메이크업이 꺼져있으면 canvas 비우기
    if (!showVirtualMakeup) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setIsProcessing(false);
      return;
    }

    setIsProcessing(true);

    // Canvas 크기를 이미지의 실제 표시 크기에 맞춤
    const rect = img.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // 스케일 계산
    const scaleX = rect.width / img.naturalWidth;
    const scaleY = rect.height / img.naturalHeight;

    // 현재 스타일 가져오기 (기본값: 내추럴)
    const currentStyle = MAKEUP_STYLES[selectedLook.style] || MAKEUP_STYLES['내추럴'];

    try {
      // 임시 canvas 생성하여 CORS 문제 해결
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = img.naturalWidth;
      tempCanvas.height = img.naturalHeight;
      const tempCtx = tempCanvas.getContext('2d');
      
      if (!tempCtx) return;
      
      tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

      // FaceMesh 결과 처리
      faceMeshRef.current.onResults((results: any) => {
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
          const landmarks = results.multiFaceLandmarks[0];

          // Canvas 초기화
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 블러셔 - 좌
          drawMakeupScaled(ctx, landmarks, L_CHEEK, MAKEUP_COLORS[skinTone][selectedLook.style].blush, currentStyle.blush.blur, currentStyle.blush.opacity, scaleX, scaleY);
          // 블러셔 - 우
          drawMakeupScaled(ctx, landmarks, R_CHEEK, MAKEUP_COLORS[skinTone][selectedLook.style].blush, currentStyle.blush.blur, currentStyle.blush.opacity, scaleX, scaleY);

          // 아이섀도 - 좌
          drawMakeupScaled(ctx, landmarks, L_EYE, MAKEUP_COLORS[skinTone][selectedLook.style].eyeshadow, currentStyle.eyeshadow.blur, currentStyle.eyeshadow.opacity, scaleX, scaleY);
          // 아이섀도 - 우
          drawMakeupScaled(ctx, landmarks, R_EYE, MAKEUP_COLORS[skinTone][selectedLook.style].eyeshadow, currentStyle.eyeshadow.blur, currentStyle.eyeshadow.opacity, scaleX, scaleY);

          // 립
          drawMakeupScaled(ctx, landmarks, LIPS, MAKEUP_COLORS[skinTone][selectedLook.style].lips, currentStyle.lips.blur, currentStyle.lips.opacity, scaleX, scaleY);
          
          setIsProcessing(false);
        } else {
          setIsProcessing(false);
        }
      });

      // 임시 canvas를 MediaPipe에 전송
      await faceMeshRef.current.send({ image: tempCanvas });
    } catch (error) {
      console.error('메이크업 적용 오류:', error);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    applyMakeup();
  }, [showVirtualMakeup, skinTone, photoUrl]);

  const toggleProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const selectedProductsList = selectedLook.products.filter((p) => selectedProducts.has(p.id));
  const totalPrice = selectedProductsList.reduce((sum, p) => sum + p.price, 0);

  const handleCheckout = () => {
    onCheckout(selectedProductsList);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{selectedLook.name}</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Photo Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">가상 메이크업</h2>
                <button
                  onClick={() => setShowVirtualMakeup(!showVirtualMakeup)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    showVirtualMakeup
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {showVirtualMakeup ? '원본 보기' : '메이크업 적용'}
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100">
                <img
                  ref={imgRef}
                  src={photoUrl}
                  alt="Your photo"
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
                {showVirtualMakeup && isProcessing && (
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white/90 px-6 py-3 rounded-full">
                      <p className="text-sm font-semibold text-purple-600">
                        🎨 메이크업 적용 중...
                      </p>
                    </div>
                  </div>
                )}
                {showVirtualMakeup && !isProcessing && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <p className="text-sm font-semibold text-purple-600">
                      ✨ {selectedLook.name} 적용됨
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800">
                  💡 <strong>참고:</strong> 실제 화장법 적용은 구매한 제품으로 직접 메이크업 후 커뮤니티에 업로드할 수 있습니다.
                </p>
              </div>
            </div>

            {/* Makeup Steps */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">화장법</h2>
              <div className="space-y-3">
                {selectedLook.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">사용 제품</h2>
              <div className="space-y-3 mb-6">
                {selectedLook.products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedProducts.has(product.id)
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden">
                        <ImageWithFallback
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {selectedProducts.has(product.id) && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.brand}</p>
                      <p className="font-semibold text-purple-600 mt-1">
                        {product.price.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">선택한 제품</span>
                  <span className="font-semibold">{selectedProducts.size}개</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">총 결제 금액</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={selectedProducts.size === 0}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>장바구니에 담기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
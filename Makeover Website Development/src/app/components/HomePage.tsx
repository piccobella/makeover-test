import { useState } from 'react';
import { Upload, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onPhotoSelected: (photoUrl: string, isUserUpload: boolean) => void;
}

const MODEL_TONES = [
  {
    id: 'warm',
    name: '웜톤',
    description: '따뜻하고 황금빛이 도는 피부',
    imageUrl: 'https://ibb.co/zhWyr2cp',
  },
  {
    id: 'cool',
    name: '쿨톤',
    description: '차갑고 푸른빛이 도는 피부',
    imageUrl: 'https://ibb.co/LXJrJ0sg',
  },
  {
    id: 'mute',
    name: '뮤트톤',
    description: '중성적이고 은은한 피부',
    imageUrl: 'https://ibb.co/cKhxzRTc',
  },
];

export function HomePage({ onPhotoSelected }: HomePageProps) {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModelSelect = (modelImageUrl: string) => {
    onPhotoSelected(modelImageUrl, false);
  };

  const handleUploadedPhotoConfirm = () => {
    if (uploadedPhoto) {
      onPhotoSelected(uploadedPhoto, true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Personal color
            </h1>
          </div>
          <p className="text-gray-600 text-lg">당신만을 위한 퍼스널 메이크업을 찾아보세요</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">내 사진으로 시작하기</h2>
          
          {!uploadedPhoto ? (
            <label className="block cursor-pointer">
              <div className="border-4 border-dashed border-purple-200 rounded-2xl p-12 hover:border-purple-400 transition-colors bg-purple-50/30">
                <div className="text-center">
                  <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700 mb-2">사진 업로드하기</p>
                  <p className="text-sm text-gray-500">
                    최적의 진단을 위해 자연광에서 메이크업 없이 촬영한 정면 사진을 사용해주세요
                  </p>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden max-w-md mx-auto">
                <img src={uploadedPhoto} alt="Uploaded" className="w-full h-auto" />
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleUploadedPhotoConfirm}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  이 사진으로 진단하기
                </button>
                <button
                  onClick={() => setUploadedPhoto(null)}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                >
                  다시 선택
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 font-medium">또는</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Model Selection */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">모델 선택하기</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MODEL_TONES.map((model) => (
              <div
                key={model.id}
                onClick={() => handleModelSelect(model.imageUrl)}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[3/4] shadow-lg group-hover:shadow-2xl transition-shadow">
                  <ImageWithFallback
                    src={model.imageUrl}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-1">{model.name}</h3>
                      <p className="text-sm text-white/90">{model.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

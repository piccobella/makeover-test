import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { MakeupLook } from './MakeupLookbook';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MakeupDetailProps {
  photoUrl: string;
  selectedLook: MakeupLook;
  onBack: () => void;
  onCheckout: (products: MakeupLook['products']) => void;
}

export function MakeupDetail({ photoUrl, selectedLook, onBack, onCheckout }: MakeupDetailProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(selectedLook.products.map((p) => p.id))
  );
  const [showVirtualMakeup, setShowVirtualMakeup] = useState(false);

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
                <img src={photoUrl} alt="Your photo" className="w-full h-full object-cover" />
                {showVirtualMakeup && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <p className="text-sm font-semibold text-purple-600">
                        ✨ {selectedLook.name} 적용됨
                      </p>
                    </div>
                  </>
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

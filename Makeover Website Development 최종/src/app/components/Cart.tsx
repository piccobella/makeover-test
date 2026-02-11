import { useState } from 'react';
import { ArrowLeft, Trash2, CreditCard, Check } from 'lucide-react';
import { MakeupLook } from './MakeupLookbook';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartProps {
  items: MakeupLook['products'];
  onBack: () => void;
  onCheckoutComplete: () => void;
}

export function Cart({ items, onBack, onCheckoutComplete }: CartProps) {
  const [cartItems, setCartItems] = useState(items);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
    const newQuantities = { ...quantities };
    delete newQuantities[productId];
    setQuantities(newQuantities);
  };

  const updateQuantity = (productId: string, delta: number) => {
    const newQuantity = Math.max(1, (quantities[productId] || 1) + delta);
    setQuantities({ ...quantities, [productId]: newQuantity });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * quantities[item.id], 0);
  const shipping = subtotal > 30000 ? 0 : 3000;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        onCheckoutComplete();
      }, 2000);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">주문 완료!</h2>
          <p className="text-gray-600 mb-4">주문이 성공적으로 완료되었습니다.</p>
          <p className="text-sm text-gray-500">
            구매하신 제품으로 메이크업 후<br />
            커뮤니티에 공유해보세요! 💄
          </p>
        </div>
      </div>
    );
  }

  if (isCheckingOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-ping"></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full">
              <CreditCard className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">결제 처리 중...</h2>
          <p className="text-gray-600">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">장바구니</h1>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">장바구니가 비어있습니다</h2>
            <p className="text-gray-600 mb-6">메이크업 룩북에서 제품을 추가해주세요</p>
            <button
              onClick={onBack}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              쇼핑 계속하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">장바구니</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{quantities[item.id]}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xl font-bold text-purple-600">
                        {(item.price * quantities[item.id]).toLocaleString()}원
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">주문 요약</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>상품 금액</span>
                  <span>{subtotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>배송비</span>
                  <span>{shipping === 0 ? '무료' : `${shipping.toLocaleString()}원`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-blue-600">
                    💡 {(30000 - subtotal).toLocaleString()}원 더 구매 시 무료배송
                  </p>
                )}
              </div>

              <div className="border-t-2 border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">총 결제금액</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {total.toLocaleString()}원
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>결제하기</span>
              </button>

              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-600">
                  • 주문 완료 후 2-3일 내 배송됩니다<br />
                  • 30,000원 이상 구매 시 무료배송<br />
                  • 교환/반품은 7일 이내 가능합니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Home, ShoppingBag, Users } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { PersonalColorAnalysis } from './components/PersonalColorAnalysis';
import { MakeupLookbook, MakeupLook } from './components/MakeupLookbook';
import { MakeupDetail } from './components/MakeupDetail';
import { Cart } from './components/Cart';
import { Community } from './components/Community';

type AppStep = 
  | 'home' 
  | 'analysis' 
  | 'lookbook' 
  | 'detail' 
  | 'cart' 
  | 'community';

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('home');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [isUserUpload, setIsUserUpload] = useState(false);
  const [skinTone, setSkinTone] = useState<'warm' | 'cool' | 'mute'>('warm');
  const [selectedLook, setSelectedLook] = useState<MakeupLook | null>(null);
  const [cartItems, setCartItems] = useState<MakeupLook['products']>([]);

  const handlePhotoSelected = (url: string, isUpload: boolean) => {
    setPhotoUrl(url);
    setIsUserUpload(isUpload);
    setCurrentStep('analysis');
  };

  const handleAnalysisComplete = (tone: 'warm' | 'cool' | 'mute') => {
    setSkinTone(tone);
    setCurrentStep('lookbook');
  };

  const handleSelectLookbook = (look: MakeupLook) => {
    setSelectedLook(look);
    setCurrentStep('detail');
  };

  const handleCheckout = (products: MakeupLook['products']) => {
    setCartItems(products);
    setCurrentStep('cart');
  };

  const handleCheckoutComplete = () => {
    setCurrentStep('community');
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'home':
        return <HomePage onPhotoSelected={handlePhotoSelected} />;
      
      case 'analysis':
        return (
          <PersonalColorAnalysis
            photoUrl={photoUrl}
            isUserUpload={isUserUpload}
            onAnalysisComplete={handleAnalysisComplete}
          />
        );
      
      case 'lookbook':
        return (
          <MakeupLookbook
            photoUrl={photoUrl}
            skinTone={skinTone}
            onSelectLookbook={handleSelectLookbook}
            onBack={() => setCurrentStep('analysis')}
          />
        );
      
      case 'detail':
        return selectedLook ? (
          <MakeupDetail
            photoUrl={photoUrl}
            selectedLook={selectedLook}
            skinTone={skinTone}
            onBack={() => setCurrentStep('lookbook')}
            onCheckout={handleCheckout}
          />
        ) : null;
      
      case 'cart':
        return (
          <Cart
            items={cartItems}
            onBack={() => setCurrentStep('detail')}
            onCheckoutComplete={handleCheckoutComplete}
          />
        );
      
      case 'community':
        return <Community />;
      
      default:
        return <HomePage onPhotoSelected={handlePhotoSelected} />;
    }
  };

  return (
    <div className="relative">
      {renderContent()}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            <button
              onClick={() => setCurrentStep('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentStep === 'home' || currentStep === 'analysis' || currentStep === 'lookbook'
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">홈</span>
            </button>

            <button
              onClick={() => {
                if (cartItems.length > 0) {
                  setCurrentStep('cart');
                }
              }}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors relative ${
                currentStep === 'cart' || currentStep === 'detail'
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShoppingBag className="w-6 h-6" />
              <span className="text-xs font-medium">장바구니</span>
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentStep('community')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentStep === 'community'
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-6 h-6" />
              <span className="text-xs font-medium">커뮤니티</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom padding to prevent content from being hidden behind nav */}
      <div className="h-16"></div>
    </div>
  );
}
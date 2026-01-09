import { useState } from 'react';
import { ArrowLeft, Sparkles, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MakeupLookbookProps {
  photoUrl: string;
  skinTone: 'warm' | 'cool' | 'mute';
  onSelectLookbook: (lookbook: MakeupLook) => void;
  onBack: () => void;
}

export interface MakeupLook {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  steps: string[];
  products: Array<{
    id: string;
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
  }>;
}

const MAKEUP_LOOKS: Record<'warm' | 'cool' | 'mute', MakeupLook[]> = {
  warm: [
    {
      id: 'warm-natural',
      name: '내추럴 데일리',
      description: '따뜻한 느낌의 자연스러운 일상 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1595696543953-3c958fe4d3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwbWFrZXVwJTIwbG9va3xlbnwxfHx8fDE3Njc3Njg3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 피치톤 베이스로 촉촉하게 펴 발라주세요',
        '아이섀도: 코랄 브라운 계열로 그라데이션',
        '블러셔: 피치 블러셔를 광대뼈에 자연스럽게',
        '립: 코랄 핑크 립으로 마무리',
      ],
      products: [
        { id: 'p1', name: '글로우 쿠션', brand: '클리오', price: 28000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p2', name: '코랄 팔레트', brand: '에뛰드', price: 35000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p3', name: '피치 블러셔', brand: '페리페라', price: 12000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p4', name: '코랄 립스틱', brand: '롬앤', price: 14000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
    {
      id: 'warm-glam',
      name: '골드 글램',
      description: '화려한 골드 톤의 파티 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1766879240642-03c887de8e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtJTIwZXZlbmluZyUyMG1ha2V1cHxlbnwxfHx8fDE3Njc4NTczMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 윤광 베이스로 광채나는 피부 표현',
        '아이섀도: 골드 글리터로 화려하게',
        '아이라인: 골드 브라운 아이라인으로 섹시하게',
        '립: 오렌지 레드 립으로 포인트',
      ],
      products: [
        { id: 'p5', name: '글리터 베이스', brand: '맥', price: 42000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p6', name: '골드 팔레트', brand: '후다뷰티', price: 68000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p7', name: '골드 아이라이너', brand: '스틸라', price: 28000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p8', name: '오렌지 레드 립', brand: '맥', price: 32000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
    {
      id: 'warm-romantic',
      name: '코랄 로맨틱',
      description: '사랑스러운 코랄 톤 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1763192902738-a3e17d5f9015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwcm9tYW50aWMlMjBtYWtldXB8ZW58MXx8fHwxNzY3ODU3MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 피치 베이스로 화사한 피부',
        '아이섀도: 코랄 핑크로 러블리하게',
        '블러셔: 코랄 블러셔를 넓게',
        '립: 코랄 틴트로 생기있게',
      ],
      products: [
        { id: 'p9', name: '피치 베이스', brand: '더페이스샵', price: 18000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p10', name: '코랄 섀도우', brand: '토니모리', price: 22000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p11', name: '코랄 블러셔', brand: '캔메이크', price: 15000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p12', name: '코랄 틴트', brand: '페리페라', price: 9000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
    {
      id: 'warm-bold',
      name: '오렌지 볼드',
      description: '강렬한 오렌지 포인트 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1758605456630-4883bdc0a07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2xkJTIwbWFrZXVwJTIwbGlwc3xlbnwxfHx8fDE3Njc4NTczMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 매트 베이스로 깔끔하게',
        '아이섀도: 브라운으로 심플하게',
        '블러셔: 살짝만 터치',
        '립: 오렌지 립으로 강렬한 포인트',
      ],
      products: [
        { id: 'p13', name: '매트 쿠션', brand: '정샘물', price: 35000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p14', name: '브라운 팔레트', brand: '에스쁘아', price: 28000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p15', name: '누드 블러셔', brand: '3CE', price: 18000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p16', name: '오렌지 립스틱', brand: '헤라', price: 36000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
  ],
  cool: [
    {
      id: 'cool-natural',
      name: '라벤더 내추럴',
      description: '시원한 라벤더 톤의 일상 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1595696543953-3c958fe4d3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwbWFrZXVwJTIwbG9va3xlbnwxfHx8fDE3Njc3Njg3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 핑크톤 베이스로 맑은 피부 연출',
        '아이섀도: 라벤더 핑크로 청초하게',
        '블러셔: 로즈 핑크 블러셔',
        '립: 핑크 베이지 립',
      ],
      products: [
        { id: 'p17', name: '핑크 쿠션', brand: '라네즈', price: 38000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p18', name: '라벤더 팔레트', brand: '룩앳마이아이즈', price: 8000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p19', name: '로즈 블러셔', brand: '클리오', price: 13000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p20', name: '핑크베이지 립', brand: '롬앤', price: 14000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
    {
      id: 'cool-glam',
      name: '실버 글램',
      description: '화려한 실버 톤의 파티 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1766879240642-03c887de8e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtJTIwZXZlbmluZyUyMG1ha2V1cHxlbnwxfHx8fDE3Njc4NTczMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 윤광 베이스로 투명한 광채',
        '아이섀도: 실버 퍼플 글리터',
        '아이라인: 블랙 아이라인 또렷하게',
        '립: 퓨샤 핑크 립',
      ],
      products: [
        { id: 'p21', name: '듀이 베이스', brand: '맥', price: 45000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p22', name: '실버 팔레트', brand: '나스', price: 72000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p23', name: '워터프루프 라이너', brand: '헤라', price: 24000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p24', name: '퓨샤핑크 립', brand: '디올', price: 48000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
    {
      id: 'cool-romantic',
      name: '핑크 로맨틱',
      description: '사랑스러운 핑크 톤 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1763192902738-a3e17d5f9015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwcm9tYW50aWMlMjBtYWtldXB8ZW58MXx8fHwxNzY3ODU3MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 핑크 베이스로 청순하게',
        '아이섀도: 핑크 베이지로 부드럽게',
        '블러셔: 핑크 블러셔 광대에',
        '립: 로즈 핑크 립글oss',
      ],
      products: [
        { id: 'p25', name: '핑크 베이스', brand: '에뛰드', price: 15000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p26', name: '핑크베이지 섀도우', brand: '페리페라', price: 18000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p27', name: '핑크 블러셔', brand: '캔메이크', price: 15000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p28', name: '로즈핑크 글로스', brand: '롬앤', price: 12000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
    {
      id: 'cool-bold',
      name: '베리 볼드',
      description: '강렬한 베리 포인트 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1758605456630-4883bdc0a07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2xkJTIwbWFrZXVwJTIwbGlwc3xlbnwxfHx8fDE3Njc4NTczMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 세미 매트 베이스',
        '아이섀도: 브라운으로 깔끔하게',
        '블러셔: 플럼 블러셔',
        '립: 베리 레드 립으로 강렬하게',
      ],
      products: [
        { id: 'p29', name: '세미매트 쿠션', brand: '아이오페', price: 42000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p30', name: '브라운 팔레트', brand: '투페이스드', price: 58000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p31', name: '플럼 블러셔', brand: '나스', price: 38000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p32', name: '베리레드 립', brand: '샤넬', price: 52000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
  ],
  mute: [
    {
      id: 'mute-natural',
      name: '베이지 내추럴',
      description: '은은한 베이지 톤의 일상 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1595696543953-3c958fe4d3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwbWFrZXVwJTIwbG9va3xlbnwxfHx8fDE3Njc3Njg3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 뉴트럴 베이스로 자연스럽게',
        '아이섀도: 베이지 브라운 그라데이션',
        '블러셔: 모브 블러셔',
        '립: MLBB 립',
      ],
      products: [
        { id: 'p33', name: '뉴트럴 쿠션', brand: '라네즈', price: 38000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p34', name: '베이지 팔레트', brand: '에스쁘아', price: 32000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p35', name: '모브 블러셔', brand: '3CE', price: 22000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p36', name: 'MLBB 립', brand: '롬앤', price: 14000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
    {
      id: 'mute-glam',
      name: '로즈골드 글램',
      description: '화려한 로즈골드 톤 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1766879240642-03c887de8e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtJTIwZXZlbmluZyUyMG1ha2V1cHxlbnwxfHx8fDE3Njc4NTczMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 윤광 베이스로 촉촉한 광',
        '아이섀도: 로즈골드 글리터',
        '아이라인: 브라운 아이라인',
        '립: 누드 로즈 립',
      ],
      products: [
        { id: 'p37', name: '윤광 베이스', brand: '더페이스샵', price: 22000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p38', name: '로즈골드 팔레트', brand: '후다뷰티', price: 68000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p39', name: '브라운 라이너', brand: '클리오', price: 18000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p40', name: '누드로즈 립', brand: '맥', price: 32000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
    {
      id: 'mute-romantic',
      name: '모브 로맨틱',
      description: '사랑스러운 모브 톤 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1763192902738-a3e17d5f9015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwcm9tYW50aWMlMjBtYWtldXB8ZW58MXx8fHwxNzY3ODU3MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 자연 톤 베이스',
        '아이섀도: 모브 핑크로 부드럽게',
        '블러셔: 모브 블러셔',
        '립: 더스티 로즈 립',
      ],
      products: [
        { id: 'p41', name: '내추럴 베이스', brand: '에뛰드', price: 15000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p42', name: '모브핑크 섀도우', brand: '페리페라', price: 18000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p43', name: '모브 블러셔', brand: '3CE', price: 22000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p44', name: '더스티로즈 립', brand: '롬앤', price: 14000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
    {
      id: 'mute-bold',
      name: '올리브 볼드',
      description: '강렬한 올리브 포인트 메이크업',
      imageUrl: 'https://images.unsplash.com/photo-1758605456630-4883bdc0a07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2xkJTIwbWFrZXVwJTIwbGlwc3xlbnwxfHx8fDE3Njc4NTczMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        '베이스: 매트 베이스',
        '아이섀도: 올리브 브라운 스모키',
        '블러셔: 베이지 블러셔',
        '립: 벽돌 브라운 립',
      ],
      products: [
        { id: 'p45', name: '매트 쿠션', brand: '정샘물', price: 35000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p46', name: '올리브 팔레트', brand: '클리오', price: 28000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p47', name: '베이지 블러셔', brand: '캔메이크', price: 15000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
        { id: 'p48', name: '벽돌브라운 립', brand: '헤라', price: 36000, imageUrl: 'https://images.unsplash.com/photo-1618331680655-5c23b9c4d29b?w=200' },
      ],
    },
  ],
};

export function MakeupLookbook({ photoUrl, skinTone, onSelectLookbook, onBack }: MakeupLookbookProps) {
  const looks = MAKEUP_LOOKS[skinTone];

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
          <div>
            <h1 className="text-3xl font-bold text-gray-800">당신을 위한 메이크업 룩북</h1>
            <p className="text-gray-600">마음에 드는 스타일을 선택해보세요</p>
          </div>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {looks.map((look) => (
            <div
              key={look.id}
              onClick={() => onSelectLookbook(look)}
              className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={look.imageUrl}
                  alt={look.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-medium">추천 메이크업</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{look.name}</h3>
                    <p className="text-white/90">{look.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">사용 제품 {look.products.length}개</p>
                    <p className="font-semibold text-purple-600">
                      총 {look.products.reduce((sum, p) => sum + p.price, 0).toLocaleString()}원
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 group-hover:scale-105">
                    <span>자세히 보기</span>
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

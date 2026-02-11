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
  style: string; // 내추럴, 글램, 로맨틱, 볼드
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
      style: '내추럴',
      description: '따뜻한 느낌의 자연스러운 일상 메이크업',
      imageUrl: 'https://i.ibb.co/1YXQVMZZ/06310915161a11a67e61ab21940e8b25.jpg',
      steps: [
        '베이스: 피치톤 베이스를 손가락으로 톡톡 두드려 얇게 펴 발라주세요. 얼굴 중앙부터 시작해 바깥쪽으로 자연스럽게 밀착시킵니다.',
        '아이섀도: 코랄 베이지를 눈두덩 전체에, 브라운을 쌍꺼풀 라인과 눈꼬리에 그라데이션하여 자연스러운 입체감을 줍니다.',
        '블러셔: 피치 블러셔를 광대뼈 최고점에서 관자놀이 방향으로 사선으로 쓸어주며, 미소 지었을 때 볼록해지는 부분에 집중합니다.',
        '립: 코랄 핑크 립을 입술 안쪽부터 바르고 손가락으로 경계를 자연스럽게 블렌딩하여 MLBB(My Lips But Better) 효과를 연출합니다.',
      ],
      products: [
        { id: 'p1', name: '글로우 쿠션', brand: '클리오', price: 28000, imageUrl: 'https://i.ibb.co/zHndh7cL/image.jpg' },
        { id: 'p2', name: '코랄 팔레트', brand: '에뛰드', price: 35000, imageUrl: 'https://i.ibb.co/jPwcKPpL/2026-02-11-135851.png' },
        { id: 'p3', name: '피치 블러셔', brand: '페리페라', price: 12000, imageUrl: 'https://i.ibb.co/qMbsdSF9/image.jpg' },
        { id: 'p4', name: '코랄 립스틱', brand: '롬앤', price: 14000, imageUrl: 'https://i.ibb.co/KpW7G26Y/2026-02-11-140117.png' },
      ],
    },
    {
      id: 'warm-glam',
      name: '골드 글램',
      style: '글램',
      description: '화려한 골드 톤의 파티 메이크업',
      imageUrl: 'https://i.ibb.co/NgS2M571/7a542df9e84e6ll76bf03542e046c30445.jpg',
      steps: [
        '베이스: 윤광 베이스를 이마, 콧대, 턱 끝에 하이라이트처럼 발라 광채나는 글로우 피부를 만듭니다. 퍼프로 두드려 자연스럽게 흡수시킵니다.',
        '아이섀도: 골드 베이스를 눈두덩에 넓게 바르고, 글리터를 눈동자 위와 눈 앞머리에 포인트로 톡톡 올려 반짝이는 효과를 극대화합니다.',
        '아이라인: 골드 브라운 아이라인을 속눈썹 사이를 채우듯 그은 후, 눈꼬리를 3~5mm 연장하여 섹시하고 깊이있는 눈매를 연출합니다.',
        '립: 오렌지 레드 립을 립 브러시로 정확하게 바르고, 입술 중앙에 글로스를 살짝 덧발라 볼륨감 있는 립을 완성합니다.',
      ],
      products: [
        { id: 'p5', name: '글리터 베이스', brand: '정샘', price: 42000, imageUrl: 'https://i.ibb.co/XfwNDq4z/2026-02-11-135351.png' },
        { id: 'p6', name: '골드 팔레트', brand: '3CE', price: 68000, imageUrl: 'https://i.ibb.co/1W97xYc/2.jpg' },
        { id: 'p7', name: '골드 아이라이너', brand: '스틸라', price: 28000, imageUrl: 'https://i.ibb.co/1JLrmpjG/3.jpg' },
        { id: 'p8', name: ' 레드 립', brand: '맥', price: 32000, imageUrl: 'https://i.ibb.co/9myb5DdZ/2026-02-11-140247.png' },
      ],
    },
    {
      id: 'warm-romantic',
      name: '코랄 로맨틱',
      style: '로맨틱',
      description: '사랑스러운 코랄 톤 메이크업',
      imageUrl: 'https://i.ibb.co/TMw0Pswq/1b4e26c9f7f3f422ee4a0f365d8720e4.jpg',
      steps: [
        '베이스: 피치 베이스를 얼굴 전체에 얇게 펴 발라 화사하고 생기있는 피부톤을 만듭니다. 모공이 신경쓰이는 부분은 톡톡 두드려 커버합니다.',
        '아이섀도: 코랄 핑크를 눈두덩 전체에 부드럽게 펴 바르고, 진한 코랄을 쌍꺼풀 라인에 발라 러블리한 눈매를 연출합니다.',
        '블러셔: 코랄 블러셔를 광대에서 시작해 귀 쪽으로 넓게 펴 발라 혈색 좋은 얼굴을 만들고, 콧등과 이마에도 살짝 터치해 통일감을 줍니다.',
        '립: 코랄 틴트를 입술 안쪽에 발라 입술을 오므려 자연스럽게 번지게 한 뒤, 립밤으로 마무리해 촉촉하고 생기있게 마무리합니다.',
      ],
      products: [
        { id: 'p9', name: '피치 베이스', brand: '더페이스샵', price: 18000, imageUrl: 'https://i.ibb.co/6RC1QMt5/2026-02-11-135499.png' },
        { id: 'p10', name: '코랄 섀도우', brand: '3CE', price: 22000, imageUrl: 'https://i.ibb.co/SDHwV7J8/2026-02-11-135900.png' },
        { id: 'p11', name: '코랄 블러셔', brand: '캔메이크', price: 15000, imageUrl: 'https://i.ibb.co/ycJ6NdXq/1.webp' },
        { id: 'p12', name: '코랄 틴트', brand: '페리페라', price: 9000, imageUrl: 'https://i.ibb.co/ccv5xYpZ/4.jpg' },
      ],
    },
    {
      id: 'warm-bold',
      name: '오렌지 볼드',
      style: '볼드',
      description: '강렬한 오렌지 포인트 메이크업',
      imageUrl: 'https://i.ibb.co/8ngXFG8D/80436efeb9492c6970201de7edaeda90.jpg',
      steps: [
        '베이스: 매트 쿠션을 스펀지로 얇게 펴 발라 깔끔하고 세미매트한 피부 질감을 만듭니다. 과한 광은 파우더로 잡아줍니다.',
        '아이섀도: 브라운을 쌍꺼풀 라인에만 심플하게 발라 은은한 음영만 주고, 립이 포인트가 되도록 아이 메이크업은 절제합니다.',
        '블러셔: 베이지 또는 누드 블러셔를 광대에 아주 살짝만 터치하여 과하지 않게 혈색만 더해줍니다.',
        '립: 오렌지 립을 립 라이너로 윤곽을 정확히 그린 후 안쪽을 채워 매트하고 강렬한 입술을 완성합니다. 립 브러시 사용을 권장합니다.',
      ],
      products: [
        { id: 'p13', name: '매트 쿠션', brand: '정샘물', price: 35000, imageUrl: 'https://i.ibb.co/zHndh7cL/image.jpg' },
        { id: 'p14', name: '브라운 팔레트', brand: '에스쁘아', price: 28000, imageUrl: 'https://i.ibb.co/jPwcKPpL/2026-02-11-135851.png' },
        { id: 'p15', name: '누드 블러셔', brand: '3CE', price: 18000, imageUrl: 'https://i.ibb.co/1W97xYc/2.jpg' },
        { id: 'p16', name: '립틴트', brand: '헤라', price: 36000, imageUrl: 'https://i.ibb.co/gbysfDw7/2026-02-11-140218.png' },
      ],
    },
  ],
  cool: [
    {
      id: 'cool-natural',
      name: '라벤더 내추럴',
      style: '내추럴',
      description: '시원한 라벤더 톤의 일상 메이크업',
      imageUrl: 'https://i.ibb.co/QvZdycKt/1e36fd38bbb6660ab945c834e87be9ec.jpg',
      steps: [
        '베이스: 핑크톤 베이스를 손등에서 한번 덜어낸 후 피부에 톡톡 두드려 맑고 투명한 피부 톤을 만듭니다. T존은 더 얇게 발라주세요.',
        '아이섀도: 연한 라벤더를 눈두덩 전체에 넓게 바르고, 핑크 브라운을 쌍꺼풀 라인에 발라 청초하고 부드러운 눈매를 연출합니다.',
        '블러셔: 로즈 핑크 블러셔를 광대뼈 위에 원을 그리듯 둥글게 발라 생기있고 맑은 혈색을 표현합니다.',
        '립: 핑크 베이지 립을 입술 중앙에 톡톡 찍어 발라 그라데이션하고, 입술선은 흐릿하게 처리해 자연스럽게 마무리합니다.',
      ],
      products: [
        { id: 'p17', name: '스킨피팅', brand: '정샘물', price: 38000, imageUrl: 'https://i.ibb.co/zHndh7cL/image.jpg' },
        { id: 'p18', name: '라벤더 팔레트', brand: '에스쁘아', price: 8000, imageUrl: 'https://i.ibb.co/3t5LD9k/2026-02-11-135936.png' },
        { id: 'p19', name: '로즈 블러셔', brand: '클리오', price: 13000, imageUrl: 'https://i.ibb.co/qMbsdSF9/image.jpg' },
        { id: 'p20', name: '핑크베이지 립', brand: '롬앤', price: 14000, imageUrl: 'https://i.ibb.co/hFjwXVVJ/image.jpg' },
      ],
    },
    {
      id: 'cool-glam',
      name: '실버 글램',
      style: '글램',
      description: '화려한 실버 톤의 파티 메이크업',
      imageUrl: 'https://i.ibb.co/Y7gMyPpY/3e9c46d41b6d6a2691b5bee9aa950610.jpg',
      steps: [
        '베이스: 윤광 베이스를 C존(볼, 이마, 턱)에 집중 발라 투명하고 영롱한 광채를 만듭니다. 스펀지로 두드려 피부와 완벽히 밀착시킵니다.',
        '아이섀도: 실버 베이스를 눈 전체에 바른 후, 퍼플 글리터를 눈동자 위와 애교살에 포인트로 올려 화려하고 입체적인 눈을 완성합니다.',
        '아이라인: 블랙 아이라인을 눈 앞머리부터 눈꼬리까지 정확하게 그어 또렷하고 시원한 눈매를 만듭니다. 끝은 살짝 올려 고양이 눈 연출.',
        '립: 퓨샤 핑크 립을 립 브러시로 정확하게 바르고, 입술 중앙에 글로스를 덧발라 생기있고 볼륨감 있는 입술을 완성합니다.',
      ],
      products: [
        { id: 'p21', name: '듀이 베이스', brand: '맥', price: 45000, imageUrl: 'https://i.ibb.co/TxtwB5D3/2026-02-11-135414.png' },
        { id: 'p22', name: '실버 팔레트', brand: '나스', price: 72000, imageUrl: 'https://i.ibb.co/Pvk7xQjf/2026-02-11-135950.png' },
        { id: 'p23', name: '워터프루프 라이너', brand: '헤라', price: 24000, imageUrl: 'https://i.ibb.co/1JLrmpjG/3.jpg' },
        { id: 'p24', name: '퓨샤핑크 립', brand: '', price: 48000, imageUrl: 'https://i.ibb.co/NHbhc5f/2026-02-11-140406.png' },
      ],
    },
    {
      id: 'cool-romantic',
      name: '핑크 로맨틱',
      style: '로맨틱',
      description: '사랑스러운 핑크 톤 메이크업',
      imageUrl: 'https://i.ibb.co/Tqhgx6JD/38ff5a13e1e6794c68c06c51095696b3.jpg',
      steps: [
        '베이스: 핑크 베이스를 얼굴 전체에 균일하게 발라 청순하고 밝은 피부를 만듭니다. 퍼프로 가볍게 두드려 자연스러운 핑크빛을 연출합니다.',
        '아이섀도: 핑크 베이지를 눈두덩에 부드럽게 펴 바르고, 진한 핑크를 눈꼬리와 언더라인에 발라 사랑스럽고 귀여운 눈매를 완성합니다.',
        '블러셔: 핑크 블러셔를 광대에서 눈 아래까지 넓게 펴 발라 볼을 강조하고, 코끝과 이마에도 살짝 터치해 통일감 있는 핑크 메이크업을 완성합니다.',
        '립: 로즈 핑크 글로스를 입술 전체에 톡톡 바르고, 티슈로 한번 눌러 자연스럽게 정착시킨 후 다시 한번 덧발라 촉촉하고 볼륨감 있게 마무리합니다.',
      ],
      products: [
        { id: 'p25', name: '핑크 베이스', brand: '에뛰드', price: 15000, imageUrl: 'https://i.ibb.co/FbfPxfby/2026-02-11-135233.png' },
        { id: 'p26', name: '핑크베이지 섀도우', brand: '페리페라', price: 18000, imageUrl: 'https://i.ibb.co/XfLjmCpc/2026-02-11-135754.png' },
        { id: 'p27', name: '핑크 블러셔', brand: '캔메이크', price: 15000, imageUrl: 'https://i.ibb.co/R4B0jrCz/2026-02-11-135626.png' },
        { id: 'p28', name: '로즈핑크 글로스', brand: '롬앤', price: 12000, imageUrl: 'https://i.ibb.co/svPMT58w/2026-02-11-140145.png' },
      ],
    },
    {
      id: 'cool-bold',
      name: '베리 볼드',
      style: '볼드',
      description: '강렬한 베리 포인트 메이크업',
      imageUrl: 'https://i.ibb.co/SDZNsQpr/dffdf0a10be367a0f3b7b492c53e694a.jpg',
      steps: [
        '베이스: 세미매트 쿠션을 스펀지로 얇게 펴 발라 깔끔하고 정돈된 피부 질감을 만듭니다. 파우더로 T존의 유분을 잡아 오래 지속되게 합니다.',
        '아이섀도: 브라운을 쌍꺼풀 라인과 눈꼬리에만 발라 깔끔하고 정제된 눈매를 만듭니다. 립이 강조되도록 아이 메이크업은 최소화합니다.',
        '블러셔: 플럼 블러셔를 광대에 살짝만 터치해 과하지 않게 자연스러운 혈색만 더하고, 너무 넓게 펴지지 않도록 주의합니다.',
        '립: 베리 레드 립을 립 라이너로 윤곽을 정확히 그린 후 립 브러시로 채워 강렬하고 선명한 입술을 완성합니다. 티슈로 한번 누른 후 다시 덧바르면 더 오래 지속됩니다.',
      ],
      products: [
        { id: 'p29', name: '세미매트 쿠션', brand: '아이오페', price: 42000, imageUrl: 'https://i.ibb.co/zHndh7cL/image.jpg' },
        { id: 'p30', name: '브라운 팔레트', brand: '투페이스드', price: 58000, imageUrl: 'https://i.ibb.co/jPwcKPpL/2026-02-11-135851.png' },
        { id: 'p31', name: '플럼 블러셔', brand: '나스', price: 38000, imageUrl: 'https://i.ibb.co/qMbsdSF9/image.jpg' },
        { id: 'p32', name: '베리레드 립', brand: '롬앤', price: 52000, imageUrl: 'https://i.ibb.co/ccv5xYpZ/4.jpg' },
      ],
    },
  ],
  mute: [
    {
      id: 'mute-natural',
      name: '베이지 내추럴',
      style: '내추럴',
      description: '은은한 베이지 톤의 일상 메이크업',
      imageUrl: 'https://i.ibb.co/rR2KDgzT/f4be472919b735e986d7b559b0564ea4.jpg',
      steps: [
        '베이스: 뉴트럴 쿠션을 퍼프로 얼굴 전체에 골고루 두드려 발라 자연스럽고 균일한 피부 톤을 완성합니다. 중성적인 베이지 톤으로 피부 본연의 색을 살립니다.',
        '아이섀도: 연한 베이지를 베이스로 깔고, 브라운을 쌍꺼풀 라인에 그라데이션��여 은은하고 차분한 눈매를 연출합니다. 과하지 않게 자연스러운 음영을 만듭니다.',
        '블러셔: 모브 블러셔를 광대뼈에 살짝 터치하여 중성적이면서도 세련된 혈색을 더합니다. 너무 넓게 퍼뜨리지 않고 광대 중심에 집중합니다.',
        '립: MLBB(My Lips But Better) 립을 입술 전체에 발라 본래 입술 색보다 조금 더 선명한 정도로 자연스럽게 마무리합니다. 내 입술 같은 자연스러움이 포인트.',
      ],
      products: [
        { id: 'p33', name: '뉴트럴 쿠션', brand: '라네즈', price: 38000, imageUrl: 'https://i.ibb.co/b5BtBqf5/2026-02-11-153545.png' },
        { id: 'p34', name: '베이지 팔레트', brand: '에스쁘아', price: 32000, imageUrl: 'https://i.ibb.co/SDHwV7J8/2026-02-11-135900.png' },
        { id: 'p35', name: '모브 블러셔', brand: '3CE', price: 22000, imageUrl: 'https://i.ibb.co/DHzBQtMB/2026-02-11-140016.png' },
        { id: 'p36', name: 'MLBB 립', brand: '롬앤', price: 14000, imageUrl: 'https://i.ibb.co/hFQcQynH/2026-02-11-140400.png' },
      ],
    },
    {
      id: 'mute-glam',
      name: '로즈골드 글램',
      style: '글램',
      description: '화려한 로즈골드 톤 메이크업',
      imageUrl: 'https://i.ibb.co/qLNJcXDG/00bce11f3073a8827924c36e93cbdfb9.jpg',
      steps: [
        '베이스: 윤광 베이스를 이마 중앙, 코끝, 볼 위쪽에 포인트로 발라 촉촉하고 은은한 광을 만듭니다. 스펀지로 경계를 자연스럽게 블렌딩합니다.',
        '아이섀도: 로즈골드 글리터를 눈두덩 중앙과 눈동자 위에 포인트로 올려 우아하고 고급스러운 반짝임을 연출합니다. 과하지 않게 조절이 중요합니다.',
        '아이라인: 브라운 아이라인을 속눈썹 사이를 메우듯 그어 부드럽고 세련된 눈매를 만듭니다. 블랙보다 자연스럽고 뮤트톤에 잘 어울립니다.',
        '립: 누드 로즈 립을 립 브러시로 정확하게 바르고, 중앙을 살짝 덧발라 입체감을 줍니다. 세련되고 시크한 분위기를 완성합니다.',
      ],
      products: [
        { id: 'p37', name: '윤광 베이스', brand: '더페이스샵', price: 22000, imageUrl: 'https://i.ibb.co/TxtwB5D3/2026-02-11-135414.png' },
        { id: 'p38', name: '로즈골드 팔레트', brand: '후다뷰티', price: 68000, imageUrl: 'https://i.ibb.co/HfLtd7v3/2026-02-11-135603.png' },
        { id: 'p39', name: '브라운 세도', brand: '클리오', price: 18000, imageUrl: 'https://i.ibb.co/1JLrmpjG/3.jpg' },
        { id: 'p40', name: '누드로즈 립', brand: '맥', price: 32000, imageUrl: 'https://i.ibb.co/hFjwXVVJ/image.jpg' },
      ],
    },
    {
      id: 'mute-romantic',
      name: '모브 로맨틱',
      style: '로맨틱',
      description: '사랑스러운 모브 톤 메이크업',
      imageUrl: 'https://i.ibb.co/NgS2M571/7a542df9e84e6ll76bf03542e046c30445.jpg',
      steps: [
        '베이스: 내추럴 베이스를 손가락으로 톡톡 두드려 얇게 펴 발라 자연스러운 피부 톤을 유지합니다. 두껍게 바르지 않고 피부결을 살려줍니다.',
        '아이섀도: 모브 핑크를 눈두덩에 부드럽게 펴 바르고, 진한 모브를 쌍꺼풀 라인과 언더라인에 발라 사랑스럽고 로맨틱한 분위기를 만듭니다.',
        '블러셔: 모브 블러셔를 광대에서 귀 방향으로 쓸어주며 중성적이면서도 로맨틱한 혈색을 표현합니다. 콧등에도 살짝 터치해 통일감을 줍니다.',
        '립: 더스티 로즈 립을 입술 안쪽부터 바르고 손가락으로 경계를 그라데이션하여 부드럽고 로맨틱한 입술을 완성합니다. 촉촉한 질감으로 마무리합니다.',
      ],
      products: [
        { id: 'p41', name: '내추럴 베이스', brand: '에뛰드', price: 15000, imageUrl: 'https://i.ibb.co/XfwNDq4z/2026-02-11-135351.png' },
        { id: 'p42', name: '모브핑크 섀도우', brand: '페리페라', price: 18000, imageUrl: 'https://i.ibb.co/69jsVS5/2026-02-11-135724.png' },
        { id: 'p43', name: '모브 블러셔', brand: '3CE', price: 22000, imageUrl: 'https://i.ibb.co/ycJ6NdXq/1.webp' },
        { id: 'p44', name: '더스티로즈 립', brand: '롬앤', price: 14000, imageUrl: 'https://i.ibb.co/svPMT58w/2026-02-11-140145.png' },
      ],
    },
    {
      id: 'mute-bold',
      name: '모브 볼드',
      style: '볼드',
      description: '강렬한 모드 뉴트 포인트 메이크업',
      imageUrl: 'https://i.ibb.co/PzrkLgcC/93a31a2b587db7657f95f22919987ccd.jpg',
      steps: [
        '베이스: 매트 쿠션을 스펀지로 얇고 균일하게 펴 발라 세미매트한 고급스러운 피부 질감을 만듭니다. 파우더로 T존을 고정해 오래 지속되게 합니다.',
        '아���섀도: 올리브 브라운으로 눈두덩 전체에 스모키하게 발라 깊이있고 모던한 눈매를 연출합니다. 눈꼬리까지 충분히 연장해 시크한 분위기를 강조합니다.',
        '블러셔: 베이지 블러셔를 광대에 아주 살짝만 터치해 과하지 않게 자연스러운 음영만 더합니다. 립이 포인트가 되도록 절제된 블러셔 사용.',
        '립: 누드 브라운 립을 립 라이너로 정확하게 윤곽을 그린 후 채워 강렬하고 모던한 입술을 완성합니다. 매트한 질감으로 시크한 분위기를 극대화합니다.',
      ],
      products: [
        { id: 'p45', name: '매트 쿠션', brand: '정샘물', price: 35000, imageUrl: 'https://i.ibb.co/0y9jdym0/2026-02-11-153456.png' },
        { id: 'p46', name: '올리브 팔레트', brand: '클리오', price: 28000, imageUrl: 'https://i.ibb.co/jPwcKPpL/2026-02-11-135851.png' },
        { id: 'p47', name: '베이지 블러셔', brand: '맥', price: 15000, imageUrl: 'https://i.ibb.co/1W97xYc/2.jpg' },
        { id: 'p48', name: '누드 립', brand: '헤라', price: 36000, imageUrl: 'https://i.ibb.co/KpW7G26Y/2026-02-11-140117.png' },
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
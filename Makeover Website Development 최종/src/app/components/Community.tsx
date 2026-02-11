import { useState } from 'react';
import { Heart, Upload, TrendingUp, Clock, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CommunityPost {
  id: string;
  userName: string;
  userAvatar: string;
  imageUrl: string;
  lookName: string;
  likes: number;
  timestamp: Date;
  products: string[];
}

const MOCK_POSTS: CommunityPost[] = [
  {
    id: '1',
    userName: '지수',
    userAvatar: 'https://images.unsplash.com/photo-1569913486515-b74bf7751574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDc5NDMwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imageUrl: 'https://i.ibb.co/SDPqbCMn/7a542df9e84e676bf03542e046c30445.jpg',
    lookName: '골드 글램',
    likes: 234,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    products: ['글리터 베이스', '골드 팔레트', '오렌지 레드 립'],
  },
  {
    id: '2',
    userName: '민지',
    userAvatar: 'https://images.unsplash.com/photo-1542488410-b822d8fdb272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGNsb3NldXB8ZW58MXx8fHwxNzcwNzEyNjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imageUrl: 'https://i.ibb.co/vxTNx4rM/da538f6ab0023339faded04c2bcfa45d.jpg',
    lookName: '핑크 로맨틱',
    likes: 189,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    products: ['핑크 베이스', '핑크베이지 섀도우', '로즈핑크 글로스'],
  },
  {
    id: '3',
    userName: '하린',
    userAvatar: 'https://images.unsplash.com/photo-1626781218283-4c596bc11588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwYmVhdXR5JTIwcG9ydHJhaXQlMjBmYWNlfGVufDF8fHx8MTc3MDc5NDMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imageUrl: 'https://i.ibb.co/DD8WKXBF/182c2191a29e89a985fb711244eb8543.jpg',
    lookName: '내추럴 데일리',
    likes: 156,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    products: ['글로우 쿠션', '코랄 팔레트', '피치 블러셔'],
  },
  {
    id: '4',
    userName: '수진',
    userAvatar: 'https://images.unsplash.com/photo-1569913486515-b74bf7751574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDc5NDMwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imageUrl: 'https://i.ibb.co/TMw0Pswq/1b4e26c9f7f3f422ee4a0f365d8720e4.jpg',
    lookName: '베이지 내추럴',
    likes: 142,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    products: ['뉴트럴 쿠션', '베이지 팔레트', 'MLBB 립'],
  },
  {
    id: '5',
    userName: '유나',
    userAvatar: 'https://images.unsplash.com/photo-1542488410-b822d8fdb272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGNsb3NldXB8ZW58MXx8fHwxNzcwNzEyNjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imageUrl: 'https://i.ibb.co/Y7gMyPpY/3e9c46d41b6d6a2691b5bee9aa950610.jpg',
    lookName: '코랄 로맨틱',
    likes: 128,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    products: ['피치 베이스', '코랄 섀도우', '코랄 틴트'],
  },
  {
    id: '6',
    userName: '서연',
    userAvatar: 'https://images.unsplash.com/photo-1626781218283-4c596bc11588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwYmVhdXR5JTIwcG9ydHJhaXQlMjBmYWNlfGVufDF8fHx8MTc3MDc5NDMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imageUrl: 'https://i.ibb.co/NgS2M571/7a542df9e84e6ll76bf03542e046c30445.jpg',
    lookName: '라벤더 내추럴',
    likes: 95,
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
    products: ['핑크 쿠션', '라벤더 팔레트', '핑크베이지 립'],
  },
];

export function Community() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'trending' | 'recent'>('trending');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [lookName, setLookName] = useState('');
  const [productsText, setProductsText] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !lookName) {
      alert('사진과 룩북 이름을 입력해주세요!');
      return;
    }

    const products = productsText.split(',').map(p => p.trim()).filter(p => p);
    
    const newPost: CommunityPost = {
      id: `${Date.now()}`,
      userName: '나',
      userAvatar: 'https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=100',
      imageUrl: previewUrl,
      lookName: lookName,
      likes: 0,
      timestamp: new Date(),
      products: products.length > 0 ? products : ['업로드된 제품'],
    };

    setPosts([newPost, ...posts]);
    
    // 초기화
    setUploadModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl('');
    setLookName('');
    setProductsText('');
    alert('업로드가 완료되었습니다! 🎉');
  };

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    const isLiked = likedPosts.has(postId);

    if (isLiked) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }

    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + (isLiked ? -1 : 1) } : post
      )
    );
    setLikedPosts(newLikedPosts);
  };

  const getTimeAgo = (timestamp: Date) => {
    const hours = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return '방금 전';
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'trending') {
      return b.likes - a.likes;
    }
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  const topPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">커뮤니티 갤러리</h1>
          <p className="text-gray-600">구매한 제품으로 메이크업한 결과를 공유하세요!</p>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            <span>내 메이크업 업로드</span>
          </button>
        </div>

        {/* Top Ranking */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-800">이번 주 TOP 3</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPosts.map((post, index) => (
              <div key={post.id} className="relative group cursor-pointer">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <ImageWithFallback
                    src={post.imageUrl}
                    alt={post.userName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {index + 1}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <p className="font-bold">{post.userName}</p>
                      <p className="text-sm text-white/90">{post.lookName}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        <span className="text-sm font-semibold">{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setSortBy('trending')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              sortBy === 'trending'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>인기순</span>
          </button>
          <button
            onClick={() => setSortBy('recent')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              sortBy === 'recent'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>최신순</span>
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageWithFallback
                  src={post.imageUrl}
                  alt={post.userName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={post.userAvatar}
                      alt={post.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{post.userName}</p>
                    <p className="text-xs text-gray-500">{getTimeAgo(post.timestamp)}</p>
                  </div>
                </div>

                <p className="text-sm font-medium text-gray-700 mb-2">{post.lookName}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {post.products.slice(0, 2).map((product, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full"
                    >
                      {product}
                    </span>
                  ))}
                  {post.products.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      +{post.products.length - 2}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 w-full py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedPosts.has(post.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                  <span className="font-semibold text-gray-700">{post.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">메이크업 업로드</h3>

              <label htmlFor="file-upload" className="block cursor-pointer">
                <div className="border-4 border-dashed border-purple-200 rounded-2xl p-8 mb-6 hover:border-purple-400 transition-colors">
                  {previewUrl ? (
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white font-semibold">다른 사진 선택</p>
                        </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                        <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                        <p className="font-semibold text-gray-700 mb-1">사진 선택</p>
                        <p className="text-sm text-gray-500">구매한 제품으로 메이크업한 사진</p>
                    </div>
                  )}
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="사용한 룩북 이름"
                  value={lookName}
                  onChange={(e) => setLookName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 outline-none transition-colors"
                />
                <textarea
                  placeholder="사용한 제품들 (쉼표로 구분)"
                  value={productsText}
                  onChange={(e) => setProductsText(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setUploadModalOpen(false);
                    setSelectedFile(null);
                    setPreviewUrl('');
                    setLookName('');
                    setProductsText('');
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleUpload}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  업로드
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
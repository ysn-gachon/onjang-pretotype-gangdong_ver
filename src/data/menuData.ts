import { MenuItem, RecommendedSet } from '../types/menu';

export const menuData: MenuItem[] = [
  // 암사 종합시장
  // 암사 수제핫바
  { id: 'amsa-hotba-1', name: '고추핫바', price: 2300, vendor: '암사 수제핫바', market: '암사 종합시장', image: '/암사시장_assets/암사 수제 핫바/핫바.jpg' },
  { id: 'amsa-hotba-2', name: '새우핫바', price: 2300, vendor: '암사 수제핫바', market: '암사 종합시장', image: '/암사시장_assets/암사 수제 핫바/핫바.jpg' },
  { id: 'amsa-hotba-3', name: '왕소세지핫바', price: 2900, vendor: '암사 수제핫바', market: '암사 종합시장', image: '/암사시장_assets/암사 수제 핫바/핫바.jpg' },
  { id: 'amsa-hotba-4', name: '문어 오징어 핫바', price: 2900, vendor: '암사 수제핫바', market: '암사 종합시장', image: '/암사시장_assets/암사 수제 핫바/핫바.jpg' },
  { id: 'amsa-hotba-5', name: '떡핫바', price: 1700, vendor: '암사 수제핫바', market: '암사 종합시장', image: '/암사시장_assets/암사 수제 핫바/핫바.jpg' },
  { id: 'amsa-hotba-6', name: '깻잎 핫바', price: 1700, vendor: '암사 수제핫바', market: '암사 종합시장', image: '/암사시장_assets/암사 수제 핫바/핫바.jpg' },
  { id: 'amsa-hotba-7', name: '맛살 핫바', price: 1700, vendor: '암사 수제핫바', market: '암사 종합시장', image: '/암사시장_assets/암사 수제 핫바/핫바.jpg' },
  { id: 'amsa-hotba-8', name: '김말이 핫바', price: 1700, vendor: '암사 수제핫바', market: '암사 종합시장', image: '/암사시장_assets/암사 수제 핫바/핫바.jpg' },

  // 핫떡
  { id: 'hot-ddeok-1', name: '떡볶이', price: 4600, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/떡볶이.jpg' },
  { id: 'hot-ddeok-2', name: '순대', price: 5800, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/순대.jpg' },
  { id: 'hot-ddeok-3', name: '오뎅', price: 1200, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/오뎅.jpg' },
  { id: 'hot-ddeok-4', name: '핫도그', price: 3500, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/핫도그.jpg' },
  { id: 'hot-ddeok-5', name: '치즈김밥', price: 5800, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/김밥.jpg' },
  { id: 'hot-ddeok-6', name: '참치김밥', price: 6900, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/김밥.jpg' },
  { id: 'hot-ddeok-7', name: '날치알김밥', price: 8100, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/김밥.jpg' },
  { id: 'hot-ddeok-8', name: '탕수육', price: 8100, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/탕수육.jpg',
    options: [
      { label: '소', delta: 0 },
      { label: '중', delta: 8100 },
      { label: '대', delta: 15000 }
    ]
  },
  { id: 'hot-ddeok-9', name: '김말이', price: 1200, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/김말이.jpg' },
  { id: 'hot-ddeok-10', name: '고구마튀김', price: 1200, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/고구마 튀김.jpg' },
  { id: 'hot-ddeok-11', name: '야채튀김', price: 1200, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/야채튀김.jpg' },
  { id: 'hot-ddeok-12', name: '납작만두', price: 1200, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/만두 튀김.jpg' },
  { id: 'hot-ddeok-13', name: '오징어튀김', price: 1200, vendor: '핫떡', market: '암사 종합시장', image: '/암사시장_assets/핫떡/오징어 튀김.jpg' },

  // 암사족
  { id: 'amsa-jok-1', name: '족발', price: 15000, vendor: '암사 최강 족발', market: '암사 종합시장', image: '/암사시장_assets/암사 최강 족발/족발.jpg',
    options: [
        { label: '미니족', delta: 0 },
        { label: '중', delta: 15000 },
        { label: '대', delta: 19600 }
    ]
  },

  // 암사 통큰 오리
  { id: 'amsa-tong-ori-1', name: '통오리바베큐', price: 15500, vendor: '암사 통큰 오리', market: '암사 종합시장', image: '/암사시장_assets/암사 통큰 오리/통오리 바베큐.jpg' },
  { id: 'amsa-tong-ori-2', name: '통삼겹살', price: 17300, vendor: '암사 통큰 오리', market: '암사 종합시장', image: '/암사시장_assets/암사 통큰 오리/통 삼겹살.jpg' },

  // 암사 통닭
  { id: 'amsa-tongdak-1', name: '옛날 통닭', price: 9800, vendor: '암사 통닭', market: '암사 종합시장', image: '/암사시장_assets/암사 통닭/옛날통닭.jpg' },
  { id: 'amsa-tongdak-2', name: '닭강정', price: 4600, vendor: '암사 통닭', market: '암사 종합시장', image: '/암사시장_assets/암사 통닭/양념 닭강정.jpg',
    options: [
      { label: '컵', delta: 0 },
      { label: '중', delta: 4600 },
      { label: '대', delta: 12700 }
    ]
  },

  // 길동복조리시장
  // 복조리 족발
  { id: 'bokjori-jokbal-1', name: '족발', price: 15000, vendor: '복조리 족발', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 족발/족발.jpg',
    options: [
        { label: '미니족', delta: 0 },
        { label: '중', delta: 15000 },
        { label: '대', delta: 19600 }
    ]
  },

  // 복조리 숯불 통오리
  { id: 'bokjori-tongori-1', name: '숯불오리바베큐', price: 13800, vendor: '복조리 숯불 통오리', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 숯불 통오리/숯불오리바베큐.jpg' },
  { id: 'bokjori-tongori-2', name: '통삼겹살', price: 17300, vendor: '복조리 숯불 통오리', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 숯불 통오리/숯불 삼겹살.jpg' },
  { id: 'bokjori-tongori-3', name: '떡갈비 5개', price: 11500, vendor: '복조리 숯불 통오리', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 숯불 통오리/떡갈비 5개.jpg' },
  { id: 'bokjori-tongori-4', name: '민물 장어구이', price: 11500, vendor: '복조리 숯불 통오리', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 숯불 통오리/민물장어구이.jpg',
    options: [
      { label: '2마리', delta: 0 },
      { label: '3마리', delta: 4600 }
    ]
  },

  // 길동 떡볶이
  { id: 'gildong-ddeokbokki-1', name: '떡볶이', price: 4600, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/떡볶이.jpg' },
  { id: 'gildong-ddeokbokki-2', name: '순대', price: 5800, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/순대.jpg' },
  { id: 'gildong-ddeokbokki-3', name: '오뎅', price: 1200, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/어묵.jpg' },
  { id: 'gildong-ddeokbokki-4', name: '핫도그', price: 3500, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/핫도그.jpg' },
  { id: 'gildong-ddeokbokki-5', name: '야채김밥', price: 5200, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/김밥.jpg' },
  { id: 'gildong-ddeokbokki-6', name: '치즈김밥', price: 5800, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/김밥.jpg' },
  { id: 'gildong-ddeokbokki-7', name: '참치김밥', price: 6900, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/김밥.jpg' },
  { id: 'gildong-ddeokbokki-8', name: '김말이', price: 1200, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/김말이.jpg' },
  { id: 'gildong-ddeokbokki-9', name: '야채튀김', price: 1200, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/야채튀김.jpg' },
  { id: 'gildong-ddeokbokki-10', name: '오징어튀김', price: 1200, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/오징어 튀김.jpg' },
  { id: 'gildong-ddeokbokki-11', name: '새우튀김', price: 1200, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/새우튀김.jpg' },
  { id: 'gildong-ddeokbokki-12', name: '계란튀김', price: 1200, vendor: '길동 떡볶이', market: '길동 복조리 시장', image: '/길동복조리시장_assets/길동 떡볶이/계란튀김.jpg' },

  // 복조리 전집
  { id: 'bokjori-jeon-1', name: '김치전 한장', price: 3500, vendor: '복조리 전집', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 전집/김치전 한장.png' },
  { id: 'bokjori-jeon-2', name: '부추전 한장', price: 3500, vendor: '복조리 전집', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 전집/부추전 한장.png' },
  { id: 'bokjori-jeon-3', name: '소고기 육전 400g', price: 13800, vendor: '복조리 전집', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 전집/소고기 육전(400g).png' },
  { id: 'bokjori-jeon-4', name: '애호박전 400g', price: 13800, vendor: '복조리 전집', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 전집/애호박전(400g).png' },
  { id: 'bokjori-jeon-5', name: '새송이전 400g', price: 13800, vendor: '복조리 전집', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 전집/새송이전 (400 g).png' },

  // 복조리 통닭
  { id: 'bokjori-tongdak-1', name: '옛날 통닭', price: 9800, vendor: '복조리 통닭', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 통닭/옛날통닭.jpg' },
  { id: 'bokjori-tongdak-2', name: '닭강정', price: 4600, vendor: '복조리 통닭', market: '길동 복조리 시장', image: '/길동복조리시장_assets/복조리 통닭/양념 닭강정.jpg',
    options: [
      { label: '컵', delta: 0 },
      { label: '중', delta: 4600 },
      { label: '대', delta: 12700 }
    ]
  },

  // 부부곱창
  { id: 'bubu-gopchang-1', name: '곱창볶음', price: 10400, vendor: '부부곱창', market: '길동 복조리 시장', image: '/길동복조리시장_assets/부부 곱창/곱창순대볶음.jpg' },
  { id: 'bubu-gopchang-2', name: '순대볶음', price: 10400, vendor: '부부곱창', market: '길동 복조리 시장', image: '/길동복조리시장_assets/부부 곱창/곱창순대볶음.jpg' },
  { id: 'bubu-gopchang-3', name: '순대곱창', price: 10400, vendor: '부부곱창', market: '길동 복조리 시장', image: '/길동복조리시장_assets/부부 곱창/곱창순대볶음.jpg' },
  { id: 'bubu-gopchang-4', name: '무뼈닭발', price: 9200, vendor: '부부곱창', market: '길동 복조리 시장', image: '/길동복조리시장_assets/부부 곱창/무뼈닭발.jpg' },
  { id: 'bubu-gopchang-5', name: '돼지껍데기', price: 8100, vendor: '부부곱창', market: '길동 복조리 시장', image: '/길동복조리시장_assets/부부 곱창/돼지껍데기.jpg' },
  { id: 'bubu-gopchang-6', name: '오돌뼈', price: 8100, vendor: '부부곱창', market: '길동 복조리 시장', image: '/길동복조리시장_assets/부부 곱창/오돌뼈.jpg' },
];

export const recommendedSets: RecommendedSet[] = [
  // 암사시장 세트
  {
    id: 'amsa-set-1',
    name: '암사 핫바&핫도그 세트',
    price: 22000,
    emoji: '🌭',
    description: '간단 야식/간식용',
    items: ['왕소세지핫바 2개', '문어 오징어 핫바 2개', '떡핫바 1개', '깻잎핫바 1개', '핫도그 2개'],
    image: '/암사시장_assets/암사_세트/암사 핫바_핫도그 세트.png'
  },
  {
    id: 'amsa-set-2',
    name: '암사 치킨&족발 안주 세트',
    price: 24700,
    emoji: '🍗',
    description: '2~3인 안주 세트',
    items: ['미니족 1개', '옛날 통닭 1마리'],
    image: '/암사시장_assets/암사_세트/암사 치킨_족발 안주 세트.png'
  },
  {
    id: 'amsa-set-3',
    name: '암사 분식 2인 세트',
    price: 25000,
    emoji: '🍢',
    description: '매콤+든든 기본 조합',
    items: ['떡볶이 1인분', '순대 1인분', '치즈김밥 1줄', '김말이 1개', '고구마튀김 1개', '오징어튀김 1개', '고추핫바 1개', '새우핫바 1개'],
    image: '/암사시장_assets/암사_세트/암사 분식 2인 세트.png'
  },
  {
    id: 'amsa-set-4',
    name: '암사 통닭 야식 세트',
    price: 27000,
    emoji: '🍗',
    description: '치킨+분식 조합',
    items: ['옛날 통닭 1마리', '떡볶이 1인분', '오뎅 2개', '김말이 2개'],
    image: '/암사시장_assets/암사_세트/암사 통닭 야식 세트.png'
  },
  {
    id: 'amsa-set-5',
    name: '암사 미니족 간편 세트',
    price: 29000,
    emoji: '🍖',
    description: '족발+국물+튀김 스낵',
    items: ['미니족 1개', '오뎅 2개', '김말이 1개', '야채튀김 1개', '납작만두 1개'],
    image: '/암사시장_assets/암사_세트/암사 미니족 간편 세트.png'
  },
  {
    id: 'amsa-set-6',
    name: '암사 통닭&족발 세트',
    price: 33000,
    emoji: '🍖',
    description: '통닭과 족발을 한번에',
    items: ['미니족 1개', '옛날 통닭 1마리', '오뎅 2개'],
    image: '/암사시장_assets/암사_세트/암사 통닭_족발 세트.png'
  },
  {
    id: 'amsa-set-7',
    name: '암사 족발&분식 3인 세트',
    price: 35000,
    emoji: '🍱',
    description: '푸짐한 3인분 세트',
    items: ['미니족 1개', '떡볶이 1인분', '순대 1인분', '김말이 1개', '고구마튀김 1개', '오징어튀김 1개', '참치김밥 1줄'],
    image: '/암사시장_assets/암사_세트/암사 족발_분식 3인 세트.png'
  },
  {
    id: 'amsa-set-8',
    name: '암사 오리바베큐 세트',
    price: 38000,
    emoji: '🦆',
    description: '오리바베큐와 분식',
    items: ['통오리바베큐 1마리', '떡볶이 1인분', '순대 1인분', '김말이 1개', '야채튀김 1개'],
    image: '/암사시장_assets/암사_세트/암사 오리바베큐 세트.png'
  },
  {
    id: 'amsa-set-9',
    name: '가족 족발+분식 세트',
    price: 42500,
    emoji: '👨‍👩‍👧‍👦',
    description: '3~4인 가족 추천',
    items: ['족발(중) 1개', '떡볶이 1인분', '탕수육(소) 1개'],
    image: '/암사시장_assets/암사_세트/가족 족발_분식 세트.png'
  },
  {
    id: 'amsa-set-10',
    name: '암사 가족모임 세트',
    price: 49900,
    emoji: '🎉',
    description: '풍성한 가족 모임',
    items: ['족발(중) 1개', '통오리바베큐 1마리', '떡볶이 1인분', '김말이 1개', '고구마튀김 1개'],
    image: '/암사시장_assets/암사_세트/암사 가족모임 세트.png'
  },

  // 길동복조리시장 세트
  {
    id: 'gildong-set-1',
    name: '길동 분식 2인 세트',
    price: 23000,
    emoji: '🍢',
    description: '분식의 정석',
    items: ['떡볶이 1인분', '순대 1인분', '김말이 1개', '야채튀김 1개', '오징어튀김 1개', '야채김밥 1줄'],
    image: '/길동복조리시장_assets/길동복조리_세트/길동 분식 2인 세트.png'
  },
  {
    id: 'gildong-set-2',
    name: '소주각 야시장 세트',
    price: 26400,
    emoji: '🍶',
    description: '2~3인 술안주',
    items: ['곱창볶음 1인분', '무뼈닭발 1인분', '김치전 1장', '부추전 1장'],
    image: '/길동복조리시장_assets/길동복조리_세트/소주각 야시장 세트.png'
  },
  {
    id: 'gildong-set-3',
    name: '든든 점심 오리 세트',
    price: 25300,
    emoji: '🦆',
    description: '2인 점심 추천',
    items: ['통오리바베큐 1마리', '야채김밥 1줄', '떡볶이 1인분'],
    image: '/길동복조리시장_assets/길동복조리_세트/든든 점심 오리 세트.png'
  },
  {
    id: 'gildong-set-4',
    name: '곱창 야식 세트',
    price: 28000,
    emoji: '🌙',
    description: '야식으로 딱!',
    items: ['곱창볶음 1인분', '돼지껍데기 1인분', '오뎅 2개', '김치전 1장'],
    image: '/길동복조리시장_assets/길동복조리_세트/곱창 야식 세트.png'
  },
  {
    id: 'gildong-set-5',
    name: '오리&떡갈비 2인 세트',
    price: 29000,
    emoji: '🍖',
    description: '고기 매니아 추천',
    items: ['숯불오리바베큐 1마리', '떡갈비 5개', '오뎅 2개'],
    image: '/길동복조리시장_assets/길동복조리_세트/오리_떡갈비 2인 세트.png'
  },
  {
    id: 'gildong-set-6',
    name: '맥주안주 모듬 세트',
    price: 31200,
    emoji: '🍺',
    description: '2~3인 맥주 안주',
    items: ['통삼겹살 1인분', '닭강정(중) 1개', '새우튀김 2개', '계란튀김 2개'],
    image: '/길동복조리시장_assets/길동복조리_세트/맥주안주 모듬 세트.png'
  },
  {
    id: 'gildong-set-7',
    name: '전&곱창 세트',
    price: 33000,
    emoji: '🥢',
    description: '전과 곱창의 조화',
    items: ['순대곱창 1인분', '김치전 1장', '부추전 1장', '오뎅 2개', '오징어튀김 1개', '새우튀김 1개'],
    image: '/길동복조리시장_assets/길동복조리_세트/전_곱창 세트.png'
  },
  {
    id: 'gildong-set-8',
    name: '복조리 족발&분식 3인 세트',
    price: 35000,
    emoji: '🍱',
    description: '3인분 족발 분식',
    items: ['미니족 1개', '떡볶이 1인분', '순대 1인분', '김말이 1개', '새우튀김 1개', '계란튀김 1개'],
    image: '/길동복조리시장_assets/길동복조리_세트/복조리 족발_분식 3인 세트.png'
  },
  {
    id: 'gildong-set-9',
    name: '오리&장어 세트',
    price: 37000,
    emoji: '🐉',
    description: '보양식 세트',
    items: ['숯불오리바베큐 1마리', '민물 장어구이 3마리', '떡볶이 1인분'],
    image: '/길동복조리시장_assets/길동복조리_세트/오리_장어 세트.png'
  },
  {
    id: 'gildong-set-10',
    name: '복조리 가족모임 세트',
    price: 49900,
    emoji: '🎉',
    description: '온가족이 함께',
    items: ['족발(중) 1개', '통삼겹살 1인분', '떡볶이 1인분', '김치전 1장'],
    image: '/길동복조리시장_assets/길동복조리_세트/복조리 가족모임 세트.png'
  }
];

export const markets = ['길동 복조리 시장', '암사 종합시장'];
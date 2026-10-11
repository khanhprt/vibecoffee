import { assetUrl } from "../utils/assetUrl.js";

export const cafes = [
  {
    id: "cafe-1",
    name: "Pink Pixel Brew",
    address: "12 Dinh Tien Hoang, Hoan Kiem, Ha Noi",
    lat: 21.0286,
    lng: 105.8524,
    distance: "123 m",
    distanceMeters: 123,
    rating: 4.9,
    reviews: 428,
    priceRange: "45k - 85k",
    openHours: "07:00 - 22:30",
    phone: "024 8888 1201",
    signature: "Cold brew hoa hong",
    description: "Quan nhin ra Ho Guom, hop chup anh va ngoi lam viec buoi sang.",
    vibes: ["view-dep", "yen-tinh", "lam-viec"],
    coverUrl: assetUrl("profile-coffee-garden.png")
  },
  {
    id: "cafe-2",
    name: "Cong Ca Phe Nha Tho",
    address: "27 Nha Tho, Hoan Kiem, Ha Noi",
    lat: 21.0289,
    lng: 105.8492,
    distance: "650 m",
    distanceMeters: 650,
    rating: 4.7,
    reviews: 610,
    priceRange: "39k - 79k",
    openHours: "07:30 - 23:00",
    phone: "024 8888 2702",
    signature: "Bac xiu cot dua",
    description: "Goc vintage quen thuoc, nhieu ban gan cua so va anh sang dep.",
    vibes: ["vintage", "view-dep", "do-uong-ngon"],
    coverUrl: assetUrl("bottom-left-coffee-scene.png")
  },
  {
    id: "cafe-3",
    name: "Lofita Trang Tien",
    address: "30A Trang Tien, Hoan Kiem, Ha Noi",
    lat: 21.0249,
    lng: 105.8572,
    distance: "1.2 km",
    distanceMeters: 1200,
    rating: 4.8,
    reviews: 336,
    priceRange: "55k - 120k",
    openHours: "08:00 - 22:00",
    phone: "024 8888 3003",
    signature: "Latte kem muoi",
    description: "Tang cao, nhieu goc song ao va nhin ve khu trung tam.",
    vibes: ["song-ao", "view-dep", "khong-gian-rong"],
    coverUrl: assetUrl("home-hero-composite.png")
  },
  {
    id: "cafe-4",
    name: "The Note Coffee",
    address: "64 Luong Van Can, Hoan Kiem, Ha Noi",
    lat: 21.0315,
    lng: 105.8506,
    distance: "850 m",
    distanceMeters: 850,
    rating: 4.6,
    reviews: 278,
    priceRange: "40k - 90k",
    openHours: "08:00 - 23:00",
    phone: "024 8888 6404",
    signature: "Ca phe trung",
    description: "Tuong giay note day mau sac, rat hop de check-in cung ban be.",
    vibes: ["sticker", "doc-dao", "check-in-hot"],
    coverUrl: assetUrl("profile-hoan-kiem-cover.png")
  },
  {
    id: "cafe-5",
    name: "Tang Tret Slow Bar",
    address: "8 Chan Cam, Hoan Kiem, Ha Noi",
    lat: 21.0294,
    lng: 105.8469,
    distance: "2.1 km",
    distanceMeters: 2100,
    rating: 4.5,
    reviews: 248,
    priceRange: "50k - 95k",
    openHours: "07:00 - 21:30",
    phone: "024 8888 0805",
    signature: "Pour over Da Lat",
    description: "Khong gian nho, yen, hop doc sach va lam viec tap trung.",
    vibes: ["yen-tinh", "lam-viec", "do-uong-ngon"],
    coverUrl: assetUrl("about-cafe-scene.png")
  },
  {
    id: "cafe-6",
    name: "Ho Tay Sunset Beans",
    address: "15 Tu Hoa, Tay Ho, Ha Noi",
    lat: 21.0601,
    lng: 105.8292,
    distance: "3.8 km",
    distanceMeters: 3800,
    rating: 4.8,
    reviews: 402,
    priceRange: "55k - 110k",
    openHours: "06:30 - 22:00",
    phone: "024 8888 1506",
    signature: "Espresso tonic",
    description: "Ban cong huong ho, dep nhat luc hoang hon.",
    vibes: ["ho-tay", "view-dep", "chill"],
    coverUrl: assetUrl("map-ho-tay-pixel.png")
  }
];

export const quests = [
  {
    id: "q1",
    code: "FIRST_SIP",
    title: "First Sip",
    description: "Check-in quan dau tien",
    progress: 0,
    target: 1,
    rewardPoints: 10,
    reward: "10 diem",
    voucher: null
  },
  {
    id: "q2",
    code: "EXPLORER",
    title: "Explorer",
    description: "Check-in 3 quan khac nhau o Ha Noi",
    progress: 1,
    target: 3,
    rewardPoints: 50,
    reward: "50 diem + voucher 30k",
    voucher: "VIBE30"
  },
  {
    id: "q3",
    code: "EARLY_BIRD",
    title: "Early Bird",
    description: "Check-in truoc 9h sang",
    progress: 0,
    target: 1,
    rewardPoints: 20,
    reward: "20 diem",
    voucher: null
  },
  {
    id: "q4",
    code: "PHOTO_LOVER",
    title: "Photographer",
    description: "Dang 5 anh check-in co vibe",
    progress: 2,
    target: 5,
    rewardPoints: 80,
    reward: "Voucher 50k",
    voucher: "SNAP50"
  },
  {
    id: "q5",
    code: "SOCIAL_BUTTERFLY",
    title: "Social Butterfly",
    description: "Theo doi 3 ban cung gu ca phe",
    progress: 2,
    target: 3,
    rewardPoints: 40,
    reward: "40 diem",
    voucher: null
  }
];

export const leaderboard = [
  { id: "u1", rank: 1, username: "bean.master", level: 25, badge: "Legend", checkins: 1248, quests: 42, points: 5860, tone: "gold" },
  { id: "u2", rank: 2, username: "coffee.love", level: 18, badge: "Explorer", checkins: 892, quests: 31, points: 4120, tone: "blue" },
  { id: "u3", rank: 3, username: "hanoicafe", level: 17, badge: "Explorer", checkins: 756, quests: 29, points: 3860, tone: "coral" },
  { id: "u4", rank: 4, username: "latte.girl", level: 16, badge: "Explorer", checkins: 682, quests: 28, points: 3420, tone: "pink" },
  { id: "u5", rank: 5, username: "cappu.holic", level: 15, badge: "Explorer", checkins: 641, quests: 25, points: 3210, tone: "coral" },
  { id: "u6", rank: 6, username: "matcha.day", level: 14, badge: "Explorer", checkins: 598, quests: 24, points: 2980, tone: "mint" },
  { id: "u7", rank: 7, username: "chill.brew", level: 13, badge: "Wanderer", checkins: 554, quests: 22, points: 2760, tone: "pink" },
  { id: "u8", rank: 8, username: "saigon.coffee", level: 13, badge: "Wanderer", checkins: 521, quests: 20, points: 2605, tone: "coral" },
  { id: "u9", rank: 9, username: "vietnam.beans", level: 12, badge: "Wanderer", checkins: 497, quests: 19, points: 2485, tone: "mint" },
  { id: "u10", rank: 10, username: "cafe.traveler", level: 11, badge: "Wanderer", checkins: 468, quests: 18, points: 2340, tone: "pink" },
  { id: "me", rank: 12, username: "admin", level: 14, badge: "Explorer", checkins: 42, quests: 12, points: 5860, tone: "gold" }
];

export const profilePhotos = [
  { id: "p1", url: assetUrl("profile-coffee-garden.png"), caption: "Vuon ca phe cuoi tuan", likes: 32, cafeId: "cafe-1" },
  { id: "p2", url: assetUrl("profile-hoan-kiem-cover.png"), caption: "Nang som Ho Guom", likes: 28, cafeId: "cafe-1" },
  { id: "p3", url: assetUrl("home-hero-composite.png"), caption: "Quan quen cua team", likes: 41, cafeId: "cafe-3" },
  { id: "p4", url: assetUrl("bottom-left-coffee-scene.png"), caption: "Goc nho rat chill", likes: 19, cafeId: "cafe-2" }
];

export const vouchers = [
  { id: "v1", code: "VIBE30", title: "Giam 30k cho ly tiep theo", discount: 30000, minSpend: 80000, used: false },
  { id: "v2", code: "SNAP50", title: "Voucher 50k cho Photo Master", discount: 50000, minSpend: 120000, used: false }
];

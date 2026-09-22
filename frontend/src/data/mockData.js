export const cafes = [
  {
    id: "cafe-1",
    name: "The Coffee House",
    address: "123 Nguyen Hue, Ha Noi",
    lat: 21.0286,
    lng: 105.8524,
    distance: "123 m",
    rating: 4.8,
    reviews: 320,
    vibes: ["view-dep", "yen-tinh", "wifi-manh"],
    coverUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cafe-2",
    name: "Cong Ca Phe",
    address: "27 Nha Tho, Hoan Kiem",
    lat: 21.0289,
    lng: 105.8492,
    distance: "1.5 km",
    rating: 4.6,
    reviews: 510,
    vibes: ["vintage", "view-dep", "do-uong-ngon"],
    coverUrl: "https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cafe-3",
    name: "Lofita",
    address: "30A Trang Tien, Hoan Kiem",
    lat: 21.0249,
    lng: 105.8572,
    distance: "1.2 km",
    rating: 4.7,
    reviews: 286,
    vibes: ["song-ao", "view-dep", "khong-gian-rong"],
    coverUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cafe-4",
    name: "The NOTE",
    address: "64 Luong Van Can, Hoan Kiem",
    lat: 21.0315,
    lng: 105.8506,
    distance: "850 m",
    rating: 4.5,
    reviews: 178,
    vibes: ["sticker", "doc-dao", "check-in-hot"],
    coverUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cafe-5",
    name: "Tang Tret",
    address: "8 Chan Cam, Hoan Kiem",
    lat: 21.0294,
    lng: 105.8469,
    distance: "2.1 km",
    rating: 4.4,
    reviews: 210,
    vibes: ["yen-tinh", "lam-viec", "do-uong-ngon"],
    coverUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80"
  }
];

export const quests = [
  { id: "q1", title: "First Sip", description: "Check-in quan dau tien", progress: 0, target: 1, reward: "10 diem" },
  { id: "q2", title: "Explorer", description: "Check-in 3 quan o Hoan Kiem", progress: 1, target: 3, reward: "50 diem + voucher 30k" },
  { id: "q3", title: "Early Bird", description: "Check-in truoc 9h sang", progress: 0, target: 1, reward: "20 diem" }
];

export const leaderboard = [
  { id: "u1", username: "coffeeholic_", points: 2450, level: "Vibe Master" },
  { id: "u2", username: "baoanhh", points: 1980, level: "Explorer" },
  { id: "u3", username: "hatrung", points: 1760, level: "Photographer" },
  { id: "me", username: "Ban", points: 520, level: "Lv.12", rank: 12 }
];

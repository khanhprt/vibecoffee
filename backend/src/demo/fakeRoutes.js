import { Router } from "express";
import { ok, fail } from "../utils/responses.js";
import { createReceipt, validateReceipt } from "../../../shared/demoReceipts.mjs";

const router = Router();
const receipts = [];

const user = {
  id: "demo-admin",
  username: "admin",
  email: "admin@vibecoffee.demo",
  avatarUrl: null,
  bio: "Yeu ca phe, nhung goc quan xinh va nhung khoanh khac that chill.",
  totalPoints: 5860,
  level: "Explorer",
  createdAt: "2026-01-01T00:00:00.000Z",
  _count: { checkins: 42, photos: 4, following: 18, followers: 128 }
};

const cafes = [
  { id: "cafe-1", name: "Pink Pixel Brew", address: "12 Dinh Tien Hoang, Hoan Kiem", lat: 21.0286, lng: 105.8524, distance: "123 m", rating: 4.9, reviews: 428, vibes: ["view-dep", "yen-tinh", "lam-viec"], coverUrl: "/assets/profile-coffee-garden.png" },
  { id: "cafe-2", name: "Cong Ca Phe Nha Tho", address: "27 Nha Tho, Hoan Kiem", lat: 21.0289, lng: 105.8492, distance: "650 m", rating: 4.7, reviews: 610, vibes: ["vintage", "view-dep", "do-uong-ngon"], coverUrl: "/assets/bottom-left-coffee-scene.png" },
  { id: "cafe-3", name: "Lofita Trang Tien", address: "30A Trang Tien, Hoan Kiem", lat: 21.0249, lng: 105.8572, distance: "1.2 km", rating: 4.8, reviews: 336, vibes: ["song-ao", "view-dep", "khong-gian-rong"], coverUrl: "/assets/home-hero-composite.png" },
  { id: "cafe-4", name: "The Note Coffee", address: "64 Luong Van Can, Hoan Kiem", lat: 21.0315, lng: 105.8506, distance: "850 m", rating: 4.6, reviews: 278, vibes: ["sticker", "doc-dao", "check-in-hot"], coverUrl: "/assets/profile-hoan-kiem-cover.png" },
  { id: "cafe-5", name: "Tang Tret Slow Bar", address: "8 Chan Cam, Hoan Kiem", lat: 21.0294, lng: 105.8469, distance: "2.1 km", rating: 4.5, reviews: 248, vibes: ["yen-tinh", "lam-viec", "do-uong-ngon"], coverUrl: "/assets/about-cafe-scene.png" }
];

const quests = [
  { id: "q1", code: "FIRST_SIP", title: "First Sip", description: "Check-in quan dau tien", progress: 0, target: 1, rewardPoints: 10, completed: false, claimedAt: null },
  { id: "q2", code: "EXPLORER", title: "Explorer", description: "Check-in 3 quan khac nhau o Ha Noi", progress: 1, target: 3, rewardPoints: 50, completed: false, claimedAt: null },
  { id: "q3", code: "EARLY_BIRD", title: "Early Bird", description: "Check-in truoc 9h sang", progress: 0, target: 1, rewardPoints: 20, completed: false, claimedAt: null }
];

const photos = [
  { id: "p1", userId: user.id, cafeId: "cafe-1", url: "/assets/profile-coffee-garden.png", caption: "Vuon ca phe cuoi tuan", likes: 32 },
  { id: "p2", userId: user.id, cafeId: "cafe-2", url: "/assets/profile-hoan-kiem-cover.png", caption: "Nang som Ho Guom", likes: 28 }
];

const checkins = [
  { id: "ck-1", userId: user.id, cafeId: "cafe-1", createdAt: "2026-10-07T02:30:00.000Z", points: 10 },
  { id: "ck-2", userId: user.id, cafeId: "cafe-2", createdAt: "2026-10-08T03:20:00.000Z", points: 10 }
];

const leaders = [
  { id: "u1", username: "bean.master", totalPoints: 5860, points: 5860, level: 25, badge: "Legend", checkins: 1248, quests: 42 },
  { id: "u2", username: "coffee.love", totalPoints: 4120, points: 4120, level: 18, badge: "Explorer", checkins: 892, quests: 31 },
  { id: "u3", username: "hanoicafe", totalPoints: 3860, points: 3860, level: 17, badge: "Explorer", checkins: 756, quests: 29 },
  { id: "me", username: user.username, totalPoints: user.totalPoints, points: user.totalPoints, level: 14, badge: user.level, checkins: 42, quests: 12 }
];

function requireDemoAuth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return fail(res, "UNAUTHORIZED", "Ban can dang nhap", 401);
  req.user = user;
  return next();
}

function syncQuestProgress() {
  const uniqueCafeCount = new Set(checkins.map((checkin) => checkin.cafeId)).size;
  quests.forEach((quest) => {
    if (quest.code === "FIRST_SIP") quest.progress = Math.min(1, checkins.length);
    if (quest.code === "EXPLORER") quest.progress = Math.min(quest.target, uniqueCafeCount);
    if (quest.code === "EARLY_BIRD") quest.progress = checkins.some((checkin) => new Date(checkin.createdAt).getHours() < 9) ? 1 : 0;
    quest.completed = quest.progress >= quest.target;
  });
}

router.post("/auth/login", (req, res) => {
  if (String(req.body.email).toLowerCase() !== "admin" || req.body.password !== "admin") {
    return fail(res, "INVALID_CREDENTIALS", "Tai khoan demo: admin / admin", 401);
  }
  return ok(res, { user, token: "fake-db-demo-token" }, "Dang nhap fake DB thanh cong");
});
router.post("/auth/register", (req, res) => ok(res, { user: { ...user, username: req.body.username || user.username }, token: "fake-db-demo-token" }, "Dang ky fake DB thanh cong", 201));
router.post("/auth/logout", requireDemoAuth, (req, res) => ok(res, null, "Dang xuat thanh cong"));
router.get("/auth/me", requireDemoAuth, (req, res) => ok(res, user));

router.get("/cafes/nearby", (req, res) => {
  const q = String(req.query.q || "").toLowerCase();
  const vibe = req.query.vibe;
  const data = cafes.filter((cafe) => (!q || cafe.name.toLowerCase().includes(q) || cafe.address.toLowerCase().includes(q)) && (!vibe || cafe.vibes.includes(vibe)));
  return ok(res, data);
});
router.get("/cafes/:id", (req, res) => ok(res, cafes.find((cafe) => cafe.id === req.params.id) || null));
router.post("/cafes/:id/receipts", requireDemoAuth, (req, res) => {
  const cafe = cafes.find(item => item.id === req.params.id);
  if (!cafe) return fail(res, "CAFE_NOT_FOUND", "Khong tim thay quan", 404);
  const receipt = createReceipt(cafe, receipts);
  receipts.push(receipt);
  return ok(res, receipt, "Hoa don demo", 201);
});

router.post("/checkins", requireDemoAuth, (req, res) => {
  const cafe = cafes.find((item) => item.id === req.body.cafeId);
  if (!cafe) return fail(res, "CAFE_NOT_FOUND", "Khong tim thay quan", 404);
  let receipt;
  try {
    receipt = validateReceipt(receipts, cafe.id, req.body.receiptCode);
  } catch (error) {
    return fail(res, "INVALID_RECEIPT", error.message, 422);
  }
  const checkin = { id: `ck-${Date.now()}`, userId: user.id, cafeId: cafe.id, cafe, createdAt: new Date().toISOString(), points: 30 };
  checkin.receiptId = receipt.id;
  receipt.usedAt = checkin.createdAt;
  checkins.unshift(checkin);
  photos.unshift({ id: `p-${Date.now()}`, userId: user.id, cafeId: cafe.id, url: cafe.coverUrl, caption: `Vibe Check tai ${cafe.name}`, likes: 0 });
  user.totalPoints += 30;
  user._count.checkins += 1;
  user._count.photos = photos.length;
  syncQuestProgress();
  return ok(res, { checkin, pointsAdded: 30 }, "Check-in fake DB thanh cong", 201);
});
router.get("/checkins/me", requireDemoAuth, (req, res) => ok(res, checkins.map((checkin) => ({ ...checkin, cafe: cafes.find((cafe) => cafe.id === checkin.cafeId) }))));
router.get("/checkins/cafe/:cafeId", (req, res) => ok(res, checkins.filter((checkin) => checkin.cafeId === req.params.cafeId)));

router.get("/quests", (req, res) => {
  syncQuestProgress();
  return ok(res, quests);
});
router.get("/quests/me", requireDemoAuth, (req, res) => {
  syncQuestProgress();
  return ok(res, quests);
});
router.post("/quests/:id/claim", requireDemoAuth, (req, res) => {
  syncQuestProgress();
  const quest = quests.find((item) => item.id === req.params.id);
  if (!quest || !quest.completed) return fail(res, "QUEST_NOT_COMPLETE", "Nhiem vu chua hoan thanh", 422);
  if (quest.claimedAt) return fail(res, "QUEST_ALREADY_CLAIMED", "Ban da nhan thuong", 409);
  quest.claimedAt = new Date().toISOString();
  user.totalPoints += quest.rewardPoints;
  return ok(res, quest, "Nhan thuong fake DB thanh cong");
});

router.get("/leaderboard", (req, res) => {
  const me = leaders.find((item) => item.id === "me");
  me.username = user.username;
  me.totalPoints = user.totalPoints;
  me.points = user.totalPoints;
  const users = leaders.sort((a, b) => b.points - a.points).map((item, index) => ({ ...item, rank: index + 1 }));
  return ok(res, { period: req.query.period || "all", region: req.query.region || null, users });
});

router.get("/profile/me", requireDemoAuth, (req, res) => ok(res, user));
router.put("/profile/me", requireDemoAuth, (req, res) => {
  user.username = req.body.username || user.username;
  user.bio = req.body.bio ?? user.bio;
  return ok(res, user, "Cap nhat fake DB thanh cong");
});
router.get("/profile/:id/photos", (req, res) => ok(res, photos));
router.post("/profile/photos", requireDemoAuth, (req, res) => {
  const photo = { id: `p-${Date.now()}`, userId: user.id, cafeId: req.body.cafeId || null, url: req.body.url, caption: req.body.caption || "", likes: 0 };
  photos.unshift(photo);
  user._count.photos = photos.length;
  return ok(res, photo, "Dang anh fake DB thanh cong", 201);
});
router.get("/vouchers/me", requireDemoAuth, (req, res) => ok(res, []));

export default router;

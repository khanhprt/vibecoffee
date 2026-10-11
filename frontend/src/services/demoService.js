import { cafes, leaderboard, profilePhotos, quests, vouchers } from "../data/mockData.js";

export const isDemoMode = import.meta.env.VITE_DEMO_MODE === "true";
export const DEMO_TOKEN = "vibe-coffee-demo-admin";

const DB_KEY = "vibe_demo_db_v2";
const TOKEN_KEY = "vibe_demo_token";

const defaultProfile = {
  id: "demo-admin",
  username: "admin",
  email: "admin@vibecoffee.demo",
  avatarUrl: null,
  bio: "Yeu ca phe, nhung goc quan xinh va nhung khoanh khac that chill.",
  totalPoints: 5860,
  level: "Explorer",
  createdAt: "2026-01-01T00:00:00.000Z",
  _count: { checkins: 42, photos: profilePhotos.length, following: 18, followers: 128 }
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function freshDb() {
  return {
    profile: clone(defaultProfile),
    cafes: clone(cafes),
    quests: clone(quests).map((quest) => ({
      ...quest,
      completed: quest.progress >= quest.target,
      claimedAt: null
    })),
    leaderboard: clone(leaderboard),
    photos: clone(profilePhotos),
    vouchers: clone(vouchers),
    favorites: ["cafe-1", "cafe-3"],
    savedPosts: ["p1"],
    checkins: [
      { id: "ck-demo-1", cafeId: "cafe-1", createdAt: "2026-10-07T02:30:00.000Z", points: 10 },
      { id: "ck-demo-2", cafeId: "cafe-2", createdAt: "2026-10-08T03:20:00.000Z", points: 10 }
    ],
    feedLikes: { p1: true, p2: false },
    notices: []
  };
}

export function getDemoDb() {
  try {
    const saved = JSON.parse(localStorage.getItem(DB_KEY));
    if (saved?.profile?.id) return saved;
  } catch {
    // Fall through to a fresh database.
  }
  const db = freshDb();
  saveDemoDb(db);
  return db;
}

function saveDemoDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  window.dispatchEvent(new CustomEvent("vibe-demo-db-change", { detail: db }));
  return db;
}

function updateQuestProgress(db) {
  const uniqueCafeCount = new Set(db.checkins.map((checkin) => checkin.cafeId)).size;
  db.quests = db.quests.map((quest) => {
    let progress = quest.progress;
    if (quest.code === "FIRST_SIP") progress = Math.min(1, db.checkins.length);
    if (quest.code === "EXPLORER") progress = Math.min(quest.target, uniqueCafeCount);
    if (quest.code === "PHOTO_LOVER") progress = Math.min(quest.target, db.photos.length);
    if (quest.code === "SOCIAL_BUTTERFLY") progress = Math.min(quest.target, db.profile._count.following);
    if (quest.code === "EARLY_BIRD") {
      progress = db.checkins.some((checkin) => new Date(checkin.createdAt).getHours() < 9) ? 1 : 0;
    }
    return { ...quest, progress, completed: progress >= quest.target };
  });
}

function updateProfileCounts(db) {
  db.profile._count = {
    ...db.profile._count,
    checkins: db.checkins.length + 40,
    photos: db.photos.length,
    following: db.profile._count.following,
    followers: db.profile._count.followers
  };
  const nextLevel = Math.max(1, Math.floor(db.profile.totalPoints / 400) + 1);
  db.profile.level = nextLevel >= 15 ? "Vibe Master" : nextLevel >= 8 ? "Explorer" : "Newbie";
}

function syncMeOnLeaderboard(db) {
  const me = db.leaderboard.find((user) => user.id === "me");
  if (me) {
    me.username = db.profile.username;
    me.points = db.profile.totalPoints;
    me.checkins = db.profile._count.checkins;
    me.level = Math.max(1, Math.floor(db.profile.totalPoints / 400) + 1);
    me.badge = db.profile.level;
  }
}

export function resetDemoDb() {
  return saveDemoDb(freshDb());
}

export function ensureDemoSession() {
  localStorage.setItem(TOKEN_KEY, DEMO_TOKEN);
  return { user: getDemoProfile(), token: DEMO_TOKEN };
}

export function getDemoProfile() {
  const db = getDemoDb();
  updateProfileCounts(db);
  syncMeOnLeaderboard(db);
  saveDemoDb(db);
  return clone(db.profile);
}

export function demoLogin({ email, password }) {
  if (email.trim().toLowerCase() !== "admin" || password !== "admin") {
    throw new Error("Tai khoan hoac mat khau khong dung. Tai khoan demo: admin / admin.");
  }
  return ensureDemoSession();
}

export function updateDemoProfile({ username, bio }) {
  const db = getDemoDb();
  const cleanUsername = username.trim();
  if (cleanUsername.length < 3 || cleanUsername.length > 30) {
    throw new Error("Ten dang nhap phai co tu 3 den 30 ky tu.");
  }
  db.profile = { ...db.profile, username: cleanUsername, bio };
  syncMeOnLeaderboard(db);
  saveDemoDb(db);
  return clone(db.profile);
}

export function getDemoCafes(params = {}) {
  const db = getDemoDb();
  const keyword = (params.q || params.keyword || "").trim().toLowerCase();
  const vibe = params.vibe;
  return db.cafes
    .filter((cafe) => !keyword || cafe.name.toLowerCase().includes(keyword) || cafe.address.toLowerCase().includes(keyword))
    .filter((cafe) => !vibe || vibe === "all" || cafe.vibes.includes(vibe))
    .map((cafe) => ({ ...cafe, favorite: db.favorites.includes(cafe.id), checkedIn: db.checkins.some((item) => item.cafeId === cafe.id) }));
}

export function getDemoCafe(id) {
  return getDemoCafes().find((cafe) => cafe.id === id) || null;
}

export function toggleDemoFavorite(cafeId) {
  const db = getDemoDb();
  db.favorites = db.favorites.includes(cafeId)
    ? db.favorites.filter((id) => id !== cafeId)
    : [...db.favorites, cafeId];
  saveDemoDb(db);
  return getDemoCafe(cafeId);
}

export function createDemoCheckin({ cafeId }) {
  const db = getDemoDb();
  const cafe = db.cafes.find((item) => item.id === cafeId);
  if (!cafe) throw new Error("Khong tim thay quan ca phe.");

  const checkedToday = db.checkins.some((checkin) => {
    const sameCafe = checkin.cafeId === cafeId;
    const sameDay = new Date(checkin.createdAt).toDateString() === new Date().toDateString();
    return sameCafe && sameDay;
  });
  if (checkedToday) throw new Error("Hom nay ban da Vibe Check quan nay roi.");

  const photo = {
    id: `p-${Date.now()}`,
    url: cafe.coverUrl,
    caption: `Vibe Check tai ${cafe.name}`,
    likes: 0,
    cafeId
  };
  const checkin = {
    id: `ck-${Date.now()}`,
    cafeId,
    cafe,
    photoUrl: cafe.coverUrl,
    points: 30,
    lat: cafe.lat,
    lng: cafe.lng,
    createdAt: new Date().toISOString()
  };

  db.checkins.unshift(checkin);
  db.photos.unshift(photo);
  db.profile.totalPoints += 30;
  updateQuestProgress(db);
  updateProfileCounts(db);
  syncMeOnLeaderboard(db);
  saveDemoDb(db);
  return { checkin, pointsAdded: 30, unlockedQuests: db.quests.filter((quest) => quest.completed && !quest.claimedAt) };
}

export function getDemoQuests() {
  const db = getDemoDb();
  updateQuestProgress(db);
  saveDemoDb(db);
  return clone(db.quests);
}

export function claimDemoQuest(id) {
  const db = getDemoDb();
  const quest = db.quests.find((item) => item.id === id);
  if (!quest) throw new Error("Khong tim thay nhiem vu.");
  if (!quest.completed) throw new Error("Nhiem vu chua hoan thanh.");
  if (quest.claimedAt) throw new Error("Ban da nhan thuong nhiem vu nay.");
  quest.claimedAt = new Date().toISOString();
  db.profile.totalPoints += quest.rewardPoints;
  if (quest.voucher && !db.vouchers.some((voucher) => voucher.code === quest.voucher)) {
    db.vouchers.push({ id: `v-${Date.now()}`, code: quest.voucher, title: `Thuong ${quest.title}`, discount: 30000, minSpend: 80000, used: false });
  }
  updateProfileCounts(db);
  syncMeOnLeaderboard(db);
  saveDemoDb(db);
  return clone(quest);
}

export function getDemoLeaderboard({ period = "all", region = null } = {}) {
  const db = getDemoDb();
  updateProfileCounts(db);
  syncMeOnLeaderboard(db);
  const users = clone(db.leaderboard)
    .sort((a, b) => b.points - a.points)
    .map((user, index) => ({ ...user, rank: index + 1 }));
  saveDemoDb(db);
  return { period, region, users };
}

export function getDemoPhotos() {
  return clone(getDemoDb().photos);
}

export function getDemoCheckins() {
  const db = getDemoDb();
  return clone(db.checkins.map((checkin) => ({ ...checkin, cafe: db.cafes.find((cafe) => cafe.id === checkin.cafeId) })));
}

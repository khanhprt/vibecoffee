# ☕ Vibe Coffee — Project Specification

> **Tagline:** *"We Be Coffee. We Be Vibe."*  
> **Loại dự án:** Web app bản đồ quán cà phê + gamification  
> **Phong cách:** Pixel art + Tone hồng (Pink theme)  
> **Mục tiêu:** Khám phá quán cà phê, check-in nhận thưởng, chia sẻ ảnh đẹp

---

## 📋 Mục lục

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Tech Stack](#2-tech-stack)
3. [Cấu trúc thư mục](#3-cấu-trúc-thư-mục)
4. [Design System](#4-design-system)
5. [Tính năng chi tiết](#5-tính-năng-chi-tiết)
6. [Database Schema](#6-database-schema)
7. [API Endpoints](#7-api-endpoints)
8. [Lộ trình phát triển](#8-lộ-trình-phát-triển)
9. [Quy ước code](#9-quy-ước-code)
10. [Ghi chú cho Agent](#10-ghi-chú-cho-agent)
11. [Tài nguyên tham khảo](#11-tài-nguyên-tham-khảo)

---

## 1. Tổng quan dự án

### 1.1. Ý tưởng
**Vibe Coffee** là một web app cho phép người dùng:
- 🗺️ Tìm quán cà phê đẹp gần vị trí hiện tại
- ✅ Check-in tại quán để hoàn thành "nhiệm vụ"
- 🎁 Nhận voucher phần thưởng từ các nhiệm vụ
- 🏆 Cạnh tranh trên bảng xếp hạng
- 📸 Lưu trữ & chia sẻ ảnh đẹp tại trang cá nhân

### 1.2. Đối tượng người dùng
- Gen Z, dân văn phòng, sinh viên yêu thích cà phê
- Người thích khám phá quán mới
- Người thích chụp ảnh, check-in

### 1.3. Điểm khác biệt
- Gamification (nhiệm vụ, điểm, voucher)
- Phong cách pixel art độc đáo
- Tone hồng pastel dễ thương, khác biệt với các app khác

### 1.4. Tên gọi các tính năng
- Check-in → **"Vibe Check"** ✅
- Nhiệm vụ → **"Vibe Quest"**
- Bảng xếp hạng → **"Vibe Board"**
- Trang cá nhân → **"My Vibe"**
- Bộ sưu tập ảnh → **"Vibe Album"**

---

## 2. Tech Stack

### 2.1. Frontend
| Công nghệ | Mục đích |
|-----------|----------|
| **Vite** | Build tool siêu nhanh |
| **React (JSX)** | UI framework |
| **TailwindCSS** | Utility-first CSS |
| **Chakra UI** | Component library |
| **React Router DOM** | Routing |
| **Mapbox GL JS** | Bản đồ tương tác |
| **Axios** | Gọi API |
| **Zustand** | State management |
| **React Query** | Data fetching & caching |

### 2.2. Backend
| Công nghệ | Mục đích |
|-----------|----------|
| **ExpressJS** | Web framework |
| **PostgreSQL** | Database chính |
| **Prisma** | ORM |
| **JWT** | Authentication |
| **bcrypt** | Hash password |
| **Cloudinary** | Lưu trữ ảnh |
| **Multer** | Upload file |
| **Zod** | Validate input |

### 2.3. DevOps (tùy chọn)
- Docker & Docker Compose
- Vercel (frontend) + Railway/Render (backend)
- Neon/Supabase (PostgreSQL hosting)

---

## 3. Cấu trúc thư mục

```
vibe-coffee/
├── frontend/
│   ├── public/
│   │   ├── pixel-assets/          # Icon, sprite pixel art
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/
│   │   │   ├── fonts/             # Font pixel (Press Start 2P, VT323)
│   │   │   └── images/
│   │   ├── components/
│   │   │   ├── common/            # Button, Card, Modal pixel style
│   │   │   ├── map/               # MapView, Marker, Popup
│   │   │   ├── quest/             # QuestCard, QuestList
│   │   │   ├── leaderboard/       # RankList, RankItem
│   │   │   └── profile/           # ProfileHeader, PhotoGrid
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Map.jsx
│   │   │   ├── Quests.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useGeolocation.js
│   │   │   └── useQuests.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── cafeService.js
│   │   │   └── questService.js
│   │   ├── store/
│   │   │   └── authStore.js
│   │   ├── utils/
│   │   │   ├── distance.js        # Haversine
│   │   │   └── format.js
│   │   ├── theme/
│   │   │   ├── index.js           # Chakra theme custom
│   │   │   └── pixel.css          # Custom pixel styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js        # Prisma client
│   │   │   ├── cloudinary.js
│   │   │   └── env.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── cafeController.js
│   │   │   ├── checkinController.js
│   │   │   ├── questController.js
│   │   │   ├── leaderboardController.js
│   │   │   └── profileController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── upload.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── cafeRoutes.js
│   │   │   ├── checkinRoutes.js
│   │   │   ├── questRoutes.js
│   │   │   ├── leaderboardRoutes.js
│   │   │   └── profileRoutes.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── cafeService.js
│   │   │   ├── questService.js
│   │   │   └── pointsService.js
│   │   ├── utils/
│   │   │   ├── distance.js
│   │   │   ├── jwt.js
│   │   │   └── voucher.js
│   │   ├── validators/
│   │   │   └── schemas.js         # Zod schemas
│   │   ├── app.js
│   │   └── server.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## 4. Design System

### 4.1. Bảng màu (Pink Pixel Theme)

```javascript
// tailwind.config.js — colors
{
  pink: {
    50:  '#FFF0F5',  // Nền chính
    100: '#FFE0EC',  // Card background
    200: '#FFC2D9',  // Border nhẹ
    300: '#FF9EC4',  // Hover
    400: '#FF6FA5',  // Button chính
    500: '#FF3D88',  // Accent
    600: '#E91E63',  // Text nhấn
    700: '#C2185B',  // Text đậm
    800: '#880E4F',  // Heading
    900: '#560027',  // Dark
  },
  pixel: {
    cream:  '#FFF8F0',  // Nền phụ
    brown:  '#8B5E3C',  // Cà phê
    dark:   '#2D1B2E',  // Text chính
    gold:   '#FFD700',  // Điểm, badge
    mint:   '#A8E6CF',  // Success
    coral:  '#FF8B94',  // Warning
  }
}
```

### 4.2. Font chữ

```css
/* Pixel font — dùng cho heading, button */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

/* Pixel font — dùng cho body text (dễ đọc hơn) */
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

/* Font phụ — cho nội dung dài */
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap');
```

**Quy tắc dùng:**
- **Press Start 2P** — Heading, logo, button (dùng ít)
- **VT323** — Body text, label (dễ đọc)
- **Pixelify Sans** — Đoạn văn dài, mô tả quán

### 4.3. Hiệu ứng pixel đặc trưng

```css
/* Border pixel — thay vì border-radius */
.pixel-border {
  border: 4px solid #2D1B2E;
  box-shadow: 
    4px 4px 0 0 #2D1B2E,
    inset -4px -4px 0 0 rgba(0,0,0,0.1);
  image-rendering: pixelated;
}

/* Button pixel 3D */
.pixel-btn {
  border: 3px solid #2D1B2E;
  box-shadow: 4px 4px 0 0 #2D1B2E;
  transition: all 0.1s;
}
.pixel-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 0 #2D1B2E;
}
.pixel-btn:active {
  transform: translate(4px, 4px);
  box-shadow: 0 0 0 0 #2D1B2E;
}

/* Hiệu ứng scanline (tùy chọn) */
.scanlines::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.05) 0px,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
```

### 4.4. Chakra UI Theme

```javascript
// theme/index.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: { /* như trên */ },
  fonts: {
    heading: `'Press Start 2P', monospace`,
    body: `'VT323', monospace`,
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: `'Press Start 2P', monospace`,
        fontSize: 'xs',
        borderRadius: '0',        // Pixel = không bo góc
        border: '3px solid',
        borderColor: 'pixel.dark',
        boxShadow: '4px 4px 0 0 #2D1B2E',
        _hover: { 
          transform: 'translate(2px, 2px)', 
          boxShadow: '2px 2px 0 0 #2D1B2E' 
        },
        _active: { 
          transform: 'translate(4px, 4px)', 
          boxShadow: 'none' 
        },
      },
    },
    Card: {
      baseStyle: {
        borderRadius: '0',
        border: '3px solid',
        borderColor: 'pixel.dark',
        boxShadow: '6px 6px 0 0 #2D1B2E',
        bg: 'pink.100',
      },
    },
  },
});

export default theme;
```

---

## 5. Tính năng chi tiết

### 5.1. 🗺️ Bản đồ & Gợi ý quán

**User flow:**
1. User mở trang Map
2. Browser hỏi quyền vị trí → user cho phép
3. Hiển thị bản đồ với marker các quán gần đó (bán kính 2km)
4. User filter theo "vibe": #YênTĩnh #ViewĐẹp #LàmViệc #Chill
5. Click marker → popup hiện ảnh, đánh giá, nút "Check-in"

**API cần:**
```
GET /api/cafes/nearby?lat=...&lng=...&radius=2000
GET /api/cafes/:id
GET /api/cafes?filter=vibe
```

**Components:**
- `<MapView />` — Mapbox wrapper
- `<CafeMarker />` — Marker pixel art (icon cà phê)
- `<CafePopup />` — Card hiện thông tin quán
- `<VibeFilter />` — Bộ lọc vibe

**Gợi ý nâng cao:**
- Filter theo vibe: #YênTĩnh #ViewĐẹp #LàmViệc #Chill #SốngẢo
- "Quán đẹp gần đây" — AI gợi ý dựa trên ảnh check-in
- Xem trước ảnh thật từ cộng đồng trước khi đến

### 5.2. ✅ Check-in & Nhiệm vụ

**Các loại nhiệm vụ:**

| ID | Tên | Điều kiện | Thưởng |
|---|---|---|---|
| Q1 | First Sip | Check-in quán đầu tiên | 10 điểm |
| Q2 | Explorer | Ghé 5 quán khác nhau | 50 điểm + voucher 30k |
| Q3 | Streak 7 | Check-in 7 ngày liên tiếp | Voucher 50k |
| Q4 | Early Bird | Check-in trước 9h sáng | 20 điểm |
| Q5 | Photographer | Đăng 5 ảnh được 20+ like | Voucher 50k |
| Q6 | Social Butterfly | Rủ 3 bạn cùng check-in | Voucher 40k |
| Q7 | Vibe Master | Hoàn thành 10 nhiệm vụ | Badge + 200 điểm |

**User flow check-in:**
1. User đến quán, mở app
2. Bấm "Vibe Check" (nút check-in)
3. App xác nhận GPS đang ở quán (bán kính 50m)
4. User upload ảnh (optional)
5. Backend cộng điểm, cập nhật nhiệm vụ
6. Hiện animation pixel "✅ +10 điểm!"

**Chống gian lận:**
- Check GPS thực tế
- QR code tại quán (nếu quán hợp tác)
- Giới hạn 1 check-in/quán/ngày

**API:**
```
POST /api/checkins — body: { cafeId, lat, lng, photo }
GET /api/quests — danh sách nhiệm vụ
GET /api/quests/:id/progress
POST /api/quests/:id/claim — nhận thưởng
```

### 5.3. 🏆 Bảng xếp hạng

**Các tab:**
- **Tuần này** — reset mỗi thứ 2
- **Tháng này** — reset mỗi đầu tháng
- **All-time** — không reset
- **Khu vực** — filter theo quận/thành phố

**Cách tính điểm:**
```
Check-in mới:           +10
Check-in quán mới:      +20 (bonus khám phá)
Ảnh được like:          +1/like
Chuỗi ngày:             +5/ngày
Review chất lượng:      +15
Hoàn thành nhiệm vụ:    +theo nhiệm vụ
```

**Hiển thị:**
- Top 3: podium pixel art (🥇🥈🥉)
- Top 4-10: list với avatar pixel
- Highlight user hiện tại (nếu không trong top)

**API:**
```
GET /api/leaderboard?period=week&region=hcm
```
*Cache: Dùng Redis, update mỗi 5 phút*

### 5.4. 👤 Trang cá nhân

**Layout:**
```
┌─────────────────────────────────────┐
│  [Avatar pixel]  Username           │
│                  Level: Explorer     │
│                  ⭐ 1,250 điểm       │
├─────────────────────────────────────┤
│  📊 Stats: 25 quán | 50 ảnh | 7 badge
├─────────────────────────────────────┤
│  🏅 Badges: [🥇][🌟][☕][📸]...      │
├─────────────────────────────────────┤
│  🗺️ My Map: bản đồ quán đã ghé      │
├─────────────────────────────────────┤
│  📸 Photo Grid (Instagram style)     │
│  [img][img][img]                     │
│  [img][img][img]                     │
└─────────────────────────────────────┘
```

**Tính năng:**
- Edit profile (avatar, bio)
- Xem bộ sưu tập ảnh
- Xem badge đã đạt
- Bản đồ cá nhân (các quán đã ghé)
- Share profile link
- Follow người dùng khác
- Like & comment ảnh

**API:**
```
GET /api/profile/me
GET /api/profile/:username
PUT /api/profile/me
POST /api/profile/avatar
GET /api/profile/:id/photos
```

---

## 6. Database Schema

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(uuid())
  username      String    @unique
  email         String    @unique
  passwordHash  String
  avatarUrl     String?
  bio           String?
  totalPoints   Int       @default(0)
  level         String    @default("Newbie")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  checkins      Checkin[]
  photos        Photo[]
  questProgress QuestProgress[]
  vouchers      UserVoucher[]
  followers     Follow[]  @relation("Following")
  following     Follow[]  @relation("Followers")
}

model Cafe {
  id          String   @id @default(uuid())
  name        String
  address     String
  lat         Float
  lng         Float
  description String?
  coverUrl    String?
  vibes       String[] // ["yen-tinh", "view-dep", "lam-viec"]
  avgRating   Float    @default(0)
  createdAt   DateTime @default(now())
  
  checkins    Checkin[]
  photos      Photo[]
  
  @@index([lat, lng])
}

model Checkin {
  id        String   @id @default(uuid())
  userId    String
  cafeId    String
  photoUrl  String?
  points    Int      @default(10)
  lat       Float
  lng       Float
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  cafe      Cafe     @relation(fields: [cafeId], references: [id], onDelete: Cascade)
  
  @@unique([userId, cafeId, createdAt])
}

model Quest {
  id          String   @id @default(uuid())
  code        String   @unique
  title       String
  description String
  type        String   // "checkin_count", "streak", "photo_likes"
  target      Int
  rewardPoints Int     @default(0)
  rewardVoucher String? // voucher code template
  isActive    Boolean  @default(true)
  
  progress    QuestProgress[]
}

model QuestProgress {
  id         String   @id @default(uuid())
  userId     String
  questId    String
  progress   Int      @default(0)
  completed  Boolean  @default(false)
  claimedAt  DateTime?
  updatedAt  DateTime @updatedAt
  
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  quest      Quest    @relation(fields: [questId], references: [id], onDelete: Cascade)
  
  @@unique([userId, questId])
}

model Photo {
  id        String   @id @default(uuid())
  userId    String
  cafeId    String?
  url       String
  caption   String?
  likes     Int      @default(0)
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  cafe      Cafe?    @relation(fields: [cafeId], references: [id], onDelete: SetNull)
}

model Voucher {
  id          String   @id @default(uuid())
  code        String   @unique
  title       String
  description String?
  discount    Int      // VNĐ
  minSpend    Int      @default(0)
  expiresAt   DateTime
  isActive    Boolean  @default(true)
  
  userVouchers UserVoucher[]
}

model UserVoucher {
  id         String   @id @default(uuid())
  userId     String
  voucherId  String
  claimedAt  DateTime @default(now())
  usedAt     DateTime?
  
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  voucher    Voucher  @relation(fields: [voucherId], references: [id], onDelete: Cascade)
}

model Follow {
  id          String @id @default(uuid())
  followerId  String
  followingId String
  createdAt   DateTime @default(now())
  
  follower    User   @relation("Following", fields: [followerId], references: [id], onDelete: Cascade)
  following   User   @relation("Followers", fields: [followingId], references: [id], onDelete: Cascade)
  
  @@unique([followerId, followingId])
}
```

---

## 7. API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Cafes
```
GET    /api/cafes/nearby?lat&lng&radius&vibe
GET    /api/cafes/:id
POST   /api/cafes          (admin)
PUT    /api/cafes/:id      (admin)
```

### Check-ins
```
POST   /api/checkins
GET    /api/checkins/me
GET    /api/checkins/cafe/:cafeId
```

### Quests
```
GET    /api/quests
GET    /api/quests/me
POST   /api/quests/:id/claim
```

### Leaderboard
```
GET    /api/leaderboard?period=week|month|all&region=
```

### Profile
```
GET    /api/profile/me
GET    /api/profile/:username
PUT    /api/profile/me
POST   /api/profile/avatar
GET    /api/profile/:id/photos
POST   /api/profile/photos
```

### Vouchers
```
GET    /api/vouchers/me
POST   /api/vouchers/:id/use
```

---

## 8. Lộ trình phát triển

### 🎯 Phase 1 — MVP (2-3 tuần)
- [ ] Setup project (frontend + backend)
- [ ] Auth (register, login, JWT)
- [ ] Hiển thị bản đồ + danh sách quán
- [ ] Check-in cơ bản (GPS)
- [ ] Trang cá nhân đơn giản

### 🎯 Phase 2 — Gamification (2 tuần)
- [ ] Hệ thống nhiệm vụ
- [ ] Cộng điểm tự động
- [ ] Bảng xếp hạng
- [ ] Voucher & đổi thưởng

### 🎯 Phase 3 — Social (2 tuần)
- [ ] Upload ảnh
- [ ] Like & comment
- [ ] Follow user
- [ ] Share lên social

### 🎯 Phase 4 — Polish (1 tuần)
- [ ] Animation pixel
- [ ] Sound effects (8-bit)
- [ ] Dark mode
- [ ] Responsive mobile

### 🎯 Phase 5 — Mở rộng (tương lai)
- [ ] Mobile app (React Native)
- [ ] Hợp tác với quán (dashboard cho quán)
- [ ] AI gợi ý quán theo sở thích
- [ ] Mini-games

---

## 9. Quy ước code

### 9.1. Đặt tên
- **Component:** PascalCase (CafeCard.jsx)
- **File util:** camelCase (distance.js)
- **API route:** kebab-case (/api/cafes/nearby)
- **DB table:** snake_case (Prisma tự map)

### 9.2. Git commit
```
feat: thêm tính năng check-in
fix: sửa lỗi GPS không chính xác
style: đổi màu button pixel
refactor: tách logic quest ra service
docs: cập nhật README
```

### 9.3. Environment variables

**frontend/.env:**
```
VITE_API_URL=http://localhost:5000/api
VITE_MAPBOX_TOKEN=pk.xxx
```

**backend/.env:**
```
DATABASE_URL=postgresql://user:pass@localhost:5432/vibecoffee
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
PORT=5000
NODE_ENV=development
```

### 9.4. Response format chuẩn

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Check-in thành công!"
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "CAFE_NOT_FOUND",
    "message": "Không tìm thấy quán"
  }
}
```

---

## 10. Ghi chú cho Agent

Khi build dự án này, agent cần lưu ý:

1. **Ưu tiên pixel style** — không dùng border-radius, dùng border + box-shadow để tạo hiệu ứng pixel
2. **Tone hồng xuyên suốt** — mọi component đều dùng palette pink đã định nghĩa
3. **Font pixel** — heading dùng Press Start 2P, body dùng VT323
4. **Responsive** — mobile-first, vì đây là app check-in
5. **Performance** — lazy load ảnh, cache API với React Query
6. **Security** — validate GPS, chống spam check-in, hash password
7. **UX** — animation pixel khi check-in thành công, sound effect 8-bit (optional)
8. **Tách biệt frontend/backend** — 2 thư mục riêng, không trộn lẫn
9. **Sử dụng đúng tech stack** — Vite + JSX + Tailwind + Chakra (FE), Express + Prisma + PostgreSQL (BE)

---

## 11. Tài nguyên tham khảo

- **Pixel art assets:** [itch.io](https://itch.io)
- **Font:** [Google Fonts](https://fonts.google.com) — Press Start 2P
- **Mapbox:** [mapbox.com](https://mapbox.com)
- **Prisma:** [prisma.io/docs](https://prisma.io/docs)
- **Chakra UI:** [chakra-ui.com](https://chakra-ui.com)
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com)
- **Express:** [expressjs.com](https://expressjs.com)

---

## 12. Tư vấn bổ sung

### Về tone hồng + pixel
Nên dùng hồng pastel (pink.100-300) làm nền, hồng đậm (pink.500-700) cho accent — tránh dùng hồng quá chói sẽ khó đọc. Kết hợp với màu trung tính như pixel.cream và pixel.dark để cân bằng. Pixel art không bo góc — đây là đặc trưng, đừng dùng rounded của Tailwind.

### Về Mapbox
Mapbox có style "pixel" hoặc bạn có thể custom map style với màu hồng pastel để đồng bộ. Free tier: 50,000 map loads/tháng — đủ cho MVP.

### Về database
PostgreSQL rất hợp. Nếu chưa có server, dùng Neon hoặc Supabase (free tier tốt). Prisma giúp migration dễ dàng, type-safe.

### Về chống gian lận check-in
- Check GPS trong bán kính 50m
- Rate limit: 1 check-in/quán/ngày
- QR code tại quán là cách chống gian lận tốt nhất nếu quán hợp tác

### Về animation pixel
Dùng CSS keyframes với steps() để tạo animation pixel. Ví dụ: `animation: bounce 0.5s steps(4) infinite;`

### Về domain
- `vibe.coffee` — đẹp, unique, phù hợp
- Hoặc `vibecoffee.app` nếu .coffee đã bị mua

### Về slogan
- **"We Be Coffee. We Be Vibe."** — chơi chữ "Vibe" = "We Be"
- **"Tìm quán cà phê đúng vibe của bạn"** — mô tả tính năng chính

---

## 📝 Ghi chú cuối

**Vibe Coffee** không chỉ là một web app bình thường — nó là một trải nghiệm **vui vẻ, sáng tạo, và thân thiện** để khám phá thế giới cà phê yêu thích. Từ palette hồng pastel đến hiệu ứng pixel, mọi chi tiết đều được thiết kế để tạo ra cảm giác **"We Be Coffee. We Be Vibe."**

Chúc bạn thực hiện dự án thành công! ☕💖

---

*Made with 💗 by Vibe Coffee Team*

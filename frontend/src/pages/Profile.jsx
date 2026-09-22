import { useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bookmark,
  Camera,
  Coffee,
  Compass,
  Heart,
  Image as ImageIcon,
  MapPin,
  Medal,
  MessageCircle,
  MoonStar,
  MoreHorizontal,
  Send,
  Sparkles,
  Trophy,
  Users
} from "lucide-react";
import PixelModal from "../components/common/PixelModal.jsx";
import PhotoGrid from "../components/profile/PhotoGrid.jsx";
import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import { useAuth } from "../hooks/useAuth.js";
import api from "../services/api.js";

const DEFAULT_COVER = "/assets/profile-hoan-kiem-cover.png";
const DEFAULT_AVATAR = "/assets/profile-coffee-avatar.png";
const DEFAULT_GALLERY = [
  "/assets/profile-coffee-garden.png",
  "/assets/profile-hoan-kiem-cover.png",
  "/assets/home-hero-composite.png",
  "/assets/bottom-left-coffee-scene.png"
];

const badges = [
  { label: "First Sip", icon: Coffee, tone: "rose" },
  { label: "Ha Noi Lover", icon: Heart, tone: "red" },
  { label: "Night Owl", icon: MoonStar, tone: "blue" },
  { label: "Photo Master", icon: Camera, tone: "teal" },
  { label: "Explorer", icon: Compass, tone: "green" },
  { label: "Social Bee", icon: Users, tone: "gold" },
  { label: "Quest Master", icon: Trophy, tone: "emerald" },
  { label: "Cafe Guru", icon: Medal, tone: "pink" }
];

const friends = [
  { name: "@linhpham", note: "Thich ca phe va chup anh", initials: "LP" },
  { name: "@minh.tran", note: "Coffee makes me happy", initials: "MT" },
  { name: "@thao.lee", note: "Song cham, uong ngon", initials: "TL" },
  { name: "@quangdinh", note: "Di de kham pha", initials: "QD" }
];

const tabs = [
  { id: "posts", label: "Bai viet", icon: ImageIcon },
  { id: "photos", label: "Anh", icon: Camera },
  { id: "checkins", label: "Quan da check-in", icon: MapPin },
  { id: "saved", label: "Da luu", icon: Bookmark }
];

async function getMyProfile() {
  const { data } = await api.get("/profile/me");
  return data.data;
}

async function getPhotos(userId) {
  const { data } = await api.get(`/profile/${userId}/photos`);
  return data.data;
}

function FeedPost({ profile, images, secondary = false }) {
  return (
    <article className="profile-post">
      <header>
        <img src={profile.avatarUrl || DEFAULT_AVATAR} alt="" />
        <div>
          <strong>{profile.username}</strong>
          <span>{secondary ? "3 ngay truoc tai Lofita" : "2 gio truoc tai The Coffee House"}</span>
        </div>
        <button type="button" aria-label="Tuy chon bai viet"><MoreHorizontal /></button>
      </header>
      <p>
        {secondary
          ? "Goc cua so quen thuoc. Ha Noi dep hon khi co ca phe va mot chut nang som."
          : "Mot buoi chieu that chill tai day. Khong gian xinh, do uong ngon, dung vibe minh tim kiem."}
      </p>
      <div className={secondary ? "post-gallery single" : "post-gallery"}>
        {(secondary ? images.slice(0, 1) : images.slice(0, 4)).map((image, index) => (
          <img key={`${image.url}-${index}`} src={image.url} alt={image.caption || "Khoanh khac ca phe"} />
        ))}
      </div>
      <footer>
        <button type="button"><Heart size={18} /> {secondary ? 18 : 24}</button>
        <button type="button"><MessageCircle size={18} /> {secondary ? 2 : 5}</button>
        <button type="button"><Send size={18} /></button>
        <button type="button" className="save-post" aria-label="Luu bai viet"><Bookmark size={18} /></button>
      </footer>
    </article>
  );
}

export default function Profile() {
  const { token, setUser } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("posts");
  const [coverUrl, setCoverUrl] = useState(DEFAULT_COVER);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: "", bio: "" });

  const profileQuery = useQuery({
    queryKey: ["profile", "me"],
    queryFn: getMyProfile,
    enabled: Boolean(token)
  });
  const photosQuery = useQuery({
    queryKey: ["profile", profileQuery.data?.id, "photos"],
    queryFn: () => getPhotos(profileQuery.data.id),
    enabled: Boolean(profileQuery.data?.id)
  });
  const updateProfile = useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.put("/profile/me", payload);
      return data.data;
    },
    onSuccess: (profile) => {
      queryClient.setQueryData(["profile", "me"], profile);
      setUser(profile);
      setEditing(false);
    }
  });

  const gallery = useMemo(() => {
    const uploaded = photosQuery.data || [];
    const defaults = DEFAULT_GALLERY.map((url, index) => ({
      id: `default-${index}`,
      url,
      caption: "Vibe Coffee Ha Noi"
    }));
    return [...uploaded, ...defaults].slice(0, 6);
  }, [photosQuery.data]);

  if (!token) {
    return <Alert status="info"><AlertIcon />Dang nhap de xem My Vibe cua ban.</Alert>;
  }
  if (profileQuery.isLoading) return <div className="profile-loading"><Spinner color="pink.500" size="xl" /></div>;
  if (profileQuery.isError) {
    return <Alert status="error"><AlertIcon />Khong the tai thong tin tai khoan.</Alert>;
  }

  const profile = profileQuery.data;
  const level = Math.max(1, Math.floor(profile.totalPoints / 400) + 1);
  const levelFloor = (level - 1) * 400;
  const levelProgress = Math.min(100, ((profile.totalPoints - levelFloor) / 400) * 100);

  const openEditor = () => {
    setEditForm({ username: profile.username, bio: profile.bio || "" });
    setEditing(true);
  };

  const handleCover = (event) => {
    const file = event.target.files?.[0];
    if (file) setCoverUrl(URL.createObjectURL(file));
  };

  return (
    <div className="profile-page">
      <div className="profile-content">
        <ProfileHeader
          user={profile}
          coverUrl={coverUrl}
          onCoverSelect={handleCover}
          onEdit={openEditor}
        />

        <div className="profile-dashboard">
          <div className="profile-stream">
            <nav className="profile-tabs" aria-label="Noi dung ho so">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  type="button"
                  key={id}
                  className={activeTab === id ? "active" : ""}
                  onClick={() => setActiveTab(id)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>

            <div className="profile-tab-content">
              {activeTab === "posts" ? (
                <>
                  <FeedPost profile={profile} images={gallery} />
                  <FeedPost profile={profile} images={gallery.slice().reverse()} secondary />
                </>
              ) : null}
              {activeTab === "photos" ? <PhotoGrid photos={gallery} /> : null}
              {activeTab === "checkins" ? (
                <div className="profile-empty-state">
                  <MapPin />
                  <strong>Nhung diem hen da ghe</strong>
                  <p>Pink Pixel Brew, Ho Guom va Pho Co Ha Noi.</p>
                </div>
              ) : null}
              {activeTab === "saved" ? (
                <div className="profile-empty-state"><Bookmark /><strong>Chua co bai viet da luu</strong></div>
              ) : null}
            </div>
          </div>

          <aside className="profile-rail">
            <section className="profile-side-panel level-panel">
              <div className="side-heading"><h2>Cap do hien tai</h2><span>Lv. {level}</span></div>
              <div className="level-summary">
                <img src="/assets/quest-coffee-medallion.png" alt="Huy hieu cap do" />
                <div>
                  <strong>{profile.level}</strong>
                  <div className="profile-xp-track"><i style={{ width: `${levelProgress}%` }} /></div>
                  <small>{profile.totalPoints} / {level * 400} XP</small>
                </div>
              </div>
              <p className="level-tip"><Sparkles size={16} /> Them {Math.max(0, level * 400 - profile.totalPoints)} XP de len cap tiep theo</p>
            </section>

            <section className="profile-side-panel">
              <div className="side-heading"><h2>Huy hieu cua toi</h2><span>{badges.length}</span></div>
              <div className="profile-badges">
                {badges.map(({ label, icon: Icon, tone }) => (
                  <div className={`profile-badge ${tone}`} key={label}>
                    <span><Icon size={23} /></span>
                    <strong>{label}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="profile-side-panel">
              <div className="side-heading"><h2>Ban be</h2><span>{profile._count?.followers || 0}</span></div>
              <div className="friend-list">
                {friends.map((friend, index) => (
                  <div className="friend-row" key={friend.name}>
                    <span className={`friend-avatar tone-${index + 1}`}>{friend.initials}</span>
                    <div><strong>{friend.name}</strong><small>{friend.note}</small></div>
                    <button type="button">Theo doi</button>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      <PixelModal isOpen={editing} onClose={() => setEditing(false)} title="Chinh sua ho so" size="md">
        <form
          className="profile-edit-form"
          onSubmit={(event) => {
            event.preventDefault();
            updateProfile.mutate(editForm);
          }}
        >
          <FormControl isRequired>
            <FormLabel>Ten dang nhap</FormLabel>
            <Input value={editForm.username} onChange={(event) => setEditForm({ ...editForm, username: event.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Gioi thieu</FormLabel>
            <Textarea value={editForm.bio} maxLength={240} onChange={(event) => setEditForm({ ...editForm, bio: event.target.value })} />
          </FormControl>
          {updateProfile.isError ? <Alert status="error"><AlertIcon />Khong the cap nhat ho so.</Alert> : null}
          <Button type="submit" className="pixel-btn" isLoading={updateProfile.isPending}>Luu thay doi</Button>
        </form>
      </PixelModal>
    </div>
  );
}

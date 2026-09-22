export type GalleryImage = {
  src: string;
  alt: string;
};

export type GalleryAlbum = {
  id: string;
  slug: string;
  /** Card title, e.g. "جشن تولد امیر" */
  title: string;
  category: string;
  /** Short 2-line description shown on the card. */
  excerpt: string;
  /** All photos belonging to this album. images[0] is the cover shown on the card. */
  images: GalleryImage[];
};

const PAGE_SIZE = 9; // 3 columns x 3 rows

// ------------------------------------------------------------------
// Sample data — replace with real albums/photos later.
// Put new photos in /public/images/... and reference them here.
// ------------------------------------------------------------------
const albums: GalleryAlbum[] = [
  {
    id: "1",
    slug: "birthday-amir",
    title: "جشن تولد امیر",
    category: "BIRTHDAY",
    excerpt: "لحظه‌های شاد جشن تولد امیر در آتلیه، با نورپردازی رنگی و دکور مخصوص کودک.",
    images: [
      { src: "/images/slides/sample-1.jpg", alt: "جشن تولد امیر - نمای اول" },
      { src: "/images/slides/sample-2.jpg", alt: "جشن تولد امیر - نمای دوم" },
      { src: "/images/slides/sample-3.jpg", alt: "جشن تولد امیر - نمای سوم" },
    ],
  },
  {
    id: "2",
    slug: "wedding-sara-reza",
    title: "عروسی سارا و رضا",
    category: "WEDDING",
    excerpt: "روایت یک روز خاص؛ از آماده‌شدن عروس تا لحظه‌های صمیمی مراسم.",
    images: [
      { src: "/images/slides/sample-2.jpg", alt: "عروسی سارا و رضا - نمای اول" },
      { src: "/images/slides/sample-3.jpg", alt: "عروسی سارا و رضا - نمای دوم" },
    ],
  },
  {
    id: "3",
    slug: "portrait-studio",
    title: "پرتره استودیویی",
    category: "PORTRAIT",
    excerpt: "یک جلسه عکاسی پرتره ساده با نور استودیویی و پس‌زمینه مینیمال.",
    images: [{ src: "/images/slides/sample-3.jpg", alt: "پرتره استودیویی" }],
  },
  {
    id: "4",
    slug: "newborn-kimia",
    title: "نوزاد کیمیا",
    category: "NEWBORN",
    excerpt: "اولین قاب‌های زندگی کیمیا، با وسایل نرم و رنگ‌های ملایم.",
    images: [
      { src: "/images/slides/sample-1.jpg", alt: "نوزاد کیمیا - نمای اول" },
      { src: "/images/slides/sample-2.jpg", alt: "نوزاد کیمیا - نمای دوم" },
      { src: "/images/slides/sample-3.jpg", alt: "نوزاد کیمیا - نمای سوم" },
      { src: "/images/slides/sample-1.jpg", alt: "نوزاد کیمیا - نمای چهارم" },
    ],
  },
  {
    id: "5",
    slug: "engagement-niloofar-hamed",
    title: "نامزدی نیلوفر و حامد",
    category: "CEREMONY",
    excerpt: "قاب‌هایی گرم و صمیمی از مراسم عقد در فضایی دنج و خانوادگی.",
    images: [
      { src: "/images/slides/sample-2.jpg", alt: "نامزدی نیلوفر و حامد - نمای اول" },
      { src: "/images/slides/sample-1.jpg", alt: "نامزدی نیلوفر و حامد - نمای دوم" },
    ],
  },
  {
    id: "6",
    slug: "kids-outdoor",
    title: "عکاسی فضای باز کودک",
    category: "KIDS",
    excerpt: "یک بعدازظهر بازیگوشانه در فضای باز، پر از خنده و حرکت.",
    images: [
      { src: "/images/slides/sample-3.jpg", alt: "عکاسی فضای باز کودک - نمای اول" },
      { src: "/images/slides/sample-2.jpg", alt: "عکاسی فضای باز کودک - نمای دوم" },
      { src: "/images/slides/sample-1.jpg", alt: "عکاسی فضای باز کودک - نمای سوم" },
    ],
  },
  {
    id: "7",
    slug: "family-gathering",
    title: "دورهمی خانوادگی",
    category: "FAMILY",
    excerpt: "یک نشست خانوادگی گرم، با تمرکز بر لبخندهای واقعی و طبیعی.",
    images: [{ src: "/images/slides/sample-1.jpg", alt: "دورهمی خانوادگی" }],
  },
  {
    id: "8",
    slug: "birthday-elina",
    title: "جشن تولد النا",
    category: "BIRTHDAY",
    excerpt: "بادکنک‌های رنگی، کیک و لحظه‌های فراموش‌نشدنی جشن تولد النا.",
    images: [
      { src: "/images/slides/sample-2.jpg", alt: "جشن تولد النا - نمای اول" },
      { src: "/images/slides/sample-3.jpg", alt: "جشن تولد النا - نمای دوم" },
    ],
  },
  {
    id: "9",
    slug: "pregnancy-mahsa",
    title: "بارداری مهسا",
    category: "PREGNANCY",
    excerpt: "قاب‌هایی ملایم و شاعرانه از دوران بارداری در نور طبیعی آتلیه.",
    images: [
      { src: "/images/slides/sample-3.jpg", alt: "بارداری مهسا - نمای اول" },
      { src: "/images/slides/sample-1.jpg", alt: "بارداری مهسا - نمای دوم" },
    ],
  },
  {
    id: "10",
    slug: "wedding-golsa-ali",
    title: "عروسی گلسا و علی",
    category: "WEDDING",
    excerpt: "شبی به یادماندنی؛ از مراسم عقد تا رقص نور جشن.",
    images: [
      { src: "/images/slides/sample-1.jpg", alt: "عروسی گلسا و علی - نمای اول" },
      { src: "/images/slides/sample-2.jpg", alt: "عروسی گلسا و علی - نمای دوم" },
      { src: "/images/slides/sample-3.jpg", alt: "عروسی گلسا و علی - نمای سوم" },
    ],
  },
];

export async function getAlbums(page: number) {
  const totalPages = Math.max(1, Math.ceil(albums.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const start = (safePage - 1) * PAGE_SIZE;
  const items = albums.slice(start, start + PAGE_SIZE);

  return { albums: items, page: safePage, totalPages };
}

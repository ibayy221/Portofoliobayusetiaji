export interface Project {
  id: string;
  title: string;
  category: 'digital' | 'print' | 'photography' | 'mockup' | 'branding' | 'video';
  categoryLabel: string;
  client?: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  inSelectedWorks?: boolean;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  details?: {
    price?: string;
    specs?: string;
  };
}

export interface JourneyStep {
  id: string;
  stepNumber: string;
  company: string;
  logo: string;
  industry: string;
  role: string;
  period: string;
  badge: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  highlightColor: string;
}

export interface Education {
  institution: string;
  location: string;
  period: string;
  major?: string;
}

export const PERSONAL_INFO = {
  name: "Bayu Setiaji",
  monogram: "BS",
  tagline: "DESAIN GRAFIS & REKAYASA PERANGKAT LUNAK",
  subHeadline: "Desainer Grafis & Produsen Konten yang berfokus pada identitas visual modern, bersih, dan berdampak tinggi. Mengubah ide menjadi pengalaman visual yang berani dan konten video berkinerja tinggi.",
  location: "Karawang, Indonesia",
  contact: {
    whatsapp: "+62 858 9160 2476",
    whatsappLink: "https://wa.me/6285891602476?text=Halo%20Bayu%20Setiaji,%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda",
    linkedin: "Bayu Setiaji",
    linkedinLink: "https://www.linkedin.com/in/bayusetiaji/",
    email: "Bayu07454@gmail.com",
    website: "portofolioibay.free.nf",
    websiteLink: "http://portofolioibay.free.nf"
  }
};

export const EDUCATION: Education[] = [
  {
    institution: "SMK Nurul Ansor",
    location: "Karawang",
    period: "2021 – 2024"
  },
  {
    institution: "LP3I College",
    location: "Karawang",
    period: "2024 – 2026",
    major: "Jurusan Rekayasa Perangkat Lunak Aplikasi"
  }
];

export const TECHNICAL_SKILLS = [
  { name: "Photoshop", code: "Ps", icon: "/Images/Photoshop.png" },
  { name: "After Effects", code: "Ae", icon: "/Images/After effect.png" },
  { name: "Lightroom", code: "Lr", icon: "/Images/Lightroom.png" },
  { name: "CapCut", code: "Cc", icon: "/Images/Capcut.png" },
  { name: "CorelDraw", code: "Cd", icon: "/Images/Corel.png" },
  { name: "Laravel", code: "Lv", icon: "/Images/Laravel.png" },
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'mercure-karawang',
    stepNumber: '01',
    company: 'Mercure Karawang',
    logo: '/Images/Mercure karawang.png',
    industry: 'Perhotelan & Hotel Mewah (Accor Group)',
    role: 'Graphic Designer',
    period: 'Desember 2025 – April 2026',
    badge: 'ACCOR GROUP',
    description: 'Mengelola identitas brand menyeluruh dan materi pemasaran untuk hotel Mercure Karawang, restoran, serta acara promosi sesuai panduan visual global Accor.',
    responsibilities: [
      'Manajemen Identitas Brand: Mengeksekusi dan menjaga konsistensi brand di seluruh media digital & cetak.',
      'Materi Pemasaran: Mendesain aset promosi untuk media sosial, layar LED, X-banner, dan poster F&B.',
      'Peningkatan Pengalaman Pengguna: Mengembangkan elemen UI yang intuitif untuk antarmuka reservasi internal.',
      'Kolaborasi Lintas Fungsi: Bekerja sama dengan tim Sales & Marketing untuk meningkatkan pemesanan.'
    ],
    skills: ['Identitas Brand', 'Poster Digital', 'X-Banner', 'Pemasaran F&B', 'Desain UI/UX'],
    highlightColor: 'from-blue-500/20 to-indigo-500/10'
  },
  {
    id: 'cue-corner',
    stepNumber: '02',
    company: 'Cue Corner',
    logo: '/Images/Cue corner_.png',
    industry: 'Distributor Peralatan Biliar',
    role: 'Graphic Designer & Content Producer',
    period: 'Karier Aktif',
    badge: 'DISTRIBUTOR BILIAR',
    description: 'Memimpin pembuatan konten kreatif dan branding visual penuh untuk distributor biliar Cue Corner. Mengelola produksi video harian, penulisan naskah, pengambilan gambar, editing, dan penjadwalan konten.',
    responsibilities: [
      'Pembuat Konten Menyeluruh: Penulisan naskah, jadwal shooting (take video), dan editing video harian.',
      'Editing Video Harian: Mengedit video promosi produk biliar, tips & tutorial, serta reels/TikTok ber-engagement tinggi.',
      'Kalender Konten & Penjadwalan Upload: Menyusun daftar & jadwal upload konten harian secara terstruktur.',
      'Branding Visual & Desain Grafis: Membuat desain poster produk, banner katalog distributor biliar, dan promosi media sosial.'
    ],
    skills: ['Editing Video', 'Penulisan Naskah', 'Videografi (Take Video)', 'Penjadwalan Konten', 'Desain Grafis'],
    highlightColor: 'from-emerald-500/20 to-teal-500/10'
  }
];

export const EXPERIENCES = JOURNEY_STEPS.map((step) => ({
  role: step.role,
  company: step.company,
  period: step.period,
  highlights: step.responsibilities
}));

export const CATEGORIES = [
  { id: 'all', label: 'Semua Proyek' },
  { id: 'digital', label: '01 Media Digital' },
  { id: 'video', label: '02 Video & Reels (Cue Corner)' },
  { id: 'print', label: 'Desain Cetak' },
  { id: 'photography', label: 'Fotografi' },
  { id: 'branding', label: 'Event & Identitas Brand' },
];

export const PROJECTS: Project[] = [
  {
    id: 'ramen-set',
    title: 'All About Ramen Campaign',
    category: 'digital',
    categoryLabel: 'Digital Poster',
    client: 'Kunoichi Japanese Restaurant (Mercure Karawang)',
    description: 'High-impact digital poster promotion for Kunoichi Japanese Restaurant set menu featuring traditional ramen graphics and elegant typography.',
    image: '/images/kunoichi-ramen.svg',
    tags: ['Digital Poster', 'Social Media', 'F&B Branding'],
    featured: true,
    inSelectedWorks: true,
    details: {
      price: 'IDR 150.000++',
      specs: 'Includes Choice Ramen, Night Dish, Miso Soup, Kakigori, Ocha'
    }
  },
  {
    id: 'tantan-ramen',
    title: 'TanTan Ramen Promo Poster',
    category: 'digital',
    categoryLabel: 'Digital Poster',
    client: 'Kunoichi Japanese Restaurant (Mercure Karawang)',
    description: 'Bold, spicy, and irresistibly creamy TanTan Ramen promotional poster for digital displays and social media stories.',
    image: '/images/tantan-ramen.svg',
    tags: ['Digital Poster', 'LED Display', 'Menu Poster'],
    featured: true,
    inSelectedWorks: true,
    details: {
      price: 'IDR 98.000++',
      specs: 'Fresh Artisan Noodles, Rich Spicy Broth'
    }
  },
  {
    id: 'cue-corner-billiard-video',
    title: 'Cue Corner Billiard Equipment Showcase',
    category: 'video',
    categoryLabel: 'Video Production',
    client: 'Cue Corner (Distributor Billiard)',
    description: 'Daily short-form video edit, product breakdown, scriptwriting, and shoot for Cue Corner billiard cues & table accessories.',
    image: '/images/cue-corner-video.svg',
    tags: ['Daily Video Editing', 'Take & Edit', 'Content Schedule', 'Scriptwriting'],
    featured: true,
    inSelectedWorks: true,
    details: {
      specs: 'Take Video + Edit + Script + Upload Schedule List'
    }
  },
  {
    id: 'kazoku-shabu',
    title: 'Kazoku Shabu Shabu Package',
    category: 'digital',
    categoryLabel: 'Digital Poster',
    client: 'Kunoichi Japanese Restaurant (Mercure Karawang)',
    description: 'Family feast dining experience poster showcasing premium beef and fresh farm vegetables in a sleek dark Japanese aesthetic.',
    image: '/images/kazoku-shabu.svg',
    tags: ['Digital Poster', 'Marketing Collateral', 'Event Poster'],
    featured: true,
    inSelectedWorks: true,
    details: {
      price: 'IDR 560.000++',
      specs: 'Serves 4-6 Persons, Premium Beef Slice'
    }
  },
  {
    id: 'cue-corner-catalog',
    title: 'Cue Corner Product Catalog & Poster',
    category: 'branding',
    categoryLabel: 'Brand & Catalog Design',
    client: 'Cue Corner (Distributor Billiard)',
    description: 'Visual identity and product catalog graphics for billiard cues, shafts, chalks, and distributor promotional banners.',
    image: '/images/cue-corner-catalog.svg',
    tags: ['Distributor Branding', 'Catalog Design', 'Social Media Banner'],
    featured: true,
    inSelectedWorks: true
  }
];

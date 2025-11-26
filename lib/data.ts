export const weddingData = {
  couple: {
    name1: "Nina",
    name2: "Rores"
  },
  weddingDate: "14 Desember 2025",
  story: {
    title: "Kisah Kami",
    text: "Kisah kami dimulai di sebuah kedai kopi kecil di pusat kota...",
    image: "/images/our-story.jpg"
  },
  events: [
    {
      title: "Akad Nikah",
      time: "07.00 WIB",
      venue: "Gedung Sasanagita",
      address: "Tejosari, Parakan, Temanggung",
      mapLink: "https://maps.app.goo.gl/9yTCxro8usPdSFB36?g_st=ic",
      description: "Acara akad nikah akan dilaksanakan di Gedung Sasanagita",
      side: "female"
    },
    {
      title: "Resepsi",
      time: "10.00 WIB",
      venue: "Gedung Sasanagita",
      address: "Tejosari, Parakan, Temanggung",
      mapLink: "https://maps.app.goo.gl/9yTCxro8usPdSFB36?g_st=ic",
      description: "Acara resepsi akan dilaksanakan di Gedung Sasanagita",
      side: "female"
    },
    {
      title: "Ngunduh Mantu",
      time: "Menunggu Konfirmasi",
      venue: "Kediaman Mempelai Pria",
      address: "Lokasi Pihak Pria",
      mapLink: "#",
      description: "Informasi lokasi dan waktu akan menyusul.",
      side: "male"
    }
  ],
  gallery: {
    title: "Galeri",
    images: [
      "/images/gallery/1.jpg",
      "/images/gallery/2.jpg",
      "/images/gallery/3.jpg",
      "/images/gallery/4.jpg"
    ]
  },
  rsvp: {
    title: "RSPV",
    formEndpoint: "/api/rsvp"
  }
};

// Branching story data structure
export interface BranchingStory {
  title: string;
  description: string;
  characters: {
    [characterId: string]: {
      name: string;
      description: string;
      color: string;
      chapters: Chapter[];
    };
  };
  convergencePoints: ConvergencePoint[];
  navigation: NavigationOptions;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  perspective: string; // character ID
  nextChapters: string[]; // array of chapter IDs
  image?: string;
  audio?: string;
}

export interface ConvergencePoint {
  id: string;
  title: string;
  description: string;
  chapterIds: string[]; // chapters that converge here
  nextChapters: string[]; // where to go after convergence
}

export interface NavigationOptions {
  allowBack: boolean;
  allowCharacterSwitch: boolean;
  autoProgress: boolean;
  showProgress: boolean;
}

// Sample branching story for Nina and Rores
export const branchingStory: BranchingStory = {
  title: "Dua Hati, Satu Perjalanan",
  description: "Alami kisah cinta kami dari kedua perspektif",
  characters: {
    nina: {
      name: "Nina",
      description: "Pembimbing mimpi dengan hati penuh harapan",
      color: "#FF6B9D",
      chapters: [
        {
          id: "nina-ch1",
          title: "Ketemuan Tak Terduga",
          perspective: "nina",
          content: "Hujan deras mengguyur saat saya terburu-buru masuk ke kedai kopi kecil di pojok. Badan saya basah kuyup, rambut berantakan, dan saya terlambat untuk pertemuan. Tapi kemudian saya melihatnya - duduk di dekat jendela, terlihat penuh perhatiannya sambil membaca buku. Ada sesuatu tentang caranya menengadah saat bel berbunyi, matanya bertemu dengan mata saya hanya untuk sesaat yang terasa seperti keabadian. Saya tahu saat itu itu bukan hanya hari hujan biasa di kota.",
          nextChapters: ["nina-ch2", "convergence1"],
          image: "/images/nina-ch1.jpg"
        },
        {
          id: "nina-ch2",
          title: "Pertama Kali Berkencan",
          perspective: "nina",
          content: "Dia menyarankan kami ngopi suatu saat, dan saya menemukan diri saya mengatakan ya sebelum saya bisa berpikir terlalu jauh. Kencan pertama kami di kedai kopi yang sama, tapi kali ini saya tidak terburu-buru ke mana-mana. Kami berbicara selama jam-jam tentang segalanya dan tidak ada apa-apa - mimpi kami, rasa takut kami, buku favorit kami. Saya ingat berpikir betapa mudahnya rasanya, seperti kami sudah saling mengenal selamanya. Saat dia mengantar pulang, saya tahu saya ingin bertemu lagi.",
          nextChapters: ["convergence1"],
          image: "/images/nina-ch2.jpg"
        },
        {
          id: "nina-ch3",
          title: "Selam Dimulai",
          perspective: "nina",
          content: "Berdiri di sini hari ini, melihat ke luar ke semua Anda yang telah mendukung kami dalam perjalanan ini, saya tidak bisa berhenti memikirkan kembali hari hujan di kedai kopi. Setiap momen bersama Rores adalah hadiah - tawa, air mata, pagi-pagi yang tenang, dan petualangan. Dia adalah sahabat terbaik saya, pasangan saya, segalanya. Hari ini, kami memulai selamanya, dan saya tidak bisa lebih bersyukur memiliki Anda semua menyaksikan awal dari kisah bahagia kami yang abadi.",
          nextChapters: ["ending"],
          image: "/images/nina-ch3.jpg"
        }
      ]
    },
    rores: {
      name: "Rores",
      description: "Tangan yang stabil dengan jiwa yang lembut",
      color: "#4ECDC4",
      chapters: [
        {
          id: "rores-ch1",
          title: "Wajah yang Dikenal",
          perspective: "rores",
          content: "Saya mencoba fokus pada buku saya, tapi pintu kedai kopi terus terbuka dengan hembusan angin dan hujan. Lalu dia masuk - kewalahan, cantik, dan sangat memukau. Ada sesuatu tentang energinya, caranya menggoyangkan payungnya dan tersenyum meminta maaf kepada barista. Saat mata kami bertemu di seberang ruangan, saya merasa sesuatu berubah. Saya tahu saya harus bicara dengannya, tapi saya menunggu momen yang tepat, berharap dia akan tinggal.",
          nextChapters: ["rores-ch2", "convergence1"],
          image: "/images/rores-ch1.jpg"
        },
        {
          id: "rores-ch2",
          title: "Membangun Sesuatu yang Nyata",
          perspective: "rores",
          content: "Kencan pertama kami sempurna. Nina memiliki cara membuat semua orang merasa nyaman, seperti kami sudah saling mengenal bertahun-tahun. Kami berbicara tentang keluarga, mimpi untuk masa depan, dan apa yang kami cari dalam pasangan. Saya menemukan diri saya membuka diri dengan cara yang belum pernah saya lakukan sebelumnya. Pada akhir malam, saya tahu dia adalah seseorang istimewa - seseorang yang ingin saya bangun sesuatu yang nyata dengannya.",
          nextChapters: ["convergence1"],
          image: "/images/rores-ch2.jpg"
        },
        {
          id: "rores-ch3",
          title: "Janji Saya untukmu",
          perspective: "rores",
          content: "Melihat Nina hari ini, berdiri begitu bersinar dan bahagia, saya terlalu banyak bersyukur. Dia telah mengajari saya arti cinta sejati - kesabaran, pemahaman, dan dukungan yang tak kenal lelah. Dari pertemuan pertama hingga momen ini, dia telah menjadi cahaya pemandu saya. Hari ini, saya berjanji untuk mencintai Anda sepenuhnya, mendukung mimpi Anda, dan menghargai setiap momen yang kami bagikan bersama. Anda adalah hati saya, rumah saya, segalanya.",
          nextChapters: ["ending"],
          image: "/images/rores-ch3.jpg"
        }
      ]
    }
  },
  convergencePoints: [
    {
      id: "convergence1",
      title: "Jalur Bersama Kami",
      description: "Di mana kedua kisah bertemu dan terus sebagai satu",
      chapterIds: ["nina-ch2", "rores-ch2"],
      nextChapters: ["nina-ch3", "rores-ch3"]
    }
  ],
  navigation: {
    allowBack: true,
    allowCharacterSwitch: true,
    autoProgress: false,
    showProgress: true
  }
};

// Helper functions for story navigation
export const getChapterById = (chapterId: string): Chapter | undefined => {
  for (const character of Object.values(branchingStory.characters)) {
    const chapter = character.chapters.find(ch => ch.id === chapterId);
    if (chapter) return chapter;
  }
  return undefined;
};

export const getConvergencePointById = (convergenceId: string): ConvergencePoint | undefined => {
  return branchingStory.convergencePoints.find(cp => cp.id === convergenceId);
};

export const getNextChapters = (chapterId: string): Chapter[] => {
  const chapter = getChapterById(chapterId);
  if (!chapter) return [];
  
  return chapter.nextChapters
    .map(id => getChapterById(id))
    .filter(chapter => chapter !== undefined) as Chapter[];
};

export const getCharacterChapters = (characterId: string): Chapter[] => {
  return branchingStory.characters[characterId]?.chapters || [];
};
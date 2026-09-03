export const deadlinesData = [
  // KRITIS (< 24 Jam) - Red
  {
    id: "task-1",
    title: "Diskusi Sesi 3: Implementasi Struktur Data",
    course: "Algoritma & Pemrograman",
    courseCode: "MKS102",
    type: "Forum", // Kategori
    deadline: "15 Nov 2024, 23:59",
    timeLeft: "5 Jam Lagi",
    urgency: "urgent", // 'urgent' | 'soon' | 'safe'
    progress: 85,
    statusText: "Sedang Berlangsung",
    vclassUrl: "https://v-class.gunadarma.ac.id",
    collaborators: [
      { name: "Ahmad", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { name: "Siti", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" }
    ],
    collaboratorsExtra: 4
  },
  {
    id: "task-2",
    title: "Tugas 1: Analisis Kebutuhan Sistem",
    course: "Rekayasa Perangkat Lunak",
    courseCode: "MKS201",
    type: "Kuis",
    deadline: "15 Nov 2024, 23:59",
    timeLeft: "12 Jam Lagi",
    urgency: "urgent",
    progress: 10,
    statusText: "Belum dimulai",
    vclassUrl: "https://v-class.gunadarma.ac.id"
  },

  // MENDEKAT (1 - 3 Hari) - Amber
  {
    id: "task-3",
    title: "Review Jurnal Internasional HCI",
    course: "Interaksi Manusia & Komputer",
    courseCode: "MKS301",
    type: "Materi",
    deadline: "17 Nov 2024, 12:00",
    timeLeft: "Besok",
    urgency: "soon",
    progress: 60,
    statusText: "Draft tersimpan",
    vclassUrl: "https://v-class.gunadarma.ac.id"
  },
  {
    id: "task-4",
    title: "Kuis 2: Probabilitas Diskrit",
    course: "Statistika Dasar",
    courseCode: "MAT102",
    type: "Kuis",
    deadline: "18 Nov 2024, 16:00",
    timeLeft: "Lusa",
    urgency: "soon",
    progress: 0,
    statusText: "Belum dimulai",
    vclassUrl: "https://v-class.gunadarma.ac.id"
  },
  {
    id: "task-5",
    title: "Diskusi Sesi 4: Entity Relationship Diagram",
    course: "Basis Data",
    courseCode: "MKS104",
    type: "Forum",
    deadline: "19 Nov 2024, 23:59",
    timeLeft: "3 Hari Lagi",
    urgency: "soon",
    progress: 30,
    statusText: "Dalam pengerjaan",
    vclassUrl: "https://v-class.gunadarma.ac.id"
  },

  // AMAN (> 3 Hari) - Emerald/Green
  {
    id: "task-6",
    title: "Tugas Akhir: Proposal Proyek",
    course: "Manajemen Proyek TI",
    courseCode: "MKS401",
    type: "Materi",
    deadline: "22 Nov 2024, 23:59",
    timeLeft: "5 Hari",
    dateFormatted: "12 Nov",
    urgency: "safe",
    progress: 20,
    statusText: "Draf awal",
    vclassUrl: "https://v-class.gunadarma.ac.id"
  },
  {
    id: "task-7",
    title: "Diskusi Sesi 5: Process Synchronization",
    course: "Sistem Operasi",
    courseCode: "MKS203",
    type: "Forum",
    deadline: "24 Nov 2024, 18:00",
    timeLeft: "7 Hari",
    dateFormatted: "14 Nov",
    urgency: "safe",
    progress: 0,
    statusText: "Terbuka",
    vclassUrl: "https://v-class.gunadarma.ac.id"
  },
  {
    id: "task-8",
    title: "Materi Bacaan Modul 4",
    course: "Arsitektur Komputer",
    courseCode: "MKS204",
    type: "Materi",
    deadline: "26 Nov 2024, 23:59",
    timeLeft: "Minggu Depan",
    dateFormatted: "16 Nov",
    urgency: "safe",
    progress: 0,
    statusText: "Tersedia",
    vclassUrl: "https://v-class.gunadarma.ac.id"
  },
  {
    id: "task-9",
    title: "Tugas 2: Praktikum SQL Joins & Aggregate",
    course: "Basis Data",
    courseCode: "MKS104",
    type: "Kuis",
    deadline: "01 Des 2024, 23:59",
    timeLeft: "2 Minggu",
    dateFormatted: "21 Nov",
    urgency: "safe",
    progress: 0,
    statusText: "Belum dimulai",
    vclassUrl: "https://v-class.gunadarma.ac.id"
  }
];

export const heroMockupTasks = [
  {
    id: "mock-1",
    type: "Kuis",
    typeColor: "primary",
    course: "Algoritma & Struktur Data",
    timeBadge: "2 Jam",
    urgency: "urgent"
  },
  {
    id: "mock-2",
    type: "Forum",
    typeColor: "secondary",
    course: "Manajemen Proyek TI",
    timeBadge: "1 Hari",
    urgency: "soon"
  },
  {
    id: "mock-3",
    type: "Materi",
    typeColor: "tertiary",
    course: "Desain Antarmuka",
    timeBadge: "3 Hari",
    urgency: "safe"
  }
];

export const upcomingPreviewDeadlines = [
  {
    id: "prev-1",
    type: "Kuis",
    badgeColor: "red",
    timeLeft: "12 Jam Lagi",
    course: "Sistem Informasi Geografis",
    deadline: "15 Nov 2024, 23:59",
    urgency: "urgent"
  },
  {
    id: "prev-2",
    type: "Forum",
    badgeColor: "amber",
    timeLeft: "2 Hari Lagi",
    course: "Pemrograman Web Lanjut",
    deadline: "17 Nov 2024, 12:00",
    urgency: "soon"
  },
  {
    id: "prev-3",
    type: "Materi",
    badgeColor: "emerald",
    timeLeft: "5 Hari Lagi",
    course: "Manajemen Basis Data",
    deadline: "20 Nov 2024, 08:00",
    urgency: "safe"
  }
];

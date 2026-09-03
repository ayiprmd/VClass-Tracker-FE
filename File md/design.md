# Design System Specification — LMS Deadline Tracker

Dokumen ini berisi spesifikasi desain (design system) untuk aplikasi web **LMS Deadline Tracker**, ditujukan sebagai acuan visual sebelum masuk tahap implementasi React.js + Tailwind CSS.

Target pengguna: mahasiswa usia 19–20 tahun. Gaya visual: modern, clean, minimalis, light mode, dan mudah dicerna secara informasi.

---

## 1. Visual Direction

Tema utama aplikasi adalah **Clean Minimalist, Light Mode dominan**. Kesan yang ingin dibangun adalah rapi, dapat dipercaya, dan "produktif tanpa terasa berat" — cocok dengan preferensi visual generasi muda yang terbiasa dengan antarmuka aplikasi modern seperti Notion, Linear, atau aplikasi produktivitas kekinian lainnya.

Prinsip visual yang dipegang:
- Banyak ruang kosong (whitespace), tidak padat, tidak ramai.
- Sudut membulat (rounded corners) mendominasi hampir seluruh elemen untuk kesan lembut dan ramah.
- Bayangan (shadow) digunakan secara tipis dan halus, kecuali pada elemen dekoratif tertentu yang memang ingin ditonjolkan (misalnya mockup ilustrasi di hero).
- Warna hanya digunakan secara fungsional: sebagai penanda status, aksen, atau elemen interaktif — bukan sekadar dekorasi.

---

## 2. Color Palette

### 2.1 Warna Utama (Brand & Netral)

| Peran | Deskripsi | HEX (referensi Tailwind) | Tailwind Class |
|---|---|---|---|
| Primary | Royal Blue, warna identitas utama aplikasi. Dipakai untuk tombol utama, elemen highlight, dan aksen interaktif. | `#2563EB` | `blue-600` |
| Primary Hover | Versi lebih gelap dari primary, dipakai saat hover/tekan tombol. | `#1D4ED8` | `blue-700` |
| Primary Surface | Versi sangat muda dari primary, dipakai sebagai background badge/label bernuansa biru. | `#EFF6FF` | `blue-50` |
| Teks di atas Primary | Putih polos, dipakai untuk teks/ikon di atas elemen berwarna biru. | `#FFFFFF` | `white` |
| Teks Heading | Slate gelap, warna teks judul utama di atas background terang. | `#1E293B` | `slate-800` |
| Teks Body | Slate medium, warna teks paragraf/deskripsi. | `#475569` / `#64748B` | `slate-600` / `slate-500` |
| Teks Caption/Meta | Slate lebih terang, untuk teks kecil seperti timestamp. | `#94A3B8` | `slate-400` |
| Background Utama | Putih bersih, dipakai sebagai dasar halaman. | `#FFFFFF` | `white` |
| Background Alternatif | Abu sangat muda, dipakai untuk membedakan section secara halus. | `#F8FAFC` | `slate-50` |
| Border Default | Abu muda, dipakai untuk garis pemisah/kartu. | `#E2E8F0` | `slate-200` |

### 2.2 Warna Status (Urgensi Deadline)

Warna status digunakan konsisten di seluruh aplikasi untuk menandai tingkat urgensi tugas, agar pengguna bisa langsung mengenali prioritas hanya dari warna tanpa perlu membaca detail.

| Status | Kondisi | Warna Aksen (border/teks) | Warna Background Lembut | Tailwind Class |
|---|---|---|---|---|
| Urgent (Mendesak) | Deadline sangat dekat (misal < 24 jam atau hari ini) | Merah — `#EF4444` | Merah muda — `#FEF2F2` | `red-500` / `red-50` |
| Segera | Deadline dalam beberapa hari ke depan (misal 1–3 hari) | Amber/Kuning — `#F59E0B` | Amber muda — `#FFFBEB` | `amber-500` / `amber-50` |
| Aman | Deadline masih cukup jauh (misal > 3 hari) | Hijau Emerald — `#10B981` | Hijau muda — `#ECFDF5` | `emerald-500` / `emerald-50` |

Aturan penerapan: warna status ini konsisten dipakai pada **border kartu**, **badge waktu**, dan **teks tenggat waktu** pada komponen mana pun yang menampilkan informasi deadline.

### 2.3 Warna Kategori Jenis Tugas (Netral, Tidak Terikat Urgensi)

Untuk membedakan jenis tugas (Kuis, Forum, Materi) tanpa tumpang tindih dengan warna status urgensi, digunakan palet netral terpisah:

| Jenis Tugas | Warna Aksen | Tailwind Class |
|---|---|---|
| Kuis | Ungu | `purple-600` / `purple-50` |
| Forum | Biru | `blue-600` / `blue-50` |
| Materi | Abu netral | `slate-600` / `slate-100` |

---

## 3. Tipografi

### 3.1 Font Family

Font utama yang digunakan adalah **"Plus Jakarta Sans"**, dengan fallback ke **"Inter"** dan sans-serif sistem. Kedua font ini dipilih karena karakter geometrisnya yang modern, tingkat keterbacaan tinggi, dan cocok dengan selera visual generasi Z yang sudah terbiasa dengan produk-produk digital kontemporer.

Karakteristik font yang ditekankan:
- Bentuk huruf tegas namun tetap ramah (tidak terlalu kaku/formal).
- Jarak antar huruf nyaman dibaca dalam ukuran kecil (untuk label, badge, meta info).
- Ketebalan (weight) yang digunakan bervariasi dari regular hingga extrabold untuk membangun hierarki visual.

### 3.2 Skala Tipografi

| Elemen | Ukuran & Ketebalan (deskriptif) | Warna |
|---|---|---|
| Hero Heading (H1) | Sangat besar, extra bold, line-height rapat untuk kesan tegas di halaman depan | Slate gelap (`slate-800`), dengan kata kunci penting bisa diberi aksen biru |
| Section Heading (H2) | Besar, bold, dipakai sebagai judul tiap section (Deadline Tracker, Fitur, dsb.) | Slate gelap (`slate-800`) |
| Card Title | Medium, semi-bold, dipakai untuk nama mata kuliah/judul kartu | Slate gelap (`slate-800`) |
| Body Text | Ukuran standar/reguler, line-height nyaman dibaca, dipakai untuk paragraf deskripsi | Slate medium (`slate-600`) |
| Small/Caption Text | Kecil, dipakai untuk metadata seperti waktu, tanggal, atau label pendukung | Slate terang (`slate-400`/`slate-500`) |
| Badge/Label Text | Kecil, medium weight, huruf rapat, dipakai di dalam pil/badge status | Menyesuaikan warna status atau kategori terkait |

---

## 4. Spacing & Grid

### 4.1 Struktur Container

Seluruh konten halaman dibatasi oleh container terpusat dengan lebar maksimum yang konsisten, disertai padding horizontal yang menyesuaikan ukuran layar (lebih sempit di mobile, lebih lebar di desktop) agar konten tidak menempel ke tepi layar pada perangkat apa pun.

### 4.2 Jarak Antar Section

Setiap section utama (Hero, Deadline Tracker, Fitur) dipisahkan dengan jarak vertikal yang cukup lega, memberi ruang "napas" antar blok konten sehingga informasi tidak terasa menumpuk.

### 4.3 Jarak Antar Elemen dalam Komponen

- Jarak antar kartu (task card, feature card) menggunakan spacing sedang-lebar agar kartu tidak terasa berhimpitan.
- Jarak internal dalam kartu (padding) dibuat proporsional — cukup lega agar teks tidak sesak, namun tidak berlebihan sehingga kartu terasa kosong.
- Elemen di dalam kartu (badge, judul, deskripsi, footer) disusun dengan jarak vertikal kecil-menengah yang konsisten agar terasa satu kesatuan.

### 4.4 Grid Layout

- **Hero Section**: menggunakan grid dua kolom pada layar desktop (kolom kiri untuk teks, kolom kanan untuk elemen visual), dan menyusut menjadi satu kolom bertumpuk pada layar mobile.
- **Deadline Tracker Section**: menggunakan grid kartu yang menyesuaikan lebar layar — satu kolom di mobile, dua kolom di tablet, tiga kolom di desktop.
- **Features Section**: menggunakan grid dua kolom sejajar untuk menampilkan dua fitur unggulan secara berdampingan pada layar besar, dan bertumpuk vertikal di layar kecil.

---

## 5. Deskripsi Visual & Tata Letak Komponen

### 5.1 Hero Section (Bagian Atas Halaman)

Terdiri dari dua kolom yang sejajar secara horizontal pada layar besar:

- **Kolom Kiri (Teks/Copywriting)**: berisi label kecil berbentuk pil sebagai penanda konteks, diikuti judul besar yang menonjolkan value proposition aplikasi, paragraf penjelasan singkat, dan dua tombol aksi (utama dan sekunder) yang diletakkan berdampingan.
- **Kolom Kanan ("Flying Object" — Mockup Ilustratif)**: berupa elemen visual berbentuk jendela aplikasi bergaya macOS, seolah "melayang" di atas halaman melalui efek rotasi ringan dan bayangan tebal. Di dalamnya ditampilkan pratinjau tampilan to-do list aplikasi, memberi gambaran nyata tentang produk kepada pengunjung sejak awal.

### 5.2 Deadline Tracker Section (Bagian Tengah Halaman)

Menampilkan judul section beserta tautan "lihat semua" di sisi kanan atas, diikuti kumpulan kartu tugas yang tersusun dalam grid.

Setiap kartu tugas memuat:
- Badge kecil yang menunjukkan jenis tugas (Kuis/Forum/Materi) di sisi kiri atas kartu.
- Indikator waktu tersisa di sisi kanan atas kartu, warnanya menyesuaikan tingkat urgensi (merah/kuning/hijau).
- Nama mata kuliah sebagai judul utama kartu.
- Deskripsi singkat tugas (opsional) di bawah judul.
- Garis pemisah tipis di bagian bawah kartu, memisahkan informasi tanggal deadline lengkap dari sebuah tautan aksi kecil ("Kerjakan").

Penanda urgensi tugas ditampilkan melalui garis aksen berwarna di sisi kiri kartu (border kiri), sehingga tingkat prioritas dapat dikenali sekilas tanpa membaca detail teks.

### 5.3 Features / Promo Section (Bagian Bawah Halaman)

Diawali dengan judul section dan sub-teks singkat yang terpusat, diikuti dua kartu fitur besar yang disusun berdampingan.

Setiap kartu fitur memuat:
- Ikon di dalam kotak kecil berwarna primary sebagai penanda visual fitur.
- Judul fitur dengan penekanan tebal.
- Deskripsi singkat yang menjelaskan manfaat fitur tersebut bagi pengguna.

Dua fitur yang ditonjolkan pada section ini adalah **Sorting Mata Kuliah** (pengelompokan tugas berdasarkan mata kuliah) dan **Pengurutan Deadline dari Terlama ke Terdekat** (agar pengguna tahu prioritas pengerjaan).

### 5.4 Komponen Tombol (Button)

- **Tombol Utama (Primary)**: berbentuk pil (fully rounded), berwarna latar biru (primary), teks putih tebal, dengan efek bayangan tipis dan perubahan warna menjadi lebih gelap saat disentuh/hover.
- **Tombol Sekunder (Secondary/Outline)**: berbentuk pil sama seperti tombol utama, namun berlatar putih dengan garis tepi abu muda dan teks berwarna gelap, memberi kontras yang lebih tenang dibanding tombol utama.
- **Tombol Kecil (dalam kartu)**: berbentuk kotak dengan sudut membulat sedang, berlatar biru muda dengan teks biru, digunakan untuk aksi sekunder di dalam komponen yang lebih kecil seperti kartu tugas.

### 5.5 Komponen Kartu Tugas (Task Card)

Kartu berlatar putih dengan sudut membulat dan bayangan sangat tipis, memberi kesan mengambang secara halus di atas background section. Garis aksen berwarna tebal ditempatkan di sisi kiri kartu sebagai penanda status urgensi utama. Susunan informasi di dalam kartu mengikuti hierarki: kategori & waktu di baris atas, nama mata kuliah sebagai fokus utama, deskripsi pendukung, lalu detail tanggal dan aksi di baris paling bawah yang dipisahkan garis tipis.

### 5.6 Komponen Mockup Gaya macOS ("Flying Object")

Berupa bingkai jendela dengan sudut membulat besar dan bayangan tebal untuk memberi kesan mengambang di atas halaman. Bagian atas bingkai berupa header bar berwarna abu muda yang memuat tiga titik bulat kecil berwarna merah, kuning, dan hijau di pojok kiri (meniru tombol close/minimize/maximize khas macOS), disertai teks kecil di sebelahnya sebagai penanda "nama aplikasi/URL". Bagian dalam jendela menampilkan pratinjau daftar tugas dalam skala kecil, masing-masing dengan aksen warna status yang sama seperti pada kartu tugas sesungguhnya, sehingga elemen ini berfungsi sebagai representasi visual langsung dari produk.

---

## 6. Prinsip Konsistensi Desain

1. **Konsisten** — seluruh warna, radius, dan spacing yang digunakan mengacu pada token yang telah ditetapkan pada dokumen ini; tidak menggunakan warna atau ukuran di luar palet yang sudah ditentukan.
2. **Hierarki Jelas** — tingkat urgensi deadline harus dapat dikenali langsung melalui warna, tanpa pengguna perlu membaca teks terlebih dahulu.
3. **Ringan Secara Visual** — mengutamakan whitespace yang lega, bayangan tipis, dan menghindari garis tebal kecuali untuk kebutuhan indikator status.
4. **Ramah Perangkat Mobile** — seluruh tata letak dirancang agar tetap nyaman dan mudah dibaca ketika disusun dalam satu kolom pada layar kecil.
# Product Requirement Document (PRD) - LMS Deadline Tracker

## 1. Project Overview
LMS Deadline Tracker adalah aplikasi web berbasis React.js dan Python yang membantu mahasiswa memantau deadline tugas dan kuis dari LMS VClass secara otomatis. Aplikasi ini melakukan scraping data secara langsung saat pengguna login, lalu menyajikannya dalam antarmuka yang intuitif dan terorganisir.

## 2. User Flow & Authentication Logic
1. **Public Preview (Guest State):**
   - Pengguna yang belum login dapat mengases seluruh halaman (Dashboard, My Deadlines, Courses).
   - Halaman menampilkan data *dummy/preview* dari hasil ekspor desain dengan efek animasi hover pada card.
   - Pengguna tidak dapat melihat data real sebelum melakukan login.
2. **Authentication & Auto-Scraping:**
   - Pengguna menginput Username (NPM) dan Password VClass pada form login.
   - Backend Python menerima kredensial, lalu melakukan proses autentikasi ke portal VClass (`https://v-class.gunadarma.ac.id/login/index.php`).
   - Begitu autentikasi berhasil, backend secara otomatis memicu (*trigger*) fungsi scraping data mata kuliah dan deadline tugas terbaru.
   - Data kredensial **tidak disimpan permanen** di database; hanya session token yang digunakan selama aktif.

## 3. Backend & Scraping Specifications (Python)
- **Framework:** Flask atau FastAPI (pilih yang paling ringan dan efisien).
- **Scraping Engine:** `requests` + `BeautifulSoup4` (menggunakan session cookies VClass agar eksekusi cepat dan efisien tanpa membuka browser GUI).
- **Scraping Rules & Filtering:**
  - **Mata Kuliah:** Ambil daftar nama mata kuliah terdaftar (*My Courses*).
  - **Tugas & Kuis Only:** Filter modul VClass. Hanya ambil komponen yang memiliki indikator tenggat waktu (waktu buka dan tutup/deadline). Abaikan materi biasa yang tidak memiliki deadline.
  - **Data Attributes to Extract:**
    - Nama Mata Kuliah
    - Judul Tugas / Kuis
    - Tipe Item (`Kuis`, `Forum`, `Tugas`)
    - Tanggal & Jam Deadline
    - Direct URL menuju halaman spesifik tugas tersebut di VClass.

## 4. Frontend Specifications & Data Logic (React.js + Tailwind)
### A. Halaman Dashboard & My Deadlines
- **Urut-urutan Default (Urgency Categorization):**
  1. **Kritis (< 24 Jam):** Ditampilkan paling atas / mencolok dengan aksen warna Merah.
  2. **Mendekat (1 - 3 Hari):** Ditampilkan di bawah kategori Kritis dengan aksen warna Kuning/Amber.
  3. **Aman (> 3 Hari):** Ditampilkan pada section terpisah (sisi kanan) dengan aksen warna Hijau.
- **Sorting Toggle:**
  - Menyediakan tombol *Sort* di kanan atas untuk mengubah urutan data dari **Deadline Terdekat** (Default Ascending) ke **Deadline Terlama** (Descending).
- **Unused Component Cleanup:**
  - Hapus tombol `+` (Add Task) bawaan desain awal, karena sinkronisasi tugas bersifat otomatis 100% via backend scraping.

### B. Halaman My Courses
- Menampilkan ringkasan seluruh mata kuliah yang diambil.
- Setiap card mata kuliah menampilkan indikator *progress* (jumlah tugas aktif vs total tugas) serta statistik ringkas.

## 5. Non-Functional Requirements
- **Performance:** Proses scraping dan parsing awal saat login diusahakan selesai dalam rentang waktu < 5-8 detik.
- **Security:** Seluruh kredensial dikirim via HTTPS dan langsung dibuang dari memori server setelah cookie session terbentuk.
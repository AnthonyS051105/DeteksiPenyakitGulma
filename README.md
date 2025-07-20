# NeuraFarm - Platform Pertanian Modern

NeuraFarm adalah platform untuk mempermudah petani dengan solusi pertanian masa kini menggunakan teknologi AI untuk deteksi penyakit dan gulma pada tanaman.

## Fitur

- **Homepage dengan Slideshow**: Halaman utama dengan slideshow otomatis yang menampilkan informasi platform
- **Navbar Responsif**: Navigasi dengan gradient hijau (#5CCE8F ke #139186) yang responsif untuk desktop dan mobile
- **Font Kustom**: 
  - Agbalumo untuk logo
  - Alata untuk konten utama
- **Desain Modern**: UI yang bersih dan modern dengan animasi smooth

## Halaman yang Tersedia

- **HOME**: Halaman utama dengan slideshow
- **FITUR**: Informasi tentang fitur platform (dalam pengembangan)
- **LEAFGUARD**: Sistem deteksi penyakit daun (dalam pengembangan)
- **NEURAWEED**: Sistem deteksi gulma (dalam pengembangan)

## Teknologi yang Digunakan

- Next.js 15.3.5
- React 19
- Tailwind CSS 4
- Google Fonts (Alata & Agbalumo)

## Cara Menjalankan

1. Install dependencies:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

3. Buka [http://localhost:3000](http://localhost:3000) di browser

## Fitur Slideshow

- 3 slide dengan konten berbeda
- Auto-slide setiap 8 detik
- Navigasi manual dengan arrow kiri/kanan
- Indikator slide di bagian bawah
- Background gradient yang berbeda untuk setiap slide
- Overlay pattern yang menyerupai pola sawah

## Responsif

Website ini sepenuhnya responsif dengan:
- Desktop: Navbar horizontal dengan semua menu terlihat
- Mobile: Hamburger menu dengan dropdown
- Slide controls yang menyesuaikan ukuran layar

## Deployment

Untuk build production:
```bash
npm run build
npm start
```

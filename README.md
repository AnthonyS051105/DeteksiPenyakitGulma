# NeuraFarm - Platform untuk Mempermudah Petani

Platform digital yang menyediakan solusi pertanian masa kini dengan teknologi AI untuk deteksi penyakit tanaman dan gulma.

## Fitur

- **Homepage dengan Slider**: Hero section dengan 3 slide yang dapat digerakkan secara manual atau otomatis
- **Responsive Design**: Tampilan yang optimal di desktop dan mobile
- **Navbar Modern**: Navigasi dengan logo NeuraFarm dan menu responsif
- **Animasi Smooth**: Transisi yang halus antar slide dan hover effects

## Teknologi yang Digunakan

- **Next.js 15.3.5**: React framework dengan App Router
- **Tailwind CSS 4.0**: Utility-first CSS framework
- **Google Fonts**: 
  - Alata (untuk teks umum)
  - Agbalumo (untuk logo)

## Warna yang Digunakan

- **Navbar Gradient**: `#5CCE8F` ke `#139186`
- **Background Slides**: 
  - Slide 1: Pattern hijau menyerupai padi
  - Slide 2: Gradient biru teknologi
  - Slide 3: Gradient kuning/emas

## Struktur Komponen

### Logo Component
- SVG icon pohon dengan 3 titik (sesuai design)
- Font Agbalumo untuk teks "NeuraFarm"

### Navbar Component
- Logo di sebelah kiri
- Menu navigasi (HOME, FITUR, LEAFGUARD, NEURAWEED)
- Tombol LOG IN di sebelah kanan
- Hamburger menu untuk mobile

### HeroSlider Component
- 3 slide dengan konten berbeda
- Navigation arrows (kiri/kanan)
- Slide indicators di bawah
- Auto-slide setiap 5 detik
- Smooth transitions

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka http://localhost:3000
```

## Fitur Slider

- **Manual Navigation**: Klik arrow kiri/kanan untuk berpindah slide
- **Indicator Navigation**: Klik dot indicator untuk langsung ke slide tertentu
- **Auto-slide**: Otomatis berpindah slide setiap 5 detik
- **Responsive**: Bekerja dengan baik di semua ukuran layar

## Slide Content

1. **Slide 1**: Pengenalan platform NeuraFarm
2. **Slide 2**: Teknologi AI dan machine learning
3. **Slide 3**: Dukungan untuk petani Indonesia

Setiap slide memiliki background yang berbeda dan konten yang relevan dengan misi NeuraFarm dalam membantu petani Indonesia.

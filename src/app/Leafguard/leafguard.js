"use client";

import { Alata, Agbalumo } from "next/font/google";

const alata = Alata({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const agbalumo = Agbalumo({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Leafguard() {
  return (
    <div className={`min-h-screen bg-[#5CCE8F] ${alata.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className={`text-6xl font-bold text-[#139186] mb-8 ${agbalumo.className}`}>
            LeafGuard
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-[#139186] leading-relaxed mb-6">
              Sistem deteksi penyakit daun berbasis AI yang canggih untuk membantu petani mengidentifikasi berbagai jenis penyakit pada tanaman.
            </p>
            <p className="text-lg text-[#0f7d73] leading-relaxed">
              LeafGuard menggunakan teknologi computer vision dan machine learning untuk memberikan diagnosis yang akurat dan rekomendasi perawatan yang tepat.
            </p>
          </div>
          <div className="mt-12">
            <div className="inline-block bg-[#139186] text-white px-8 py-3 rounded-full text-lg font-semibold">
              🚧 Sedang dalam pengembangan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

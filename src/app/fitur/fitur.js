"use client";

import Image from "next/image";
import Link from "next/link";
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

export default function Fitur() {
  return (
    <div className={`min-h-screen bg-white ${alata.className}`}>
      {/* Header Section */}
      <div className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-[#139186] mb-4">
            <span className={`${alata.className}`}>Fitur </span>
            <span className={`${agbalumo.className}`}>NeuraFarm</span>
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* First Section with ornamen1.jpg */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Image */}
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/ornamen1.jpg"
                  alt="Traditional Farming"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Text */}
            <div className="order-1 lg:order-2 lg:pl-8">
              <div className="text-[#139186] text-lg text-justify leading-relaxed">
                <p className="mb-4">
                  Fitur NeuraFarm terdiri atas <strong>LeafGuard</strong> dan{" "}
                  <strong>NeuraWeed</strong> yaitu Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Pellentesque id sem vel nibh
                  hendrerit pulvinar. In vitae tellus dictum, rhoncus lacus at,
                  rhoncus est. Fusce non dui orci.
                </p>
                <p className="mb-4">
                  Vestibulum pharetra at risus rhoncus auctor. Aenean ut nunc
                  velit. Proin maximus lacus a elementum finibus. Donec eget
                  auctor est. Duis efficitur varius lectus, vitae rutrum mi.
                </p>
                <p>
                  Aliquam fringilla risus lorem, a efficitur nunc finibus non.
                  Phasellus ac ante vitae velit accumsan finibus ac posuere
                  elit. Proin eget pretium diam. Nam eu tortor a augue auctor
                  suscipit.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Section with ornamen2.png */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Image */}
            <div>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/ornamen2.png"
                  alt="Modern Hydroponic Farming"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:pl-8">
              <div className="text-[#139186] text-lg text-justify leading-relaxed">
                <p className="mb-4">
                  Platform kami mengintegrasikan teknologi AI terdepan untuk
                  memberikan solusi pertanian yang komprehensif. Dengan sistem
                  deteksi yang canggih, petani dapat mengidentifikasi masalah
                  pada tanaman mereka dengan cepat dan akurat.
                </p>
                <p className="mb-4">
                  NeuraFarm membantu meningkatkan produktivitas pertanian
                  melalui pendekatan yang berkelanjutan dan ramah lingkungan.
                  Sistem kami dapat mendeteksi berbagai jenis penyakit tanaman
                  dan gulma yang dapat mengganggu pertumbuhan tanaman.
                </p>
                <p>
                  Dengan antarmuka yang mudah digunakan, petani dari berbagai
                  kalangan dapat memanfaatkan teknologi ini untuk mengoptimalkan
                  hasil panen mereka.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16">
          <Link href="/Leafguard">
            <button className="bg-[#139186] text-white px-12 py-4 rounded-2xl text-xl font-bold hover:bg-[#0f7d73] transition-colors duration-300 shadow-lg transform hover:scale-105 min-w-[200px]">
              LEAFGUARD
            </button>
          </Link>

          <Link href="/Neuraweed">
            <button className="bg-[#139186] text-white px-12 py-4 rounded-2xl text-xl font-bold hover:bg-[#0f7d73] transition-colors duration-300 shadow-lg transform hover:scale-105 min-w-[200px]">
              NEURAWEED
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

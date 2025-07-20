"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
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

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Platform untuk Mempermudah Petani Solusi Pertanian Masa Kini.",
      description: "Neurafarm merupakan Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id sem vel nibh hendrerit pulvinar. In vitae tellus dictum, rhoncus lacus at, rhoncus est. Fusce non dui orci. Vestibulum pharetra at risus rhoncus auctor. Aenean ut nunc velit. Proin maximus lacus a elementum finibus. Donec eget auctor est. Duis efficitur varius lectus, vitae rutrum mi. Aliquam fringilla risus lorem, a efficitur nunc finibus non. Phasellus ac ante vitae velit accumsan finibus ac posuere elit. Proin eget pretium diam. Nam eu tortor a augue auctor suscipit. Curabitur faucibus malesuada fringilla. Mauris scelerisque urna id condimentum ultrices.",
      backgroundClass: "bg-gradient-to-br from-green-600 via-green-500 to-emerald-400"
    },
    {
      id: 2,
      title: "Teknologi AI untuk Deteksi Penyakit Tanaman yang Akurat.",
      description: "Dengan menggunakan teknologi artificial intelligence terdepan, kami dapat membantu petani mendeteksi berbagai jenis penyakit dan hama pada tanaman dengan tingkat akurasi tinggi. Sistem kami dapat menganalisis foto daun dan memberikan diagnosis yang tepat dalam hitungan detik.",
      backgroundClass: "bg-gradient-to-br from-emerald-600 via-green-600 to-lime-500"
    },
    {
      id: 3,
      title: "Solusi Pertanian Modern untuk Masa Depan yang Berkelanjutan.",
      description: "NeuraFarm tidak hanya menyediakan deteksi penyakit, tetapi juga memberikan rekomendasi perawatan dan penanganan yang tepat. Dengan platform kami, petani dapat meningkatkan hasil panen dan mengurangi kerugian akibat serangan hama dan penyakit.",
      backgroundClass: "bg-gradient-to-br from-lime-600 via-emerald-500 to-green-400"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className={`min-h-screen ${alata.className}`}>
      {/* Navigation */}
      <nav 
        className="relative z-50"
        style={{
          background: `linear-gradient(90deg, #5CCE8F 0%, #139186 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/navbar-logo.png"
                alt="NeuraFarm"
                width={50}
                height={50}
                className="h-10 w-auto mr-3"
              />
              <span className={`text-white text-2xl font-bold ${agbalumo.className}`}>
                NeuraFarm
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/" className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  HOME
                </Link>
                <Link href="/fitur" className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  FITUR
                </Link>
                <Link href="/Leafguard" className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  LEAFGUARD
                </Link>
                <Link href="/Neuraweed" className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  NEURAWEED
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <div className="hidden md:block">
              <button className="bg-white text-[#139186] px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200">
                LOG IN
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="/"
                  className="text-white hover:text-gray-200 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/fitur"
                  className="text-white hover:text-gray-200 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FITUR
                </Link>
                <Link
                  href="/Leafguard"
                  className="text-white hover:text-gray-200 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LEAFGUARD
                </Link>
                <Link
                  href="/Neuraweed"
                  className="text-white hover:text-gray-200 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  NEURAWEED
                </Link>
                <button className="bg-white text-[#139186] px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 mt-4">
                  LOG IN
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Slideshow */}
      <div className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } ${slide.backgroundClass}`}
          >
            {/* Rice field pattern overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, #2d5a2d 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, #4a7c4a 1px, transparent 1px),
                  linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%)
                `,
                backgroundSize: '30px 30px, 20px 20px, 40px 40px'
              }}
            />
            
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto opacity-90 drop-shadow-md">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 md:p-4 transition-all duration-200 group backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 md:p-4 transition-all duration-200 group backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-200 ${
                  index === currentSlide ? "bg-white shadow-lg" : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

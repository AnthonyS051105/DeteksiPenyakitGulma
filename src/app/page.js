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
      description:
        "NeuraFarm, platform pertanian yang memudahkan petani-petani  dalam aktivitas mereka di sawah, perkebunan, hutan, bahkan kebun di rumah. NeuraFarm adalah solusi cerdas untuk petani karena menawarkan fitur LeafGuard dan NeuraWeed yang sangat bermanfaat dalam mendeteksi Penyakit Daun dan Gulma di sekitar tanaman! Dengan platform ini, segala kerugian di pertanian dapat dicegah secara lebih dini! NeuraFarm, Solusi Pertanian Masa Kini!",
      format: "jpeg",
    },
    {
      id: 2,
      title: "Teknologi AI untuk Deteksi Penyakit Tanaman yang Akurat.",
      description:
        "Dengan menggunakan teknologi artificial intelligence terdepan, kami dapat membantu petani mendeteksi berbagai jenis penyakit dan hama pada tanaman dengan tingkat akurasi tinggi. Sistem kami dapat menganalisis foto daun dan memberikan diagnosis yang tepat dalam hitungan detik.",
      format: "jpeg",
    },
    {
      id: 3,
      title: "Solusi Pertanian Modern untuk Masa Depan yang Berkelanjutan.",
      description:
        "NeuraFarm tidak hanya menyediakan deteksi penyakit, tetapi juga memberikan rekomendasi perawatan dan penanganan yang tepat. Dengan platform kami, petani dapat meningkatkan hasil panen dan mengurangi kerugian akibat serangan hama dan penyakit.",
      format: "jpeg",
    },
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
    <div className={`min-h-screen bg-[#5CCE8F] ${alata.className}`}>
      {/* Hero Section with Slideshow */}
      <div className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Layer */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url('/background-slider${slide.id}.${slide.format}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.4,
              }}
            ></div>

            {/* Text Layer */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto drop-shadow-md">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 border-4 border-white bg-[#13918699] bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 md:p-4 transition-all duration-200 group backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 border-4 border-white bg-[#13918699] bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 md:p-4 transition-all duration-200 group backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-13 h-2 md:w-14 md:h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? "bg-[#00f06c] shadow-lg opacity-60"
                    : "bg-black opacity-60"
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

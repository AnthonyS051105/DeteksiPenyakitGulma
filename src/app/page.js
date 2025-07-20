'use client';

import { useState, useEffect } from 'react';

// Logo Component
const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-12 h-12 relative">
      {/* Tree icon SVG based on the logo in image 2 */}
      <svg viewBox="0 0 48 48" className="w-full h-full text-white">
        <circle cx="24" cy="8" r="3" fill="currentColor" />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
        <circle cx="32" cy="16" r="3" fill="currentColor" />
        <line x1="24" y1="11" x2="24" y2="20" stroke="currentColor" strokeWidth="2" />
        <line x1="21" y1="18" x2="16" y2="13" stroke="currentColor" strokeWidth="2" />
        <line x1="27" y1="18" x2="32" y2="13" stroke="currentColor" strokeWidth="2" />
        <line x1="24" y1="20" x2="24" y2="40" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
    <span className="text-white text-xl font-agbalumo font-bold">NeuraFarm</span>
  </div>
);

// Navbar Component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#5CCE8F] to-[#139186] px-6 py-4 relative z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white font-alata font-medium hover:text-opacity-80 transition-colors text-sm lg:text-base">
            HOME
          </a>
          <a href="#" className="text-white font-alata font-medium hover:text-opacity-80 transition-colors text-sm lg:text-base">
            FITUR
          </a>
          <a href="#" className="text-white font-alata font-medium hover:text-opacity-80 transition-colors text-sm lg:text-base">
            LEAFGUARD
          </a>
          <a href="#" className="text-white font-alata font-medium hover:text-opacity-80 transition-colors text-sm lg:text-base">
            NEURAWEED
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="bg-white text-[#139186] px-4 py-2 md:px-6 rounded-lg font-alata font-medium hover:bg-opacity-90 transition-colors text-sm lg:text-base">
            LOG IN
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#139186] bg-opacity-95 absolute top-full left-0 right-0 py-4 px-6">
          <div className="flex flex-col space-y-3">
            <a href="#" className="text-white font-alata font-medium hover:text-opacity-80 transition-colors py-2">
              HOME
            </a>
            <a href="#" className="text-white font-alata font-medium hover:text-opacity-80 transition-colors py-2">
              FITUR
            </a>
            <a href="#" className="text-white font-alata font-medium hover:text-opacity-80 transition-colors py-2">
              LEAFGUARD
            </a>
            <a href="#" className="text-white font-alata font-medium hover:text-opacity-80 transition-colors py-2">
              NEURAWEED
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// Slider Component
const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      background: `
        linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        repeating-linear-gradient(
          0deg,
          #8dc442 0px,
          #8dc442 8px,
          #7bb93b 8px,
          #7bb93b 16px,
          #8dc442 16px,
          #8dc442 24px,
          #9dd14a 24px,
          #9dd14a 32px
        )
      `,
      title: "Platform untuk Mempermudah Petani",
      subtitle: "Solusi Pertanian Masa Kini.",
      description: "Neurafarm merupakan Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id sem vel nibh hendrerit pulvinar. In vitae tellus dictum, rhoncus lacus at, rhoncus est. Fusce non dui orci. Vestibulum pharetra at risus rhoncus auctor. Aenean ut nunc velit. Proin maximus lacus a elementum finibus. Donec eget auctor est. Duis efficitur varius lectus, vitae rutrum mi. Aliquam fringilla risus lorem, a efficitur nunc finibus non. Phasellus ac ante vitae velit accumsan finibus ac posuere elit. Proin eget pretium diam. Nam eu tortor a augue auctor suscipit. Curabitur faucibus malesuada fringilla. Mauris scelerisque urna id condimentum ultricies."
    },
    {
      id: 2,
      background: `
        linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        linear-gradient(135deg, #7dd3fc 0%, #0891b2 100%)
      `,
      title: "Teknologi Canggih untuk Pertanian",
      subtitle: "Inovasi Digital Terdepan.",
      description: "Dengan menggunakan teknologi AI dan machine learning, NeuraFarm membantu petani mengidentifikasi penyakit tanaman dan gulma dengan akurasi tinggi. Platform ini dirancang khusus untuk meningkatkan produktivitas dan efisiensi pertanian modern."
    },
    {
      id: 3,
      background: `
        linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)
      `,
      title: "Dukungan Penuh untuk Petani Indonesia",
      subtitle: "Solusi Terpercaya dan Mudah Digunakan.",
      description: "NeuraFarm hadir dengan antarmuka yang sederhana namun powerful, memberikan analisis real-time untuk kesehatan tanaman Anda. Bergabunglah dengan ribuan petani yang telah merasakan manfaat teknologi pertanian masa depan."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slide Background */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          background: slides[currentSlide].background,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-alata mb-4 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-2xl md:text-3xl font-alata mb-8">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="text-base md:text-lg font-alata leading-relaxed max-w-3xl mx-auto">
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[#5CCE8F]' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "FITUR", href: "/fitur" },
    { name: "LEAFGUARD", href: "/Leafguard" },
    { name: "NEURAWEED", href: "/Neuraweed" },
  ];

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
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
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
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-gray-200 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button className="bg-white text-[#139186] px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 mt-4">
                  LOG IN
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

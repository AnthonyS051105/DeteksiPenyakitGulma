"use client";

import Link from "next/link";
import Image from "next/image";
import "../globals.css";
import { useState } from "react";
import { Alata, Agbalumo } from "next/font/google";
import HealthCheck from "./HealthCheck";

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
    <div className={`min-h-screen bg-[#5CCE8F] ${alata.className}`}>
      <HealthCheck />
      {/* Navigation */}
      <nav className="relative z-50 bg-[#139186] text-white rounded-bottom-right-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/navbar-logo.png"
                alt="NeuraFarm"
                width={90}
                height={90}
                className="h-11 w-auto mr-3"
              />
              <span
                className={`text-white text-3xl font-bold ${agbalumo.className}`}
              >
                NeuraFarm
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="/"
                  className="text-white hover:text-gray-200 px-3 py-2 text-xl font-medium transition-colors duration-200"
                >
                  HOME
                </Link>
                <Link
                  href="/fitur"
                  className="text-white hover:text-gray-200 px-3 py-2 text-xl font-medium transition-colors duration-200"
                >
                  FITUR
                </Link>
                <Link
                  href="/Leafguard"
                  className="text-white hover:text-gray-200 px-3 py-2 text-xl font-medium transition-colors duration-200"
                >
                  LEAFGUARD
                </Link>
                <Link
                  href="/Neuraweed"
                  className="text-white hover:text-gray-200 px-3 py-2 text-xl font-medium transition-colors duration-200"
                >
                  NEURAWEED
                </Link>
              </div>
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
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}

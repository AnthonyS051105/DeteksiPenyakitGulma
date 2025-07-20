import { Alata, Agbalumo } from "next/font/google";
import "./globals.css";

const alata = Alata({
  weight: "400",
  variable: "--font-alata",
  subsets: ["latin"],
});

const agbalumo = Agbalumo({
  weight: "400",
  variable: "--font-agbalumo",
  subsets: ["latin"],
});

export const metadata = {
  title: "NeuraFarm - Platform untuk Mempermudah Petani",
  description: "Solusi Pertanian Masa Kini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${alata.variable} ${agbalumo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

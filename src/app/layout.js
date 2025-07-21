import "./globals.css";
import Layout from "./components/Layout";

export const metadata = {
  title: "NeuraFarm - Deteksi Gulma dan Penyakit",
  description: "Website pendeteksi gulma dan penyakit pada daun",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

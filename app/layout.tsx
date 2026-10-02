import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FitnessProvider } from "@/context/FitnessContext";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Train hard, log honest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={oswald.variable}>
      <body className="bg-black text-white">
        <FitnessProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </FitnessProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Job Blog",
    template: "$s | Job Blog",
  },
  description: "Find Job you like ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px]`}>
        {/* to add end point to shrink */}
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

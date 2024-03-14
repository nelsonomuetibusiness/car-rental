import type { Metadata } from "next";

import "./globals.css";
import { Navbar, Footer } from "@/components";



export const metadata: Metadata = {
  title: "N Car SHop",
  description: "A cool car marketplace",
  icons : {
    icon:"/public/hero.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar/>
        {children}

        <Footer/>
      </body>
    </html>
  );
}

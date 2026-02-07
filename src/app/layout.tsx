import type { Metadata } from "next";
import React from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import "./globals.css";

import { Providers } from "@/store/Providers";

export const metadata: Metadata = {
  title: "Adventure Tours - Explore Amazing Destinations",
  description:
    "Discover breathtaking destinations and create unforgettable memories with our expertly curated tours across Pakistan.",
  keywords:
    "tours, travel, pakistan, hunza, skardu, adventure, trekking, mountains",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        <Providers>
          <div className="appWrapper">
            <Navbar />
            <main className="mainContent">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}


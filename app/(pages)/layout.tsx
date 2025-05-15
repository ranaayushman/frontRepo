"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NoticesMarquee from "../components/NoticeMarquee";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <NoticesMarquee />
      {children}
      <Footer />
    </div>
  );
}

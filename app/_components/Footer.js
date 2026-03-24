"use client";
import Image from "next/image";
/**
 * Footer component
 *
 * Displays a full-width footer with a dynamic year and the SAIT logo.
 *
 * Notes:
 * - Marked as client component to avoid hydration mismatch from new Date()
 * - Uses semantic <footer> element for accessibility and SEO
 *
 * @returns A responsive footer bar
 *
 * @author Frontend Developer: [Cintya Lara Flores]
 */
export default function Footer() {
  return (
    <footer className="w-full bg-[#6D2077] border-t flex justify-between items-center gap-5 px-4 py-3 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="text-[#F1FAF5] text-xs md:text-lg">
        <p>{new Date().getFullYear()}. Capstone Project for GBTAC, SAIT.</p>
      </div>
      {/* SAIT reverse logo for use on dark backgrounds */}
      <div className="relative w-[150px] sm:w-[170px] md:w-[200px] lg:w-[250px] h-[50px]">
        <Image
          src="/sait_extended_horizontal_reverse.png"
          alt="SAIT Logo"
          fill
          className="object-contain"
        />
      </div>
    </footer>
  );
}

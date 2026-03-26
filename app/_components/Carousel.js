"use client";

import { useState } from "react";
import InfoCard from "./InfoCard";
import Image from "next/image";

/**
 * Carousel component
 *
 * Displays items as paginated cards, showing one card on mobile and
 * two side-by-side on md+ screens. Navigation is via prev/next arrow
 * buttons and clickable indicator dots.
 *
 * @param {Array} items - List of items to render inside InfoCard
 * @param {boolean} horizontal - Passed through to InfoCard to control its layout
 *
 * Notes:
 * - Wraps around on both ends
 * - On md+ screens, two cards are shown; index advances by 1 but both slots update
 * - Indicator dots reflect the active index, not the full visible range
 *
 * @returns A paginated card carousel with dot indicators
 *
 * @author Cintya Lara Flores
 */

export default function Carousel({ items = [], horizontal }) {
  const [index, setIndex] = useState(0);

  // Bail out early — modulo on 0 would produce NaN and break navigation
  if (items.length === 0) return null;

  const next = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const cardClass = "w-[300px]";

  return (
    <div className="relative w-full">
      {/* Cards */}
      <div className="flex justify-center gap-4">
        {/* Primary card — always visible */}
        {items[index] && (
          <div className={cardClass}>
            <InfoCard items={[items[index]]} horizontal={horizontal} />
          </div>
        )}

        {/* Secondary card — only shown on md+ and when a next item exists */}
        {items[index + 1] && (
          <div className={`${cardClass} hidden md:block`}>
            <InfoCard items={[items[index + 1]]} horizontal={horizontal} />
          </div>
        )}
      </div>

      {/* Dot indicators — one per item, active dot reflects current index */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            /* Accessibility: Each dot is a button with an aria-label indicating which item it goes to. The active dot has a distinct color, while inactive dots are gray. */
            aria-label={`Go to item ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === index ? "bg-[#4D0B5C]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Previous button */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-0 -translate-y-1/2 px-4"
      >
        <Image
          src="/icons/arrow-circle-left.png"
          alt="Previous"
          width={24}
          height={24}
        />
      </button>

      {/* Next button */}
      <button
        onClick={next}
        className="absolute top-1/2 right-0 -translate-y-1/2 px-4"
      >
        <Image
          src="/icons/arrow-circle-right.png"
          alt="Next"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}

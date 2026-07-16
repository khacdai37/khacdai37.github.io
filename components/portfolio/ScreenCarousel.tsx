"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { asset } from "@/lib/asset";

/**
 * Slide carousel cho ảnh chụp màn hình app. Bản tham khảo làm bằng vanilla JS
 * + transform thủ công; ở đây dùng state React, transform vẫn do CSS lo.
 *
 * Trả về null khi không có ảnh — gọi bên ngoài không cần tự kiểm tra.
 */
export default function ScreenCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  if (images.length === 0) return null;

  const last = images.length - 1;
  const progress = images.length > 1 ? (index / last) * 100 : 100;

  return (
    <div>
      <div className="overflow-hidden rounded-2xl bg-neutral">
        <div
          className="flex transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={src} className="w-full shrink-0 p-4">
              <Image
                src={asset(src)}
                alt={`${alt} — screen ${i + 1}`}
                width={1280}
                height={800}
                className="w-full max-h-[400px] object-contain rounded-xl"
                // Ảnh đầu của app đầu tiên hay nằm trên màn hình đầu.
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex items-center gap-2.5 pt-2.5">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Previous screenshot"
            className="size-8 shrink-0 rounded-full bg-tertiary text-white flex items-center justify-center transition-all hover:bg-amber-700 hover:scale-110 disabled:bg-stone-200 disabled:text-stone-400 disabled:scale-100 disabled:cursor-default"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex-1 h-[3px] bg-stone-200 rounded-sm overflow-hidden">
            <div
              className="h-full bg-tertiary rounded-sm transition-[width] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(last, i + 1))}
            disabled={index === last}
            aria-label="Next screenshot"
            className="size-8 shrink-0 rounded-full bg-tertiary text-white flex items-center justify-center transition-all hover:bg-amber-700 hover:scale-110 disabled:bg-stone-200 disabled:text-stone-400 disabled:scale-100 disabled:cursor-default"
          >
            <ChevronRight className="size-4" />
          </button>

          <span className="font-mono text-[11px] text-stone-400 min-w-[38px] text-right tabular-nums">
            {index + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

export default function CarGallery({
  images = ["/images/ford.png", "/images/ford.png", "/images/ford.png"],
}) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-6 md:p-8">
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={mainImage}
                alt="Main view"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setMainImage(src)}
                className={`relative aspect-square rounded-2xl overflow-hidden shadow-md transition-all ${
                  mainImage === src ? "h-48 w-full" : ""
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover hover:scale-110 transition"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { useState } from "react";

interface CarGalleryProps {
  images: string[]; // Array of image URLs from API
}

export default function CarGallery({ images = [] }: CarGalleryProps) {
  // If no images, show a single placeholder
  const displayImages =
    images.length > 0 ? images : ["/images/placeholder-car.jpg"];

  const [mainImage, setMainImage] = useState(displayImages[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 md:p-6">
          {/* Main large image */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={mainImage}
                alt="Main vehicle view"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 80vw"
              />
            </div>
          </div>

          {/* Thumbnails column */}
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
            {displayImages.slice(1).map((src, index) => (
              <button
                key={index}
                onClick={() => setMainImage(src)}
                className={`relative aspect-square rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${
                  mainImage === src
                    ? "ring-4 ring-indigo-500 ring-offset-2 scale-105"
                    : "hover:scale-105 hover:ring-2 hover:ring-indigo-300"
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 100px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

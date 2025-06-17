"use client";

import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

interface ImageFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholder?: string;
}

export const ImageFallback = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder,
}: ImageFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src || src === "/images/not-found.jpg") {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <PhotoIcon className="h-12 w-12 text-gray-400" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      placeholder={placeholder as any}
      onError={() => setHasError(true)}
    />
  );
};


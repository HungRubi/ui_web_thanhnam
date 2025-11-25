"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
  unoptimized?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  width = 200,
  height = 200,
  className = "",
  fallback = "/store/1.jpg",
  unoptimized = false,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallback);
  const [hasError, setHasError] = useState(false);

  // Validate và normalize image URL
  const getValidImageUrl = (url: string): string => {
    if (!url || url.trim() === "") {
      return fallback;
    }

    // Nếu đã là fallback, giữ nguyên
    if (url === fallback) {
      return fallback;
    }

    // Nếu là absolute URL, giữ nguyên
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // Nếu là relative path, đảm bảo bắt đầu bằng /
    if (url.startsWith("/")) {
      return url;
    }

    // Nếu không có / ở đầu, thêm vào
    return `/${url}`;
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  const validSrc = getValidImageUrl(imgSrc);

  return (
    <Image
      src={validSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized={unoptimized}
      onError={handleError}
      onLoad={() => {
        if (hasError) {
          setHasError(false);
        }
      }}
    />
  );
}


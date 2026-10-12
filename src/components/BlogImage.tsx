"use client";

import React, { useState } from "react";
import Image from "next/image";

interface BlogImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function BlogImage({
  src,
  fallbackSrc,
  alt,
  fill = true,
  width,
  height,
  className,
  priority = false,
  sizes,
}: BlogImageProps) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Sync state on prop change during render per React 19 guidelines
  if (src !== prevSrc) {
    setPrevSrc(src);
    setHasError(false);
  }

  const currentSrc = hasError && fallbackSrc ? fallbackSrc : src;

  const handleError = () => {
    if (fallbackSrc && !hasError) {
      setHasError(true);
    }
  };

  const defaultSizes = fill
    ? sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    : sizes;

  if (fill) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={defaultSizes}
        unoptimized={currentSrc.startsWith("http")}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width || 800}
      height={height || 500}
      className={className}
      priority={priority}
      sizes={defaultSizes}
      unoptimized={currentSrc.startsWith("http")}
      onError={handleError}
    />
  );
}

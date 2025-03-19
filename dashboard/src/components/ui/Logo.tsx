import Image from "next/image";
import * as React from "react";

interface LogoProps {
  className?: string;
  alt?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
}

const Logo = ({
  className = "",
  alt = "Logo",
  priority = false,
  loading = "lazy",
}: LogoProps) => (
  <div className={`relative w-full h-full ${className}`}>
    <Image
      src="/logo.png"
      alt={alt}
      fill
      className="object-contain"
      priority={priority}
      loading={loading}
    />
  </div>
);

export { Logo };
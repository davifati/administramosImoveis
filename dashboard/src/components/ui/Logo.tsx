"use client"
import Image from "next/image";

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
  <div className={`relative flex items-center justify-center ${className}`}>
    <Image
      src="/img/propius_logo.png" // Caminho para sua imagem
      alt={alt}
      width={32} // Definindo um tamanho fixo
      height={32} // Definindo um tamanho fixo
      className="object-contain" // A imagem não será distorcida
      priority={priority}
      loading={loading}
    />
  </div>
);

export { Logo };

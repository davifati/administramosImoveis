"use client"
import { useEffect, useState } from "react";
import { cx } from "@/lib/utils";

// Função para gerar a data formatada no lado do cliente
function getFormattedDate() {
  const date = new Date(new Date().setHours(new Date().getHours() - 1));
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Componente que aceita título como prop
export default function Header({ title }: { title: string }) {
  const [dateString, setDateString] = useState("");

  // UseEffect para definir a data no cliente após a renderização
  useEffect(() => {
    const formattedDate = getFormattedDate();
    setDateString(formattedDate);
  }, []);

  return (
    <section
      aria-labelledby="reports-title"
      className={cx(
        "sticky top-16 z-50 -my-6 flex flex-col gap-6 bg-white py-6 md:flex-row md:flex-wrap md:items-center md:justify-between lg:top-0 dark:bg-gray-925",
      )}
    >
      <div className="space-y-1">
        <h1
          id="reports-title"
          className="text-2xl font-semibold text-gray-900 dark:text-gray-50"
        >
          {title}
        </h1>
        {/* Exibe a data após ser gerada no cliente */}
        <p className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
          Atualizado em {dateString}
        </p>
      </div>
    </section>
  );
}

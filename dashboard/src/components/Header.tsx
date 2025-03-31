// Importações
import { cx } from "@/lib/utils"
import { DEFAULT_RANGE } from "../app/(dashboard)/financeiro/_components/dateRanges"

// Função para gerar a data formatada no lado do servidor
function getFormattedDate() {
  const date = new Date(new Date().setHours(new Date().getHours() - 1))
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

// Componente Server-Side que aceita título como prop
export default function Header({ title }: { title: string }) {
  // Obtemos a data formatada no servidor
  const dateString = getFormattedDate()

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
        <p className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
          Atualizado em {dateString} {/* Exibe a data gerada no servidor */}
        </p>
      </div>
    </section>
  )
}

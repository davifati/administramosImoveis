import { DEFAULT_RANGE } from "@/app/(dashboard)/financeiro/_components/dateRanges";
import { cx } from "@/lib/utils";
import { useScroll } from "framer-motion";
import { useQueryState } from "nuqs";
import { FormattedDate } from "./FmtDate";

interface HeaderProps {
    title: string; // Propriedade que define o título do cabeçalho
}

export default function AbaHeader({ title }: HeaderProps) {
    //@ts-ignore
    const scrolled = useScroll(10);

    const [, setRange] = useQueryState("range");
    const [, setExpenseStatus] = useQueryState("expense_status");
    const [, setAmountRange] = useQueryState("amount_range");
    const [, setSelectedCountries] = useQueryState("countries");

    const handleResetFilters = () => {
        setRange(DEFAULT_RANGE);
        setExpenseStatus(null);
        setAmountRange(null);
        setSelectedCountries(null);
    };

    return (
        <section
            aria-labelledby="reports-title"
            className={cx(
                "sticky top-16 z-50 -my-6 flex flex-col gap-6 bg-white py-6 md:flex-row md:flex-wrap md:items-center md:justify-between lg:top-0 dark:bg-gray-925",
                scrolled &&
                "border-b border-gray-200 transition-all dark:border-gray-900",
            )}
        >
            <div className="space-y-1">
                <h1
                    id="reports-title"
                    className="text-2xl font-semibold text-gray-900 dark:text-gray-50"
                >
                    {title || "Gestão de Boletos"} {/* Aqui usamos o título passado como prop, e se não houver, usamos o título padrão */}
                </h1>
                <FormattedDate />
            </div>
            {/* Adicione outros elementos do cabeçalho aqui, se necessário */}
        </section>
    );
}

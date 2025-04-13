"use client";

import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { BoletosExtracaoInfo } from "@/data/abstract";

dayjs.locale("pt-br");

const HistoricalExtractionCalendar = ({
    extracoes,
}: {
    extracoes: BoletosExtracaoInfo[];
}) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);
    const [selectedMonthYear, setSelectedMonthYear] = useState<string>(
        dayjs().format("MM/YYYY")
    );
    const [selectedImobiliaria, setSelectedImobiliaria] = useState<string | "all">("all");

    const generateCalendar = () => {
        const [month, year] = selectedMonthYear.split("/").map(Number);
        const daysInMonth = dayjs(`${year}-${month}`).daysInMonth();
        const startOfMonth = dayjs(`${year}-${month}`).startOf("month").day();
        const calendar = [];

        for (let i = 0; i < startOfMonth; i++) {
            calendar.push(null);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            calendar.push(dayjs(`${year}-${month}`).date(i).format("YYYY-MM-DD"));
        }

        return calendar;
    };

    const isFutureDate = (dateString: string): boolean => {
        return dayjs(dateString).isAfter(dayjs(), "day");
    };

    const handleDateClick = (date: string) => {
        if (!isFutureDate(date)) {
            setSelectedDate(date);
        }
    };

    const handleDateHover = (date: string) => {
        if (!isFutureDate(date)) {
            setHoveredDate(date);
        }
    };

    const getExtracoesByDate = (date: string) => {
        return extracoes.filter(
            (BoletosExtracaoInfo) =>
                (dayjs(BoletosExtracaoInfo.ultimaExtracao).isSame(date, "day") ||
                    dayjs(BoletosExtracaoInfo.proximaExtracao).isSame(date, "day")) &&
                (selectedImobiliaria === "all" || BoletosExtracaoInfo.imobiliaria === selectedImobiliaria)
        );
    };

    const renderTable = () => {
        if (!selectedDate) return null;
        const filteredExtracoes = getExtracoesByDate(selectedDate);

        const columns = [
            {
                label: "Administradora",
                render: (item: BoletosExtracaoInfo) => item.imobiliaria,
            },
            {
                label: "Origem",
                render: (item: BoletosExtracaoInfo) => item.origem || null,
            },
            {
                label: "Condomínio",
                render: (item: BoletosExtracaoInfo) => item.unidade || null,
            },
            {
                label: "Última Extração",
                render: (item: BoletosExtracaoInfo) =>
                    dayjs(item.ultimaExtracao).format("DD/MM/YYYY"),
            },
            {
                label: "Próxima Extração",
                render: (item: BoletosExtracaoInfo) =>
                    dayjs(item.proximaExtracao).format("DD/MM/YYYY"),
            },
            {
                label: "Status",
                render: (item: BoletosExtracaoInfo) => {
                    const statusMap: Record<string, { label: string; color: string }> = {
                        sucesso: { label: "Sucesso", color: "text-green-500" },
                        falha: { label: "Falha", color: "text-red-500" },
                        inatividade: { label: "Inatividade", color: "text-gray-500" },
                    };
                    const status = statusMap[item.status] || statusMap["inatividade"];
                    return (
                        <span className={`font-semibold ${status.color}`}>
                            {status.label}
                        </span>
                    );
                },
            },
        ];

        return (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">
                    Detalhes da Extração: {dayjs(selectedDate).format("DD/MM/YYYY")}
                </h3>
                <table className="min-w-full table-auto mt-4">
                    <thead className="bg-gray-100">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-2 text-left text-gray-600"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExtracoes.map((item, index) => (
                            <tr key={index} className="border-t">
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-4 py-2 text-gray-800"
                                    >
                                        {col.render(item)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };


    const handleMonthYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        //@ts-ignore
        if (!isFutureDate(dayjs(selectedValue, "MM/YYYY"))) {
            setSelectedMonthYear(selectedValue);
        }
    };

    const handleImobiliariaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedImobiliaria(event.target.value);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Visão Histórica de Captura de Boletos
                </h2>

                <div className="flex space-x-4">
                    <select
                        className="p-2 border rounded-md"
                        value={selectedMonthYear}
                        onChange={handleMonthYearChange}
                    >
                        {Array.from({ length: 12 }, (_, index) => {
                            const month = dayjs().subtract(index, "months");
                            const monthString = month.format("MM/YYYY");
                            return (
                                <option key={monthString} value={monthString}>
                                    {month.format("MMMM YYYY")}
                                </option>
                            );
                        })}
                    </select>

                    <select
                        className="p-2 border rounded-md w-auto"
                        value={selectedImobiliaria}
                        onChange={handleImobiliariaChange}
                    >
                        <option value="all">Todas</option>
                        {[...new Set(extracoes.map((BoletosExtracaoInfo) => BoletosExtracaoInfo.imobiliaria))].map(
                            (imobiliaria) => (
                                <option key={imobiliaria} value={imobiliaria}>
                                    {imobiliaria}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-6">
                {generateCalendar().map((date, index) => {
                    const extracaoStatus = extracoes.filter(
                        (BoletosExtracaoInfo) =>
                            (dayjs(BoletosExtracaoInfo.ultimaExtracao).isSame(date, "day") ||
                                dayjs(BoletosExtracaoInfo.proximaExtracao).isSame(date, "day")) &&
                            (selectedImobiliaria === "all" ||
                                BoletosExtracaoInfo.imobiliaria === selectedImobiliaria)
                    );

                    const hasFalha = extracaoStatus.some(
                        (BoletosExtracaoInfo) => BoletosExtracaoInfo.status === "falha"
                    );
                    const isAllSucesso = extracaoStatus.every(
                        (BoletosExtracaoInfo) => BoletosExtracaoInfo.status === "sucesso"
                    );
                    const status = hasFalha
                        ? "text-red-500"
                        : isAllSucesso
                            ? "text-green-500"
                            : "text-gray-600";

                    return (
                        <div
                            key={index}
                            className={`w-12 h-12 flex items-center justify-center mx-2 my-2 rounded-lg cursor-pointer
                ${isFutureDate(date || "") ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => handleDateClick(date || "")}
                            onMouseEnter={() => handleDateHover(date || "")}
                            onMouseLeave={() => setHoveredDate(null)}
                            style={{
                                backgroundColor: date === hoveredDate ? "#f3f4f6" : "transparent",
                            }}
                        >
                            {date && (
                                <span className={`text-sm font-semibold ${status}`}>
                                    {dayjs(date).date()}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {renderTable()}
        </div>
    );
};

export default HistoricalExtractionCalendar;

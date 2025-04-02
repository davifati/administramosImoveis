"use client";
export const dynamic = 'force-static';
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // Importando a localidade em português
import { BoletosExtracaoInfo } from "@/data/abstract";
import { getHistoricalExtractionCalendar } from "../../_api/historico";


dayjs.locale("pt-br"); // Definindo a localidade como português


const HistoricalExtractionCalendar = () => {
    const [extracoes, setExtracoes] = useState<BoletosExtracaoInfo[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);
    const [selectedMonthYear, setSelectedMonthYear] = useState<string>(
        dayjs().format("MM/YYYY")
    );
    const [selectedImobiliaria, setSelectedImobiliaria] = useState<string | "all">("all");

    // Chamada à API para buscar as extrações
    useEffect(() => {
        const fetchExtracoes = async () => {
            try {
                const data = await getHistoricalExtractionCalendar();  // Chama a função que busca os dados da API
                setExtracoes(data); // Atualiza o estado com as extrações obtidas
            } catch (error) {
                console.error("Erro ao buscar extracoes:", error);
            }
        };

        fetchExtracoes();  // Invoca a função para buscar as extrações
    }, []);

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

    // Função para verificar se uma data está no futuro
    const isFutureDate = (dateString: string): boolean => {
        return dayjs(dateString).isAfter(dayjs(), 'day');
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

        return (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">
                    Detalhes da Extração para {selectedDate}
                </h3>
                <table className="min-w-full table-auto mt-4">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600">Imobiliária</th>
                            <th className="px-4 py-2 text-left text-gray-600">Última Extração</th>
                            <th className="px-4 py-2 text-left text-gray-600">Próxima Extração</th>
                            <th className="px-4 py-2 text-left text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExtracoes.map((BoletosExtracaoInfo, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2 text-gray-800">{BoletosExtracaoInfo.imobiliaria}</td>
                                <td className="px-4 py-2 text-gray-800">
                                    {new Date(BoletosExtracaoInfo.ultimaExtracao).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 text-gray-800">
                                    {new Date(BoletosExtracaoInfo.proximaExtracao).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`font-semibold ${BoletosExtracaoInfo.status === "sucesso"
                                            ? "text-green-500"
                                            : BoletosExtracaoInfo.status === "falha"
                                                ? "text-red-500"
                                                : "text-gray-500"}`}
                                    >
                                        {BoletosExtracaoInfo.status === "sucesso"
                                            ? "Sucesso"
                                            : BoletosExtracaoInfo.status === "falha"
                                                ? "Falha"
                                                : "Inatividade"}
                                    </span>
                                </td>
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

                {/* Filtros ao lado direito do título */}
                <div className="flex space-x-4">
                    {/* Filtro de Mês/Ano */}
                    <select
                        className="p-2 border rounded-md"
                        value={selectedMonthYear}
                        onChange={handleMonthYearChange}
                    >
                        {Array.from({ length: 12 }, (_, index) => {
                            const month = dayjs().subtract(index, 'months');
                            const monthString = month.format("MM/YYYY");
                            return (
                                <option key={monthString} value={monthString}>
                                    {month.format("MMMM YYYY")}
                                </option>
                            );
                        })}
                    </select>

                    {/* Filtro de Imobiliária */}
                    <select
                        className="p-2 border rounded-md w-auto"
                        value={selectedImobiliaria}
                        onChange={handleImobiliariaChange}
                    >
                        <option value="all">Todas</option>
                        {/* @ts-ignore */}
                        {[...new Set(extracoes.map(
                            (BoletosExtracaoInfo) => BoletosExtracaoInfo.imobiliaria))]
                            .map((imobiliaria) => (
                                <option key={imobiliaria} value={imobiliaria}>
                                    {imobiliaria}
                                </option>
                            ))}
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
                    const status =
                        hasFalha
                            ? "text-red-500"
                            : isAllSucesso
                                ? "text-green-500"
                                : "text-gray-600";

                    return (
                        <div
                            key={index}
                            className={`w-12 h-12 flex items-center justify-center mx-2 my-2 rounded-lg cursor-pointer
                ${isFutureDate(date || '') ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => handleDateClick(date || "")}
                            onMouseEnter={() => handleDateHover(date || "")}
                            onMouseLeave={() => setHoveredDate(null)}
                            style={{
                                backgroundColor:
                                    date === hoveredDate ? "#f3f4f6" : "transparent",
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

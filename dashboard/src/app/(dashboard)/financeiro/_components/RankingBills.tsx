"use client";

import { useState } from "react";
import { RiSearchLine } from "@remixicon/react";
import { BarList, Card, Dialog, DialogPanel, TextInput } from "@tremor/react";
import { boletos } from "@/mock/financeiro/bills";


const rankingAdministradoras = boletos.reduce((acc, boleto) => {
    if (!acc[boleto.administradora]) {
        acc[boleto.administradora] = { valor: 0, quantidade: 0 };
    }
    acc[boleto.administradora].valor += boleto.valor;
    acc[boleto.administradora].quantidade += 1;
    return acc;
}, {});

const rankingValores = Object.entries(rankingAdministradoras)
    .map(([name, data]) => ({ name, value: data.valor }))
    .sort((a, b) => b.value - a.value);

const rankingQuantidade = Object.entries(rankingAdministradoras)
    .map(([name, data]) => ({ name, value: data.quantidade }))
    .sort((a, b) => b.value - a.value);

const valueFormatter = (number) =>
    `${Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(number)}`;

export default function RankingBoletos() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredValores = rankingValores.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredQuantidade = rankingQuantidade.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen">
            {/* Card de Valores Acumulados */}
            <Card className="relative w-full md:w-1/2 shadow-lg rounded-lg p-6 bg-white">
                <p className="text-lg font-semibold text-gray-700">Ranking de Valores Acumulados</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                    {valueFormatter(rankingValores.reduce((acc, item) => acc + item.value, 0))}
                </p>
                <BarList data={rankingValores.slice(0, 5)} valueFormatter={valueFormatter} className="mt-4" />
                <button
                    className="mt-6 w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => setIsOpen(true)}
                >
                    Mostrar mais
                </button>
            </Card>

            {/* Card de Quantidade de Boletos */}
            <Card className="relative w-full md:w-1/2 shadow-lg rounded-lg p-6 bg-white">
                <p className="text-lg font-semibold text-gray-700">Quantidade de Boletos Capturados</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                    {rankingQuantidade.reduce((acc, item) => acc + item.value, 0)} boletos
                </p>
                <BarList data={rankingQuantidade.slice(0, 5)} valueFormatter={(n) => `${n} boletos`} className="mt-4" />
                <button
                    className="mt-6 w-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-green-600"
                    onClick={() => setIsOpen(true)}
                >
                    Mostrar mais
                </button>
            </Card>

            {/* Dialog de Detalhes */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true} className="z-[100]">
                <DialogPanel className="overflow-hidden p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
                    <TextInput
                        icon={RiSearchLine}
                        placeholder="Buscar administradora..."
                        className="rounded-lg border p-2"
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                    />
                    <div className="mt-6">
                        <p className="font-semibold text-gray-700">Valores Acumulados</p>
                        <BarList data={filteredValores} valueFormatter={valueFormatter} className="mt-4" />
                    </div>
                    <div className="mt-6">
                        <p className="font-semibold text-gray-700">Quantidade de Boletos</p>
                        <BarList data={filteredQuantidade} valueFormatter={(n) => `${n} boletos`} className="mt-4" />
                    </div>
                    <button
                        className="mt-6 w-full bg-gray-500 text-white font-medium py-2 rounded-lg hover:bg-gray-600"
                        onClick={() => setIsOpen(false)}
                    >
                        Fechar
                    </button>
                </DialogPanel>
            </Dialog>
        </div>
    );
}
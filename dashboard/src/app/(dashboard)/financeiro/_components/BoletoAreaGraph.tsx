'use client';
export const dynamic = 'force-static';

import { AreaChart, Card, Select, SelectItem } from '@tremor/react';
import { useEffect, useState } from 'react';
import { valueFormatter } from '../_services/useRankingBoletos';
import { getHistoricoVolumeFinanceiro } from '../_api/historicoVolume';

export const boletos = [
    { administradora: "ABRJ", valor: 3500 },
    { administradora: "ACIR", valor: 2400 },
];

export default function BoletoAreaGraph() {
    const [data, setData] = useState([]); // Estado para armazenar os dados
    const [selectedYear, setSelectedYear] = useState(''); // Estado para o ano selecionado
    const [isLoading, setIsLoading] = useState(true); // Estado para controle de carregamento
    const [showTable, setShowTable] = useState(false); // Estado para controlar a exibição da tabela

    // Buscar dados assim que o componente for montado
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHistoricoVolumeFinanceiro();
                setData(data);
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Carregando...</div>; // Exibe uma mensagem enquanto carrega os dados
    }

    const uniqueYears = [...new Set(data.map((item) => item.date.split('/')[1]))]; // Extraindo anos únicos
    const filteredData = selectedYear ? data.filter(item => item.date.endsWith(`/${selectedYear}`)) : data; // Filtrando os dados pelo ano selecionado

    // Função para alternar a exibição da tabela
    const toggleTable = () => setShowTable(!showTable);

    return (
        <>
            <Card className="p-0 sm:mx-auto sm:w-full">
                <div className="p-6 flex justify-between items-center">
                    <div>
                        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            Saldo
                        </p>
                        <p className="text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mt-4">
                            {valueFormatter(filteredData.reduce((sum, item) => sum + item.Balance, 0))}
                        </p>
                    </div>
                    <Select value={selectedYear} onValueChange={setSelectedYear} placeholder="Selecione o ano" className="w-40">
                        {uniqueYears.map((year) => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                    </Select>
                </div>
                <AreaChart
                    data={filteredData}
                    index="date"
                    categories={['Balance']}
                    showLegend={false}
                    showGradient={false}
                    yAxisWidth={45}
                    valueFormatter={valueFormatter}
                    className="mt-8 hidden h-60 sm:block"
                />
                <AreaChart
                    data={filteredData}
                    index="date"
                    categories={['Balance']}
                    showLegend={false}
                    showGradient={false}
                    showYAxis={false}
                    startEndOnly={true}
                    valueFormatter={valueFormatter}
                    className="mt-8 h-48 sm:hidden"
                />

                {/* Botão "Ver Extrato" abaixo do gráfico */}
                <div className="mt-8 mb-6 flex justify-end">
                    <button
                        onClick={toggleTable}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    >
                        Ver Extrato
                    </button>
                </div>

                {/* Exibição da Tabela de Boletos ao clicar em "Ver Extrato" */}
                {showTable && (
                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Administradora</th>
                                    <th className="px-4 py-2 text-left">Valor do Boleto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boletos.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">{item.administradora}</td>
                                        <td className="px-4 py-2">{valueFormatter(item.valor)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </>
    );
}

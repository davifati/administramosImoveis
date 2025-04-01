'use client';
import { RiExternalLinkLine } from '@remixicon/react';
import { AreaChart, Card, Select, SelectItem } from '@tremor/react';
import { useEffect, useState } from 'react';
import { valueFormatter } from '../_services/useRankingBoletos';
import { getHistoricoVolumeFinanceiro } from '../_api/historicoVolume';





export default function BoletoAreaGraph() {
    const [data, setData] = useState([]); // Estado para armazenar os dados
    const [selectedYear, setSelectedYear] = useState(''); // Estado para o ano selecionado
    const [isLoading, setIsLoading] = useState(true); // Estado para controle de carregamento

    // Buscar dados assim que o componente for montado
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHistoricoVolumeFinanceiro();
                setData(data); // Atualiza o estado com os dados
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            } finally {
                setIsLoading(false); // Termina o carregamento
            }
        };

        fetchData();
    }, []); // Executa apenas uma vez após a montagem do componente

    if (isLoading) {
        return <div>Carregando...</div>; // Exibe uma mensagem enquanto carrega os dados
    }

    const uniqueYears = [...new Set(data.map((item) => item.date.split('/')[1]))]; // Extraindo anos únicos
    const filteredData = selectedYear ? data.filter(item => item.date.endsWith(`/${selectedYear}`)) : data; // Filtrando os dados pelo ano selecionado

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
                <div className="rounded-b-tremor-default border-t border-tremor-border bg-tremor-background-muted px-6 py-4 dark:border-dark-tremor-border dark:bg-dark-tremor-background">
                    <div className="flex justify-between">
                        <span className="inline-flex select-none items-center rounded-tremor-small bg-tremor-background px-2 py-1 text-tremor-label font-medium text-tremor-content-strong ring-1 ring-inset ring-tremor-ring dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong dark:ring-tremor-content-emphasis">
                            Acesso da equipe
                        </span>
                        <div className="flex items-center gap-2">
                            <a
                                href="#"
                                className="flex items-center gap-1.5 text-tremor-default text-tremor-brand hover:underline hover:underline-offset-4 dark:text-dark-tremor-brand"
                            >
                                Ver transações
                                <RiExternalLinkLine className="size-4" aria-hidden={true} />
                            </a>
                            <span
                                className="hidden h-6 w-px bg-tremor-border dark:bg-dark-tremor-border sm:block"
                                aria-hidden={true}
                            />
                            <a
                                href="#"
                                className="hidden items-center gap-1.5 text-tremor-default text-tremor-brand hover:underline hover:underline-offset-4 dark:text-dark-tremor-brand sm:flex"
                            >
                                Ver extratos
                                <RiExternalLinkLine className="size-4" aria-hidden={true} />
                            </a>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
}

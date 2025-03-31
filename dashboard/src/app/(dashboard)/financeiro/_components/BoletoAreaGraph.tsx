'use client';

import { RiExternalLinkLine } from '@remixicon/react';
import { AreaChart, Card, Select, SelectItem } from '@tremor/react';
import { useState } from 'react';

function valueFormatter(number: number) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
        notation: 'compact',
        compactDisplay: 'short',
    });
    return formatter.format(number);
}

const data = [
    { date: '01/2023', Balance: 38560 },
    { date: '02/2023', Balance: 40320 },
    { date: '03/2023', Balance: 50233 },
    { date: '04/2023', Balance: 55123 },
    { date: '05/2023', Balance: 56000 },
    { date: '06/2023', Balance: 100000 },
    { date: '07/2023', Balance: 85390 },
    { date: '08/2023', Balance: 80100 },
    { date: '09/2023', Balance: 75090 },
    { date: '10/2023', Balance: 71080 },
    { date: '11/2023', Balance: 68041 },
    { date: '12/2023', Balance: 60143 },
];

export default function BoletoAreaGraph() {
    const [selectedYear, setSelectedYear] = useState('');
    /// @ts-ignore
    const uniqueYears = [...new Set(data.map((item) => item.date.split('/')[1]))];
    const filteredData = selectedYear ? data.filter(item => item.date.endsWith(`/${selectedYear}`)) : data;

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

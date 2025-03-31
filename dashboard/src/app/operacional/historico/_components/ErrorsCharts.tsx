'use client';

import { RiExternalLinkLine } from '@remixicon/react';
import { BarChart, Card, Select, SelectItem } from '@tremor/react';
import { useState } from 'react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const data = [
    { date: '01/2023', Success: 1040, Errors: 10 },
    { date: '02/2023', Success: 1200, Errors: 15 },
    { date: '03/2023', Success: 1130, Errors: 20 },
    { date: '04/2023', Success: 1050, Errors: 18 },
    { date: '05/2023', Success: 920, Errors: 22 },
    { date: '06/2023', Success: 870, Errors: 25 },
    { date: '07/2023', Success: 790, Errors: 30 },
    { date: '08/2023', Success: 910, Errors: 28 },
    { date: '09/2023', Success: 951, Errors: 35 },
    { date: '10/2023', Success: 1232, Errors: 40 },
    { date: '11/2023', Success: 1230, Errors: 45 },
    { date: '12/2023', Success: 1289, Errors: 50 },
];

const valueFormatter = (number) =>
    `${Intl.NumberFormat('us').format(number).toString()}`;

const summary = [
    { name: 'Boletos Capturados', total: 12345, color: 'bg-blue-500' },
    { name: 'Erros na Captura', total: 395, color: 'bg-red-500' },
];

export default function ErrosChart() {
    const [selectedYear, setSelectedYear] = useState('');
    //@ts-ignore
    const uniqueYears = [...new Set(data.map((item) => item.date.split('/')[1]))];
    const filteredData = selectedYear ? data.filter(item => item.date.endsWith(`/${selectedYear}`)) : data;

    return (
        <>
            <Card className="p-0">
                <div className="p-6 flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Histórico de Captura de Boletos
                        </h3>
                        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content mt-1">
                            Análise de erros e sucessos ao longo do tempo.
                        </p>
                    </div>
                    <Select value={selectedYear} onValueChange={setSelectedYear} placeholder="Filtrar por ano" className="w-40">
                        {uniqueYears.map((year) => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="border-t border-tremor-border p-6 dark:border-dark-tremor-border">
                    <ul role="list" className="flex flex-wrap gap-x-20 gap-y-10">
                        {summary.map((item) => (
                            <li key={item.name}>
                                <div className="flex items-center space-x-2">
                                    <span
                                        className={classNames(
                                            item.color,
                                            'size-3 shrink-0 rounded-sm',
                                        )}
                                        aria-hidden={true}
                                    />
                                    <p className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        {valueFormatter(item.total)}
                                    </p>
                                </div>
                                <p className="whitespace-nowrap text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                    {item.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <BarChart
                        data={filteredData}
                        index="date"
                        categories={['Success', 'Errors']}
                        colors={['blue', 'red']}
                        stack={true}
                        showLegend={false}
                        yAxisWidth={45}
                        valueFormatter={valueFormatter}
                        className="mt-10 hidden h-72 md:block"
                    />
                    <BarChart
                        data={filteredData}
                        index="date"
                        categories={['Success', 'Errors']}
                        colors={['blue', 'red']}
                        stack={true}
                        showLegend={false}
                        showYAxis={false}
                        valueFormatter={valueFormatter}
                        className="mt-6 h-72 md:hidden"
                    />
                </div>
            </Card>
        </>
    );
}

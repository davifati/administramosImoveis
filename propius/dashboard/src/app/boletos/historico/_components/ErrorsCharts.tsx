'use client';

import { BarChart, Card, Select, SelectItem } from '@tremor/react';
import { ErrosChartProps } from '../../_abstract/boletos';



export default function ErrosChart({ data }: ErrosChartProps) {
    const valueFormatter = (number: number) =>
        `${Intl.NumberFormat('pt-BR').format(number)}`;

    const classNames = (...classes: string[]) => {
        return classes.filter(Boolean).join(' ');
    };

    const years = [...new Set(data.map(item => item.date.split('/')[1]))];
    const selectedYear = years[years.length - 1];
    const filteredData = data
        .filter(item => item.date.endsWith(`/${selectedYear}`))
        .map(item => ({
            date: item.date,
            'Boletos Capturados': item.Success,
            'Erros na Captura': item.Errors,
        }));

    const totalSuccess = filteredData.reduce((acc, item) => acc + item['Boletos Capturados'], 0);
    const totalErrors = filteredData.reduce((acc, item) => acc + item['Erros na Captura'], 0);

    const summary = [
        { name: 'Boletos Capturados', total: totalSuccess, color: 'bg-blue-500' },
        { name: 'Erros na Captura', total: totalErrors, color: 'bg-red-500' },
    ];

    return (
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

                <Select value={selectedYear} disabled className="w-40">
                    {years.map((year) => (
                        <SelectItem key={year} value={year}>
                            {year}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <div className="p-6">
                <ul role="list" className="flex flex-wrap gap-x-20 gap-y-10">
                    {summary.map((item) => (
                        <li key={item.name}>
                            <div className="flex items-center space-x-2">
                                <span
                                    className={classNames(item.color, 'size-3 shrink-0 rounded-sm')}
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
                    categories={['Boletos Capturados', 'Erros na Captura']}
                    colors={['blue', 'red']}
                    stack={true}
                    showLegend={false}
                    yAxisWidth={60}
                    valueFormatter={valueFormatter}
                    className="mt-10 hidden h-72 md:block"
                />

                <BarChart
                    data={filteredData}
                    index="date"
                    categories={['Boletos Capturados', 'Erros na Captura']}
                    colors={['blue', 'red']}
                    stack={true}
                    showLegend={false}
                    showYAxis={false}
                    valueFormatter={valueFormatter}
                    className="mt-6 h-72 md:hidden"
                />
            </div>
        </Card>
    );
}

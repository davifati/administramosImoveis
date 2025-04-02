"use client";
export const dynamic = 'force-static';

import { generateRandomStatus, imobiliarias } from '@/data/operacional';
import React, { forwardRef, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Importando os estilos do DatePicker
import { twMerge } from 'tailwind-merge';

const statusColorLegends = [
    { color: 'bg-emerald-500', label: 'Ok' },
    { color: 'bg-amber-500', label: 'Manutenção Programada' },
    { color: 'bg-red-500', label: 'Falha' },
    { color: 'bg-gray-400', label: 'Inatividade' },
];

const colorMapping = {
    Ok: 'bg-emerald-500',
    Falha: 'bg-red-500',
    'Manutenção Programada': 'bg-amber-500',
    Inatividade: 'bg-gray-400',
};

const Block = ({ color, tooltip, date, hoverEffect, startDate, endDate }) => {
    const mockDescriptions = {
        Falha: `Boleto ${tooltip} falha ao conectar no site: ${date}`,
        Inatividade: `Boleto ${tooltip} está inativo no dia: ${date}`,
        Ok: `Boleto ${tooltip} capturado com sucesso em ${date}`,
        'Manutenção Programada': `Boleto ${tooltip} durante manutenção em ${date}`,
    };

    return (
        <div className="size-full overflow-hidden px-[0.5px] transition first:rounded-l-[4px] first:pl-0 last:rounded-r-[4px] last:pr-0 sm:px-px">
            <div
                className={`size-full rounded-[1px] ${color || 'bg-gray-300'} ${hoverEffect ? 'hover:opacity-50' : ''}`}
                title={`${mockDescriptions[tooltip]} - Início: ${startDate.toLocaleDateString('en-GB')} - Fim: ${endDate.toLocaleDateString('en-GB')}`}
            />
        </div>
    );
};


const Tracker = forwardRef<HTMLDivElement, { data?: any[]; className?: string; hoverEffect?: boolean }>(({ data = [], className, hoverEffect, ...props }, forwardedRef) => {
    return (
        <div ref={forwardedRef} className={twMerge('flex h-10 items-center', className)} {...props}>
            {data.map((props, index) => (
                <Block key={props.key ?? index} hoverEffect={hoverEffect} {...props} />
            ))}
        </div>
    );
});

Tracker.displayName = 'Tracker';

const getDataForImobiliaria = (imobiliariaId, month, year) => {
    const data = [];
    for (let i = 0; i < 30; i++) {

        const date = new Date(year, month - 1, i + 1).toLocaleDateString('en-GB');
        const status = generateRandomStatus();

        const startDate = new Date(year, month - 1, i + 1);
        const endDate = new Date(year, month - 1, i + 1);

        data.push({
            date,
            tooltip: status,
            imobiliariaId,
            startDate,
            endDate
        });
    }
    return data;
};

export default function BotExecutionMonitor() {
    const [selectedDate, setSelectedDate] = useState(null); // Guardando a data selecionada
    const [expanded, setExpanded] = useState({});
    const [dataByImobiliaria, setDataByImobiliaria] = useState({});

    useEffect(() => {
        const fetchData = () => {
            const month = selectedDate?.getMonth() + 1 || 3; // Pega o mês da data selecionada
            const year = selectedDate?.getFullYear() || new Date().getFullYear(); // Pega o ano da data selecionada
            const newData = {};

            imobiliarias.forEach((imobiliaria) => {
                const data = getDataForImobiliaria(imobiliaria.id, month, year).map((item) => ({
                    ...item,
                    color: colorMapping[item.tooltip],
                }));
                newData[imobiliaria.id] = data;
            });

            setDataByImobiliaria(newData);
        };

        fetchData();
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const toggleExpansion = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the expanded state for the current imobiliaria
        }));
    };

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="mt-3 text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Visão Mensal de Captura de Boletos
                </h1>
                {/* Filtro de Data - Mês e Ano */}
                <div className="mt-4 flex justify-end w-full">
                    <div className="flex items-center gap-6">
                        <div>
                            <label htmlFor="date" className="mr-2 text-sm font-medium"></label>
                            <DatePicker
                                id="date"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                placeholderText="Selecione mês e ano"
                                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Legenda para cores */}
                <div className="mt-6 flex justify-center gap-4">
                    {statusColorLegends.map((status, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className={`w-4 h-4 ${status.color} rounded`}></div>
                            <span>{status.label}</span>
                        </div>
                    ))}
                </div>


            </div>

            <div className="mt-10 space-y-6 rounded-tremor-default bg-tremor-background p-6 shadow-tremor-card ring-1 ring-tremor-ring dark:bg-dark-tremor-background dark:shadow-dark-tremor-card dark:ring-dark-tremor-ring">
                {imobiliarias.map((imobiliaria) => {
                    const data = dataByImobiliaria[imobiliaria.id] || []; // Acessando os dados já calculados para cada imobiliária
                    const mostRecentStatus = data[data.length - 1]?.tooltip; // Pegando o status mais recente
                    const statusColor = colorMapping[mostRecentStatus]; // Determinando a cor do status

                    return (
                        <div key={imobiliaria.id}>
                            <div className="flex justify-between items-center">
                                <p className="flex items-center gap-2 font-medium">
                                    <div className={`${statusColor} w-4 h-4 rounded`} /> {/* Exibe o ícone de status */}
                                    <span>{imobiliaria.nome}</span>
                                </p>
                                <button
                                    onClick={() => toggleExpansion(imobiliaria.id)}
                                    className="text-blue-500"
                                >
                                    {expanded[imobiliaria.id] ? 'Minimizar' : 'Expandir'}
                                </button>
                            </div>
                            {expanded[imobiliaria.id] && <Tracker hoverEffect data={data} className="mt-3" />}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

"use client";

// LAZYYYY 

import { Card, ProgressCircle, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { useState, useRef, useEffect } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';

// Dados das imobiliárias com mais detalhes
const imobiliariasData = [
    { name: 'APSA', errorPercentage: 12, email: 'apsa@email.com', site: 'www.apsa.com', lastCapture: '2025-02-10', status: 'success', boletoLink: 'www.apsa.com/boleto', boletoValue: 'R$ 150,00' },
    { name: 'BCF', errorPercentage: 45, email: 'bcf@email.com', site: 'www.bcf.com', lastCapture: '2025-03-01', status: 'error', boletoLink: 'www.bcf.com/boleto', boletoValue: 'R$ 200,00' },
    { name: 'ABRJ', errorPercentage: 75, email: 'abRJ@email.com', site: 'www.abRJ.com', lastCapture: '2025-02-25', status: 'error', boletoLink: 'www.abRJ.com/boleto', boletoValue: 'R$ 250,00' },
    { name: 'Protel', errorPercentage: 55, email: 'protel@email.com', site: 'www.protel.com', lastCapture: '2025-02-28', status: 'error', boletoLink: 'www.protel.com/boleto', boletoValue: 'R$ 180,00' },
    { name: 'Imobiliária XYZ', errorPercentage: 20, email: 'xyz@email.com', site: 'www.xyz.com', lastCapture: '2025-03-02', status: 'success', boletoLink: 'www.xyz.com/boleto', boletoValue: 'R$ 220,00' },
    // Adicione mais dados conforme necessário
];

const getColor = (percentage) => {
    if (percentage >= 75) return 'red';    // Acima de 75% -> Vermelho
    if (percentage >= 50) return 'orange'; // Entre 50% e 75% -> Laranja
    return 'emerald';                      // Abaixo de 50% -> Verde
};


export default function ErrorTrackingCard() {
    const [hovered, setHovered] = useState(null);
    const [selectedImobiliaria, setSelectedImobiliaria] = useState(null);
    const [expandedImobiliaria, setExpandedImobiliaria] = useState(null);
    const containerRef = useRef(null);

    const sortedImobiliarias = imobiliariasData.sort((a, b) => b.errorPercentage - a.errorPercentage);

    // Configuração da tabela (mesma que você já tem)
    const columns = [
        { header: 'Nome', accessorKey: 'name' },
        { header: 'E-mail', accessorKey: 'email' },
        { header: 'Site', accessorKey: 'site' },
        { header: 'Última Captura', accessorKey: 'lastCapture' },
        { header: 'Status', accessorKey: 'status' },
        { header: 'Link do Boleto', accessorKey: 'boletoLink' },
        { header: 'Valor do Boleto', accessorKey: 'boletoValue' },
    ];

    const table = useReactTable({
        data: selectedImobiliaria ? [selectedImobiliaria] : [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Função para fechar todas as tabelas quando clicar fora
    const handleCloseOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setExpandedImobiliaria(null);
        }
    };

    // Adiciona o listener para clicar fora
    useEffect(() => {
        document.addEventListener('mousedown', handleCloseOutside);
        return () => document.removeEventListener('mousedown', handleCloseOutside);
    }, []);

    return (
        <div ref={containerRef}>
            <div className="block sm:flex sm:items-start sm:justify-between sm:space-x-6">
                <div>
                    <h3 className="text-tremor-title font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Imobiliárias Críticas - Porcentagem de Erros
                    </h3>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        Aqui estão as imobiliárias com maior porcentagem de falha na captura de boletos.
                    </p>
                </div>
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedImobiliarias.map((item) => (
                    <div
                        key={item.name}
                        className={`transition-transform duration-300 transform ${hovered === item.name ? 'scale-105' : 'scale-100'}`}
                        onMouseEnter={() => setHovered(item.name)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <Card
                            onClick={() => {
                                setSelectedImobiliaria(item);
                                setExpandedImobiliaria(item.name);
                            }}
                        >
                            <dt className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                {item.name}
                            </dt>
                            <dd className="mt-3 flex items-center justify-between">

                                <ProgressCircle
                                    value={item.errorPercentage}

                                    radius={25}
                                    strokeWidth={5}
                                    color={getColor(item.errorPercentage)}
                                >
                                    <span className="text-tremor-label font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        {item.errorPercentage}%
                                    </span>
                                </ProgressCircle>

                                {expandedImobiliaria === item.name ? (
                                    <RiArrowUpSLine className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <RiArrowDownSLine className="h-5 w-5 text-gray-500" />
                                )}
                            </dd>
                        </Card>
                    </div>
                ))}
            </dl>
            {/* Renderiza a tabela de detalhes quando uma imobiliária for selecionada */}
            {expandedImobiliaria && (
                <div className="mt-8">
                    <h4 className="text-tremor-title font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Detalhes da Imobiliária - {selectedImobiliaria?.name}
                    </h4>
                    <Table>
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHeaderCell
                                            key={header.id}
                                            className="px-0.5 py-1.5"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHeaderCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-0.5 py-1.5">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
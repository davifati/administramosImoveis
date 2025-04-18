'use client'

import React from 'react';
import {
    RiArrowDownSLine,
    RiArrowUpSLine,
    RiArrowLeftDoubleLine,
    RiArrowLeftSLine,
    RiArrowRightDoubleLine,
    RiArrowRightSLine
} from '@remixicon/react';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';
import { tableImoveisColumnsConfig } from '../constant';
import { exportToCSV } from '@/app/utils';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function ImoveisTable({ data }: { data: any }) {
    const pageSize = 10;

    const table = useReactTable({
        data: data,
        columns: tableImoveisColumnsConfig,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            sorting: [
                {
                    id: tableImoveisColumnsConfig[0].accessorKey,
                    desc: false,
                },
            ],
            pagination: {
                pageIndex: 0,
                pageSize: pageSize,
            },
        },
    });

    const paginationButtons = [
        {
            icon: RiArrowLeftDoubleLine,
            onClick: () => table.setPageIndex(0),
            disabled: !table.getCanPreviousPage(),
            srText: 'Início',
        },
        {
            icon: RiArrowLeftSLine,
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            srText: 'Voltar',
        },
        {
            icon: RiArrowRightSLine,
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            srText: 'Próxima',
        },
        {
            icon: RiArrowRightDoubleLine,
            onClick: () => table.setPageIndex(table.getPageCount() - 1),
            disabled: !table.getCanNextPage(),
            srText: 'Último',
        },
    ];

    return (
        <div>
            {/* Botão Exportar CSV */}
            <div className="flex justify-end mb-4">
                <Button
                    onClick={() => exportToCSV(data, tableImoveisColumnsConfig)}
                    className="font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Exportar
                </Button>
            </div>

            <Table>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="border-b border-tremor-border dark:border-dark-tremor-border">
                            {headerGroup.headers.map((header) => (
                                <TableHeaderCell
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    onKeyDown={(event) => {
                                        const toggleSortingHandler = header.column.getToggleSortingHandler?.();
                                        if (toggleSortingHandler) {
                                            toggleSortingHandler(event);
                                        }
                                    }}
                                    className={classNames(
                                        header.column.getCanSort()
                                            ? 'cursor-pointer select-none'
                                            : '',
                                        'px-0.5 py-1.5',
                                    )}
                                    tabIndex={header.column.getCanSort() ? 0 : -1}
                                    aria-sort={header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? 'ascending' : 'descending') : 'none'}
                                >
                                    <div
                                        className={classNames(
                                            header.column.columnDef.enableSorting
                                                ? 'flex items-center justify-between gap-2 hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted'
                                                : (header.column.columnDef.meta as any)?.align ?? '',
                                            'rounded-tremor-default px-3 py-1.5',
                                        )}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {header.column.getCanSort() ? (
                                            <div className="-space-y-2">
                                                <RiArrowUpSLine
                                                    className={classNames(
                                                        'size-4 text-tremor-content-strong dark:text-dark-tremor-content-strong',
                                                        header.column.getIsSorted() === 'desc'
                                                            ? 'opacity-30'
                                                            : '',
                                                    )}
                                                    aria-hidden={true}
                                                />
                                                <RiArrowDownSLine
                                                    className={classNames(
                                                        'size-4 text-tremor-content-strong dark:text-dark-tremor-content-strong',
                                                        header.column.getIsSorted() === 'asc'
                                                            ? 'opacity-30'
                                                            : '',
                                                    )}
                                                    aria-hidden={true}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </TableHeaderCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    className="px-3 py-2"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Paginação */}
            <div className="mt-4 flex justify-between items-center">
                <p className="text-tremor-default">
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </p>
                <div className="flex items-center gap-1.5">
                    {paginationButtons.map((button, idx) => (
                        <Button key={idx} onClick={button.onClick} disabled={button.disabled}>
                            <span className="sr-only">{button.srText}</span>
                            <button.icon className="size-5 text-tremor-content-emphasis" aria-hidden={true} />
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

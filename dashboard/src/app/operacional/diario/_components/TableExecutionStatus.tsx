"use client";

import React, { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Button,
} from "@tremor/react";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import { data } from "@/mock/operacional/dailyExecutionStatus";



// Configuração das colunas
const columns = [
    {
        accessorKey: "administradora",
        header: "Administradora",
    },
    {
        accessorKey: "dataExecucao",
        header: "Data de Execução",
        cell: ({ getValue }) => {
            const data = new Date(getValue());
            return data.toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue();
            return (
                <span
                    className={`px-2 py-1 rounded ${status === "Sucesso"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: "estatisticaFalhas",
        header: "Estatística de Falhas",
        cell: ({ getValue }) => {
            const falha = getValue();
            return (
                <div className="flex items-center">
                    <div className="relative w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all ${parseInt(falha) > 10 ? "bg-red-500" : "bg-green-500"
                                }`}
                            style={{ width: falha }}
                        ></div>
                    </div>
                    <span className="ml-2 text-sm">{falha}</span>
                </div>
            );
        },
    },
];

export default function TabelaExecucao() {
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            pagination: {
                pageIndex,
                pageSize: 5,
            },
            globalFilter,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPageIndex,
        getRowId: (row) => row.administradora,
    });

    return (
        <div>
            {/* Campo de filtro */}
            <div className="mb-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Filtrar administradora..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="border p-2 rounded w-full max-w-sm"
                />
            </div>

            {/* Tabela */}
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="border-b">
                            {headerGroup.headers.map((header) => (
                                <TableHeaderCell
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="cursor-pointer select-none px-3 py-2"
                                >
                                    <div className="flex items-center">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {header.column.getCanSort() && (
                                            <span className="ml-2">
                                                {header.column.getIsSorted() === "asc" ? (
                                                    <RiArrowUpSLine className="inline-block size-4" />
                                                ) : header.column.getIsSorted() === "desc" ? (
                                                    <RiArrowDownSLine className="inline-block size-4" />
                                                ) : null}
                                            </span>
                                        )}
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
                                <TableCell key={cell.id} className="px-3 py-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Paginação */}
            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm">
                    Página {table.getState().pagination.pageIndex + 1} de{" "}
                    {table.getPageCount()}
                </span>
                <div className="flex gap-2">
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próxima
                    </Button>
                </div>
            </div>
        </div>
    );
}

"use client";
import React, { useState, useEffect } from "react";
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
import { getCronogramaExecucaoBots } from "../../_api/diario";

export default function TabelaExecucao() {
    const [data, setData] = useState<any>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        // Função para buscar os dados da API
        const fetchData = async () => {
            try {
                const response = await getCronogramaExecucaoBots();
                setData(response);  // Atualiza o estado com os dados da API
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();  // Chama a função quando o componente é montado
    }, []); // O array vazio garante que a requisição será feita apenas uma vez

    // Configuração das colunas
    const columns = [
        {
            accessorKey: "administradora",
            header: "Administradora",
        },
        {
            accessorKey: "condominio",
            header: "Condomínio",
        },
        {
            accessorKey: "ultima_execucao",
            header: "Última Execução",
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
            accessorKey: "proxima_execucao",
            header: "Próxima Execução",
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
    ];

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
        onPaginationChange: (updaterOrValue) => {
            return setPageIndex((prev) => {
                if (typeof updaterOrValue === "function") {
                    return updaterOrValue({ pageIndex: prev, pageSize: 5 }).pageIndex;
                }
                return updaterOrValue.pageIndex;
            });
        },
        //@ts-ignore
        getRowId: (row) => row.administradora,
    });

    return (
        <div>
            {/* Campo de filtro */}
            <div className="mb-4 flex justify-between">
                {/* @ts-ignore */}
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

import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

// Defina o componente ImoveisTable para receber data como prop
export default function ImoveisTable({ data }: { data: any }) {
    const workspacesColumns = [
        {
            header: 'Nome da Administradora',
            accessorKey: 'nome',
            enableSorting: true,
            meta: {
                align: 'text-left',
            },
        },
        {
            header: 'Site',
            accessorKey: 'site',
            enableSorting: true,
            meta: {
                align: 'text-left',
            },
        },
        {
            header: 'Email',
            accessorKey: 'email',
            enableSorting: false,
            meta: {
                align: 'text-left',
            },
        },
        {
            header: 'Telefone',
            accessorKey: 'telefones',
            enableSorting: false,
            meta: {
                align: 'text-left',
            },
        },
        {
            header: 'Qtd Imóveis',
            accessorKey: 'qtdeimoveis',
            enableSorting: false,
            meta: {
                align: 'text-left',
            },
        },
        {
            header: 'Criado em',
            accessorKey: 'created',
            enableSorting: false,
            meta: {
                align: 'text-right',
            },
        },
    ];

    const table = useReactTable({
        data: data,
        columns: workspacesColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            sorting: [
                {
                    id: 'nome',
                    desc: false,
                },
            ],
        },
    });

    return (
        <>
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="border-b border-tremor-border dark:border-dark-tremor-border"
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHeaderCell
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            header.column.getToggleSortingHandler()(event);
                                        }
                                    }}
                                    className={classNames(
                                        header.column.getCanSort()
                                            ? 'cursor-pointer select-none'
                                            : '',
                                        'px-0.5 py-1.5',
                                    )}
                                    tabIndex={header.column.getCanSort() ? 0 : -1}
                                    aria-sort={header.column.getIsSorted()}
                                >
                                    <div
                                        className={classNames(
                                            header.column.columnDef.enableSorting === true
                                                ? 'flex items-center justify-between gap-2 hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted'
                                                : header.column.columnDef.meta.align,
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
                                    className={classNames(cell.column.columnDef.meta.align)}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

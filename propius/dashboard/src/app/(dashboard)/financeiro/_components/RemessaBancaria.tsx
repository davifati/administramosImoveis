'use client';
import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Button,
} from '@tremor/react';
import { Dialog } from '@headlessui/react';

const mockUnidades = [
    { id: 1, bloco: 'A', unidade: '101', nome: 'João Silva', valor: 850.75, condominio: 'Condomínio Alfa' },
    { id: 2, bloco: 'A', unidade: '102', nome: 'Maria Souza', valor: 920.50, condominio: 'Condomínio Alfa' },
    { id: 3, bloco: 'B', unidade: '201', nome: 'Carlos Lima', valor: 780.00, condominio: 'Condomínio Beta' },
    { id: 4, bloco: 'B', unidade: '202', nome: 'Fernanda Oliveira', valor: 960.00, condominio: 'Condomínio Beta' },
];

const mockCondominios = ['Todos', 'Condomínio Alfa', 'Condomínio Beta'];

export default function RemessaGenerator() {
    const [selecionados, setSelecionados] = useState<number[]>([]);
    const [condominio, setCondominio] = useState('Todos');
    const [mes, setMes] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const unidadesFiltradas = mockUnidades.filter((u) => {
        if (condominio !== 'Todos' && u.condominio !== condominio) return false;
        return true;
    });

    const toggleSelecionado = (id: number) => {
        setSelecionados((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const abrirConfirmacao = () => {
        if (selecionados.length === 0 || mes === '') {
            alert('Selecione ao menos um imóvel e defina o mês.');
            return;
        }
        setIsModalOpen(true);
    };

    const gerarRemessaMock = () => {
        setLoading(true);

        setTimeout(() => {
            const unidades = mockUnidades.filter((u) => selecionados.includes(u.id));
            const textoCNAB = unidades.map((u, i) =>
                `Linha ${i + 1} - ${u.nome} (${u.bloco}-${u.unidade}): R$ ${u.valor.toFixed(2)}`
            ).join('\n');

            const blob = new Blob([`REMESSA BANCÁRIA - ${mes}\n${textoCNAB}`], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `remessa-${mes}.txt`;
            a.click();
            URL.revokeObjectURL(url);

            setIsModalOpen(false);
            setSelecionados([]);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Gerar Remessa Bancária (Mock)</h2>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <select
                    className="border border-gray-300 rounded-md p-2"
                    value={condominio}
                    onChange={(e) => setCondominio(e.target.value)}
                >
                    {mockCondominios.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <input
                    type="month"
                    className="border border-gray-300 rounded-md p-2"
                    value={mes}
                    onChange={(e) => setMes(e.target.value)}
                />
            </div>

            {/* Tabela */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell></TableHeaderCell>
                        <TableHeaderCell>Bloco</TableHeaderCell>
                        <TableHeaderCell>Unidade</TableHeaderCell>
                        <TableHeaderCell>Responsável</TableHeaderCell>
                        <TableHeaderCell>Valor</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {unidadesFiltradas.map((unidade) => (
                        <TableRow key={unidade.id}>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selecionados.includes(unidade.id)}
                                    onChange={() => toggleSelecionado(unidade.id)}
                                />
                            </TableCell>
                            <TableCell>{unidade.bloco}</TableCell>
                            <TableCell>{unidade.unidade}</TableCell>
                            <TableCell>{unidade.nome}</TableCell>
                            <TableCell>R$ {unidade.valor.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-6 flex justify-end">
                <Button
                    onClick={abrirConfirmacao}
                    disabled={selecionados.length === 0 || !mes}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? 'Gerando...' : `Gerar Remessa (${selecionados.length})`}
                </Button>
            </div>

            {/* Modal de confirmação */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
                        <Dialog.Title className="text-lg font-semibold mb-4">Confirmar Geração</Dialog.Title>
                        <p className="mb-4 text-sm text-gray-600">
                            Gerar a remessa para <strong>{selecionados.length}</strong> unidades no mês <strong>{mes}</strong>?
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-700">
                                Cancelar
                            </Button>
                            <Button onClick={gerarRemessaMock} className="bg-green-600 text-white hover:bg-green-700">
                                Confirmar
                            </Button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}

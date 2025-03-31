"use client";

import { useEffect, useState } from 'react';

interface Extracao {
    imobiliaria: string;
    ultimaExtracao: string;
    proximaExtracao: string;
    status: 'sucesso' | 'falha';
}

const DailyExtractionMonitor = () => {
    const [extracoes, setExtracoes] = useState<Extracao[]>([]);

    useEffect(() => {
        const mockExtracoes: Extracao[] = [
            {
                imobiliaria: 'Imob 1',
                ultimaExtracao: '2025-03-15',
                proximaExtracao: '2025-03-16',
                status: 'sucesso',
            },
            {
                imobiliaria: 'Imob 2',
                ultimaExtracao: '2025-03-14',
                proximaExtracao: '2025-03-17',
                status: 'falha',
            },
            {
                imobiliaria: 'Imob 3',
                ultimaExtracao: '2025-03-13',
                proximaExtracao: '2025-03-18',
                status: 'sucesso',
            },
        ];

        setExtracoes(mockExtracoes);
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Visão Diária de Captura de Boletos</h2>

            {extracoes.length > 0 ? (
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600">Imobiliária</th>
                            <th className="px-4 py-2 text-left text-gray-600">Última Extração</th>
                            <th className="px-4 py-2 text-left text-gray-600">Próxima Extração</th>
                            <th className="px-4 py-2 text-left text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {extracoes.map((extracao, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2 text-gray-800">{extracao.imobiliaria}</td>
                                <td className="px-4 py-2 text-gray-800">{new Date(extracao.ultimaExtracao).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-gray-800">{new Date(extracao.proximaExtracao).toLocaleDateString()}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`font-semibold ${extracao.status === 'sucesso' ? 'text-green-500' : 'text-red-500'}`}
                                    >
                                        {extracao.status === 'sucesso' ? 'Sucesso' : 'Falha'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">Carregando...</p>
            )}

            {/* Exibindo alertas de falha */}
            {extracoes.some((extracao) => extracao.status === 'falha') && (
                <div className="mt-4 p-4 bg-yellow-500 text-white rounded-lg">
                    <strong>Atenção:</strong> Houve falhas em algumas extrações. Verifique as imobiliárias com status &Falha&.
                </div>
            )}
        </div>
    );
};

export default DailyExtractionMonitor;

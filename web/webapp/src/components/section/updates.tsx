import { FaExclamationCircle, FaHeadset } from 'react-icons/fa'; // Ícones para inconsistência e suporte

const CardInconsistenciaAtualizacoes = () => {
    const logs = [
        { id: 1, boleto: '12345', motivo: 'Falha na conexão', data: '20/02/2025' },
        { id: 2, boleto: '67890', motivo: 'Valor incorreto', data: '19/02/2025' },
        { id: 3, boleto: '11223', motivo: 'Erro de sistema', data: '18/02/2025' },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Inconsistências e Atualizações</h2>

            <div className="mb-6">
                <div className="flex items-center mb-4">
                    <FaExclamationCircle className="text-red-500 text-2xl mr-2" />
                    <span className="font-semibold text-xl">Boletos não processados</span>
                </div>

                <div className="space-y-4">
                    {logs.length > 0 ? (
                        logs.map((log) => (
                            <div key={log.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                                <div>
                                    <p className="font-semibold">Boleto #{log.boleto}</p>
                                    <p className="text-sm text-gray-600">Motivo: {log.motivo}</p>
                                </div>
                                <span className="text-sm text-gray-500">{log.data}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">Nenhuma inconsistência encontrada.</p>
                    )}
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    className="bg-blue-500 text-white py-2 px-6 rounded-md flex items-center hover:bg-blue-600"
                    onClick={() => alert('Abrindo suporte...')}
                >
                    <FaHeadset className="mr-2" />
                    Falar com Suporte
                </button>
            </div>
        </div>
    );
};

export default CardInconsistenciaAtualizacoes;

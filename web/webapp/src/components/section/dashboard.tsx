import { FaRegFileAlt, FaRegClock, FaRegBuilding } from 'react-icons/fa'; // Para ícones

const Dashboard = () => {
    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Card Visão de Contas */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Visão de Contas</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <FaRegFileAlt className="text-blue-500 mr-3" />
                        <span className="text-lg font-medium">Boletos: R$ 5.000,00</span>
                    </div>
                    <div className="flex items-center">
                        <FaRegFileAlt className="text-green-500 mr-3" />
                        <span className="text-lg font-medium">IPTU: R$ 2.000,00</span>
                    </div>
                    <div className="flex items-center">
                        <FaRegFileAlt className="text-yellow-500 mr-3" />
                        <span className="text-lg font-medium">Taxas: R$ 1.200,00</span>
                    </div>
                </div>
            </div>

            {/* Card Visão Geral */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Visão Geral</h2>
                <div className="flex justify-between mb-6">
                    <div className="text-center">
                        <span className="text-4xl font-semibold text-red-500">20%</span>
                        <p className="text-lg text-gray-500">Inadimplência</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaRegBuilding className="text-2xl text-gray-600 mb-2" />
                        <p className="text-lg font-semibold">Imóveis Cadastrados</p>
                        <span className="text-2xl font-semibold">120</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                        <FaRegClock className="text-yellow-500 text-2xl mb-2" />
                        <p className="text-lg text-gray-500">Boletos em Atraso</p>
                        <span className="text-2xl font-semibold">30</span>
                    </div>
                    <div className="text-center">
                        <FaRegClock className="text-green-500 text-2xl mb-2" />
                        <p className="text-lg text-gray-500">Boletos a Vencer</p>
                        <span className="text-2xl font-semibold">50</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

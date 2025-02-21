import { FaFileCsv, FaBarcode, FaCogs, FaCloudUploadAlt } from 'react-icons/fa'; // Ícones para funcionalidades

const CardEmissaoBoletos = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Emissão de Boletos em Massa</h2>

            <div className="space-y-6">
                {/* Extração automática de boletos */}
                <div className="flex items-start">
                    <FaCloudUploadAlt className="text-blue-500 text-3xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Extração automática de boletos</h3>
                        <p className="text-gray-600">Extraia os boletos das concessionárias de forma automática e simplifique o seu processo de pagamento.</p>
                    </div>
                </div>

                {/* Geração de remessas bancárias */}
                <div className="flex items-start">
                    <FaCogs className="text-green-500 text-3xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Geração de remessas bancárias</h3>
                        <p className="text-gray-600">Gere remessas bancárias de forma fácil e eficiente para facilitar o processo de cobrança.</p>
                    </div>
                </div>

                {/* Linhas digitáveis em CSV */}
                <div className="flex items-start">
                    <FaFileCsv className="text-yellow-500 text-3xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Linhas Digitáveis em CSV</h3>
                        <p className="text-gray-600">Exporte as linhas digitáveis dos boletos em formato CSV para facilitar a integração com outros sistemas.</p>
                    </div>
                </div>

                {/* API de Integração com CRM */}
                <div className="flex items-start">
                    <FaBarcode className="text-purple-500 text-3xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">API de Integração com CRM</h3>
                        <p className="text-gray-600">Integre o sistema de boletos com o seu CRM de forma automatizada para um gerenciamento eficiente.</p>
                    </div>
                </div>
            </div>

            {/* Botões de ação */}
            <div className="flex justify-between mt-6">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-md flex items-center hover:bg-blue-600">
                    <FaCloudUploadAlt className="mr-2" />
                    Emitir Boletos
                </button>
                <button className="bg-green-500 text-white py-2 px-6 rounded-md flex items-center hover:bg-green-600">
                    <FaCogs className="mr-2" />
                    Gerar Remessa
                </button>
            </div>
        </div>
    );
};

export default CardEmissaoBoletos;

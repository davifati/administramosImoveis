import React from 'react';

type ModalCardProps = {
    isOpen: boolean;
    closeModal: () => void;
    field: string;
    data: any;
};

const ModalCard: React.FC<ModalCardProps> = ({ isOpen, closeModal, field, data }) => {
    if (!isOpen) return null;

    // TODO: OBJETOS
    const renderFieldDetails = () => {
        switch (field) {
            case 'administradora':
                return (
                    <>
                        <div>
                            <strong>Site:</strong> {data.site}
                        </div>
                        <div>
                            <strong>Email:</strong> {data.email}
                        </div>
                        <div>
                            <strong>Quantidade de Imóveis:</strong> {data.quantidade_imoveis}
                        </div>
                        <div>
                            <strong>Login:</strong> {data.login}
                        </div>
                        <div>
                            <strong>Senha:</strong> ***** {/* Senha com asteriscos */}
                        </div>
                    </>
                );
            case 'administracao':
                return (
                    <>
                        <div>
                            <strong>Email:</strong> {data.administracao_email}
                        </div>
                        <div>
                            <strong>Telefone:</strong> {data.administracao_telefone}
                        </div>
                        <div>
                            <strong>Endereços:</strong> {data.administracao_enderecos.join(', ')}
                        </div>
                    </>
                );
            case 'boleto':
                return (
                    <>
                        <div>
                            <strong>Data de Vencimento:</strong> {data.data_vencimento_boleto}
                        </div>
                        <div>
                            <strong>Valor:</strong> {data.valor_boleto}
                        </div>
                        <div>
                            <strong>Linha Digitável:</strong> {data.linha_digitavel}
                        </div>
                        <div>
                            <strong>Link PDF:</strong> <a href={data.link_pdf_boleto} target="_blank">Baixar</a>
                        </div>
                    </>
                );
            case 'data_extracao_boletos':
                return (
                    <div>
                        <strong>Data de Extração:</strong> {data.data_extracao_boletos}
                    </div>
                );
            case 'estado':
                return (
                    <div>
                        <strong>Estado:</strong> {data.estado}
                    </div>
                );
            default:
                return <div>Informações não disponíveis para este campo.</div>;
        }
    };

    return (
        <div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
            onClick={closeModal}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-96"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">Detalhes do Imóvel</h2>
                <div className="space-y-4">
                    {renderFieldDetails()}
                </div>
                <button
                    onClick={closeModal}
                    className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default ModalCard;

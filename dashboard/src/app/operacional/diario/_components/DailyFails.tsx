"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { ImobiliariaStats } from "@/data/abstract";
import { falhasBotsImobiliaria } from "@/data/boletosFalhosPorcetagem"; // Mock de dados

interface AlertaFalhasDiariasProps {
    data: string; // Data a ser verificada (formato "yyyy-mm-dd")
    dados: ImobiliariaStats[];
}

const AlertaFalhasDiarias = ({ data, dados = falhasBotsImobiliaria }: AlertaFalhasDiariasProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const imobiliariasComFalhas = dados.filter(imob =>
        imob.dadosFalhas.some(falha => falha.data === data)
    );

    if (imobiliariasComFalhas.length === 0) {
        return null; // Não exibe nada se não houver falhas
    }

    return (
        <div className="flex space-x-4 mt-4">
            {/* Card de Falhas na Extração de Boletos */}
            <div
                className={`w-full max-w-md p-4 bg-white shadow-lg rounded-lg border border-red-500 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                        <div>
                            <h3 className="text-lg font-semibold text-red-500">
                                Falhas na Extração de Boletos - {data}
                            </h3>
                            <p className="text-sm mt-1">As seguintes imobiliárias não conseguiram pegar ou ler os boletos:</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-red-500 hover:text-red-700 font-semibold"
                    >
                        Fechar
                    </button>
                </div>
                <ul className="list-disc ml-5 mt-3">
                    {imobiliariasComFalhas.map((imob) => (
                        <li key={imob.nome} className="text-sm text-gray-700">{imob.nome}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AlertaFalhasDiarias;

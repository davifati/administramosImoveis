"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, Maximize2, Minimize2 } from "lucide-react";
import { falhasBotsImobiliaria } from "@/mock/operacional/failyFailuresCard";

export default function AlertaFalhasDiarias({ data }) {
    const [expandido, setExpandido] = useState(false);
    const [hovered, setHovered] = useState(false);

    const imobiliariasComFalhas = falhasBotsImobiliaria.filter((imob) =>
        imob.dadosFalhas.some((falha) => falha.data === data)
    );

    const todasImobiliarias = falhasBotsImobiliaria.map(imob => imob.nome);
    const imobiliariasComSucesso = todasImobiliarias.filter(nome =>
        !imobiliariasComFalhas.some(imob => imob.nome === nome)
    );

    const houveFalhas = imobiliariasComFalhas.length > 0;

    return (
        <div className="relative mt-6 w-full">
            {!expandido ? (
                <div
                    className={`relative w-full max-w-screen-lg mx-auto p-6 bg-white shadow-xl rounded-xl border transition-all duration-300 
                    ${houveFalhas ? "border-red-500" : "border-green-500"} 
                    ${hovered ? "scale-105 shadow-2xl" : ""}`}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <div className="flex items-center mb-4">
                        {houveFalhas ? (
                            <AlertCircle className="h-8 w-8 text-red-600 mr-4" />
                        ) : (
                            <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
                        )}
                        <div>
                            <h3 className={`text-2xl font-bold ${houveFalhas ? "text-red-600" : "text-green-600"}`}>
                                {houveFalhas ? "Falhas na Extração de Boletos" : "Tudo Rodou com Sucesso"} - {data}
                            </h3>
                            <p className="text-base text-gray-700 mt-1">
                                {houveFalhas
                                    ? "Algumas imobiliárias tiveram problemas na captura de boletos."
                                    : "Todas as imobiliárias processaram boletos com sucesso!"}
                            </p>
                        </div>
                    </div>
                    <ul className="list-disc ml-8 mt-3 text-lg text-gray-800">
                        {(houveFalhas ? imobiliariasComFalhas : imobiliariasComSucesso).map((imob, index) => (
                            <li key={index}>
                                <strong className={houveFalhas ? "text-red-500" : "text-green-500"}>
                                    {houveFalhas ? imob.nome : imob}
                                </strong>
                            </li>
                        ))}
                    </ul>
                    <button
                        className={`absolute bottom-3 right-3 p-2 text-white rounded-full transition-all
                        ${houveFalhas ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                        onClick={() => setExpandido(true)}
                    >
                        <Maximize2 size={20} />
                    </button>
                </div>
            ) : (
                <div className={`relative w-full max-w-screen-lg mx-auto p-6 bg-white shadow-xl rounded-xl border 
                ${houveFalhas ? "border-red-500" : "border-green-500"}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className={`text-2xl font-bold ${houveFalhas ? "text-red-600" : "text-green-600"}`}>
                            {houveFalhas ? "Detalhes das Falhas" : "Todas as Admins Processadas"} - {data}
                        </h3>
                        <button
                            className={`p-2 text-white rounded-full transition-all 
                            ${houveFalhas ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                            onClick={() => setExpandido(false)}
                        >
                            <Minimize2 size={20} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(houveFalhas ? imobiliariasComFalhas : imobiliariasComSucesso).map((imob, index) => (
                            <div key={index} className={`p-4 border rounded-xl shadow-md hover:shadow-lg transition-all 
                            ${houveFalhas ? "bg-red-100 border-red-300" : "bg-green-100 border-green-300"}`}>
                                <h4 className={`text-lg font-semibold ${houveFalhas ? "text-red-700" : "text-green-700"}`}>
                                    {houveFalhas ? imob.nome : imob}
                                </h4>
                                {houveFalhas && (
                                    <>
                                        <p className="text-base text-gray-800 mt-1">
                                            📆 <strong>{imob.dadosFalhas[0].data}</strong>
                                        </p>
                                        <p className="text-base text-gray-800">
                                            ⚠️ {imob.dadosFalhas[0].motivo}
                                        </p>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

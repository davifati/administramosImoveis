"use client"
export const dynamic = "force-static"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Maximize2, Minimize2 } from "lucide-react"
import { FalhaBoleto, getBoletoAdministradoraFalhas } from "../../_api/diario"

export default function AlertaFalhasDiarias({ data }: { data: string }) {
    const [expandido, setExpandido] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [falhas, setFalhas] = useState<FalhaBoleto[]>([]) // Estado para armazenar as falhas
    const [loading, setLoading] = useState(true) // Estado de loading

    useEffect(() => {
        const fetchFalhas = async () => {
            try {
                const falhasData = await getBoletoAdministradoraFalhas()
                setFalhas(falhasData)
            } catch (error) {
                console.error("Erro ao carregar as falhas:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchFalhas()
    }, [])

    // Filtra as imobiliárias com falhas para o dia especificado
    const imobiliariasComFalhas = falhas.filter((imob) =>
        imob.dadosFalhas.some((falha) => falha.data === data),
    )

    const todasImobiliarias = falhas.map((imob) => imob.nome)
    const imobiliariasComSucesso = todasImobiliarias.filter(
        (nome) => !imobiliariasComFalhas.some((imob) => imob.nome === nome),
    )

    const houveFalhas = imobiliariasComFalhas.length > 0

    return (
        <div className="relative mt-6 w-full">
            {!expandido ? (
                <div
                    className={`relative mx-auto w-full max-w-screen-lg rounded-xl border bg-white p-6 shadow-xl transition-all duration-300 ${houveFalhas ? "border-red-500" : "border-green-500"} ${hovered ? "scale-105 shadow-2xl" : ""}`}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <div className="mb-4 flex items-center">
                        {houveFalhas ? (
                            <AlertCircle className="mr-4 h-8 w-8 text-red-600" />
                        ) : (
                            <CheckCircle className="mr-4 h-8 w-8 text-green-600" />
                        )}
                        <div>
                            <h3
                                className={`text-2xl font-bold ${houveFalhas ? "text-red-600" : "text-green-600"}`}
                            >
                                {houveFalhas
                                    ? "Falhas na Extração de Boletos"
                                    : "Tudo Rodou com Sucesso"}{" "}
                                - {data}
                            </h3>
                            <p className="mt-1 text-base text-gray-700">
                                {houveFalhas
                                    ? "Algumas imobiliárias tiveram problemas na captura de boletos."
                                    : "Todas as imobiliárias processaram boletos com sucesso!"}
                            </p>
                        </div>
                    </div>
                    <ul className="ml-8 mt-3 list-disc text-lg text-gray-800">
                        {(houveFalhas ? imobiliariasComFalhas : imobiliariasComSucesso).map(
                            (imob, index) => (
                                <li key={index}>
                                    <strong
                                        className={houveFalhas ? "text-red-500" : "text-green-500"}
                                    >
                                        {typeof imob === "string" ? imob : imob.nome}
                                    </strong>
                                </li>
                            ),
                        )}
                    </ul>
                    <button
                        className={`absolute bottom-3 right-3 rounded-full p-2 text-white transition-all ${houveFalhas ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                        onClick={() => setExpandido(true)}
                    >
                        <Maximize2 size={20} />
                    </button>
                </div>
            ) : (
                <div
                    className={`relative mx-auto w-full max-w-screen-lg rounded-xl border bg-white p-6 shadow-xl ${houveFalhas ? "border-red-500" : "border-green-500"}`}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <h3
                            className={`text-2xl font-bold ${houveFalhas ? "text-red-600" : "text-green-600"}`}
                        >
                            {houveFalhas ? "Detalhes das Falhas" : ""} {data}
                        </h3>
                        <button
                            className={`rounded-full p-2 text-white transition-all ${houveFalhas ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                            onClick={() => setExpandido(false)}
                        >
                            <Minimize2 size={20} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {(houveFalhas ? imobiliariasComFalhas : imobiliariasComSucesso).map(
                            (imob, index) => (
                                <div
                                    key={index}
                                    className={`rounded-xl border p-4 shadow-md transition-all hover:shadow-lg ${houveFalhas ? "border-red-300 bg-red-100" : "border-green-300 bg-green-100"}`}
                                >
                                    <h4
                                        className={`text-lg font-semibold ${houveFalhas ? "text-red-700" : "text-green-700"}`}
                                    >
                                        {houveFalhas ? imob.nome : imob}
                                    </h4>
                                    {houveFalhas && (
                                        <>
                                            <p className="mt-1 text-base text-gray-800">
                                                📆 <strong>{imob.dadosFalhas[0].data}</strong>
                                            </p>
                                            <p className="text-base text-gray-800">
                                                ⚠️ {imob.dadosFalhas[0].motivo}
                                            </p>
                                        </>
                                    )}
                                </div>
                            ),
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

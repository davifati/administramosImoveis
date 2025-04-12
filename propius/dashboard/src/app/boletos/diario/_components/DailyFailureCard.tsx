"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Maximize2, Minimize2 } from "lucide-react"
import { FalhaBoleto, getBoletoAdministradoraFalhas } from "../../_api/diario"

export default function AlertaFalhasDiarias({ data }: { data: string }) {
    const [expandido, setExpandido] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [falhas, setFalhas] = useState<FalhaBoleto[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFalhas = async () => {
            try {
                const falhasData = await getBoletoAdministradoraFalhas()
                console.log(">>>> ", falhasData)
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

    // Filtra as imobiliárias sem falhas para o dia especificado
    const imobiliariasComSucesso = falhas.filter(
        (imob) => !imobiliariasComFalhas.some((falhaImob) => falhaImob.nome === imob.nome),
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
                                    : "Tudo Ok! "}{""}
                                - {data}
                            </h3>
                            <p className="mt-1 text-base text-gray-700">
                                {houveFalhas
                                    ? "Algumas imobiliárias tiveram problemas na captura de boletos."
                                    : "Todos os boletos agendados foram capturados com sucesso."}
                            </p>
                        </div>
                    </div>
                    <ul className="ml-8 mt-3 list-disc text-lg text-gray-800">
                        {imobiliariasComFalhas.map((imob, index) => (
                            <li key={index}>
                                <strong className="text-red-500">
                                    {imob.dadosFalhas
                                        .filter((f) => f.data === data)
                                        .map((falha, idx) => (
                                            <div key={idx}>
                                                {falha.condominio} - {falha.data}
                                            </div>
                                        ))}
                                </strong>
                            </li>
                        ))}
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
                        {/* Mostra as imobiliárias com falhas ou sucesso com todos os dados */}
                        {(houveFalhas ? imobiliariasComFalhas : imobiliariasComSucesso).map(
                            (imob, index) => (
                                <div
                                    key={index}
                                    className={`rounded-xl border p-4 shadow-md transition-all hover:shadow-lg ${houveFalhas ? "border-red-300 bg-red-100" : "border-green-300 bg-green-100"}`}
                                >
                                    <h4 className="text-lg font-semibold text-red-700">
                                        {imob.nome}
                                    </h4>
                                    {/* Exibe todos os dados falha para a data especificada */}
                                    {imob.dadosFalhas
                                        .filter((falha) => falha.data === data)
                                        .map((falha, idx) => (
                                            <div key={idx} className="mt-2 text-sm text-gray-800">
                                                <p>🏢 <strong>Condomínio:</strong> {falha.condominio}</p>
                                                <p>📅 <strong>Vencimento:</strong> {falha.data}</p>
                                                <p>💰 <strong>Valor:</strong> R$ {falha.valor.toFixed(2)}</p>
                                                <p>⚠️ <strong>Motivo:</strong> {falha.motivo}</p>
                                            </div>
                                        ))}
                                </div>
                            ),
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

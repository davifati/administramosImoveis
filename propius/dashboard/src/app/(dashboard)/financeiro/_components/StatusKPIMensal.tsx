"use client"

import { useState, useEffect } from 'react'; // Importando useState e useEffect
import { InformationCircleIcon } from '@heroicons/react/solid'; // Importando ícone de info do Heroicons
import { getKPIMensal } from '../_api/KPIMesAnterior';

export default function StatusKPI() {
    const [KPIMensalData, setKPIMensalData] = useState([]); // Estado para armazenar os dados

    useEffect(() => {
        // Função assíncrona para obter os dados
        const fetchData = async () => {
            try {
                const data = await getKPIMensal();
                setKPIMensalData(data); // Atualizando o estado com os dados obtidos
            } catch (error) {
                console.error("Erro ao obter dados do KPI:", error);
            }
        };

        fetchData(); // Chamando a função para obter os dados
    }, []); // O array vazio [] faz com que o efeito seja executado apenas uma vez após a montagem do componente

    return (
        <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4 text-center">
                Em relação ao mês anterior
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
                {KPIMensalData.map((item, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center space-x-1.5 rounded-tremor-full bg-tremor-background px-2.5 py-1 ring-1 ring-inset ring-tremor-ring dark:bg-dark-tremor-background dark:ring-dark-tremor-ring"
                        style={{ position: "relative" }}
                    >
                        <span className="text-tremor-label font-medium text-tremor-content dark:text-dark-tremor-content">
                            {item.status}
                        </span>
                        <span
                            className={`text-tremor-label font-medium ${item.color === "emerald" ? "text-emerald-700 dark:text-emerald-500" : "text-red-700 dark:text-red-500"
                                }`}
                        >
                            {item.percentage}
                        </span>

                        {/* Ícone de Informação */}
                        <div className="relative group">
                            <InformationCircleIcon className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100" />

                            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {item.description}
                            </div>
                        </div>

                    </span>
                ))}
            </div>
        </>
    );
}

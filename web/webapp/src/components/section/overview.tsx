"use client"
import { useState } from "react";
import { HiClient } from "../common/hi-search-export";
import AdImovelSaas from "../common/ad-imovel";
import Dashboard from "./dashboard";
import HistoricoInadimplencia from "./historico";
import CardInconsistenciaAtualizacoes from "./updates";
import CardEmissaoBoletos from "./emissaoBoletos";


export function Resumo() {
    const [dadosResumo, setDadosResumo] = useState({
        totalImoveis: 0,
        totalImobiliaria: 0,
        ultimasBuscas: []
    });

    const handleAtualizarResumo = (tipo, valor) => {
        setDadosResumo(prev => ({
            ...prev,
            [tipo]: valor
        }));
    };

    return (
        <div className="container mx-auto p-4">
            < AdImovelSaas />
            <HiClient />
            <Dashboard />
            < HistoricoInadimplencia />
            < CardInconsistenciaAtualizacoes />

            <div className="grid grid-cols-2 gap-6">
                {/* Outros cards aqui */}
                <div className="col-span-2">
                    <CardEmissaoBoletos />
                </div>
            </div>


        </div>
    );
}
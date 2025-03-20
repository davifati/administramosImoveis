import { EstatisticasFalhasProps } from "@/data/abstract";
import { falhasBotsImobiliaria } from "@/data/boletosFalhosPorcetagem";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

const FailsExtractionTracker = ({
    dados = falhasBotsImobiliaria,
    titulo = "Estatísticas de Falhas",
    mostrarTotal = true,
}: EstatisticasFalhasProps) => {

    const [ordenacao, setOrdenacao] = useState<"desc" | "asc">("desc");
    const [imobiliariaSelecionada, setImobiliariaSelecionada] = useState<string | null>(null);

    const dadosOrdenados = [...dados].sort((a, b) => {
        return ordenacao === "desc" ? b.taxaFalha - a.taxaFalha : a.taxaFalha - b.taxaFalha;
    });

    // Função para lidar com o clique na imobiliária e exibir a tabela de falhas
    const handleImobiliariaClick = (imobiliariaNome: string) => {
        if (imobiliariaSelecionada === imobiliariaNome) {
            // Se a imobiliária clicada já estiver selecionada, desmarque
            setImobiliariaSelecionada(null);
        } else {
            // Caso contrário, selecione a imobiliária
            setImobiliariaSelecionada(imobiliariaNome);
        }
    };

    return (
        <div className="w-full bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h2 className="text-2xl font-semibold">{titulo}</h2>
            </div>
            <div className="space-y-4 mt-4">
                {dadosOrdenados.map((imob) => (
                    <div key={imob.nome} className="space-y-2">
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => handleImobiliariaClick(imob.nome)}
                        >
                            <span className="font-medium">{imob.nome}</span>
                            <span className={`font-bold ${imob.taxaFalha > 15 ? "text-red-500" : "text-orange-500"}`}>
                                {imob.taxaFalha}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-full rounded-full"
                                style={{ width: `${imob.taxaFalha}%` }}
                            />
                        </div>
                        {mostrarTotal && (
                            <div className="text-sm text-gray-500">
                                {imob.falhas} falhas em {imob.totalExtracoes} extrações
                            </div>
                        )}

                        {/* Exibir tabela de falhas quando a imobiliária for selecionada */}
                        {imobiliariaSelecionada === imob.nome && (
                            <div className="mt-4">

                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border">Data</th>
                                            <th className="px-4 py-2 border">Falhas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {imob.dadosFalhas.map((falha, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 border">{falha.data}</td>
                                                <td className="px-4 py-2 border">{falha.motivo}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FailsExtractionTracker;

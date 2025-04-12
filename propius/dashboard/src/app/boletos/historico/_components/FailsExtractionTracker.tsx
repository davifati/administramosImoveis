import { AlertCircle } from "lucide-react";
import { EstatisticaImobiliaria, EstatisticasFalhasProps } from "../../_abstract/boletos";


interface FailsExtractionTrackerProps extends EstatisticasFalhasProps {
    data: EstatisticaImobiliaria[];
}

const FailsExtractionTracker = ({
    titulo = "Estatísticas de Falhas",
    mostrarTotal = true,
    data,
}: FailsExtractionTrackerProps) => {
    const dadosOrdenados = [...data].sort((a, b) => b.taxaFalha - a.taxaFalha);

    return (
        <div className="w-full bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h2 className="text-2xl font-semibold">{titulo}</h2>
            </div>
            <div className="space-y-4 mt-4">
                {dadosOrdenados.map((imob) => (
                    <div key={imob.nome} className="space-y-2">
                        <div className="flex justify-between items-center">
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FailsExtractionTracker;

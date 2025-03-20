
import { falhasBotsImobiliaria } from "@/data/boletosFalhosPorcetagem";
import AlertaFalhasDiarias from "./_components/DailyFails";

const PaginaVisaoDiaria = () => {
    const dataVisaoDiaria = "2025-03-10"; // Exemplo de data para verificação

    return (
        <div className="p-6">
            <AlertaFalhasDiarias data={dataVisaoDiaria} dados={falhasBotsImobiliaria} />
        </div>
    );
};

export default PaginaVisaoDiaria;

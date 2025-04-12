import { getDateNow } from "@/app/utils";
import DailyTableExecutionStatus from "./_components/TableExecutionStatus";
import { Divider } from "@/components/Divider";
import { FalhaBoleto } from "../_abstract/boletos";
import AlertaFalhasDiarias from "./_components/DailyFailureCard";


const mockFalhas: FalhaBoleto[] = [
    {
        nome: "Imobiliária Alpha",
        dadosFalhas: [
            { data: "2025-04-12", motivo: "Erro de autenticação" },
        ],
    },
    {
        nome: "Imobiliária Beta",
        dadosFalhas: [
            { data: "2025-04-11", motivo: "Página fora do ar" },
        ],
    },
    {
        nome: "Imobiliária Gama",
        dadosFalhas: [],
    },
]

const DailyMonitorBoletoPage = () => {

    const today = getDateNow()

    return (
        <div>
            <AlertaFalhasDiarias data={today} />
            <Divider className="my-10" />
            <DailyTableExecutionStatus />
        </div>
    );
};

export default DailyMonitorBoletoPage;

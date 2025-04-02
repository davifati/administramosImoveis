export const dynamic = 'force-static';
import { getDateNow } from "@/app/utils";
import AlertaFalhasDiarias from "./_components/DailyFailureCard";
import DailyTableExecutionStatus from "./_components/TableExecutionStatus";


const PaginaVisaoDiaria = () => {

    const today = getDateNow()

    return (
        <div>
            <AlertaFalhasDiarias data={today} />
            <div className="mb-6" /> {/* Adiciona um espaço entre os componentes */}
            <DailyTableExecutionStatus />
        </div>
    );
};

export default PaginaVisaoDiaria;

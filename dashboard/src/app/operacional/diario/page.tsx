export const dynamic = 'force-static';
import AlertaFalhasDiarias from "./_components/DailyFailureCard";
import DailyTableExecutionStatus from "./_components/TableExecutionStatus";


const PaginaVisaoDiaria = () => {
    const dataAtual = "2025-03-31";

    return (
        <div>
            <AlertaFalhasDiarias data={dataAtual} />
            <div className="mb-6" /> {/* Adiciona um espaço entre os componentes */}
            <DailyTableExecutionStatus />
        </div>
    );
};

export default PaginaVisaoDiaria;

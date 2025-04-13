import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import HistoricalExtractionCalendar from "./_components/HistoricalExtractionCalendar";
import { getExtractionMonthlyStats, getFailsExtractionTracker, getHistoricalExtractionCalendar } from "../_api/historico";
import FailsExtractionTracker from "./_components/FailsExtractionTracker";
import { Divider } from "@/components/Divider";
import ErrosChart from "./_components/ErrorsCharts";
import { EstatisticaImobiliaria, MonthlyStats } from "../_abstract/boletos";


dayjs.locale("pt-br");


const HistoricalMonitorBoletoPage = async () => {

    const historicalExtractions = await getHistoricalExtractionCalendar();
    const monthlyBoletosExtractionFails: MonthlyStats[] = await getExtractionMonthlyStats()
    const totallyFailsExtractionTracker: EstatisticaImobiliaria[] = await getFailsExtractionTracker()

    console.log("@@@ ", totallyFailsExtractionTracker)

    return (
        <div className="p-4">
            <HistoricalExtractionCalendar extracoes={historicalExtractions} />

            <Divider className="my-10" />

            <FailsExtractionTracker data={totallyFailsExtractionTracker} mostrarTotal />

            <Divider className="my-10" />

            <ErrosChart data={monthlyBoletosExtractionFails} />
        </div>
    );
};


export default HistoricalMonitorBoletoPage;
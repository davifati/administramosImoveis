import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import HistoricalExtractionCalendar from "./_components/HistoricalExtractionCalendar";
import { getHistoricalExtractionCalendar } from "../_api/historico";
import FailsExtractionTracker from "./_components/FailsExtractionTracker";
import { Divider } from "@/components/Divider";
import ErrosChart from "./_components/ErrorsCharts";

dayjs.locale("pt-br");

const FinanceiroHistoricoPage = async () => {

    const historicalExtractions = await getHistoricalExtractionCalendar();

    return (
        <div className="p-4">
            <HistoricalExtractionCalendar extracoes={historicalExtractions} />

            <Divider className="my-10" />

            <FailsExtractionTracker />

            <Divider className="my-10" />

            <ErrosChart />
        </div>
    );
};


export default FinanceiroHistoricoPage;
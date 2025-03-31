"use client"

import { Divider } from "@/components/Divider"
import HistoricalExtractionCalendar from "./_components/HistoricalExtractionCalendar"
import FailsExtractionTracker from "./_components/FailsExtractionTracker"
import ErrosChart from "./_components/ErrorsCharts"




export default function Historico() {
    return (
        <div>

            < HistoricalExtractionCalendar />
            <Divider className="my-10" />
            <FailsExtractionTracker />
            <Divider className="my-10" />
            <ErrosChart />



        </div>
    )
}

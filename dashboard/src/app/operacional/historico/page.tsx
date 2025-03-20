"use client"

import { Divider } from "@/components/Divider"
import HistoricalExtractionCalendar from "./_components/HistoricalExtractionCalendar"
import FailsExtractionTracker from "./_components/FailsExtractionTracker"




export default function Historico() {
    return (
        <div>

            < HistoricalExtractionCalendar />
            <Divider className="my-10" />
            <FailsExtractionTracker />


        </div>
    )
}

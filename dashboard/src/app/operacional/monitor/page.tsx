"use client"
export const dynamic = 'force-static';


import { Divider } from "@/components/Divider"

import DailyExtractionMonitor from "./_components/DailyExtraction"
import DailyExtractionCalendar from "../historico/_components/HistoricalExtractionCalendar"
import BotExecutionMonitor from "../historico/_components/BotMonitorTracker"



export default function Monitor() {
  return (
    <div>

      < DailyExtractionCalendar />
      <Divider className="my-10" />
      <BotExecutionMonitor />
      <Divider className="my-10" />
      <DailyExtractionMonitor />



    </div>
  )
}

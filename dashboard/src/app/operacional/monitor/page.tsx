"use client"

import { Divider } from "@/components/Divider"
import BotExecutionMonitor from "./_components/BotMonitorTracker"
import ErrorTrackingCard from "./_components/BotErrorCard"

export default function Monitor() {
  return (


    <div>

      < ErrorTrackingCard />
      <Divider className="my-10" />
      <BotExecutionMonitor />

    </div>

  )
}

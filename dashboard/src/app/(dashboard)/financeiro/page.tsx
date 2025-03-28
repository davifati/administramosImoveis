import Example from "./_components/Area2"
import AreaBillGraph from "./_components/AreaChartBillMoney"
import ErrosChart from "./_components/ErrorsCharts"
import Header from "./_components/Header"
import KPI2 from "./_components/KPi2"
import KPIOverview from "./_components/KPIOverview"
import Kpizinho from "./_components/Kpizinho"

export default function Page() {
  return (
    <>
      <Header />
      <section className="my-8">
        <div className="space-y-12">

          < KPIOverview />
          < KPI2 />

          < Kpizinho />
          < Example />

          <ErrosChart />

        </div>
      </section>
    </>
  )
}

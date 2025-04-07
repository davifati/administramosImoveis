import BoletoAreaGraph from "./_components/BoletoAreaGraph"
import RankingBoletos from "./_components/RankingBills"
import RemessaGenerator from "./_components/RemessaBancaria";
import StatusKPI from "./_components/StatusKPIMensal"

export default function Page() {
  return (

    <section className="my-8">
      <div className="space-y-12">

        < RankingBoletos />
        < StatusKPI />
        < BoletoAreaGraph />
        < RemessaGenerator />

      </div>
    </section>

  )
}

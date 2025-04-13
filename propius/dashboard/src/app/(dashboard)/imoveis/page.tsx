import { getImoveis } from "./_api/getImoveis";
import ImoveisTable from "./_components/table";

export default async function ImoveisPage() {
  const imoveis = await getImoveis();

  return <ImoveisTable data={imoveis} />;
}

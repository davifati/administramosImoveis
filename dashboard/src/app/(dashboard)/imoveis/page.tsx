"use client";

import { mockFullImoveisInfo } from "@/mock/imoveis/imoveis";
import ImoveisTable from "./_components/table";


export default function ImoveisPage() {
  return <ImoveisTable data={mockFullImoveisInfo} />;
}

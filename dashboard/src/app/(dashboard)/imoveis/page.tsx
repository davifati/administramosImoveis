"use client";

import { mockFullImoveisInfo } from "@/mock/imoveis/imoveis";
import ImoveisTable from "./_components/table";


export default function ImoveisPage() {
  return <ImoveisTable data={mockFullImoveisInfo} />;
}


// TODO: TESTAR BOTOES DE PAGINACAO
// TODO: MELHORAR TELA DE MODAL
// TODO: OPCAO DE MANIPULACAO: EDICAO, DELECAO..
// TODO: BOTAO DE EXPORTAR CSV - ok
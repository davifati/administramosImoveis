"use client";

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { usePathname } from "next/navigation"; // Para obter o pathname da URL
import Link from "next/link"; // Usando o Next.js Link
import { mockImoveis } from "@/mock/imoveis/imoveis";
import ImoveisTable from "./_components/table"; // Componente que renderiza a tabela
import React from "react";

const navigationSettings = [
  { name: "Visão Geral", href: "/imoveis/visao-geral" },
  { name: "Detalhes do Imóvel", href: "/imoveis/detalhes" },
  { name: "Captura de Boletos", href: "/imoveis/cronograma-boletos" },
];


export default function ImoveisLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Obtendo o pathname da URL atual

  // Função para renderizar a tabela com base no pathname (aba ativa)
  const renderTable = () => {
    return <ImoveisTable data={mockImoveis.administradora} />;
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:rounded-lg lg:border lg:border-gray-200 dark:bg-gray-925 lg:dark:border-gray-900">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        Ativos Imobiliários
      </h1>

      {/* Barra de navegação com abas */}
      <TabNavigation className="mt-6">
        {navigationSettings.map((item) => (
          <TabNavigationLink
            key={item.name}
            asChild
            active={pathname === item.href}
            className="px-5"
          >
            <Link href={item.href}>{item.name}</Link>
          </TabNavigationLink>
        ))}
      </TabNavigation>

      {/* Exibição do conteúdo da tabela baseado na navegação */}
      <div className="pt-6">{renderTable()}</div>
      {/* Aqui, o children seria o conteúdo adicional que você quiser colocar na página */}
      {children}
    </div>
  );
}

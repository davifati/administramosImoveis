"use client";
export const dynamic = 'force-static';

import React from "react";
import { cx } from "@/lib/utils";
import { Sidebar } from "@/components/ui/navigation/Sidebar";
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

const navigationSettings = [
  { name: "Visão Geral", href: "/imoveis" },
];

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <main
        className={cx(
          isCollapsed ? "lg:pl-[60px]" : "lg:pl-64",
          "ease transform-gpu transition-all duration-100 will-change-transform lg:bg-gray-50 lg:py-3 lg:pr-3 lg:dark:bg-gray-950"
        )}
      >
        <div className="bg-white p-4 sm:p-6 lg:rounded-lg lg:border lg:border-gray-200 dark:bg-gray-925 lg:dark:border-gray-900">
          <Header title="Ativos Imobiliários" />


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

          <div className="pt-6">{children}</div>
        </div>
      </main>
    </div>
  );
}

import { MenuClient } from "@/components/common/menu-client";
import { Resumo } from "@/components/section/overview";
import '../styles/globals.css';

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-[#a8d5ba] to-[#006e8e] min-h-screen">
      <MenuClient />
      <Resumo />
    </div>
  );
}

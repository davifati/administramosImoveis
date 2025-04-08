"use client"


import { useEffect, useState } from "react";
import ImoveisTable from "./_components/table";
import { getImoveis } from "./_api/getImoveis";
import { IImovel } from "./_abstract/imoveis";
import { FaSpinner } from 'react-icons/fa';


export default function ImoveisPage() {

  const [imoveis, setImoveis] = useState<IImovel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const data = await getImoveis();
        //@ts-ignore
        setImoveis(data);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, []);

  if (loading) return <div><FaSpinner className="animate-spin text-2xl text-blue-500" /></div>;

  return <ImoveisTable data={imoveis} />;

}


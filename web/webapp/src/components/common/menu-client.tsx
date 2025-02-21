import { FaBell, FaCalendarAlt, FaCog, FaKey } from 'react-icons/fa';  // Importando ícones do react-icons
import { format } from 'date-fns';  // Biblioteca para formatar a data
import Link from 'next/link';
import Image from 'next/image';



export function MenuClient() {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy');  // Formata a data para 'dia/mês/ano'

    return (
        <nav className="bg-black shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center rounded-xl m-4">
                <div className="flex items-center">
                    <Link href="/" passHref>
                        <Image
                            src="/images/Logohorizontalpng.png"
                            alt="Logo Administramos Imóveis"
                            className="h-8 w-auto object-contain"
                            width={150}
                            height={40}
                        />
                    </Link>
                </div>

                <ul className="flex flex-wrap justify-center space-x-6">
                    <li>
                        <Link href="/resumo" passHref>
                            <span className="text-white font-bold hover:text-blue-500 cursor-pointer whitespace-nowrap">
                                Resumo
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="financeiro" passHref>
                            <span className="text-white font-bold hover:text-blue-500 cursor-pointer whitespace-nowrap">
                                Financeiro
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/futuros" passHref>
                            <span className="text-white font-bold hover:text-blue-500 cursor-pointer whitespace-nowrap">
                                Futuros
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/imoveis" passHref>
                            <span className="text-white font-bold hover:text-blue-500 cursor-pointer whitespace-nowrap">
                                Imóveis
                            </span>
                        </Link>
                    </li>

                </ul>

                {/* Informações e Ícones à Direita */}
                <div className="flex space-x-6 items-center">
                    {/* Ícone de agenda com data */}
                    <div className="flex items-center text-white">
                        <FaCalendarAlt className="text-xl mr-2" />
                        <span className="font-semibold">Última atualização: {formattedDate}</span>
                    </div>

                    {/* Ícone de configurações */}
                    <div className="flex items-center text-white">
                        <FaCog className="text-xl mr-2" />
                    </div>

                    <div className="flex items-center text-white">
                        <FaBell className="text-xl mr-2" />
                    </div>

                    {/* Ícone de chave */}
                    <div className="flex items-center text-white">
                        <FaKey className="text-xl mr-2" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

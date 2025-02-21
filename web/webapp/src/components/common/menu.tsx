import Link from 'next/link';
import Image from 'next/image';


export function Menu() {
    return (
        <nav className="bg-black shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center rounded-xl m-4">
                {/* Logo à Esquerda */}
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

                {/* Navegação Centralizada */}
                <ul className="flex flex-wrap justify-center space-x-6">
                    <li>
                        <Link href="/funcionalidades" passHref>
                            <span className="text-white font-bold hover:text-blue-500 cursor-pointer whitespace-nowrap">
                                Funcionalidades
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/casos-de-sucesso" passHref>
                            <span className="text-white font-bold hover:text-blue-500 cursor-pointer whitespace-nowrap">
                                Casos de Sucesso
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" passHref>
                            <span className="text-white font-bold hover:text-blue-500 cursor-pointer whitespace-nowrap">
                                Blog
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/sobre" passHref>
                            <span className="text-white font-bold hover:text-blue-500 cursor-pointer whitespace-nowrap">
                                Sobre
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/fale-conosco" passHref>
                            <span className="text-white font-bold hover:text-blue-500 cursor-pointer whitespace-nowrap">
                                Fale Conosco
                            </span>
                        </Link>
                    </li>
                </ul>

                {/* Botões à Direita */}
                <div className="flex space-x-4">
                    <Link href="/entrar" passHref>
                        <span className="border-2 border-blue-500 text-blue-500 font-bold px-4 py-2 rounded-xl hover:bg-blue-700 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer">
                            🔑 Entrar
                        </span>
                    </Link>
                    <Link href="/experimente-agora" passHref>
                        <span className="bg-blue-500 text-white font-bold px-4 py-2 rounded-xl hover:bg-blue-700 whitespace-nowrap cursor-pointer">
                            Experimente Agora
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}





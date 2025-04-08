import Link from 'next/link';
import { siteConfig } from "@/app/siteRotas";



export const CallToActionButtons = () => {
    return (
        <div className="mt-8 flex gap-4 justify-center">
            {/* Botão para "Área do Cliente" */}
            <Link
                href={siteConfig.baseLinks.login}
                className="px-8 py-4 text-lg font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
            >
                Testar Grátis
            </Link>

            {/* Botão para "Área Administrador" */}
            <Link
                href={siteConfig.baseLinks.admin}
                className="px-8 py-4 text-lg font-medium text-center text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300"
            >
                Falar com Especialista
            </Link>
        </div>
    );
};

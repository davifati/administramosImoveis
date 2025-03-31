import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Container } from "./Container";
import { siteConfig } from "@/app/siteRotas";

export function Footer() {

  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-medium text-blue-500 dark:text-gray-100"
              >
                <Image
                  src="/img/propius_logo.png"
                  alt="Logo"
                  width="32"
                  height="32"
                  className="w-8"
                />
                <span>Propius</span>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
              Propius é a plataforma que simplifica a gestão de débitos de imóveis e imobiliárias: Monitore, Pague Boletos e mantenha o histórico de forma descomplicada.
            </div>
          </div>

          {/* Botões de ação agora na parte direita */}
          <div className="lg:col-span-3 flex flex-col justify-start lg:justify-center gap-4 mt-8 lg:mt-0">
            <div className="flex gap-4 justify-start lg:justify-end">

              {/* Botão para "Área do Cliente" */}
              <Link
                href={siteConfig.baseLinks.login}
                className="px-8 py-4 text-sm font-small text-center text-white bg-blue-600 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Entrar
              </Link>

              {/* Botão para "Falar com Especialista" */}
              <Link
                href={siteConfig.whatsappTellUs}
                className="px-8 py-4 text-sm font-small text-center text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300"
              >
                Falar com Especialista
              </Link>
            </div>
          </div>

        </div>

        <div className="my-10 text-sm text-left text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()} All rights reserved.
        </div>
      </Container>
    </div>
  );
}

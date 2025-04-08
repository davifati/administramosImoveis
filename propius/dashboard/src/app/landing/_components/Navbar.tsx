"use client";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const navigation = ["Funcionalidades", "Sobre", "Atendimento"];

  return (
    <nav className="container mx-auto px-6 lg:px-12 py-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 items-center">
        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-2 text-2xl font-medium text-blue-500 dark:text-gray-100">
          <Image src="/img/propius_logo.png" width={32} height={32} alt="Logo Propius" />
          <span>Propius</span>
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden lg:flex justify-center gap-6">
          {navigation.map((item, index) => (
            <li key={index}>
              <Link
                href="/"
                className="text-lg font-normal text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botões e Tema */}
        <div className="flex justify-end items-center gap-4 lg:ml-auto">
          <ThemeChanger />
          <Link href="/financeiro" className="px-6 py-2 text-white bg-blue-600 rounded-md">
            Entrar
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_API_HOST}/admin`}
            className="px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            Área Administrador
          </Link>
        </div>

        {/* Mobile Menu */}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="lg:hidden flex justify-end col-span-2 text-gray-500 dark:text-gray-300">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  {open ? (
                    <path d="M18.278 16.864a1 1 0 01-1.414 1.414L12 12l-4.864 4.864a1 1 0 11-1.414-1.414L10.586 12 6.722 7.136a1 1 0 111.414-1.414L12 10.586l4.864-4.864a1 1 0 011.414 1.414L13.414 12l4.864 4.864z" />
                  ) : (
                    <path d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 110-2z" />
                  )}
                </svg>
              </Disclosure.Button>

              <Disclosure.Panel
                as={motion.div}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="lg:hidden col-span-2 flex flex-col items-center gap-4 py-4"
              >
                {navigation.map((item, index) => (
                  <Link key={index} href="/" className="text-lg text-gray-800 dark:text-gray-200">
                    {item}
                  </Link>
                ))}
                <Link href="/login" className="px-6 py-2 mt-2 text-white bg-indigo-600 rounded-md">
                  Entrar
                </Link>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </nav>
  );
};

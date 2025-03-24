"use client"

import { Button } from "@/components/Button"
import { Divider } from "@/components/Divider"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Logo } from "@/components/ui/Logo"
import { RiGoogleFill } from "@remixicon/react"
import { useRouter } from "next/navigation"
import React from "react"
import { saasName } from "../constant"
import { siteConfig } from "../siteRotas"

export default function Login() {

  const [loading, setLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setTimeout(() => {
      console.log("Form submitted")
      router.push(siteConfig.baseLinks.monitor.dailyView)
    }, 1200)
  }

  const router = useRouter()

  return (
    <div className="flex min-h-dvh items-center justify-center p-4 sm:p-6">
      <div className="flex w-full flex-col items-start sm:max-w-sm">

        <div className="relative flex items-center justify-center rounded-lg bg-white p-3 shadow-lg ring-1 ring-black/5">
          <Logo
            className="size-8 text-blue-500 dark:text-blue-500"
            aria-label="Insights logo"
          />
        </div>

        <div className="mt-6 flex flex-col">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Entre em {saasName}
          </h1>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            Não possui conta?{" "}
            <a
              className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-400"
              href="#"
            >
              Cadastre-se
            </a>
          </p>
        </div>

        <div className="mt-10 w-full">
          <div className="gap-2 sm:flex sm:flex-row sm:items-center">
            <Button asChild variant="secondary" className="mt-2 w-full sm:mt-0">
              <a href="#" className="inline-flex items-center gap-2">
                <RiGoogleFill className="size-4" aria-hidden="true" />
                Entrar com Google
              </a>
            </Button>
          </div>
          <Divider className="my-6">ou</Divider>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-y-6"
          >
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email-form-item" className="font-medium">
                  Email
                </Label>
                <Input
                  type="email"
                  autoComplete="email"
                  name="email"
                  id="email-form-item"
                  placeholder="nome@gmail.com"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password-form-item" className="font-medium">
                  Senha
                </Label>
                <Input
                  type="password"
                  autoComplete="current-password"
                  name="password"
                  id="password-form-item"
                  placeholder="senha123"
                />
              </div>
            </div>

            <Button
              type="submit"
              isLoading={loading}
            >
              {loading ? "" : "Continue"}
            </Button>
          </form>
        </div>
        <Divider />
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Esqueceu a senha?{" "}
          <a
            className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-400"
            href="#"
          >
            Redefinir Senha
          </a>
        </p>
      </div>
    </div>
  )
}

"use client"
export const dynamic = 'force-static';

import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { RiGoogleFill } from "@remixicon/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { siteConfig } from "../siteRotas";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login/entrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login bem-sucedido:", data);

        router.push(siteConfig.baseLinks.monitor.dailyView);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro desconhecido");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Erro ao conectar-se com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center p-4 sm:p-6">
      <div className="flex w-full flex-col items-start sm:max-w-sm">
        .        <div className="mt-6 flex flex-col">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Entre em {siteConfig.name}
          </h1>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            Não possui conta?{" "}
            <a
              className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-400"
              href="/login/cadastre-se"
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
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" isLoading={loading}>
              {loading ? "Carregando..." : "Entrar"}
            </Button>
          </form>

          {error && (
            <div className="mt-4 text-red-500 text-sm">
              <p>{error}</p>
            </div>
          )}
        </div>

        <Divider />
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Esqueceu a senha?{" "}
          <a
            className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-400"
            href="login/redefinicao-senha"
          >
            Redefinir Senha
          </a>
        </p>
      </div>
    </div>
  );
}

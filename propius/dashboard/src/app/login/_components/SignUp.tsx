"use client"
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { RiGoogleFill } from "@remixicon/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/siteRotas";
import { Divider } from "@tremor/react";


export const SignUpForm = () => {
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
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Cadastro bem-sucedido:", data);
                router.push(siteConfig.baseLinks.monitor.dailyView);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Erro desconhecido");
            }
        } catch (err) {
            console.error("Erro ao cadastrar:", err);
            setError("Erro ao conectar-se com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        // Aqui você pode integrar a API de autenticação do Google
        console.log("Cadastro via Google");
    };

    return (
        <div className="flex min-h-dvh items-center justify-center p-4 sm:p-6">
            <div className="flex w-full flex-col items-start sm:max-w-sm">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Criar Conta
                </h1>

                <div className="mt-6 w-full">
                    <Button asChild variant="secondary" className="mt-2 w-full sm:mt-0">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2"
                            onClick={handleGoogleSignUp}
                        >
                            <RiGoogleFill className="size-4" aria-hidden="true" />
                            Cadastre-se com Google
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
                                name="password"
                                id="password-form-item"
                                placeholder="senha123"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button type="submit" isLoading={loading}>
                        {loading ? "Carregando..." : "Cadastrar"}
                    </Button>

                    {error && (
                        <div className="mt-4 text-red-500 text-sm">
                            <p>{error}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

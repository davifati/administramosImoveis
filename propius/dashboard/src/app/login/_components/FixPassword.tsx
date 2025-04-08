"use client"


import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const ResetPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/password/reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                router.push("/login"); // Redireciona após sucesso
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Erro desconhecido");
            }
        } catch (err) {
            console.error("Erro ao redefinir senha:", err);
            setError("Erro ao conectar-se com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-dvh items-center justify-center p-4 sm:p-6">
            <div className="flex w-full flex-col items-start sm:max-w-sm">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Redefinir Senha
                </h1>

                <form onSubmit={handleSubmit} className="mt-6 w-full flex flex-col gap-y-4">
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

                    <Button type="submit" isLoading={loading}>
                        {loading ? "Enviando..." : "Enviar Instruções"}
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

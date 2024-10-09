"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPasswordRequest } from "@/service/auth"; // Você precisará implementar essa função

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await forgotPasswordRequest({ email });
      window.alert(
        "Instruções para redefinir a senha foram enviadas para o seu e-mail."
      );
      router.push("/login"); // Redireciona para a página de login ou outra página apropriada
    } catch (error) {
      console.error("Falha ao enviar o e-mail de redefinição de senha:", error);
      window.alert(
        "Erro ao enviar o e-mail de redefinição de senha. Tente novamente."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[300px] bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Esqueceu a Senha?</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-[#0056B3] w-full hover:bg-[#0057b39f]"
          >
            Enviar Instruções
          </Button>
        </form>
      </div>
    </div>
  );
}

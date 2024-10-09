"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[600px] bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Esqueceu a Senha?</h1>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="m@example.com"
              required
            />
          </div>
          <div className="flex flex-col gap-4 items-center justify-center w-full">
          <Button type="submit" className="bg-[#0056B3] w-[200px] hover:bg-[#0057b39f] ">Enviar Instruções</Button>
          <span className="text-sm cursor-pointer text-[#A6A6A6]">Esqueceu sua senha? <span className="underline" >Clique aqui</span></span>
</div>
          
            
         
        </form>
      </div>
    </div>
  );
}

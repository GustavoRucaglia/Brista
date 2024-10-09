"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import { loginRequest, RegisterRequest } from "@/service/auth";
import { useRouter } from 'next/navigation';

  export  default  function RegisterPage(){
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('USER');
  const router = useRouter();

  const auth = localStorage.getItem('token');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(auth){
         localStorage.removeItem('token');
      }
      await RegisterRequest({ login, password, role });
      await loginRequest({ login, password });
      router.push('/'); 
    } catch (error) {
      console.error('Falha no registro:', error);
    }
  };

  return (
    <div className="flex h-screen pt-20 justify-center">
    <Card className="w-full max-w-sm px-10 h-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastrasse</CardTitle>
          <CardDescription>
              Crie uma conta no Brazurista
          </CardDescription>
      </CardHeader>
      <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-8">
              <div className="grid gap-2">
                <Label htmlFor="login">Email</Label>
                <Input id="login" value={login} onChange={(e) => setLogin(e.target.value)} type="email" name="login" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password"  type="password" required />
                <br />
              </div>
              <Button className="w-full" type="submit">Enviar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};



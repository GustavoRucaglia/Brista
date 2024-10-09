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
import { useRouter } from 'next/navigation';
import { loginRequest, RegisterRequest } from "@/service/auth";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { persistentAtom, tokenAtom } from "@/context/Atom";
import { useAtom, useSetAtom } from "jotai";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

  export  function CadastroPage({handleCloseDialog2 }: any) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [telefone, setTelefone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [role] = useState('USER');
    const router = useRouter();
    const [error, setError] = useState(false);
    const setUser = useSetAtom(persistentAtom);
    const [token, setToken] = useAtom(tokenAtom);

    const controls = useAnimation();
  
    const auth = localStorage.getItem('token');
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if(auth){
           localStorage.removeItem('token');
        }
        await RegisterRequest({ login, password, role, name, telefone });
        const data = await loginRequest({ login, password });
        setUser(data.user);
        setToken(data.token);
        router.push('/'); 
      } catch (error) {
        console.error('Falha no registro:', error);
        setError(true);
      }
      handleCloseDialog2()
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newConfirmPassword = e.target.value;
      setConfirmPassword(newConfirmPassword);
      const isMatch = password === newConfirmPassword;
      setPasswordsMatch(isMatch);
  
      if (!isMatch) {
        // Aciona a animação de balançar e mudar a borda para vermelha quando as senhas não coincidem
        controls.start({
          x: [0, -10, 10, -10, 10, -5, 5, 0],
          transition: { duration: 0.5 }
        });
      }
    };
    

  return (
        <div className="flex">
          <AnimatePresence>
              {error && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="fixed -top-[150px] left-0 right-0 z-50 w-full p-4"
          >
              <Alert variant="destructive" className="bg-destructive text-white shadow-lg rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>
                   Email já cadastrado
                </AlertDescription>
              </Alert>
              </motion.div>
          
            )}
            </AnimatePresence>
        <div className="w-[290px] flex items-center">
          <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-7">
            <h1 className="font-bold text-3xl">Crie sua conta</h1>
              <div className="grid gap-2 w-[300px]">
                <Label htmlFor="nome">Nome</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} type="nome" name="nome" placeholder="Nome de Usuário" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="login">Email</Label>
                <Input id="login" value={login} onChange={(e) => setLogin(e.target.value)} type="email" name="login" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
              <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} name="telefone"  type="telefone" placeholder="+55 (00) 00000-0000" required />
            
              </div>
              <div className="grid gap-2">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" value={password} onChange={(e) => setPassword(e.target.value)} name="password"  type="senha" placeholder="*******" required />
            
              </div>
              <div className="grid gap-2">
              <Label htmlFor="confirmar-senha">Confirme a senha</Label>
              <motion.input
                  id="confirmar-senha"
                  defaultValue={confirmPassword}
                  onBlur={handleConfirmPasswordChange}
                  name="confirmPassword"
                  type="password"
                  placeholder="*******"
                  required
                  animate={controls}
                  className={`flex h-10 w-full rounded-md  border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                />
                { !passwordsMatch && <p className="text-red-500">As senhas devem ser iguais</p> }
                
              </div>
              <div className="flex flex-col gap-4 items-center justify-center w-full">
              <Button className="bg-[#0056B3] w-[200px] hover:bg-[#0057b39f] " type="submit">Cadastre-se</Button>
           </div>
          </form>
          </CardContent>
          </div>
          <div className="w-[350px] h-[605.8px] bg-[#0056B3] absolute -top-[2.5px] -right-2 rounded-e-2xl text-white flex flex-col justify-center items-center">
          <Link href='/'>
            <Image src='/Brazurista.png' width='220' height='280' alt='logo' />
          </Link>
          </div>
       </div>
  );
};



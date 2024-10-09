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
import { loginRequest } from "@/service/auth";
import { useRouter } from 'next/navigation';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom, tokenAtom, persistentAtom, RoleAtom } from '@/context/Atom';
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { AnimatePresence, motion} from "framer-motion";
import { AlertCircle, Lock, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

  export  function LoginPage({handleCloseDialog, openDialog2, openDialog3}: any) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useAtom(tokenAtom);
  const [ role, setRole] = useAtom(RoleAtom);
  const [block, setBlock] = useState(false);
  const [FormValid, setFormValid] = useState(false);
  const [error, setError] = useState(false);

  
  const validateForm = () => {
    const isValid = login.includes('@') && password.length >= 6;
    setFormValid(isValid);
  };

  if(error){
    setTimeout(() => {
      setError(false);
    }, 3000);
  }
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await loginRequest({ login, password });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setRole(data.role);
      router.push('/');
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError(true);
    }
  };

  const handlePopUp = () => {
    handleCloseDialog();
    openDialog2();
  };

  const handlePopUpForgot = () => {
    handleCloseDialog();
    openDialog3();
  };

  const animeBlock = (e: any) => {
    setBlock(true);

    setTimeout(() => {
      setBlock(false);
      
    }, 1000);
  }
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
                  Sua senha ou login estão incorretos, por favor tente novamente.
                </AlertDescription>
              </Alert>
              </motion.div>
          
            )}
            </AnimatePresence>
        <div className="h-[344.2px]">
          <CardContent className="w-full ">
            <form onSubmit={handleSubmit} className="grid gap-4 w-full">
              <h1 className="text-3xl font-bold">Login</h1>
                <div className="grid gap-2">
                    <Label htmlFor="login">Email</Label>
                    <Input id="login" value={login} onChange={(e) => setLogin(e.target.value)} type="email" name="login" placeholder="m@example.com" required onBlur={validateForm} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="********"  type="password" minLength={6} required onBlur={validateForm} />
                    <div onClick={handlePopUpForgot}>
                    <span className="text-sm cursor-pointer text-[#A6A6A6]">Esqueceu sua senha? <span className="underline" >Clique aqui</span></span>
                    </div>
                    <br/>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center w-full">
                <AnimatePresence mode="popLayout">
                        {!FormValid && !error && (
                        <motion.button 
                          animate={block ? { backgroundColor: "#3f4346", border: "2px solid red", x: [0, 10, -10, 10, -10, 0] } : { backgroundColor: "#3f4346", x: 0, border: "2px solid #3f434600" }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          type="submit"
                          onClick={animeBlock}
                          exit={{ opacity: 0 }} 
                          className="inline-flex pt-[6.5px] justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#3f4346] h-8 w-[200px] text-white"
                          style={{ position: 'relative' }}
                          key={"block"}
                        >
                         <Lock size={16} /> Entrar
                        </motion.button>
                      )}
                      {FormValid && !error && (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          type="submit"
                          onClick={animeBlock}
                          key={"accept"}
                          exit={{opacity: 0 }}
                          className="inline-flex pt-[6.5px] justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#0056B3] h-8 w-[200px] text-white"
                        >
                          Entrar
                        </motion.button>
                      )}
                      {error && (
                        <motion.button 
                          animate={{ x:[0, 10, -10, 10, -10, 0]}}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          type="submit"
                          key={"error"}
                          onClick={animeBlock}
                          className="inline-flex pt-[6.5px] justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive h-8 w-[200px] text-white"
                        >
                          <X className="-mt-[2px]" /> <span>Login incorreto</span>
                        </motion.button>
                      )}
                  </AnimatePresence>
                <span className="text-sm cursor-pointer text-[#A6A6A6]" onClick={() => handlePopUp()}>Não tem uma conta? <span className="underline" >Clique aqui</span></span>
                </div>
            </form>
          </CardContent>
          </div>
          <div className="w-[350px] h-[395px] bg-[#0056B3] absolute -top-[2.5px] -right-2 rounded-e-2xl text-white flex flex-col justify-center items-center">
          <Link href='/'>
            <Image src='/Brazurista.png' width='180' height='240' alt='logo' />
          </Link>
          </div>
       </div>
  );
};



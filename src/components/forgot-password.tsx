"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginRequest, SendPassword } from "@/service/auth";
import { AlertCircle, LoaderIcon } from "lucide-react";
import { useAtom } from "jotai";
import { RoleAtom, tokenAtom } from "@/context/Atom";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AnimatePresence, motion } from "framer-motion";

export function ForgotPassword({ handleCloseDialog2 }: any) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [codeClient, setCodeClient] = useState("");
  const [token, setToken] = useAtom(tokenAtom);
  const [ role, setRole] = useAtom(RoleAtom);
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: SendPassword,
    onSuccess: (password1) => {
      const match = password1.match(/\{noop\}(\d+)\s*(\w+)/);

      if (match) {
        const codigo = match[2]; 
        const senha = match[1]
        console.log(codigo, senha);
        setPassword(senha);
        setCode(codigo);
        window.alert(
          "Instruções para redefinir a senha foram enviadas para o seu e-mail."
        );
      }
    },
    onError: (error) => {
      setErrorCode(true)
      console.error('Erro ao enviar o e-mail de redefinição de senha:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(login);

  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(codeClient !== code) {
      setError(true)
      return
    }
    try {
      const data = await loginRequest({ login, password });
      setToken(data.token)
      setRole(data.role)
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }
  console.log(codeClient, code, password)

  return (
    <div className="flex items-center">
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
                  Codigo invalido. Tente novamente.
                </AlertDescription>
              </Alert>
              </motion.div>
            )}
             {errorCode && (
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
                  Email invalido ou não cadastrado. Tente novamente.
                </AlertDescription>
              </Alert>
              </motion.div>
          
            )}
        </AnimatePresence>
      {mutation.isPending? (
        <div className="flex justify-center items-center w-full h-full">
          <LoaderIcon className="animate-spin" />
        </div>
      ) : password.length > 0 ? (
        <form
          onSubmit={handleSubmitLogin}
          className="flex w-full flex-col justify-center items-center gap-7"
        >
          <div>
            <h1 className="font-bold text-3xl text-center mb-2">
              {password ? "Coloque o código recebido" : "Esqueceu a Senha?"}
            </h1>
            <p className="text-sm text-[#A6A6A6] text-center max-w-[350px]">
              {!password
                ? "Não se preocupe, insira seu email e enviaremos as instruções para redefinir sua senha."
                : "Digite o código que você recebeu por email."}
            </p>
          </div>
          <div className="grid gap-2">
          <InputOTP maxLength={6} onChange={(value) => setCodeClient(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <Button
              className="bg-[#0056B3] w-[200px] hover:bg-[#0057b39f]"
              type="submit"
              disabled={mutation.isPending}
            >
              Enviar
            </Button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col justify-center items-center gap-7"
        >
          <div>
            <h1 className="font-bold text-3xl text-center mb-2">
              {password ? "Coloque o código recebido" : "Esqueceu a Senha?"}
            </h1>
            <p className="text-sm text-[#A6A6A6] text-center max-w-[350px]">
              {!password
                ? "Não se preocupe, insira seu email e enviaremos as instruções para redefinir sua senha."
                : "Digite o código que você recebeu por email."}
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="login">Email</Label>
            <Input
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              type="email"
              name="login"
              placeholder="brazurista@example.com"
            />
          </div>
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <Button
              className="bg-[#0056B3] w-[200px] hover:bg-[#0057b39f]"
              type="submit"
              disabled={mutation.isPending}
            >
              Enviar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

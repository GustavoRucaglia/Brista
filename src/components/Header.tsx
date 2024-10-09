"use client"

import Link from 'next/link';
import { Input } from './ui/input';
import { CircleUser, HandPlatter, Map, Search, Smartphone, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LoginPage } from './login';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { CadastroPage } from './cadastro';
import { useAtom } from 'jotai';
import { RoleAtom, tokenAtom, userAtom } from '@/context/Atom';
import { ForgotPassword } from './forgot-password';

export function Header(){
  let tabs = [
    { id: "explore", label: "explore", link: '/pontoTuristico' },
    { id: "restaurantes", label: "restaurantes", link: "/restaurantes" },
    { id: "app", label: "baixe nosso app", link: "https://play.google.com/store/apps/details?id=com.tripadvisor.tripadvisor&hl=pt-BR&referrer=utm_download_tracking=Brand_AppPage_0_63742" },
  ];

  const [token, setToken] = useAtom(tokenAtom);
  const [role, setRole] = useAtom(RoleAtom);
  const router = useRouter();
  const [query, setQuery] = useState('');
  let [activeTab, setActiveTab] = useState('');
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const pathname = usePathname();




  const handleOpenDialogCadastro = () => setIsOpen(true);
  const handleOpenForgot = () => setIsOpen1(true);
  const handleCloseDialog = () => setOpen(false);
  const handleCloseDialog2 = () => setIsOpen(false);
  const handleCloseDialog3 = () => setIsOpen1(false);
  

  const handleToken = () => {
    if (token) {
      localStorage.removeItem('token');
      setToken(null);
      
    }

    router.push('/');
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário
    if (query) {
      router.push(`/pontoTuristico?search=${query}`);
    }
  };

  if (pathname === '/perfil') {
    return <></>
  }
  return (
    <>
      <nav className='flex items-center justify-between py-4  bg-[#0056B3] h-24 px-10'>
      <div className='flex items-center gap-10'>
        <Link href='/'>
          <Image src='/Brazurista.png' width='180' height='220' alt='logo' />
        </Link>
        <div className='flex items-center relative'>
          <form onSubmit={handleSubmit}>
          <Input   
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          className='h-10 ml-4 w-[500px] rounded-xl' 
          placeholder='Encontre seu destino'
           />
          <button type="submit" className='hidden' /> 
          </form>
          <Search className='absolute right-4' color='blue' />
        </div>
      </div>
      { token ? (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='text-white rounded-full h-10 flex justify-center items-center w-10 border-2 border-white'>
            <User />
          </div>
        </DropdownMenuTrigger>
             <DropdownMenuContent>
             <Link href='/perfil'>
              <DropdownMenuItem>
                Perfil
              </DropdownMenuItem>
             </Link>
             {role === 'ADMIN' && <DropdownMenuItem>
               <Link href='/admin'>Admin</Link>
             </DropdownMenuItem>}
             <DropdownMenuItem>
               <span onClick={handleToken} className='cursor-pointer'>Sair</span>
             </DropdownMenuItem>
           </DropdownMenuContent>
      </DropdownMenu>
          ) : (
            <div>
              <Dialog  open={open} onOpenChange={setOpen}>
                <DialogTrigger className="bg-white h-10 text-black rounded-xl w-[120px]"> Faça login</DialogTrigger>
                <DialogContent className='min-w-[700px] min-h-[350px]'>
                  <LoginPage handleCloseDialog={handleCloseDialog} openDialog2={handleOpenDialogCadastro}  openDialog3={handleOpenForgot} />
                </DialogContent>
              </Dialog>
              <Dialog  open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="bg-white h-8 hidden text-black rounded-xl w-[150px]"> Faça login</DialogTrigger>
                <DialogContent className='min-w-[700px] min-h-[350px]'>
                  <CadastroPage handleCloseDialog2={handleCloseDialog2} />
                </DialogContent>
              </Dialog>
              <Dialog  open={isOpen1} onOpenChange={setIsOpen1}>
                <DialogTrigger className="bg-white h-8 hidden text-black rounded-xl w-[150px]"> Faça login</DialogTrigger>
                <DialogContent className='min-w-[700px] min-h-[350px]'>
                  <ForgotPassword handleCloseDialog2={handleCloseDialog3} />
                </DialogContent>
              </Dialog>
            </div>
          )}
      </nav>
      <div className='h-14 shadow-lg flex justify-center items-center mb-5'>
          <ul className='flex gap-12 max-w-[1200px] font-medium cursor-pointer'>
          {tabs.map((tab) => (
            <li key={tab.id} className="relative">
               <Link {...tab.id === 'app' && { target: '_blank' }} href={tab.link}>
              <div
                className='flex items-center gap-3 cursor-pointer relative uppercase'
                onMouseEnter={() => setActiveTab(tab.id)}
                onMouseLeave={() => setActiveTab('')}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {tab.id === 'explore' ? (
                  <Map />
                ) : tab.id === 'restaurantes' ? (
                  <HandPlatter />
                ) : (
                  <Smartphone />
                )}
               
                  {tab.label}
               
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-2 left-0 h-[0.2rem] bg-black"
                    style={{ width: '120%', transformOrigin: 'center' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: 'spring', duration: 0.7 }}
                  />
                )}
              </div>
              </Link>
            </li>
          ))}
          </ul>
      </div>
    </>
  );
}
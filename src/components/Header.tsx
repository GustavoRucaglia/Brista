import Link from 'next/link';
import { UserButton,  } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Input } from './ui/input';
import { Search, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';

const Header = async () => {
  const { userId } = auth();

  return (
    <>
      <nav className='flex items-center justify-between py-4  bg-[#0056B3] h-24 px-10'>
      <div className='flex items-center gap-10'>
        <Link href='/'>
          <Image src='/Brazurista.png' width='180' height='220' alt='logo' />
        </Link>
        <div className='flex items-center relative'>
          <Input className='h-10 ml-4 w-[500px] rounded-xl' placeholder='Encontre seu aqui destino' />
          <Search className='absolute right-4' color='blue' />
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='text-white rounded-full h-10 flex justify-center items-center w-10 border-2 border-white'>
            <User />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href='/sign-in'>Login</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/sign-up'>Cadastra-se</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </nav>
      <div className='h-14 border-b-[2px] border-[#EDEDED]  flex justify-center items-center mb-5 '>
          <ul className='flex gap-10 max-w-[1200px] font-medium'>
            <li>descobrir</li>
            <li>recomendado para você</li>
            <li><Link href="/restaurantes">Restaurantes e bares</Link></li>
            <li><Link href="/PontoTuristico">Para Turistar</Link></li>
            <li>Mais perto de você</li>
            <li>Baixe nosso app</li>
          </ul>
      </div>
    </>
  );
};

export default Header;
"use client"

import Link from 'next/link';
import { UserButton,  } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { LineChart, LogOut, Package, Package2, PanelLeft, RotateCw, Search, Settings, ShoppingCart, User, Users2, Home, User2, Bird, MapPinned, MessageSquareText } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';

const Header = () => {
  const directionHome = () => {
    window.location.href = "/"
  }

  const pathname = usePathname()

  return (
    <div className='flex w-full flex-col bg-muted/40'>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-24 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-blue-800 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Bird className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Brazurista</span>
          </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground   transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <MessageSquareText className="h-5 w-5" />
                <span className="sr-only">Comentários</span>
              </Link>
              <Link
                href="/admin"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${pathname === '/admin' ? 'text-accent-foreground  bg-accent' : 'text-muted-foreground ' } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <MapPinned className="h-5 w-5" />
                <span className="sr-only">Pontos de interrese</span>
              </Link>
              <Link
                href="/admin/usuarios"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  ${pathname === '/admin/usuarios' ? 'text-accent-foreground bg-accent' : 'text-muted-foreground ' } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Usuários</span>
              </Link>
              <Link
                href="/admin/dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analises</span>
              </Link>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 md:hidden"></div>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-muted/40 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:pl-32 sm:pr-10 sm:pt-5">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft  className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                   <Bird className="h-4 w-4 transition-all group-hover:scale-110" />
                   <span className="sr-only">Brazurista</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <MessageSquareText className="h-5 w-5" />
                  Comentários
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                   <MapPinned className="h-5 w-5" />
                   Pontos de interrese
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Usuários
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='relative ml-auto flex-1 md:grow-0'>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <User2 className="h-5 w-5" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={directionHome}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
    </div>
  );
};

export default Header;
'use client'

import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { ModalContactForm } from './ModalContactForm'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {

  const pathname = usePathname()
  const DirectionFaleconosco = () => {
     window.location.href = '/faleConosco'
  }
  if(pathname === '/perfil'){
    return null
  }
  return (
    <>
       <footer className="bg-[#0056B3] text-white py-12 flex items-center justify-center relative flex-wrap text-center">
      <div className="absolute left-12 top-1/2 transform -translate-y-1/2">
        <img src="brazurista.png" alt="Logo" className="w-[160px] h-[60px]" />
      </div>
      <nav className="flex gap-5 justify-center mx-auto px-5">
        <a href='/quem-somos' className="text-white bg-transparent px-5 py-2 rounded text-lg hover:text-[#cce5ff] hover:bg-white/20">
          Quem Somos
        </a>
        <a href="/faleConosco" className="text-white bg-transparent px-5 py-2 rounded text-lg hover:text-[#cce5ff] hover:bg-white/20">
          Fale Conosco
        </a>
        <a href="/politica-privacide" className="text-white bg-transparent px-5 py-2 rounded text-lg hover:text-[#cce5ff] hover:bg-white/20">
          Termos de Uso
        </a>
        <a href="mailto:brazurista@gmail.com" className="text-white bg-transparent px-5 py-2 rounded text-lg hover:text-[#cce5ff] hover:bg-white/20">
          Email: brazurista@gmail.com
        </a>
      </nav>
      <div className="text-[#c9cfd4] text-base mt-5 w-full">
        &copy; 2024 Brazurista. Todos os direitos reservados.
      </div>
    </footer>
    </>
  )
}
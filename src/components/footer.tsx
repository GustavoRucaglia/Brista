'use client'

import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { ModalContactForm } from './ModalContactForm'

export function Footer() {

  const DirectionFaleconosco = () => {
     window.location.href = '/faleConosco'
  }
  return (
    <>
      <section id="footer" className="w-full bg-[#0056B3] text-white">
        <div className="mx-auto max-w-[1200px] overflow-y-auto p-4 py-5 md:p-0 md:py-10">
          <div className="mx-auto flex max-w-screen-xl items-center justify-between">
          </div>
          <div className="mb-5">
            <nav className="py-4">
              <div className="mx-auto">
                <div className="flex flex-col items-start justify-start md:flex-row md:justify-between">
                  <div className="flex flex-col items-start md:flex-row">
                    <a
                      href="/#"
                      className="text-md mr-4 font-medium text-white hover:text-gray-200"
                    >
                      Sobre nos
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex flex-row items-start pb-5 md:pb-0">
                  <div className="flex cursor-pointer items-start" onClick={DirectionFaleconosco}>
                    <h2 className="text-5xl">Entre em contato </h2>
                    <ArrowUpRight size={20} />
                  </div>
            </div>
          </div>
          <div className="items center flex flex-col py-5 md:py-0">
            <div className="my-5 flex h-[1px] w-full justify-center self-center bg-zinc-300" />
            <div className="flex flex-col items-center justify-center text-sm font-light text-white md:flex-row md:justify-between">
              <div>
                <a href="" target="" rel="noopener noreferrer">
                  Copyright © 2010-2024
                </a>
              </div>
              <div className="flex gap-4">
                <a href="/privacy-policies" target="" rel="noopener noreferrer">
                  Política de privacidade
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
'use client'

import * as React from "react"
import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export function CarouselHome() {

  const router = useRouter();
  const handlePage = () => {
    router.push( '/pontoTuristico?search=Melhores%20Destinos' );
  };

  return (
   <div className="w-full mb-20 mx-auto max-w-[1200px]"  draggable={false}>
      <div className="ml-0" draggable={false}>
          <div key={1} className="ml-0"  draggable={false}>
            <div className="p-1">
              <Card>
                <CardContent className="flex h-[500px] ml-0 bg-[#42424267] relative w-[1200px] rounded-md">
                    <Image  src="/carroselPraia.jpg"  width='1200' height='400' alt='logo' className="rounded-md" />
                    <div className=" z-30 absolute bottom-10 left-10 text-white">
                      <span className="text-3xl font-bold mb-2">
                         Os melhores destinos do Brasil, você encontra aqui!
                      </span>
                      <br />
                      <span className="text-xl text-white font-semibold">
                        Conheça as atrações escondidas do Brasil
                      </span>
                      <br />
                      <Button className="mt-4 bg-white w-[150px] h-12 text-black rounded-3xl "      onClick={handlePage}>Conheça agora!</Button>
                      </div>
                    <div  className="absolute w-full h-full z-20 bg-[#42424240]"/>
                </CardContent>
              </Card>
            </div>
          </div>
      </div>
    </div>
  )
}

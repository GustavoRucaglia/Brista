"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"
import { PontoInterrese } from "@/utils/api-request"


export function Carrosel({ponto}: {ponto: PontoInterrese}) {

  const directExplore = () => {
    window.location.href = `/explore?id=${ponto.id}`
  }
  return (
    <>
    <div
      className="w-full mb-5"
    >
      <div className="flex gap-3">
          <div className="md:basis-1/2 lg:basis-1/4 w-full">
              <Card onClick={directExplore} className="w-full h-[300px]">
              <CardContent className="flex flex-col overflow-hidden h-full w-full aspect-square items-center justify-center">
                <div className="h-[400px] overflow-hidden w-full">
                <motion.div
                  className="relative h-full rounded-t-md  w-full cursor-pointer" 
                  style={{
                  backgroundImage: `url(${ponto.fotos})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }} initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} />
                </div>
                <div className="px-4 py-4">
                  <h1 className="semibold text-xl text-left">{ponto.nome.length > 20 ? `${ponto.nome.slice(0, 20)}...` : ponto.nome}</h1>
                  <span className="text-sm text-gray-600 text-left">{ponto.descricao.length > 25 ? `${ponto.descricao.slice(0, 25)}...` : ponto.descricao}</span>
                </div>
                </CardContent>
                </Card>
                </div>
      </div>
    </div>
    </>
  )
}

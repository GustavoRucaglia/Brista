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

interface CarouselDestinoProps {
  title: string,
  subTitle: string
}
export function CarouselDestinos({title, subTitle} : CarouselDestinoProps ) {

  const directExplore = () => {
    window.location.href = '/explore'
  }
  return (
    <>
    <h1 className="text-2xl font-semibold mb-5">{title}</h1>
    <p className="text-lg mb-5">{subTitle}</p>
    <br />
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mb-24"
    >
      <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
              <Card onClick={directExplore}>
                <CardContent className="flex aspect-square items-center justify-center">
                <div  style={{
                  backgroundImage: `url(https://segredosdeviagem.com.br/wp-content/uploads/2020/04/pelourinho-onde-ficar-salvador.jpg.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }} className="rounded-md h-full w-full cursor-pointer" />
                </CardContent>
                </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                <div  style={{
                  backgroundImage: `url(https://segredosdeviagem.com.br/wp-content/uploads/2014/09/Avenida_Paulista_S%C3%A3o_Paulo_2016_06-1536x1152.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }} className="rounded-md h-full w-full cursor-pointer" />
                </CardContent>
                </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                <div  style={{
                  backgroundImage: `url(https://segredosdeviagem.com.br/wp-content/uploads/2019/01/curitiba-jardim-botanico.jpg.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }} className="rounded-md h-full w-full cursor-pointer" />
                </CardContent>
                </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                <div  style={{
                  backgroundImage: `url(https://segredosdeviagem.com.br/wp-content/uploads/2018/08/recife-marco-zero-1536x585.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }} className="rounded-md h-full w-full cursor-pointer" />
                </CardContent>
              </Card>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                <div  style={{
                  backgroundImage: `url(https://segredosdeviagem.com.br/wp-content/uploads/2024/03/ver-o-peso-1024x576.jpeg.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }} className="rounded-md h-full w-full cursor-pointer" />
                </CardContent>
              </Card>
          </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </>
  )
}

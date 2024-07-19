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


export function Carrosel() {

  const directExplore = () => {
    window.location.href = '/explore'
  }
  return (
    <>
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
                  backgroundImage: `url(https://classic.exame.com/wp-content/uploads/2023/04/Melhores-Restaurantes_casadoporco.jpg?quality=70&strip=infop)`,
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
                  backgroundImage: `url(https://classic.exame.com/wp-content/uploads/2023/04/Melhores-Restaurantes_Lasai.jpg?quality=70&strip=info)`,
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
                  backgroundImage: `url(https://classic.exame.com/wp-content/uploads/2023/04/Melhores-Restaurantes_Manga.jpg?quality=70&strip=info)`,
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
                  backgroundImage: `url(https://classic.exame.com/wp-content/uploads/2022/05/Nelita.jpg?quality=70&strip=info)`,
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
                  backgroundImage: `url(https://classic.exame.com/wp-content/uploads/2022/05/D.O.M..jpg?quality=70&strip=info)`,
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

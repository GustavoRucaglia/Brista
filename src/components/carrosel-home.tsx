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

export function CarouselHome() {
  return (
    <Carousel  plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]} className="w-full mb-20">
      <CarouselContent>
        {Array.from({ length: 1 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex h-[500px] w-[1200px] rounded-md">
                    <Image  src="/carroselPraia.jpg"  width='1200' height='400' alt='logo' className="rounded-md" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

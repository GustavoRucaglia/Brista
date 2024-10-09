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

export function CarouselLocal({url}: {url: string} ) {
  return (
            <div className="rounded-md mb-20">
              <Card className="p-0">
                <CardContent className="flex h-[470px] max-w-[1200px] p-0  rounded-md">
                    <div  style={{
                    backgroundImage: `url(${url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                   className="rounded-md w-[1200px] h-[500px]"  />
                </CardContent>
              </Card>
            </div>
  )
}

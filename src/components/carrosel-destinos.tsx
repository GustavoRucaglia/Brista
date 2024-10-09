"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPontoInterrese, getPontoInterreseFilter, PontoInterrese } from "@/utils/api-request";
import { useQuery } from "@tanstack/react-query";
import { UtensilsCrossed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CarouselDestinoProps {
  title: string;
  subTitle: string;
  variant?: string;
  category: string;
}

export function CarouselDestinos({
  title,
  subTitle,
  variant,
  category,
}: CarouselDestinoProps) {
  const router = useRouter();


  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["pontos", category],
    queryFn: () => getPontoInterreseFilter(category),
    staleTime: 5 * 60 * 1000, 
    
  });

  const handleEditClick = (ponto: PontoInterrese) => {
    const queryParams = new URLSearchParams({
      id: ponto.id.toString(),
    });

    router.push(`/explore?${queryParams}`);
  };
  if (variant === "small") {
    return (
      <div className="w-full relative max-w-[1200px] mx-auto mb-20">
        <div className="flex gap-4">
          <h1 className="text-3xl font-semibold mb-5 z-20">
            {title}!
          </h1>
          <UtensilsCrossed />
        </div>
        <div className="flex gap-10">
          <p className="text-lg mb-2 z-20 font-medium max-w-[500px]">
            {subTitle}
          </p>
          <br />
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mb-24"
          >
            <CarouselContent>
              {data?.map((pontos: PontoInterrese) => (
                <CarouselItem className={`md:basis-1/2 lg:basis-1/3`} key={pontos.id}>
                    <Card onClick={() => handleEditClick(pontos)} className="w-full h-full">
                      <CardContent className=" lg:max-h-[300px] w-full h-full flex aspect-square items-center justify-center">
                        <div  style={{
                            backgroundImage: pontos.fotos ? `url(${pontos.fotos})` : "url('/fallback-image.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }} className="rounded-md h-full w-full cursor-pointer" />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    );
  }

  if(variant === "big"){
    return(
        <div className="w-full max-w-[1200px]  mx-auto">
        <div
          className={`w-[100vw] -z-40 left-[0] relative h-[150%] `}
        />
        <h1 className={` text-3xl font-semibold mb-2 z-20`}>{title}</h1>
        <p className="text-lg mb-2 z-20">{subTitle}</p>
        <br />
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mb-24"
        >
          <CarouselContent>
            <CarouselItem
              className={`md:basis-1/2 lg:h-[400px] lg:max-w-[425px]
              }`}
            >
              <a href="/pontoTuristico?search=sul">
              <Card className="w-full h-full">
                <CardContent className="lg:max-h-[400px] w-full h-full flex aspect-square items-center justify-center">
                  <div
                    style={{
                      backgroundImage: `url(sul.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "bottom",
                    }}
                    className="rounded-md relative h-full w-full cursor-pointer px-4 flex justify-center items-center"
                  >
                    <span
                      className={`${
                        variant === "big" ? "text-4xl" : "text-2xl"
                      } z-50 font-semibold text-center mb-2 self-end text-white uppercase`}
                    >
                      sul
                    </span>
                    <div className="top-0 rounded-md -left-0 z-30 w-full h-full absolute bg-gradient-to-b from-transparent to-[#0000007f]" />
                  </div>
                </CardContent>
              </Card>
              </a>
            </CarouselItem>
            <CarouselItem
              className={`md:basis-1/2 lg:h-[400px] lg:max-w-[425px]
              }`}
            >
             <a href="/pontoTuristico?search=norte">
              <Card className="w-full h-full">
                <CardContent className="lg:max-h-[400px] w-full h-full flex aspect-square items-center justify-center">
                  <div
                    style={{
                      backgroundImage: `url(https://blog.venturas.com.br/wp-content/uploads/2016/06/Anavilhanas-M%C3%A9dias-13.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "bottom",
                    }}
                    className="rounded-md relative h-full w-full cursor-pointer px-4 flex justify-center items-center"
                  >
                    <span
                      className={`${
                        variant === "big" ? "text-4xl" : "text-2xl"
                      } z-50 uppercase font-semibold text-center mb-2 self-end text-white`}
                    >
                      Norte
                    </span>
                    <div className="top-0 rounded-md -left-0 z-30 w-full h-full absolute bg-gradient-to-b from-transparent to-[#0000007f]" />
                  </div>
                </CardContent>
              </Card>
              </a >
            </CarouselItem>
            <CarouselItem
              className={`md:basis-1/2 lg:h-[400px] lg:max-w-[425px]`}
            >
              <a href="/pontoTuristico?search=centro-oeste">
              <Card className="w-full h-full">
                <CardContent className="lg:max-h-[400px] w-full h-full flex aspect-square items-center justify-center">
                  <div
                    style={{
                      backgroundImage: `url(https://a.cdn-hotels.com/gdcs/production27/d558/148e81f1-cf9e-4d0f-9337-90ff4d44f941.jpg?impolicy=fcrop&w=1600&h=1066&q=medium)`,
                      backgroundSize: "cover",
                      backgroundPosition: "bottom",
                    }}
                    className="rounded-md relative h-full w-full cursor-pointer px-4 flex justify-center items-center"
                  >
                    <span
                      className={`${
                        variant === "big" ? "text-4xl" : "text-2xl"
                      } z-50 font-semibold text-center uppercase mb-2 self-end text-white`}
                    >
                        Centro-oeste
                    </span>
                    <div className="top-0 rounded-md -left-0 z-30 w-full h-full absolute bg-gradient-to-b from-transparent to-[#0000007f]" />
                  </div>
                </CardContent>
              </Card>
              </a>
            </CarouselItem>
            <CarouselItem
              className={`md:basis-1/2 lg:h-[400px] lg:max-w-[425px]`}
            >
                <a href="/pontoTuristico?search=nordeste">
              <Card className="w-full h-full">
                <CardContent className="lg:max-h-[400px] w-full h-full flex aspect-square items-center justify-center">
                  <div
                    style={{
                      backgroundImage: `url(https://www.viagenscinematograficas.com.br/wp-content/uploads/2020/05/Melhores-Praias-Nordeste-Brasileiro-4.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "bottom",
                    }}
                    className="rounded-md relative h-full w-full cursor-pointer px-4 flex justify-center items-center"
                  >
                    <span
                      className={`${
                        variant === "big" ? "text-4xl" : "text-2xl"
                      } z-50 font-semibold uppercase text-center mb-2 self-end text-white`}
                    >
                        NORDESTE
                    </span>
                    <div className="top-0 rounded-md -left-0 z-30 w-full h-full absolute bg-gradient-to-b from-transparent to-[#0000007f]" />
                  </div>
                </CardContent>
              </Card>
              </a>
            </CarouselItem>
            <CarouselItem
              className={`md:basis-1/2 lg:h-[400px] lg:max-w-[425px]`}
            >
              <a href="/pontoTuristico?search=sudeste">
              <Card className="w-full h-full">
                <CardContent className="lg:max-h-[400px] w-full h-full flex aspect-square items-center justify-center">
                  <div
                    style={{
                      backgroundImage: `url(https://rodoviariaonline.com.br/wp-content/uploads/2018/08/tudo-sobre-aregiao-sudeste-o-que-voce-precisa-saber-3.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "bottom",
                    }}
                    className="rounded-md relative h-full w-full cursor-pointer px-4 flex justify-center items-center"
                  >
                    <span
                      className={`${
                        variant === "big" ? "text-4xl" : "text-2xl"
                      } z-50 font-semibold text-center uppercase mb-2 self-end text-white`}
                    >
                        SUDESTE
                    </span>
                    <div className="top-0 rounded-md -left-0 z-30 w-full h-full absolute bg-gradient-to-b from-transparent to-[#0000007f]" />
                  </div>
                </CardContent>
              </Card>
              </a>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="h-16 w-16 text-4xl" />
          <CarouselNext className="h-16 w-16 text-4xl" />
        </Carousel>
      </div>
    )
  }
  return (
    <div className="w-full max-w-[1200px]  mx-auto">
      <div
        className={`w-[100vw] -z-40 left-[0] relative h-[150%]  ${
        "bg-white"
        }`}
      />
      <h1 className={`  text-2xl font-semibold mb-2 z-20`}>{title}</h1>
      <p className="text-lg mb-2 z-20">{subTitle}</p>
      <br />
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mb-24"
      >
        <CarouselContent>
        {data?.map((pontos: PontoInterrese) => (
          <CarouselItem
            className={`md:basis-1/2 ${
              variant === "big"
                ? "lg:h-[300px] lg:max-w-[400px]"
                : variant === "small"
                ? "lg:basis-1/5"
                : "lg:basis-1/4"
            }`}
            key={pontos.id}
          >
            <Card   onClick={() => handleEditClick(pontos)} className="w-full h-full">
              <CardContent className="lg:max-h-[300px] w-full h-full flex aspect-square items-center justify-center">
                <div
                  style={{
                    backgroundImage: `url(${pontos.fotos})`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                  }}
                  className="rounded-md relative h-full w-full cursor-pointer px-4 flex justify-center items-center"
                >
                  <span
                    className={`${
                      variant === "big" ? "text-4xl" : "text-2xl"
                    } z-50 font-semibold text-center mb-2 self-end text-white`}
                  >
                    {variant === "big" ? "Sul" : `${pontos.nome}`}
                  </span>
                  <div className="top-0 rounded-md -left-0 z-30 w-full h-full absolute bg-gradient-to-b from-transparent to-[#0000007f]" />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

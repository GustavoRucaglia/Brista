"use client"

import { CarouselDestinos } from "@/components/carrosel-destinos";
import { CarouselHome } from "@/components/carrosel-home";
import { CarouselLocal } from "@/components/carroselLocal";
import { getPontoInterreseById, PontoInterrese } from "@/utils/api-request";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";

export function ExplorePage({ id = 0 }) {

    const Oldid = useSearchParams().get('id'); 
    id = Number(Oldid);
   
        const { data, error, isLoading, refetch } = useQuery<PontoInterrese, AxiosError>({
            queryKey: ['pontosByIds', id],
            queryFn: () => getPontoInterreseById(id),
            staleTime: 10 * 1000,
          });


  return (
    <>
    <main className="w-full flex flex-col items-center justify-center">
      <section className="max-w-[1200px] mb-16">
        <h1 className="font-bold text-[3rem] mt-5 mb-5">Explore {data?.nome}</h1>
        {data?.fotos &&   <CarouselLocal url={data.fotos} />}
        <br />
        <h1 className="font-semibold text-3xl">Conheça mais sobre {data?.nome}:</h1>
        <br />
        {data?.descricao}
      </section>
    </main>
     <div className="max-w-[1200px] mx-auto">
     <CarouselDestinos title="Outros destinos que podem gostar" subTitle="Explore toda a diversidade cultural pelo Brasil" category={data?.categoria || ''} />
    </div>
    </>
  );
}

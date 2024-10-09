"use client";
import { Carrosel } from "@/components/carrosel";
import SlideFilterBy from "@/components/FilterBy";
import { Button } from "@/components/ui/button";
import { getPontoInterreseFilter, getPontoInterreseSearch, PontoInterrese } from "@/utils/api-request";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const PontoTuristico = () => {

  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search");

  const search = searchParam ? searchParam : "pontos"
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["pontosSearch", search],
    queryFn: () => getPontoInterreseSearch(search),
    staleTime: 5 * 60 * 1000,
  });

  const [showMore, setShowMore] = useState(false);

  const qtd = data?.length


  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  
  const pontosExibidos = showMore ? data : data?.slice(0, Math.ceil(8));

  return (
    <main className="w-full flex justify-center items-center flex-col">
      <div className="max-w-[1200px] mx-auto items-center w-full flex justify-start flex-col mt-10 gap-5">
        <h1 className="font-bold text-gray-600 text-3xl">
          "{search ? search : "Pontos Turísticos"}"
        </h1>
        <div className="flex justify-between w-full">
          <div className="flex gap-3 justify-center items-center">
            <span className="text-lg text-gray-600">{qtd} pontos encontrados</span>
            <CircleAlert size={14} color="gray" className="mt-1" />
          </div>
          <SlideFilterBy />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pontosExibidos?.map((ponto: PontoInterrese) => (
            <Carrosel key={ponto.id} ponto={ponto} />
          ))}
        </div>
        {qtd > 8 && (
          <>
        <AnimatePresence>
        {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {data?.slice(Math.ceil(data.length / 2)).map((ponto: PontoInterrese) => (
                <Carrosel key={ponto.id} ponto={ponto} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex justify-center relative">
          <div className="w-[350px] bg-[#88baf0c5] h-[2px] absolute left-[-360px] top-[25%]" />
          <Button
            className="mb-12 bg-transparent hover:bg-transparent border-2 w-[120px] h-12 text-[#0056B3] rounded-3xl border-[#0056B3]"
            onClick={() => handleShowMore()}
            type="button"
          >
            {showMore ? "Mostrar Menos" : "Mostrar Mais"}
          </Button>

          <div className="w-[350px] bg-[#88baf0c5] h-[2px] absolute left-[130px] top-[25%]" />
        </div>
        </>
        )}
      </div>
    </main>
  );
};

export default PontoTuristico;

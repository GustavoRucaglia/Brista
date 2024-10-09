"use client"
import SlideFilterBy from "@/components/FilterBy";
import { Carrosel } from "@/components/carrosel";
import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const Restaurants = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <main className='w-full flex justify-center items-center flex-col'>
      <div className=" max-w-[1200px] mx-auto items-center w-full flex  justify-start flex-col mt-10 gap-5">
        <h1 className="font-bold text-gray-600 text-3xl">"Restaurantes"</h1>
        <div className="flex justify-between  w-full">
          <div className="flex gap-3 justify-center items-center">
           <span className="text-lg text-gray-600">157 restaurantes encontrados</span>
           <CircleAlert size={14} color="gray" className="mt-1" />
           </div>
          <SlideFilterBy />
        </div>
        <Carrosel />
        <Carrosel />
        <Carrosel />
        <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', x:0 }}
            transition={{ duration: 0.5 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <Carrosel />
            <Carrosel />
            <Carrosel />
          </motion.div>
        )}
      </AnimatePresence>
        <div className="flex justify-center relative">
        <div className="w-[350px] bg-[#88baf0c5] h-[2px] absolute left-[-360px] top-[25%]" />
        <Button className="mb-12 bg-transparent hover:bg-transparent border-2 w-[120px] h-12 text-[#0056B3] rounded-3xl border-[#0056B3] " onClick={ () => handleShowMore()} type="button">
          {showMore ? "Mostrar Menos" : "Mostrar Mais"}</Button>
        <div className="w-[350px] bg-[#88baf0c5] h-[2px] absolute left-[130px] top-[25%]" />
        </div>
      </div>
    </main>
  )
}

export default Restaurants

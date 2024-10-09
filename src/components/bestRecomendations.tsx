'use client'
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react";
import { useRouter } from "next/navigation";
export function BestRecomendations() {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        margin: "100% 0px -50% 0px"
    })

    
  const router = useRouter();
  const handlePage = () => {
    router.push( '/pontoTuristico?search=praia' );
  };


  return (
   <div className="mx-auto max-w-[1200px] h-[200px] flex  items-center w-full bg-slate-300 gap-10 mb-10 rounded-xl px-8 py-2">
  <motion.div
      initial={{ rotate: 0 }}
      animate={isInView ? { rotate: -6 } : { rotate: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      ref={ref}
    >
      <Image
        src="/natal.png"
        alt="bestRecomendations"
        className="rounded-xl"
        width={200}
        height={200}
      />
    </motion.div>
       <div>
            <Badge variant="secondary" className=" h-8 mb-2 rounded-md text-xs">Recomendações para o Verão!</Badge>
            <h1 className="text-2xl font-bold max-w-[600px]">Venha conhecer as 10 melhores praias para curtir com sua família.</h1>
            <p className="text-[#5d5d5d]  max-w-[400px]">Os destinos mais escolhidos em todas regiões.</p>
       </div>
       <Button className="mt-4 bg-white w-[150px] h-12 text-black rounded-3xl " onClick={handlePage}>Ver agora!</Button>
   </div>
  )
}

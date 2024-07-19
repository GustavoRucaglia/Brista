import { CarouselDestinos } from "@/components/carrosel-destinos";
import { CarouselHome } from "@/components/carrosel-home";
import { CarouselLocal } from "@/components/carroselLocal";

export default function Home() {
  return (
    <>
    <main className="w-full flex flex-col items-center justify-center">
      <section className="max-w-[1200px] h-[100vh] mb-80">
        <h1 className="font-bold text-[3rem] mt-5 mb-5">Explore Pelourinho</h1>
        <CarouselLocal />
        <br />
        <h1 className="font-semibold text-2xl">Conheça mais sobre Pelourinho:</h1>
        <br />
        <p className="text-lg">O Pelourinho, localizado em Salvador, Bahia, é um dos pontos turísticos mais emblemáticos do Brasil. Este bairro histórico é um verdadeiro tesouro cultural e arquitetônico, conhecido por suas ruas de paralelepípedos, casas coloridas e uma rica herança afro-brasileira.</p>
        <br />
        <p className="text-lg">O Pelourinho é famoso por sua arquitetura colonial preservada. Entre seus marcos históricos estão a Igreja de São Francisco, com seu interior ricamente decorado em ouro, e a Catedral Basílica de Salvador, um exemplo magnífico do barroco brasileiro. Além disso, o bairro abriga o Museu Afro-Brasileiro, que destaca a história e a cultura dos africanos que foram trazidos ao Brasil como escravos.</p>
      </section>
    </main>
     <div className="max-w-[1200px] ml-[150px]">
     <CarouselDestinos title="Conheça outros destinos incriveis" subTitle="Visite o nosso sertão Brasileiro" />
     <CarouselDestinos title="Outros destinos que podem gostar" subTitle="Explore toda a diversidade cultural pelo Brasil" />
    </div>
    </>
  );
}
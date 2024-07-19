import { CarouselDestinos } from "@/components/carrosel-destinos";
import { CarouselHome } from "@/components/carrosel-home";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <section className="max-w-[1200px]">
        <CarouselHome />
        <br />
        <CarouselDestinos title="Conheça lugares incriveis" subTitle="Os favoritos dos turistas!" />
        <CarouselDestinos title="conheça restaurante por todo Brasil" subTitle="procure apartir de regiões" />
        <CarouselDestinos title="Sonhe com sua proxima viagem" subTitle="conheça lugares que parecem surreails" />
        <CarouselDestinos title="Procure pontos turisticos por regioes" subTitle="conheça a fauna e flora do Brasil" />
        <CarouselDestinos title="Viaje por todo Brasil" subTitle="conheça as maravilhas do desse pais" />
      </section>
    </main>
  );
}

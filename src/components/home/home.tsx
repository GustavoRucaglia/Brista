import { BestRecomendations } from "@/components/bestRecomendations";
import { CarouselDestinos } from "@/components/carrosel-destinos";
import { CarouselHome } from "@/components/carrosel-home";

interface HomeProps {
    initialSortBy: string;
  }

export  function HomeInitial() {

  return (
    <main className="w-full flex flex-col">
      <section className="">
        <CarouselHome  />
        <br />
        <BestRecomendations />
        <CarouselDestinos title="Conheça lugares incríveis" subTitle="Os favoritos dos turistas!" category={''} />
        <div className="w-[100%] flex-col flex justify-center items-center relative z-50 left-0 top-[0vh] bg-slate-200 h-[110%] pt-14 mb-20">
        <CarouselDestinos title="Explore pelos estados Brasileiros" subTitle="Conheça os melhores destinos de cada região" variant="big" category={''}/>
        </div>
        <CarouselDestinos title="Conheça restaurantes por todo o Brasil" subTitle="Procure a partir de regiões"  category={'parque'}  />
        <CarouselDestinos title="Veja os melhores restaurantes do Brasil" subTitle="Faça uma viagem de sabores, experimentando a grande variedade de comida e temperos, espalhados no Brasil interio, veja aqui os melhores restaurantes" variant="small" category='restaurante' />
        <CarouselDestinos title="Viaje por todo o Brasil" subTitle="Conheça as maravilhas desse país" category={'cidade'} />
      </section>
    </main>
  );
}

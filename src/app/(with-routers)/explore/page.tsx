import { CarouselDestinos } from "@/components/carrosel-destinos";
import { CarouselHome } from "@/components/carrosel-home";
import { CarouselLocal } from "@/components/carroselLocal";
import { EditarPonto } from "@/components/EditarPonto";
import { ExplorePage } from "@/components/ui/explore";
import { getPontoInterreseById } from "@/utils/api-request";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Explore({ id = 0 }) {

  const queryClient = new QueryClient();

  await queryClient.removeQueries({
    predicate: (query) => {
      const [key] = query.queryKey;
      return key === "pontosByIdss" && query.queryKey[1] !== id;
    },
  });
  
  if (id !== 0) {
    await queryClient.prefetchQuery({
      queryKey: ['pontosByIdss', id], 
      queryFn: () => getPontoInterreseById(id),
    });
  }

  return (
    <>
       <HydrationBoundary state={dehydrate(queryClient)}>
          <ExplorePage id={id}  />
      </HydrationBoundary>
    </>
  );
}
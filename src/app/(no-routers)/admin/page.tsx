import ListaPontos from "@/components/listPonts";
import { getPontoInterrese, getPontoInterreseById } from "@/utils/api-request";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Admin({ sortBy = "id", id = 0 }: { sortBy?: string; id?: number }) {
  const queryClient = new QueryClient();

  // Remove as consultas antigas
  await queryClient.removeQueries({
    queryKey: ["pontos", sortBy],
  });

  // Pré-carrega a consulta de pontos
  await queryClient.prefetchQuery({
    queryKey: ["pontos", sortBy],
    queryFn: () => getPontoInterrese(sortBy),
  });

  // Pré-carrega a consulta de ponto por ID
  if (id !== 0) {
    await queryClient.prefetchQuery({
      queryKey: ["pontosById", id],
      queryFn: () => getPontoInterreseById(id),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListaPontos initialSortBy={sortBy} />
    </HydrationBoundary>
  );
}

import { HomeInitial } from "@/components/home/home";
import ListaPontos from "@/components/listPonts";
import { getPontoInterrese, getPontoInterreseById, getPontoInterreseFilter } from "@/utils/api-request";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Home({ sortBy = "id", id = 0, category = "" }: { sortBy?: string; id?: number; category?: string }) {
  const queryClient = new QueryClient();

  // Invalidate queries to ensure they are refetched with the latest data
  await queryClient.invalidateQueries({
    queryKey: ["pontos", sortBy],
  });

  // Prefetch queries with the latest data
  await queryClient.prefetchQuery({
    queryKey: ["pontos", category],
    queryFn: () => getPontoInterreseFilter(category),
  });

  if (id !== 0) {
    await queryClient.prefetchQuery({
      queryKey: ["pontosById", id],
      queryFn: () => getPontoInterreseById(id),
    });
  }

  // Ensure no stale or unnecessary queries are lingering
  queryClient.removeQueries({
    predicate: (query) => query.queryKey[0] === "pontos" && query.queryKey[1] !== sortBy,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeInitial />
    </HydrationBoundary>
  );
}

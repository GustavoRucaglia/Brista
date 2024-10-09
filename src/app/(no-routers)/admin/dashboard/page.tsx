import DashboardTable from "@/components/dashboard";
import ListaPontos from "@/components/listPonts";
import { getPontoInterrese, getPontoInterreseById } from "@/utils/api-request";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Dashboard({ sortBy = "id", id = 0, token = "" }: { sortBy?: string; id?: number; token?: string }) {
  const queryClient = new QueryClient();

  // Invalidate and remove queries to ensure data is fresh
  await queryClient.invalidateQueries({
    queryKey: ["pontosTuristico", sortBy],
  });

  // Prefetch queries with the latest data
  await queryClient.prefetchQuery({
    queryKey: ["pontosTuristico", sortBy],
    queryFn: () => getPontoInterrese(sortBy),
  });

  if (id !== 0) {
    await queryClient.prefetchQuery({
      queryKey: ["pontosById", id],
      queryFn: () => getPontoInterreseById(id),
    });
  }

  // Optionally, remove any stale or obsolete queries
  await queryClient.removeQueries({
    predicate: (query) => {
      const [key] = query.queryKey;
      return key === "pontosTuristicos" && query.queryKey[1] !== sortBy;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardTable initialSortBy={sortBy} />
    </HydrationBoundary>
  );
}

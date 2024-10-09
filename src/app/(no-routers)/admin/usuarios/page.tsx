import ListaPontos from "@/components/listPonts";
import ListUser from "@/components/listUser";
import { getPontoInterrese, getPontoInterreseById, getUsers } from "@/utils/api-request";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Admin() {
  const queryClient = new QueryClient();

  // Invalidate and remove queries to ensure data is fresh
  await queryClient.invalidateQueries({
    queryKey: ["users"],
  });

  // Prefetch queries with the latest data
  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  // Optionally, remove any stale or obsolete queries
  await queryClient.removeQueries({
    predicate: (query) => {
      const [key] = query.queryKey;
      return key === "users"
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListUser  />
    </HydrationBoundary>
  );
}

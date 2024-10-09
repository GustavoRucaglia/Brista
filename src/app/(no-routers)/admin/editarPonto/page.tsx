import { EditarPonto } from "@/components/EditarPonto";
import {  getPontoInterreseById } from "@/utils/api-request";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


export default async function Editar({ id = 0, token = "" }: {  id?: number, token?: string }) {
  const queryClient = new QueryClient();
  
  if (id !== 0) {
    await queryClient.prefetchQuery({
      queryKey: ['pontosById', id], 
      queryFn: () => getPontoInterreseById(id),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditarPonto id={id} token={token} />
    </HydrationBoundary>
  );
}

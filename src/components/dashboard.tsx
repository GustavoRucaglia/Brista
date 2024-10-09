"use client";

import { Button } from "@/components/ui/button";
import { getPontoInterrese, getUsers, PontoInterrese, User } from "@/utils/api-request";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label, Pie, XAxis } from "recharts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { PieChart, TrendingUp } from "lucide-react";

interface ListaPontosProps {
  initialSortBy: string;
}
const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig



export default function DashboardTable({ initialSortBy }: ListaPontosProps) {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [token, setToken] = useState<string | null>(null); // Estado para armazenar o token
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // Recupera o token do localStorage
    setToken(storedToken);
  }, []); // Executa apenas uma vez no lado do cliente

  const { data, error, isLoading, refetch } = useQuery<User[], AxiosError>({
    queryKey: ["pontos", sortBy],
    queryFn: () => getUsers(),
    staleTime: 10 * 100,
    enabled: !!token, // Só executa se o token estiver disponível
  });

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    refetch();
  };

 
  console.log(data); // Verifique se os dados estão sendo retornados corretamente
    console.log(error); // Verifique se há algum erro na consulta
    console.log(isLoading); // Verifique se a consulta ainda está carregando


  

  const goToCreatePonto = () => {
    router.push("/admin/criarPonto");
  };

  const handleEditClick = (ponto: PontoInterrese) => {
    const queryParams = new URLSearchParams({
      id: ponto.id.toString(),
    });
    router.push(`admin/editarPonto?${queryParams}`);
  };

  const total = React.useMemo(
    () => ({
      desktop: data?.filter((user: User) => user.role === "USER").length || 0,
      mobile: data?.filter((user: User) => user.role === "ADMIN").length || 0,
    }),
    [data]
  );

  const total1 = data?.length

  const chartData = React.useMemo(() => {
    if (!data) return [];

    return [
      {
        name: "Usuários",
        desktop: total.desktop,
        mobile: total.mobile,
      },
    ];
  }, [data, total]);

  console.log(total.desktop, total.mobile);
  return (
    <Card className="flex flex-col">
    <CardHeader className="items-center pb-0">
      <CardTitle>Pie Chart - Donut wih Text</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
         <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={[
                { name: "Usuários", value: total.desktop },
                { name: "Administradores", value: total.mobile },
            ]}
            dataKey="value"
            nameKey="name"
                 />
          </PieChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col gap-2 text-sm">
      <div className="flex items-center gap-2 font-medium leading-none">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
  </Card>
  );
}

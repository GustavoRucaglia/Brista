"use client"

import { Button } from "@/components/ui/button"
import { getPontoInterrese, PontoInterrese } from "@/utils/api-request";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  Pencil,
  Plus,
  PlusCircle,
  RefreshCcw,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";

interface ListaPontosProps {
  initialSortBy: string;
}

export default function ListaPontos({ initialSortBy }: ListaPontosProps) {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const router = useRouter();


  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['pontos', sortBy],
    queryFn: () => getPontoInterrese(sortBy),
    staleTime: 10 * 1000,
  });

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    refetch();
  };

  const handleState = useMutation({
    mutationFn: (ponto: PontoInterrese) => {
      ponto.state = !ponto.state; // Inverte o estado atual
      return axios.put(`http://localhost:8080/brazu/pontos/${ponto.id}`, ponto, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const toggleState = (ponto: PontoInterrese) => {
    handleState.mutate(ponto);
  };

  const goToCreatePonto = () => {
    router.push('/admin/criarPonto'); 
  };

  const handleEditClick = (ponto: PontoInterrese) => {
    const queryParams = new URLSearchParams({
      id: ponto.id.toString(),
    });

    router.push(`admin/editarPonto?${queryParams}`);
  };

  return(
    <>
      <Breadcrumb className="hidden md:flex pl-32 relative top-[-30px]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Todos Pontos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
        <div className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 sm:pl-32  h-full'>
                <h1 className="font-bold text-lg sm:text-[2rem] border-l-[10px] border-yellow-300 pl-5">
                    Gerência de Pontos de Interrese Brazurista
                </h1>
                <Tabs defaultValue="all">
            <div className="flex items-center justify-center">
              <TabsList>
                <TabsTrigger value="all">Pontos</TabsTrigger>
                <TabsTrigger value="roteiros">Roteiros</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filtro
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem>
                      Ativo
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem onClick={() => handleSortChange('dataDeCriacao')}>
                      Data
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem  onClick={() => handleSortChange('nota')}>
                    Nota
                  </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={() => refetch()} className="bg-blue-800  hover:bg-blue-700 h-10 gap-1" size={"sm"}><RefreshCcw />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Atualizar
                  </span></Button>
                <Button size="sm" className="h-10 gap-1 bg-blue-800 hover:bg-blue-700" onClick={goToCreatePonto}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Ponto
                  </span>
                </Button>
              </div>
            </div>
          {data.length ? (
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Pontos de Interrese</CardTitle>
                </CardHeader>
                <CardContent>
                       <Table>
                       <TableHeader>
                         <TableRow>
                           <TableHead className="hidden w-[100px] sm:table-cell">
                             <span className="sr-only">Imagem</span>
                           </TableHead>
                           <TableHead>Nome</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>nota</TableHead>
                           <TableHead className="hidden md:table-cell">
                             descrição
                           </TableHead>
                           <TableHead className="hidden md:table-cell">
                             Criado em
                           </TableHead>
                           <TableHead>
                             Ações
                           </TableHead>
                         </TableRow>
                       </TableHeader>
                       <TableBody>
                         {data?.map((ponto: PontoInterrese) => (
                         <TableRow key={ponto.id}>
                           {ponto.fotos?
                              <TableCell className="hidden sm:table-cell">
                              <Image
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={ponto?.fotos}
                                width="64"
                              />
                            </TableCell> : null
                           }
                           <TableCell className="font-medium">
                             {ponto?.nome}
                           </TableCell>
                           <TableCell>
                             <Badge variant="outline">{ponto?.state ? 'Ativo' : 'Inativo'}</Badge>
                           </TableCell>
                           <TableCell>{ponto?.nota}</TableCell>
                           <TableCell className="hidden md:table-cell">
                             {ponto?.descricao}
                           </TableCell>
                           <TableCell className="hidden md:table-cell">
                             {ponto?.dataDeCriacao}
                           </TableCell>
                           <TableCell>
                             <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                 <Button
                                   aria-haspopup="true"
                                   size="icon"
                                   variant="ghost"
                                 >
                                   <MoreHorizontal className="h-4 w-4" />
                                   <span className="sr-only">Opções</span>
                                 </Button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent align="end">
                                 <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                 <DropdownMenuItem  onClick={() => handleEditClick(ponto)}>Editar</DropdownMenuItem>
                                 <DropdownMenuItem  onClick={() => toggleState(ponto)}>Inativar/Ativar</DropdownMenuItem>
                               </DropdownMenuContent>
                             </DropdownMenu>
                           </TableCell>
                         </TableRow>
                       ))}
                       </TableBody>
                     </Table>
                     </CardContent>
                     <CardFooter>
                       <div className="text-xs text-muted-foreground">
                         Mostrando <strong>1-10</strong> de <strong>32</strong>{" "}
                         Lugares
                       </div>
                     </CardFooter>
                   </Card>
                 </TabsContent>
                  ) : (
                        <div
                          className="flex flex-1 mt-5 h-[60vh] items-center justify-center rounded-lg border-2 border-dashed shadow-sm"
                        >
                          <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                              Não há nenhum Ponto Cadastrado
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Clique no botão abaixo para adicionar
                            </p>
                              <Button size="sm" className="h-10 gap-1 bg-blue-800 hover:bg-blue-700" onClick={goToCreatePonto}>
                                  <PlusCircle className="h-3.5 w-3.5" />
                                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Ponto
                                  </span>
                              </Button>
                          </div>
                        </div>
            )}
          </Tabs>
        </div>
        </>
 )
}
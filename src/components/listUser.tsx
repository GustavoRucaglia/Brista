"use client"

import { Button } from "@/components/ui/button"
import { getPontoInterrese, getUsers, PontoInterrese, User } from "@/utils/api-request";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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

export default function ListUser() {
  const router = useRouter();

  const token = localStorage.getItem('token')
  
  if(token){
    const { data, error, isLoading, refetch } = useQuery({
      queryKey: ['users'],
      queryFn: () => getUsers(),
      staleTime: 10 * 100,
    });

    useEffect(() => {
      refetch();
    }, [])
    

    const handleState = useMutation({
      mutationFn: (ponto: User) => {
        ponto.state = !ponto.state; 
        return axios.put(`http://localhost:8080/auth/user`, ponto, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then((response) => response.data);
      },
      onSuccess: () => {
        refetch();
      },
    });

    const handleRole = useMutation({
      mutationFn: (ponto: User) => {
        ponto.role = ponto.role === 'ADMIN' ? 'USER' : 'ADMIN' 
        return axios.put(`http://localhost:8080/auth/user`, ponto, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then((response) => response.data);
      },
      onSuccess: () => {
        refetch();
      },
    });

    const toggleState = (ponto:  User) => {
      handleState.mutate(ponto);
    };

    const toggleRole = (ponto:  User) => {
      handleState.mutate(ponto);
    };
  
  
  
    const handleEditClick = (ponto: User) => {
      const queryParams = new URLSearchParams({
        id: ponto.id.toString(),
      });
  
      router.push(`usuarios/editarUser?${queryParams}`);
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
                      Gerência de usuários Brazurista
                  </h1>
                  <Tabs defaultValue="all">
              <div className="flex items-center justify-center">
                <TabsList>
                  <TabsTrigger value="all">Usuários</TabsTrigger>
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
                      <DropdownMenuCheckboxItem>
                        Data
                    </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/*
                  <Button onClick={() => refetch()} className="bg-blue-800  hover:bg-blue-700 h-10 gap-1" size={"sm"}><RefreshCcw />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Atualizar
                    </span></Button>
                              */}
                </div>
              </div>
            {data?.length > 0 ? (
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Usuários</CardTitle>
                  </CardHeader>
                  <CardContent>
                         <Table>
                         <TableHeader>
                           <TableRow>
                             <TableHead className="hidden w-[50px] sm:table-cell">
                               <span className="sr-only">foto</span>
                             </TableHead>
                             <TableHead className="w-[50px]">Username</TableHead>
                             <TableHead className="w-[50px]">Email</TableHead>
                             <TableHead className="hidden w-[100px] md:table-cell">
                               estado
                             </TableHead>
                             <TableHead className="hidden w-[100px] md:table-cell">
                               role
                             </TableHead>
                             <TableHead className="hidden w-[100px] md:table-cell">
                               telefone
                             </TableHead>
                             <TableHead className="w-[100px]">
                               Ações
                             </TableHead>
                           </TableRow>
                         </TableHeader>
                         <TableBody>
                           {data?.map((ponto: User) => (
                           <TableRow key={ponto.id}>
                             <TableCell className="hidden sm:table-cell">
                             {ponto?.photo?    
                                <Image
                                  alt="Product image"
                                  className="aspect-square  rounded-full object-cover"
                                  height="64"
                                  src={ponto?.photo}
                                  width="64"
                                /> : 
                                <Image
                                alt="Product image"
                                className="aspect-square rounded-full object-cover"
                                height="64"
                                src={'https://wp-content.bluebus.com.br/wp-content/uploads/2017/03/31142426/twitter-novo-avatar-padrao-2017-bluebus.png'}
                                width="64"
                              /> 
                             }
                               </TableCell>
                             <TableCell className="font-medium">
                               {ponto?.name}
                             </TableCell>
                             <TableCell className="font-medium">
                               {ponto?.login}
                             </TableCell>
                             <TableCell>
                               <Badge variant="outline">{ponto?.state ? 'Ativo' : 'Inativo'}</Badge>
                             </TableCell>
                             <TableCell>
                               <Badge variant="outline">{ponto?.role === 'ADMIN' ? 'Admin' : 'User'}</Badge>
                             </TableCell>
                             <TableCell className="hidden md:table-cell">
                               {ponto?.telefone}
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
                                Não há nenhum Usuário cadastrado
                              </h3>                 
                            </div>
                          </div>
              )}
            </Tabs>
          </div>
          </>
    )
  }
}
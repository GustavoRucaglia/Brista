"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {  ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup } from '@radix-ui/react-toggle-group'
import { ToggleGroupItem } from '@/components/ui/toggle-group'
import { useSearchParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getPontoInterreseById, PontoInterrese } from '@/utils/api-request'
import { toast } from 'sonner'

export  function EditarPonto ({ id, token }: { id: number, token: string }) {
    const Oldid = useSearchParams().get('id'); 
    id = Number(Oldid);
   
    const token1 = localStorage.getItem('token')
    if(token1 !== null ){
        token = token1
    }

    if(token){
        const { data, error, isLoading, refetch } = useQuery<PontoInterrese, AxiosError>({
            queryKey: ['pontosById', id],
            queryFn: () => getPontoInterreseById(id),
            staleTime: 10 * 1000,
          });

          
      const [inputImage, setInputImage] = useState("");

      const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setInputImage(event.target.value);
      }
  
      const [formData, setFormData] = useState<PontoInterrese>({
          id: data?.id ?? 0, 
          nome: data?.nome ?? '',
          descricao: data?.descricao ?? '',
          nota: data?.nota ?? 0,
          state: data?.state ?? false,
          dataDeCriacao: data?.dataDeCriacao ?? '',
          fotos: data?.fotos ?? '',
          latitude: data?.latitude ?? '',
          longitude: data?.longitude ?? '',
          categoria: data?.categoria ?? '',
          telefone: data?.telefone ?? '',
        });
      
        useEffect(() => {
          if (data) {
            setFormData({
              id: data.id,
              nome: data.nome,
              descricao: data.descricao,
              nota: data.nota,
              state: data.state,
              dataDeCriacao: data.dataDeCriacao,
              fotos: data.fotos,
              latitude: data.latitude,
              longitude: data.longitude,
              categoria: data.categoria,
              telefone: data.telefone
            });
            setInputImage(data?.fotos);
          }
        }, [data]);
  
      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        };
      
    const handleState = useMutation({
      mutationFn: (ponto: PontoInterrese) => {
        ponto.state = !ponto.state; // Inverte o estado atual
        return axios.put(`http://localhost:8080/brazu/pontos/${ponto.id}`, ponto, {
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
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleState.mutate(formData);
      toast("Ponto de id " + id + " editado com sucesso!", {
          description: "em " + new Date().getTime().toString(),
        });
    };
  
    return (
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 pt-10">
          <form onSubmit={handleSubmit} className="mx-auto grid  flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => window.history.back()} className="h-9 w-9">
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Dados do ponto
              </h1>
              <Badge variant="outline" className="ml-auto h-8 w-20 sm:ml-0 flex justify-center items-center">
                 id - {data?.id}
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button size="sm" className='bg-blue-900 hover:bg-blue-800' type="submit">Salvar</Button>
              </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0" className="px-10 h-[500px] py-10">
                  <CardHeader>
                      <CardTitle>Detalhes do ponto</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="grid gap-6 grid-cols-2">
                      <div className="grid gap-3">
                      <div className="grid gap-3">
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                          id="nome"
                          type="text"
                          name='nome'
                          className="w-full"
                          defaultValue={data?.nome}
                          onChange={handleChange}
                      />
                      </div>
                      <div className="grid gap-3">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                          id="description"
                          name="descricao"
                          defaultValue={data?.descricao}
                          className="min-h-32"
                          onChange={handleChange}
                      />
                      </div>
                  </div>
                  <div className="flex flex-col gap-7">
                  <div className="grid gap-3">
                    <div className='flex gap-3'>
                      <div>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                          id="latitude"
                          name="latitude"
                          value={formData.latitude}
                          onChange={handleChange}
                          type="text"
                          className="w-full"
                          title="Digite uma latitude"
                      />                  
                  </div>
                  <div>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                          id="longitude"
                          name="longitude"
                          defaultValue={formData.longitude}
                          onChange={handleChange}
                          type="text"
                          className="w-full"
                          title="Digite a logintude"
                      />                  
                  </div>
                </div>
                </div>
                  <div className="grid gap-3">
                      <Label htmlFor="categoria">Categoria</Label>
                      <Input
                          id="categoria"
                          name="categoria"
                          defaultValue={formData.categoria}
                          onChange={handleChange}
                          type="text"
                          className="w-full"
                          title="Digite uma categoria"
                      />
                  </div>
                  <div className="grid gap-3">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                          id="telefone"
                          name="telefone"
                          defaultValue={formData.telefone}
                          onChange={handleChange}
                          type="text"
                          className="w-full"
                          title="Digite um telefone válido (ex: 12345-678)"
                      />
                  </div>
                  </div>
                  <div className="grid gap-3">
                      <Label htmlFor="Cep">URL da Imagem</Label>
                      <Input
                          id="imageUrl"
                          type="text"
                          className="w-full"
                          name='fotos'
                          defaultValue={data?.fotos}
                          onBlur={handleImageChange}
                          onChange={handleChange}
                      />
                  </div>
                  </div>
                  </CardContent>
              </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                  <CardTitle>Status do Ponto</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="grid gap-6 py-5 px-4">
                      <div className="grid gap-3">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                          <SelectTrigger id="status" aria-label="Selecione status">
                          <SelectValue placeholder="Selecione status" />
                          </SelectTrigger>
                          <SelectContent>
                          <SelectItem value="ativo" onSelect={() => setFormData({ ...formData, state: true })} defaultChecked={data?.state === true} >Ativo</SelectItem>
                          <SelectItem value="Inativo" defaultChecked={data?.state === false}  onSelect={() => setFormData({ ...formData, state: false })} >Inativo</SelectItem>
                          </SelectContent>
                      </Select>
                      </div>
                  </div>
                  </CardContent>
              </Card>
              <Card
                  className="overflow-hidden w-[400px] h-[350px]" x-chunk="dashboard-07-chunk-4"
              >
                  <CardHeader>
                  <CardTitle>Imagem do Ponto</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="grid gap-2">
                          <Image
                          alt="Ponto image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src={inputImage}
                          width="300"
                          />
                      </div>
                  </CardContent>
              </Card>
              </div>
          </div>
          </form>
      </main>
    )
    };
}
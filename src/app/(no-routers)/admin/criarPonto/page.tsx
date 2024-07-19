"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Image from 'next/image';
import { toast } from 'sonner';

interface FormData {
  nome: string;
  descricao: string;
  nota: number;
  fotos: string; 
}

export default function CriarPonto() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: '',
    nota: 0,
    fotos: '', 
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return axios.post('http://localhost:8080/brazu/pontos', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
    toast("Novo ponto de interesse criado!", {
      description: "em " + new Date().getTime().toString(),
    });
  };

  const handleBack = () => {
    router.push('/admin');
  };

    const [inputImage, setInputImage] = useState('https://wallpapercave.com/wp/MQy6rhu.jpg');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputImage(event.target.value);
    }

    const handleReset = () => {
        setInputImage('');
        setFormData({ ...formData, fotos: '' });
        setFormData({ ...formData, nome: '' });
        setFormData({ ...formData, descricao: '' });
        setFormData({ ...formData, nota: 0 });
    }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 bg-muted/40 pt-10">
      <div className="mx-auto grid  flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleBack}>
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">voltar</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Criar ponto
            </h1>
        </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0" className="px-10 h-[500px] py-10">
                <CardHeader>
                    <CardTitle>Detalhes do ponto</CardTitle>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                  <div className="grid gap-6 grid-cols-2">
                      <div className="grid gap-3">
                      <div className="grid gap-3">
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                          id="nome"
                          type="text"
                          name="nome"
                          className="w-full"
                          defaultValue=""
                          value={formData.nome}
                          onChange={handleChange}
                          required
                          minLength={3}
                          maxLength={100}
                          title='O nome deve ter entre 3 e 100 caracteres'
                      />
                      </div>
                      <div className="grid gap-3">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                          id="descricao"
                          defaultValue=""
                          className="min-h-32 pt-2"
                          name="descricao"
                          value={formData.descricao}
                          onChange={handleChange}
                          required
                          minLength={10}
                          maxLength={500}
                          title='A descrição deve ter entre 10 e 500 caracteres'
                      />
                      </div>
                  </div>
                  <div className="flex flex-col gap-7">
                  <div>
                      <Label htmlFor="description">Nota:</Label>
                      <ToggleGroup type="single">
                          <ToggleGroupItem onClick={() => setFormData({ ...formData, nota: 1 })} value="1" aria-label="Toggle bold">
                              1
                          </ToggleGroupItem>
                          <ToggleGroupItem onClick={() => setFormData({ ...formData, nota: 2 })} value="2" aria-label="Toggle bold">
                              2
                          </ToggleGroupItem>
                          <ToggleGroupItem onClick={() => setFormData({ ...formData, nota: 3 })} value="3" aria-label="Toggle bold">
                              3
                          </ToggleGroupItem>
                          <ToggleGroupItem  onClick={() => setFormData({ ...formData, nota: 4 })} value="4" aria-label="Toggle bold">
                              4
                          </ToggleGroupItem>
                          <ToggleGroupItem onClick={() => setFormData({ ...formData, nota: 5 })} value="5" aria-label="Toggle bold">
                              5
                          </ToggleGroupItem>
                      </ToggleGroup>
                  </div>
                  <div className="grid gap-3">
                      <Label htmlFor="Cep">Cep</Label>
                      <Input
                          id="cep"
                          name="cep"
                          type="text"
                          className="w-full"
                          defaultValue=""
                          pattern="^\d{5}-\d{3}$"
                          title="Digite um CEP válido (ex: 12345-678)"
                      />
                  </div>
                  </div>
                  <div className="grid gap-3">
                      <Label htmlFor="imageUrl">URL da Imagem</Label>
                      <Input
                          id="imageUrl"
                          type="text"
                          className="w-full"
                          defaultValue="Gamer Gear Pro Controller"
                          onBlur={handleImageChange}
                          name="fotos"
                          value={formData.fotos}
                          onChange={handleChange}
                          required
                          pattern="https?://.+"
                          title="Digite uma URL válida (ex: http://exemplo.com)"

                      />
                  </div>
                  </div>
                  <Button type="submit" className=' bg-blue-800 hover:bg-blue-700 h-8 mr-5 my-5'>Enviar</Button>
                </form>
                </CardContent>
            </Card>
            </div>
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
    </main>
  );
}

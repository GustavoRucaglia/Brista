"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Check, ChevronLeft, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Image from 'next/image';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAtom } from 'jotai';
import { RoleAtom, tokenAtom } from '@/context/Atom';

interface FormData {
  nome: string;
  descricao: string;
  nota: number;
  fotos: string; 
  latitude: string
  longitude: string
  categoria: string
  telefone?: string
  regiao?: string
}
const categorias = [
  {
    value: "Cidade",
    label: "Cidade",
  },
  {
    value: "Parque",
    label: "Parque",
  },
  {
    value: "Restaurante",
    label: "Restaurante",
  },
  {
    value: "Praia",
    label: "Praia",
  },
  {
    value: "Monumento",
    label: "Monumento",
  },
  {
    value: "Ilha",
    label: "Ilha",
  },
  {
    value: "Parque de Diversão",
    label: "Parque de Diversão",
  },
  {
    value: "Vinícola",
    label: "Vinícola",
  },
  {
    value: "Natureza",
    label: "Natureza",
  },
  {
    value: "Museu",
    label: "Museu",
  },
  {
    value: "Religioso",
    label: "Religioso",
  },
]

export default function CriarPonto() {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [regiao, setRegiao] = useState("")

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: '',
    nota: 5,
    fotos: '', 
    latitude: '',
    longitude: '',
    categoria: value,
    telefone: '',
    regiao: regiao,
  });

  const handleRegiaoChange = (value: string) => {
    setRegiao(value);
    setFormData(prevState => ({
      ...prevState,
      regiao: value,
    }));
  };

  const handleCategorySelect = (currentValue: string) => {
    setValue(currentValue);
    setFormData(prevState => ({
      ...prevState,
      categoria: currentValue,
    }));
    setOpen(false);
  };
  
  const [token, setToken] = useAtom(tokenAtom);

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return axios.post('http://localhost:8080/brazu/pontos', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
        setFormData({ ...formData, nota: 5 });
        setFormData({ ...formData, longitude: '' });
        setFormData({ ...formData, latitude: '' });
        setFormData({ ...formData, categoria: value });
        setFormData({ ...formData, telefone: '' });
        setFormData({ ...formData, regiao: regiao });
    }
  return (
    <main className="grid flex-1 ml-[100px] items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 bg-muted/40 pt-10 h-[90vh]">
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
                      <Label
                       htmlFor="nome">Nome</Label>
                      <Input
                          id="nome"
                          type="text"
                          name="nome"
                          className="w-full"
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
                      <div className="grid gap-3">
                      <Label htmlFor="imageUrl">URL da Imagem</Label>
                      <Input
                          id="imageUrl"
                          type="text"
                          className="w-full"
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
                          value={formData.longitude}
                          onChange={handleChange}
                          type="text"
                          className="w-full"
                          title="Digite a logintude"
                      />                  
                  </div>
                      </div>
                  </div>
                  <div className="grid gap-3">
                    <div className='flex gap-3'>
                      <div className='flex justify-end flex-col gap-1'>
                      <Label htmlFor="categoria">Categoria</Label>
                      <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-[200px] justify-between"
                            >
                              {value
                                ? categorias.find((framework) => framework.value === value)?.label
                                : "selecione.."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="selecione uma categoria..." />
                              <CommandList>
                                <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                                <CommandGroup>
                                  {categorias.map((framework) => (
                                    <CommandItem
                                      key={framework.value}
                                      value={framework.value}
                                      onSelect={(currentValue) => {
                                        handleCategorySelect(currentValue)
                                        setOpen(false)
                                      }}

                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {framework.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>        
                  </div>
                  <div className='w-full'>
                  <Label htmlFor="regiao">Região</Label>
                    <Select  onValueChange={value => handleRegiaoChange(value)} >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..."   />
                        </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sul">sul</SelectItem>
                        <SelectItem value="sudeste">sudeste</SelectItem>
                        <SelectItem value="centro-oeste" >centro-oeste</SelectItem>
                        <SelectItem value="norte">norte</SelectItem>
                        <SelectItem value="nordeste">nordeste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                      </div>
                  </div>
                  <div className="grid gap-3">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                          id="telefone"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleChange}
                          type="text"
                          className="w-full"
                          title="Digite um telefone válido (ex: 12345-678)"
                      />
                  </div>
                  <Button type="submit" className=' bg-blue-800 hover:bg-blue-700 h-8 mr-5 my-5'>Enviar</Button>
                  </div>
                  </div>
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

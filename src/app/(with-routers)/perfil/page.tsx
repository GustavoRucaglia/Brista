"use client";

import { Button } from '@/components/ui/button';
import { tokenAtom } from '@/context/Atom';
import { fetchUserDetails } from '@/service/auth';
import { User } from '@/utils/api-request';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { DoorOpen, Loader2, Pencil, Eye, EyeOff } from 'lucide-react'; // Adicione Eye e EyeOff
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function App(){
   
    const [token, setToken] = useAtom(tokenAtom);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);
    
    if(!token){
      return (
        <div>
          <p>Carregando...</p>
        </div>
      );
    }
    const { isLoading, isError, data, error } = useQuery<User, AxiosError>({
        queryKey: ['userData'],
        queryFn: () => fetchUserDetails(token),
        enabled: !!token, 
    });

    const [inputImage, setInputImage] = useState("");
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputImage(event.target.value);
     }


    const [formData, setFormData] = useState<User>({
        id: data?.id ?? '',
        login: data?.login ?? '',
        password: data?.password ?? '',
        username: data?.username ?? '',
        name: data?.name ?? '',
        photo: data?.photo ?? '',
        telefone: data?.telefone ?? '',
    })
    useEffect(() => {

      if (data) {
        setFormData({
          id: data?.id,
          login: data?.login,
          password: data?.password,
          username: data?.username,
          name: data?.name,
          photo: data?.photo,
          telefone: data?.telefone,
        });
        setInputImage(data?.photo ? data?.photo : "https://wp-content.bluebus.com.br/wp-content/uploads/2017/03/31142426/twitter-novo-avatar-padrao-2017-bluebus.png");
      }
    }, [data]);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false)
    const password1 = data?.password.match(/\d+/g); 
    const password2 = password1 ? password1.join('') : ''; 


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const toggleShowPassword = () => {
        setShowPassword(prev => !prev); 
    };

    const toggleState = (ponto:  User) => {
        handleState.mutate(ponto);
      };

    const handleState = useMutation({
      mutationFn: (ponto: User) => {
        return axios.put(`http://localhost:8080/auth/user`, ponto, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then((response) => response.data);
      },
      onSuccess: () => {
        toast("usuario " + formData.username + " editado com sucesso!", {
          description: "em " + new Date().getTime().toString(),
        });
      },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleState.mutate(formData);
    };
    return (
        <div className="">
            {isLoading && (
                <Loader2 className="w-8 h-8 mx-auto animate-spin" />
            )}
            {isError && (
                <p>error</p>
            )}
            {/* Header */}
            <header className=" items-center p-4 bg-[#0033A0] border-b px-12 border-gray-300 sticky top-0 flex justify-between">
                <Link href='/'>
                    <Image src='/Brazurista.png' width='180' height='220' alt='logo' />
                </Link>
                <DoorOpen color='white' size={40} />
            </header>

            {/* Main Content */}
            <div className="flex gap-5 p-5 max-w-[1200px] mx-auto">
                <nav className="w-64 pr-5 border-r h-[80vh] border-gray-300 bg-white overflow-auto">
                    <h1 className="text-xl font-semibold mb-5">Configuração</h1>
                    <a href="#" className="block mb-2 underline text-gray-800 hover:text-[#07417f]">Geral</a>
                    <a href="#" className="block text-gray-800 hover:text-[#07417f]">Meus Comentários</a>
                </nav>
                <form className='w-full' onSubmit={handleSubmit}>
                    <div className="flex justify-between gap-5 w-full relative max-w-[600px] min-w-[300px] top-14">
                        <div className='border-b mb-5 absolute left-5 w-full -top-14'>
                            <h1 className='text-2xl font-semibold'>
                                Informações do usuário
                            </h1>
                        </div>
                        <div className="px-5 flex gap-2 flex-col">
                            <div>
                                <h2 className="font-medium text-[#0033A0] mb-1">Email</h2>
                                <input
                                    type="email"
                                    name="login"
                                    placeholder="Email"
                                    className={`w-full p-2 border border-gray-300 rounded-md mb-4 ${errors.login ? 'border-red-500' : ''}`}
                                    defaultValue={data?.login}
                                    onChange={handleChange}
                                />
                                {errors.login && <p className="text-red-500 text-sm">{errors.login}</p>}
                            </div>
                            <div>
                                <h2 className="font-medium text-[#0033A0]">Senha</h2>
                                <div className="relative h-6 mb-6">
                                    <input
                                        type={showPassword ? "text" : "password"} // Usar showPassword para controlar o tipo
                                        name="password"
                                        id="password"
                                        minLength={6}
                                        placeholder="Senha"
                                        className={`w-full p-2 border border-gray-300 rounded-md mb-4 ${errors.password ? 'border-red-500' : ''}`}
                                        defaultValue={password2}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowPassword}
                                        className="absolute right-2 top-1/2"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} 
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div>
                                <h2 className="font-medium text-[#0033A0]">Username</h2>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Username"
                                    className={`w-full p-2 border border-gray-300 rounded-md mb-4 ${errors.username ? 'border-red-500' : ''}`}
                                    defaultValue={data?.name}
                                    onChange={handleChange}
                                />
                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                            </div>
                            <div>
                                <h2 className="font-medium text-[#0033A0]">Telefone</h2>
                                <input
                                    type="text"
                                    name="telefone"
                                    placeholder="Telefone"
                                    className={`w-full p-2 border border-gray-300 rounded-md mb-4 ${errors.telefone ? 'border-red-500' : ''}`}
                                    defaultValue={data?.telefone ? data?.telefone : ''}
                                    onChange={handleChange}
                                />
                                {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone}</p>}
                            </div>
                            <Button variant="default" type="submit" className='bg-green-500 hover:bg-green-600 hover: text-white'>
                                Atualizar Perfil
                            </Button>
                        </div>
                        <div className="flex items-center flex-col pb-3 gap-2 cursor-pointer">
                            <span className='-ml-7 text-gray-600 self-start place-self-start'> Icone de perfil</span>
                            <div className='relative'>
                                <img src={inputImage} alt="Avatar" className="w-[180px] h-[160px] rounded-full" />
                                <div className='absolute left-0 bottom-0 bg-[#281a30] text-white w-14 rounded-md border boorder-white h-7 flex justify-center gap-1 items-center'>
                                    <Pencil size={12} />
                                    <span className='text-xs'>Edit</span>
                                </div>
                            </div>
                            <div>
                                <br />
                                <input
                                    placeholder="Url de icone"
                                    name='photo'
                                    className="w-full p-2 border border-gray-300 h-10 rounded-md"
                                    defaultValue={data?.photo ? data?.photo : ''}
                                    onChange={handleChange}
                                    onBlur={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
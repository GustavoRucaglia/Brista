export type PontoInterrese = {
    id: number;
    fotos: string;
    descricao: string;
    nome: string;
    nota: number;
    latitude: string,
    longitude: string,
    categoria: string,
    dataDeCriacao: string,
    telefone: string
    state: boolean
  };


export interface User {
  id: string;
  login: string;
  username?: string;
  name?: string;
  password: string;
  photo: string | null;
  role?: string
  telefone?: string | null;
  comentarios?: Comment[];
  roteiro?: any;
  state?: boolean
}

  export async function getPontoInterrese(sortBy: string) {
    const headers = new Headers();
    const res = await fetch(`http://localhost:8080/brazu/pontos?sort=${sortBy}`, {
      method: 'GET',
      headers: headers
    });
    const pontoInterrese = await res.json();
    return pontoInterrese;
  }
  
  export async function getUsers() {
    const headers = new Headers();
    const res = await fetch(`http://localhost:8080/auth/users`, {
      method: 'GET',
      headers: headers
    });
    const users = await res.json();
    return users;
  }
  export async function getPontoInterreseFilter(category: string) {
    const headers = new Headers();
    const res = await fetch(`http://localhost:8080/brazu/pontos?categoria=${category}`, {
      method: 'GET',
      headers: headers
    });
    const pontoInterrese = await res.json();
    return pontoInterrese;
  }

  export async function getPontoInterreseSearch(search: string) {
    const headers = new Headers();
    const res = await fetch(`http://localhost:8080/brazu/pontos?search=${search}`, {
      method: 'GET',
      headers: headers
    });
    const pontoInterrese = await res.json();
    return pontoInterrese;
  }
  
  
  export async function getPontoInterreseById(id: number) {
    const headers = new Headers();
    const res = await fetch(`http://localhost:8080/brazu/pontos/${id}`,
      {
        method: 'GET',
        headers: headers
      }
    );
    const pontoInterrese = await res.json();
    return pontoInterrese;

  }

  
  
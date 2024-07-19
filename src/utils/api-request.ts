export type PontoInterrese = {
    id: number;
    fotos: string;
    descricao: string;
    nome: string;
    nota: number;
    cep: string;
    dataDeCriacao: string,
    state: boolean
  };
  
  export async function getPontoInterrese(sortBy: string) {
    const res = await fetch(`http://localhost:8080/brazu/pontos?sort=${sortBy}`);
    const pontoInterrese = await res.json();
    return pontoInterrese;
  }
  
  
  export async function getPontoInterreseById(id: number) {
    const res = await fetch(`http://localhost:8080/brazu/pontos/${id}`);
    const pontoInterrese = await res.json();
    return pontoInterrese;

  }
  
import { tokenAtom, User } from '@/context/Atom';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface Credentials {
  login: string;
  password: string;
}

interface CredentialRegister{
  login: string;
  password: string;
  role: string;
  name?: string,
  telefone?: string
}


interface UserDetails {
  id: string;
  login: string;
  state: string | null;
  username?: string;
  password?: string; 
  photo?: string | null;
  role: string;
  telefone?: string | null;
  comentarios?: string[]; 
  roteiro?: string | null;
  authorities?: Authority[];
  enabled?: boolean;
  accountNonExpired?: boolean;
  credentialsNonExpired?: boolean;
  accountNonLocked?: boolean;
}
interface Authority {
  authority: string;
}
interface Recover{
  login: string
}

export const loginRequest = async (credentials: Credentials) => {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json();
    localStorage.setItem('token', data.token as string);
    localStorage.setItem('role', data.role as string);
    localStorage.setItem('login', data.login as string);
    return data;
  };

  export const RegisterRequest = async (credentials: CredentialRegister ) => {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
  };
  
  export const SendPassword = async (email: String) => {
    const response = await fetch('http://localhost:8080/auth/send-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: email})
    });
  
    if (!response.ok) {
      throw new Error('Password recovery failed');
    }
  
    return response.text(); 
  };
  
  export const fetchUserDetails = async (token: string) => {
    const response = await fetch(`http://localhost:8080/auth/user`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do usuário');
    }
  
    return response.json();
  };
  
  export const UpdateUserDetails = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/auth/user`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do usuário');
    }
  
    return response.json();
  };
  
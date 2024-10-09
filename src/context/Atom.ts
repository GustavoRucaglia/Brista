import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface User{
    login: string;
    token: String;
    role: string;
  }

export const userAtom = atom<User | null>(null);
const isServer = typeof window === 'undefined';
export const tokenAtom =atom<string | null>('token');
export const RoleAtom = atomWithStorage('role', null);
export const persistentAtom = atomWithStorage<User | null>('user', null);
import axios from 'axios';
import type { PokemonListItem, PokemonDetails } from '@/types/pokemon';

const API = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

// Obtener lista de Pokémon
export const fetchPokemons = async (): Promise<{ results: PokemonListItem[] }> => {
  const response = await API.get('/pokemon');
  return response.data;
};

// Obtener detalles de un Pokémon
export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const response = await API.get(`/pokemon/${name}`);
  return response.data;
};

// src/stores/pokemonStore.ts
import { defineStore } from 'pinia';
import type { PokemonDetails, PokemonListItem } from '@/types/pokemon';
import { fetchPokemons, fetchPokemonDetails } from '@/services/apiService';
import type { AxiosError } from 'axios';

interface PokemonState {
  pokemons: PokemonListItem[];
  selectedPokemon: PokemonDetails | null;
  isDialogOpen: boolean;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  pokemonDetailsCache: Record<string, PokemonDetails>;
}

interface ErrorWithMessage {
  message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  );
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => ({
    pokemons: [],
    selectedPokemon: null,
    isDialogOpen: false,
    isLoading: false,
    error: null,
    searchQuery: '',
    pokemonDetailsCache: {},
  }),
  getters: {
    filteredPokemons: (state) => {
      if (!state.searchQuery) {
        return state.pokemons;
      }
      return state.pokemons.filter((pokemon: PokemonListItem) =>
        pokemon.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
      );
    },
  },
  actions: {
    async loadPokemons() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await fetchPokemons();
        this.pokemons = data.results || [];
      } catch (error: unknown) {
        // Usamos unknown aquí
        if (isErrorWithMessage(error)) {
          this.error = error.message || 'Error al cargar la lista de Pokémon.';
        } else {
          this.error = 'Ocurrió un error desconocido al cargar la lista de Pokémon.';
        }
      } finally {
        this.isLoading = false;
      }
    },
    async loadPokemonDetails(name: string) {
      if (this.pokemonDetailsCache[name]) {
        this.selectedPokemon = this.pokemonDetailsCache[name];
        return;
      }

      this.isLoading = true;
      this.error = null;
      try {
        const details = await fetchPokemonDetails(name);
        this.selectedPokemon = details;
        this.pokemonDetailsCache[name] = details;
      } catch (error: unknown) {
        // Usamos unknown aquí
        if (isErrorWithMessage(error)) {
          this.error = error.message || `Error al cargar los detalles de ${name}.`;
        } else {
          this.error = 'Ocurrió un error desconocido al cargar los detalles del Pokémon.';
        }
        this.selectedPokemon = null;
      } finally {
        this.isLoading = false;
      }
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
      this.selectedPokemon = null;
    },
    async fetchAllPokemon() {
      await this.loadPokemons();
    },
    async fetchPokemonDetailsByName(name: string) {
      await this.loadPokemonDetails(name);
    },
  },
});

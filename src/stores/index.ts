import { createPinia } from 'pinia';
import { usePokemonStore } from './pokemonStore';

const pinia = createPinia();

export { pinia, usePokemonStore };

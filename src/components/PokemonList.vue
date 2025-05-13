<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore';
import PokemonDetail from '@/components/PokemonDetail.vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import type { Pokemon } from 'src/types/pokemon';

const pokemonStore = usePokemonStore();
const { pokemons, selectedPokemon, isDialogOpen } = storeToRefs(pokemonStore);

const props = defineProps<{
  pokemon: Pokemon;
}>();

const frontSprite = computed(() => props.pokemon.sprites?.front_default ?? undefined);

// Al hacer clic en un Pokémon
const selectPokemon = async (name: string) => {
  await pokemonStore.loadPokemonDetails(name);
  pokemonStore.openDialog(); // Abre el diálogo
};
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
    <q-card 
      v-for="pokemon in pokemons" 
      :key="pokemon.name"
      class="cursor-pointer hover:scale-105 transition-transform"
      @click="selectPokemon(pokemon.name)"
    >
      <q-img :src="frontSprite" class="h-48" />
      <q-card-section class="text-center">
        <span class="text-lg font-bold capitalize">{{ pokemon.name }}</span>
      </q-card-section>
    </q-card>

    <!-- Diálogo de detalles -->
    <PokemonDetail 
      v-model="isDialogOpen"
      :selectedPokemon="selectedPokemon"
    />
  </div>
</template>
<template>
  <q-card-section>
    <div v-if="selectedPokemon">
      <p>ID: {{ selectedPokemon.id }}</p>
      <p>Weight: {{ selectedPokemon.weight }}</p>
      <p>Height: {{ selectedPokemon.height }}</p>
      <div>
        Types:
        <span v-for="type in selectedPokemon.types" :key="type.slot" class="q-ml-sm">{{ type.type.name }}</span>
      </div>
      <div>
        Abilities:
        <span v-for="ability in selectedPokemon.abilities" :key="ability.slot" class="q-ml-sm">{{ ability.ability.name }}</span>
      </div>
      </div>
    <div v-else>
      <p>No se han cargado los detalles del Pokémon.</p>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import type { PokemonDetails } from 'src/types/pokemon';

defineProps<{
  selectedPokemon?: PokemonDetails | null;
}>();
</script>

<style lang="scss" scoped>
// Estilos específicos para el detalle del Pokémon si es necesario
</style>
<template>
  <q-page class="q-pa-md page-background">
    <div class="row justify-center q-mb-lg">
      <div class="col-12 text-center">
        <img
          src="~assets/pokemon-logo.png"
          alt="Pokémon Logo"
          style="max-height: 100px; margin-bottom: 1rem"
        />
      </div>
    </div>

    <search-bar @search="handleSearch" class="q-mb-lg" />

    <div
      v-if="pokemonStore.isLoading"
      class="row justify-center items-center"
      style="min-height: 50vh"
    >
      <q-spinner-pie color="primary" size="3em" />
      <div class="q-ml-md text-h6">Cargando Pokémon...</div>
    </div>

    <div
      v-else-if="pokemonStore.error"
      class="row justify-center items-center text-negative"
      style="min-height: 50vh"
    >
      <q-icon name="warning" size="2em" class="q-mr-sm" />
      <div>Error: {{ pokemonStore.error }}</div>
      <q-btn label="Reintentar" color="primary" @click="retryFetch" class="q-mt-md" />
    </div>

    <div
      v-else-if="filteredPokemonList.length === 0 && pokemonStore.searchQuery"
      class="row justify-center items-center text-grey-7"
      style="min-height: 30vh"
    >
      <q-icon name="sentiment_dissatisfied" size="2em" class="q-mr-sm" />
      <div>No se encontraron Pokémon para "{{ pokemonStore.searchQuery }}"</div>
    </div>

    <div v-else class="row q-col-gutter-md justify-center">
      <div
        v-for="pokemonItem in paginatedPokemonList"
        :key="pokemonItem.name"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 flex justify-center"
      >
        <pokemon-card
          :pokemon-item="pokemonItem"
          :pokemon-details="getPreloadedDetails(pokemonItem.name)"
          @selected="showPokemonDetails"
          style="width: 100%; max-width: 240px"
        />
      </div>
    </div>

    <div
      v-if="
        !pokemonStore.isLoading &&
        filteredPokemonList.length > itemsPerPage &&
        filteredPokemonList.length > 0
      "
      class="row justify-center q-mt-xl"
    >
      <q-pagination
        v-model="currentPage"
        :max="totalPages"
        :max-pages="7"
        direction-links
        boundary-numbers
        icon-first="first_page"
        icon-last="last_page"
        icon-prev="chevron_left"
        icon-next="chevron_right"
        color="primary"
        active-design="unelevated"
        active-color="primary"
        active-text-color="white"
      />
    </div>

    <q-dialog v-model="showDetailsModal" persistent>
      <q-card style="min-width: 350px; max-width: 90vw; width: 500px">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title class="text-capitalize">
            {{ pokemonStore.selectedPokemon?.name }}
          </q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <pokemon-detail
          v-if="pokemonStore.selectedPokemon"
          :selected-pokemon="pokemonStore.selectedPokemon"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { usePokemonStore } from 'src/stores/pokemonStore';
import type { PokemonDetails, PokemonListItem } from 'src/types/pokemon';
import SearchBar from 'src/components/SearchBar.vue';
import PokemonCard from 'src/components/pokemonCard.vue';
import PokemonDetail from 'src/components/PokemonDetail.vue';

const pokemonStore = usePokemonStore();
// const router = useRouter(); // Si usas navegación por rutas

const showDetailsModal = ref(false);

// Paginación
const currentPage = ref(1);
const itemsPerPage = ref(18);

const filteredPokemonList = computed(() => {
  const query = pokemonStore.searchQuery.toLowerCase().trim();
  if (!query) {
    return pokemonStore.pokemons;
  }
  return pokemonStore.pokemons.filter(
    (
      pokemon: PokemonListItem, // Especificamos el tipo
    ) => pokemon.name.toLowerCase().includes(query),
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredPokemonList.value.length / itemsPerPage.value);
});

const paginatedPokemonList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredPokemonList.value.slice(start, end);
});

watch(filteredPokemonList, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = Math.max(1, totalPages.value);
  }
});
watch(totalPages, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = Math.max(1, totalPages.value);
  }
});

const handleSearch = (query: string) => {
  pokemonStore.setSearchQuery(query);
  currentPage.value = 1;
};

const showPokemonDetails = async (pokemonName: string) => {
  await pokemonStore.loadPokemonDetails(pokemonName);
  if (pokemonStore.selectedPokemon) {
    showDetailsModal.value = true;
  }
};

const getPreloadedDetails = (name: string): PokemonDetails | undefined => {
  return pokemonStore.pokemonDetailsCache[name];
};

const retryFetch = async () => {
  await pokemonStore.loadPokemons();
};

onMounted(async () => {
  if (pokemonStore.pokemons.length === 0) {
    await pokemonStore.loadPokemons();
  }
});
</script>

<style lang="scss" scoped>
.page-background {
  background-color: #f4f6f8;
}

.flex.justify-center > .pokemon-card {
  min-height: 100%;
}
</style>

<template>
  <q-card
    class="pokemon-card q-ma-sm cursor-pointer column items-center"
    @click="selectPokemon"
    v-ripple
    :class="{ selected: isSelected }"
    role="button"
    :aria-label="`Ver detalles de ${pokemon?.name}`"
    tabindex="0"
    @keydown.enter="selectPokemon"
    @keydown.space="selectPokemon"
  >
    <q-responsive :ratio="1" class="q-pa-sm full-width">
      <q-img
        :src="imageUrl"
        :alt="`Imagen de ${pokemon?.name}`"
        fit="contain"
        class="pokemon-image"
        placeholder-src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      >
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            No se pudo cargar la imagen
          </div>
        </template>
      </q-img>
    </q-responsive>

    <q-card-section class="text-center q-pt-xs q-pb-sm">
      <div class="text-subtitle2 text-weight-bold text-capitalize ellipsis">
        {{ pokemon?.name || 'Desconocido' }}
      </div>
      <div class="text-caption text-grey-7">#{{ String(pokemonId).padStart(4, '0') }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none q-pb-sm full-width text-center">
      <div v-if="pokemonTypes.length" class="q-gutter-xs">
        <span
          v-for="typeInfo in pokemonTypes"
          :key="typeInfo.type.name"
          class="pokemon-type-badge"
          :class="`type-${typeInfo.type.name.toLowerCase()}`"
        >
          {{ typeInfo.type.name }}
        </span>
      </div>
      <div v-else class="text-caption text-grey-7">Tipos no disponibles</div>
    </q-card-section>

    <transition name="lift">
      <div v-if="isHovered" class="overlay-info"></div>
    </transition>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Pokemon, PokemonListItem, PokemonType } from 'src/types/pokemon';
import { usePokemonStore } from 'src/stores/pokemonStore';

defineProps<{
  pokemonItem: PokemonListItem;
  pokemonDetails?: PokemonDetails;
  onSelected?: (pokemon: PokemonDetails) => void;
}>();

const emit = defineEmits(['selected']);

const pokemonStore = usePokemonStore();
const localPokemonData = ref<Pokemon | null>(null);
const isLoading = ref(false);
const isHovered = ref(false);

// Lógica para obtener ID del Pokémon desde la URL de la PokeAPI
const pokemonId = computed(() => {
  if (localPokemonData.value) return localPokemonData.value.id;
  if (props.pokemonDetails) return props.pokemonDetails.id;

  const url = props.pokemonItem?.url;
  if (url && typeof url === 'string') {
    const parts = url.split('/');
    const idString = parts[parts.length - 2];
    const id = parseInt(idString, 10);
    return isNaN(id) ? 0 : id;
  }

  return 0;
});

const pokemon = computed(() => localPokemonData.value || props.pokemonDetails);

// Prioriza la imagen 'official-artwork', luego 'dream_world', luego 'front_default'
const imageUrl = computed(() => {
  const sprites = pokemon.value?.sprites;
  return (
    sprites?.other?.['official-artwork']?.front_default ??
    sprites?.other?.dream_world?.front_default ??
    sprites?.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId.value}.png`
  );
});

const pokemonTypes = computed<PokemonType[]>(() => {
  return pokemon.value?.types || [];
});

const isSelected = computed(() => {
  return pokemonStore.selectedPokemon?.id === pokemonId.value;
});

const selectPokemon = () => {
  if (pokemon.value) {
    emit('selected', pokemon.value.name);
  } else if (props.pokemonItem) {
    emit('selected', props.pokemonItem.name);
  }
};

// Cargar detalles básicos si no se proveyeron
async function fetchBasicDetails() {
  if (!props.pokemonDetails && props.pokemonItem && !localPokemonData.value) {
    isLoading.value = true;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`);
      if (!response.ok) throw new Error('Network response was not ok');
      localPokemonData.value = (await response.json()) as Pokemon; // Casting a Pokemon
    } catch (error) {
      console.error('Error fetching Pokémon details for card:', error);
      // Aquí podrías poner un estado de error en la tarjeta
    } finally {
      isLoading.value = false;
    }
  } else if (props.pokemonDetails) {
    localPokemonData.value = props.pokemonDetails;
  }
}

onMounted(() => {
  void fetchBasicDetails();
});
</script>

<style lang="scss" scoped>
.pokemon-card {
  width: 100%;
  max-width: 220px;
  border-radius: 12px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &:hover,
  &:focus-within {
    transform: translateY(-8px) scale(1.03);
    box-shadow:
      0 10px 20px rgba(var(--q-color-primary-rgb), 0.3),
      0 6px 6px rgba(var(--q-color-primary-rgb), 0.25);
  }

  &.selected {
    border: 2px solid $primary;
    box-shadow: 0 0 15px $primary;
  }
}

.pokemon-image {
  width: 100%;
  height: 150px;
  object-fit: contain;
  transition: transform 0.3s ease;
  padding: 8px;
  .pokemon-card:hover & {
    transform: scale(1.1);
  }
}

.q-card__section {
  width: 100%;
}

.lift-enter-active,
.lift-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.lift-enter-from,
.lift-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.overlay-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  text-align: center;
}
</style>

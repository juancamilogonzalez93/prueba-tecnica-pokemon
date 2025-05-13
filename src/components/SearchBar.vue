<template>
  <q-input
    v-model="searchTerm"
    placeholder="Buscar Pokémon..."
    @update:model-value="emitSearch"
    debounce="500"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchTerm = ref<string | null>(''); // El ref también puede ser null
const emit = defineEmits(['search']);

const emitSearch = (value: string | number | null) => {
  emit('search', String(value)); // Aseguramos que el valor emitido sea un string
};
</script>

<style lang="scss" scoped>
.search-bar {
  // Quasar q-input ya es bastante estilizado, pero puedes añadir más aquí
  // Ejemplo: un borde más temático o sombra
  :deep(.q-field__control) {
    border-radius: 25px; // Hacerlo más redondeado
    background-color: #fff; // Fondo blanco para contraste
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  :deep(.q-field__prepend .q-icon) {
    color: $primary; // Usar color primario de Quasar
  }
}
</style>
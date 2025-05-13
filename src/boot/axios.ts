import { boot } from 'quasar/wrappers'; // <--- Usa "boot" en lugar de "defineBoot"
import axios, { type AxiosInstance } from 'axios';
import type { App } from 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2' });

export default boot(({ app }: { app: App }) => {
  // <--- Usa "boot"
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

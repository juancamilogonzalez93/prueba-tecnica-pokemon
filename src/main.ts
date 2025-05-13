// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import './assets/main.css';

const app = createApp(App);

// Crear y usar Pinia
const pinia = createPinia();
app.use(pinia);

// Usar Vue Router
app.use(router);

app.mount('#app');

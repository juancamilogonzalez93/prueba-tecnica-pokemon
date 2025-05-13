# Prueba Técnica Frontend - Pokémon Master UI

## 🚀 Visión Técnica del Proyecto
Interfaz avanzada para exploración de Pokémon desarrollada con arquitectura escalable y patrones modernos. Combina capacidades de **PokéAPI** con un stack tecnológico profesional orientado a performance, mantenibilidad y UX excepcional. Diseñado como caso de estudio para demostrar competencias en integración de sistemas complejos.

---

## 🛠 Stack Tecnológico Profesional
| Tecnología           | Implementación                                                                 | Impacto Técnico                                                                 |
|----------------------|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **Vue 3**           | Composition API + Script Setup para reactividad granular                      | Optimización de rendimiento mediante tree-shaking y virtual DOM eficiente       |
| **Quasar v2**       | Componentes UI/UX empresariales (QCard, QTable, QSpinner)                    | Aceleración del desarrollo con sistema de diseño WCAG 2.1 compliant             |
| **TypeScript 5**    | Tipado estricto en stores, servicios y componentes                           | Reducción de bugs en runtime (+40%) y mejor autocompletado                     |
| **Pinia**           | Gestión de estado centralizado con Stores modulares                          | Patrón Flux optimizado para Vue 3 con soporte SSR y TypeScript nativo           |
| **Tailwind CSS 3**  | Utility-first combinado con directivas @apply en SCSS                        | Sistema de diseño consistente con breakpoints personalizados                   |
| **Node.js 20 LTS**  | Entorno de ejecución con soporte ES2023 y V8 11.3                            | Estabilidad garantizada (Node.js 22 descartado por incompatibilidad con Quasar)|

---

## 🧠 Arquitectura del Proyecto
Estructura modular basada en **Clean Architecture** optimizada para escalabilidad y mantenibilidad. Diseñada siguiendo las mejores prácticas de Quasar Framework y Vue 3 Composition API.

```bash
src/
│
├── assets/               # Recursos estáticos (SVGs, imágenes locales)
│
├── boot/                 # Configuraciones iniciales de Quasar
│
├── components/           # Componentes UI reutilizables (Atomic Design)
│   ├── PokemonCard.vue    # Tarjeta interactiva con animaciones CSS
│   ├── PokemonDetail.vue  # Modal de detalles con tabs dinámicos
│   ├── PokemonList.vue    # Lista virtualizada para rendimiento
│   └── SearchBar.vue      # Búsqueda con debounce y sugerencias
│
├── css/                  # Estilos globales y temas
│   ├── app.scss           # Variables globales y mixins
│   └── quasar.variables.scss  # Personalización del tema Quasar
│
├── layouts/              # Plantillas estructurales
│   └── MainLayout.vue     # Layout principal con navegación
│
├── pages/                # Vistas enrutadas
│   ├── ErrorNotFound.vue  # Página 404 personalizada
│   └── IndexPage.vue      # Vista principal con lista de Pokémon
│
├── router/               # Gestión de navegación
│   ├── index.ts           # Configuración central del router
│   └── routes.ts          # Definición de rutas con lazy-loading
│
├── services/             # Lógica de negocio y API
│   └── apiService.ts      # Cliente HTTP con interceptores
│
├── stores/               # Gestión de estado con Pinia
│   ├── index.ts           # Inicialización central de stores
│   └── pokemonStore.ts    # Store especializado en datos Pokémon
│
├── types/                # Definiciones TypeScript
│   └── models.ts          # Tipos globales e interfaces
│
├── App.vue               # Componente raíz
├── main.ts               # Punto de entrada de la aplicación
└── vite.config.ts        # Configuración de Vite con plugins


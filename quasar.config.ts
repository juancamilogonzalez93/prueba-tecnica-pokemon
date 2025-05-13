import { defineConfig } from 'quasar/wrappers';
import path from 'path';

export default defineConfig(() => {
  return {
    css: ['app.scss'],

    extras: ['roboto-font', 'material-icons'],

    build: {
      vueRouterMode: 'hash',

      alias: {
        '@': path.resolve(__dirname, './src'),
        app: path.resolve(__dirname, './src'),
      },

      typescript: {
        strict: true,
        vueShim: true,
      },

      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            vueTsc: true,
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {
        brand: {
          primary: '#FF5252',
          secondary: '#FFD166',
          accent: '#06D6A0',
        },
      },
      plugins: [],
    },

    animations: [],

    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
      pwa: false,
    },

    pwa: {
      workboxMode: 'GenerateSW',
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'linktic-test',
      },
    },

    bex: {
      extraScripts: [],
    },
  };
});

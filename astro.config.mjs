import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    AstroPWA({
      manifest: {
        "display": "standalone",
        "display_override": ['window-controls-overlay'],
        "name": "WeatherWise App",
        "short_name": "WeatherWise",
        "display": "standalone",
        "theme_color": "#3E3D40",
        "background_color": "#131214",
        "description": "Consultas de clima en tiempo real.",
        "icons": [
          {
            "src": "/logo48x48.png",
            "sizes": "48x48",
            "type": "image/png"
          },
          {
            "src": "/logo72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "/logo96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "/logo144x144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/logo168x168.png",
            "sizes": "168x168",
            "type": "image/png"
          },
          {
            "src": "/logo192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/logo512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          }
        ],
      }
    })
  ],
  buildOptions: {
    rollupOptions: {
      external: ['workbox-window']
    }
  }
});
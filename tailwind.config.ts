import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  mode: 'jit',
  content: ['./src/components/**/*.{js,vue,ts}', './src/layouts/**/*.vue', './src/pages/**/*.vue', './src/app.vue', './src/error.vue', './src/plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    }
  },
  plugins: [daisyui]
} satisfies Config

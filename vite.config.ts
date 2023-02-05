import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({ reactivityTransform: true }),
        Components({
            dts: './src/components.d.ts',
            dirs: ['./src/pages', './src/components'],
        }),
        AutoImport({
            dts: './src/auto-imports.d.ts',
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
            ],
            imports: ['vue', 'vue-router'],
            dirs: ['./src/composables'],
            vueTemplate: true,
            eslintrc: {
                enabled: true,
            },
        }),
    ],
    build: {
        assetsDir: 'assets/sandbox',
    },
})

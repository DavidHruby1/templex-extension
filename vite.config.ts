import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/common/components', import.meta.url)),
            '@hooks': fileURLToPath(new URL('./src/common/hooks', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/common/utils', import.meta.url)),
            '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
        },
    },
})

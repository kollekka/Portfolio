import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = '/Portfolio/'

export default defineConfig({
  plugins: [react()],
  base,
})

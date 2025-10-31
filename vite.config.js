import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ustaw base na nazwę repozytorium, jeśli hostujesz w GitHub Pages
// Przykład: base: '/twoje-repo/'
// Możesz też ustawić zmienną środowiskową VITE_BASE podczas builda
const base = process.env.VITE_BASE || ''

export default defineConfig({
  plugins: [react()],
  base,
})

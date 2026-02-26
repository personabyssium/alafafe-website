import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Simple plugin to handle HTML partials injection
const htmlPartials = () => {
    return {
        name: 'html-partials',
        transformIndexHtml(html) {
            return html.replace(/<!--\s*@include\s+([\w-/]+)\s*-->/g, (match, partialName) => {
                const partialPath = path.resolve(__dirname, `src/partials/${partialName}.html`)
                try {
                    return fs.readFileSync(partialPath, 'utf-8')
                } catch (e) {
                    console.warn(`[html-partials] Could not find partial: ${partialName}`)
                    return match
                }
            })
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        htmlPartials()
    ],
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                auto: path.resolve(__dirname, 'auto.html'),
                habitation: path.resolve(__dirname, 'habitation.html'),
                sante: path.resolve(__dirname, 'sante.html'),
                voyage: path.resolve(__dirname, 'voyage.html'),
                prevoyance: path.resolve(__dirname, 'prevoyance.html'),
                particuliers: path.resolve(__dirname, 'particuliers.html'),
                entreprise: path.resolve(__dirname, 'entreprise.html'),
                'rc-pro': path.resolve(__dirname, 'rc-pro.html'),
                'flotte-auto': path.resolve(__dirname, 'flotte-auto.html'),
                'sante-collective': path.resolve(__dirname, 'sante-collective.html'),
                sinistres: path.resolve(__dirname, 'sinistres.html'),
                about: path.resolve(__dirname, 'about.html'),
                contact: path.resolve(__dirname, 'contact.html')
            }
        }
    }
})

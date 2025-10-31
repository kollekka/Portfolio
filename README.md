# Portfolio – Adrian

Frontendowe portfolio zbudowane w React + Vite. Skupia się na technologiach: Java, JavaScript, SQL (PostgreSQL) oraz MongoDB. Zawiera sekcje: O mnie, Umiejętności, Projekty, Certyfikaty.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

## Budowanie

```bash
npm run build
npm run preview
```

## Deploy na GitHub Pages

1. Ustal nazwę repozytorium. Jeśli repozytorium to np. `kollekka/portfolio`, ustaw base na `/portfolio/`.
2. Sposób 1 (szybki, bez zmian w plikach):
   - Podczas kompilacji ustaw zmienną środowiskową `VITE_BASE`:
     - Windows PowerShell:
       ```powershell
       $env:VITE_BASE="/portfolio/"; npm run build
       ```
   - Po buildzie zawartość folderu `dist` wrzuć do gałęzi `gh-pages` albo włącz Pages z folderu `docs` (możesz zmienić output na docs w vite.config gdy chcesz).

3. Sposób 2 (na stałe w pliku):
   - W pliku `vite.config.js` ustaw wartość `base: '/portfolio/'` i zbuduj projekt.

4. W repozytorium GitHub włącz Pages: Settings → Pages → Source: `Deploy from a branch` i wskaż gałąź oraz folder (np. `gh-pages` lub `root/dist` zależnie od Twojego przepływu).

## Edycja treści

Wszystkie informacje znajdują się w pliku `src/data.js`:
- `profile` – imię, tytuł, podsumowanie, akcenty
- `links` – GitHub, LinkedIn, email
- `skills` – grupy umiejętności
- `projects` – lista projektów (tytuł, opis, tech, linki)
- `certificates` – lista certyfikatów (nazwa, wystawca, link)

## Dostosowanie stylów

Główne style: `src/index.css` (global) i `src/App.css` (sekcje). Układ inspirowany minimalnym portfolio adityasri.in.

## TODO (opcjonalnie)
- Dodać favicon i własne logo (umieść w `public` i zaktualizuj `index.html`).
- Uzupełnić sekcję certyfikatów i projektów.
- Podmienić opisy na podstawie CV.

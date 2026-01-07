# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```
Palyan
├─ .qodo
│  ├─ agents
│  └─ workflows
├─ components.json
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ App.tsx
│  │  └─ styles
│  │     ├─ index.css
│  │     ├─ reset.css
│  │     └─ variables
│  │        └─ global.css
│  ├─ assets
│  │  ├─ icons
│  │  │  ├─ am.svg
│  │  │  ├─ arrow.svg
│  │  │  ├─ beef.svg
│  │  │  ├─ bird.svg
│  │  │  ├─ calendar.svg
│  │  │  ├─ collapse.svg
│  │  │  ├─ fb.svg
│  │  │  ├─ horse.svg
│  │  │  ├─ ig.svg
│  │  │  ├─ in.svg
│  │  │  ├─ leaf.svg
│  │  │  ├─ life.svg
│  │  │  ├─ mail.svg
│  │  │  ├─ pass.svg
│  │  │  ├─ phish.svg
│  │  │  ├─ phone.svg
│  │  │  ├─ pig.svg
│  │  │  ├─ rabbit.svg
│  │  │  ├─ round.svg
│  │  │  ├─ search.svg
│  │  │  ├─ sheep.svg
│  │  │  ├─ spider.svg
│  │  │  ├─ trash.svg
│  │  │  ├─ w.svg
│  │  │  └─ x.svg
│  │  └─ images
│  │     ├─ animalCardShape.png
│  │     ├─ basket.png
│  │     ├─ catalog.png
│  │     ├─ dirofen.png
│  │     ├─ faq.png
│  │     ├─ hero.png
│  │     ├─ logo.svg
│  │     ├─ logoWhite.svg
│  │     ├─ medicine.png
│  │     ├─ news1.png
│  │     ├─ news2.png
│  │     ├─ news3.png
│  │     ├─ partner1.png
│  │     ├─ partner2.png
│  │     ├─ partner3.png
│  │     ├─ partner4.png
│  │     ├─ partner5.png
│  │     ├─ productShape.png
│  │     ├─ service1.png
│  │     ├─ service2.png
│  │     ├─ serviceShape.png
│  │     ├─ slogan.jpg
│  │     ├─ target.png
│  │     └─ we.png
│  ├─ components
│  │  ├─ atom
│  │  │  ├─ Button.tsx
│  │  │  ├─ Card.tsx
│  │  │  ├─ StatCard.tsx
│  │  │  ├─ Toaster.tsx
│  │  │  └─ Tooltip.tsx
│  │  ├─ layouts
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  └─ Sidebar.tsx
│  │  ├─ molecule
│  │  │  ├─ AnimalCard.tsx
│  │  │  ├─ Benefits.tsx
│  │  │  ├─ CartItem.tsx
│  │  │  ├─ FilterPanel.tsx
│  │  │  ├─ Hero.tsx
│  │  │  ├─ OrderSummary.tsx
│  │  │  ├─ ProductCard.tsx
│  │  │  ├─ ServiceCard.tsx
│  │  │  └─ SubsectionPanel.tsx
│  │  ├─ organism
│  │  │  └─ ProductFilterSystem.tsx
│  │  └─ pages
│  │     ├─ AdminDashboard.tsx
│  │     ├─ CartPage.tsx
│  │     ├─ Catalog.tsx
│  │     ├─ Home.tsx
│  │     ├─ News.tsx
│  │     ├─ NewsDetails.tsx
│  │     └─ ProductDetails.tsx
│  ├─ constants
│  │  ├─ animalTypes.ts
│  │  ├─ catalog.ts
│  │  ├─ headerMenu.ts
│  │  └─ services.ts
│  ├─ hooks
│  ├─ i18n
│  │  ├─ i18n.ts
│  │  └─ locales
│  │     ├─ en.json
│  │     ├─ hy.json
│  │     └─ ru.json
│  ├─ main.tsx
│  ├─ routes
│  │  └─ Routes.tsx
│  ├─ stores
│  │  ├─ useCartStore.ts
│  │  └─ useFilterStore.ts
│  ├─ types
│  │  ├─ animalCard.ts
│  │  ├─ cart.ts
│  │  ├─ catalog.ts
│  │  ├─ headerMenu.ts
│  │  └─ serviceCard.ts
│  └─ utils
│     └─ cn.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.js
└─ vite.config.ts

```
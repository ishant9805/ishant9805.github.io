# Retro RPG Portfolio (Vue 3 + Vite)

A personal portfolio website styled like a playable retro 16-bit RPG/arcade menu: start screen → main menu → sections (character info, inventory/skills, quest board/projects, world map, achievements, contact portal). All portfolio content is loaded from a single text file.

## Features

- **Game-like UI flow**: Start screen, menu navigation, section “screens”, transitions.
- **Parallax background**: Multi-layer skyline/water scene behind the UI.
- **Keyboard controls**:
  - Menu: `↑/↓` or `W/S` to move, `Enter/Space` to select
  - Global: `Esc` returns to the main menu
- **8-bit SFX**: WebAudio oscillator-based sound effects + toggles.
- **Single-source content**: Loads from `public/about_me.txt` at runtime.

## Content Source

Edit:

- `public/about_me.txt`

The app fetches it from `/about_me.txt` and parses it in:

- `src/utils/contentParser.ts`

Note: the parser currently extracts a few fields (like summary) and fills the rest from defaults. If you change the text format, update `parseContent()` accordingly.

## Project Structure (Key Files)

- `src/App.vue` — screen-state “router”, loads portfolio data, wires controls
- `src/components/`
  - `StartScreen.vue` — title/start screen
  - `GameMenu.vue` — main menu
  - `AboutCharacter.vue` — about/character screen
  - `SkillInventory.vue` — skills as inventory
  - `QuestBoard.vue` — projects as quests
  - `WorldMap.vue` — education/journey map
  - `Achievements.vue` — badges/achievements
  - `ContactPortal.vue` — contact screen
  - `ParallaxBackground.vue` — decorative background layers
  - `SoundController.vue` — SFX/Music toggles
- `src/styles/global.css` — retro theme + CRT/pixel UI styling

## AI Image Prompt Comment Policy

Any decorative/background/sprite/icon-like UI element should include an HTML comment directly above it in the template in this exact format:

```html
<!-- AI IMAGE PROMPT:
Pixel art ...
-->
```

This project uses that convention throughout the UI components.

## Requirements

- Node: see the `engines.node` field in `package.json`

## Scripts

```sh
npm install
```

### Dev

```sh
npm run dev
```

### Type-check + build

```sh
npm run build
```

### Preview production build

```sh
npm run preview
```

## Deploy (GitHub Pages)

This is a static Vite build. The output is in `dist/` after:

```sh
npm run build
```

How you publish `dist/` depends on your GitHub Pages setup (Actions workflow vs. deploying a branch/folder). If you want, I can add an Actions workflow for Pages.

# chatbox

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Naming Conventions](#naming-conventions)
- [Usage](#usage)

## Tech Stack

- **Frontend Framework**: Vue.js
- **CSS Framework**: Tailwind CSS
- **UI Library**: Primevue
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Development Environment**: Visual Studio Code

## Getting Started

Provide instructions for setting up and running your API application locally.

### Prerequisites

List any prerequisites or dependencies that need to be installed/configured before using your API application.

**Must Have**

- Node.js v23.5.0

**Should Have**

- VS Code Extensions:
  - Prettier - Code formatter
  - Tailwind CSS IntelliSense
  - ESLint

### Installation

```sh

# Clone the repository
git clone https://github.com/forabbie/chatbox-fe.git

# Change directory to the project folder
cd chatbox-fe

# Install dependencies
npm install

# Lint with [ESLint](https://eslint.org/)
npm run lint

# Compile and Hot-Reload for Development
npm run dev

# Compile and Minify for Production
npm run build

```

## Naming Conventions

- **Folders**: kebab-case
- **Vue Files**: PascalCase
- **JS Files and Variables**: camelCase

## Usage

Folder structure

```sh
src/
│
├── assets/               # Static assets (images, fonts, etc.)
├── components/           # Reusable UI components
│   ├── common/           # Generic components (buttons, inputs, etc.)
│   ├── channels/         # Channel-related components (channel list, etc.)
│   ├── messages/         # Message-related components (message list, input box, etc.)
│   └── layout/           # Layout components (sidebar, header, etc.)
│
├── views/                # Route-level components (pages)
│   ├── HomeView.vue      # Main workspace view (channels + messages)
│   ├── AuthView.vue      # Authentication view (login/signup)
│   ├── SettingsView.vue  # User settings view
│   ├── ChannelView.vue   # Channel-specific view
│   └── NotFoundView.vue  # 404 page
│
├── router/               # Vue Router configuration
│   ├── routes/           # Modular route definitions
│   │   ├── auth.js       # Authentication routes
│   │   ├── workspace.js  # Workspace routes
│   │   └── settings.js   # Settings routes
│   └── index.js          # Main router setup
│
├── stores/               # Pinia stores
│   ├── auth.store.js     # Authentication store
│   ├── channels.store.js # Channels store
│   ├── messages.store.js # Messages store
│   └── index.js          # Pinia setup
│
├── services/             # API services and utilities
│   ├── api.js            # Axios instance and API calls
│   ├── auth.service.js   # Authentication-related services
│   └── channels.service.js # Channel-related services
│
├── utils/                # Utility functions
│   ├── helpers.js        # Helper functions (e.g., date formatting)
│   └── constants.js      # Constants (e.g., route names, API endpoints)
│
├── styles/
│   ├── components/         # Component-specific styles
│   │   ├── _buttons.scss   # Reusable button styles
│   │   ├── _inputs.scss    # Reusable input styles
│   │   ├── _navbar.scss    # Navbar styles
│   ├── utilities/          # Custom utility classes
│   │   ├── _spacing.scss   # Custom spacing utilities
│   │   ├── _typography.scss # Custom typography utilities
│   └── main.scss           # Main SCSS file to import all styles
│
├── tailwind.css          # Tailwind CSS file
├── App.vue               # Root component
└── main.js               # Entry point
```

### Installed Packages

This project uses various dependencies and development tools for an optimized development experience.

#### Dependencies

These are required packages for the project to function:

- **[@primevue/themes](https://www.npmjs.com/package/@primevue/themes)** – Provides themes for PrimeVue components.
- **[axios](https://www.npmjs.com/package/axios)** – HTTP client for making API requests.
- **[crypto-js](https://www.npmjs.com/package/crypto-js)** – Library for cryptographic operations like hashing and encryption.
- **[pinia](https://pinia.vuejs.org/)** – State management for Vue 3.
- **[primevue](https://www.primefaces.org/primevue/)** – UI component library for Vue.
- **[vue](https://vuejs.org/)** – JavaScript framework for building user interfaces.
- **[vue-router](https://router.vuejs.org/)** – Official router for Vue.js.

#### Dev Dependencies

These are tools used for development, linting, and styling:

- **[@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue)** – Plugin for Vue support in Vite.
- **[@vue/eslint-config-prettier](https://www.npmjs.com/package/@vue/eslint-config-prettier)** – ESLint configuration that disables formatting rules conflicting with Prettier.
- **[autoprefixer](https://www.npmjs.com/package/autoprefixer)** – Automatically adds vendor prefixes to CSS.
- **[eslint](https://eslint.org/)** – JavaScript linter to enforce coding standards.
- **[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)** – Disables conflicting rules between ESLint and Prettier.
- **[eslint-define-config](https://www.npmjs.com/package/eslint-define-config)** – Type-safe configuration helper for ESLint.
- **[eslint-plugin-vue](https://eslint.vuejs.org/)** – ESLint rules for Vue.js.
- **[postcss](https://postcss.org/)** – CSS transformation tool.
- **[prettier](https://prettier.io/)** – Code formatter for consistent styling.
- **[prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss)** – Sorts Tailwind CSS classes in a structured order.
- **[sass](https://sass-lang.com/)** – CSS preprocessor for writing modular styles.
- **[sass-embedded](https://www.npmjs.com/package/sass-embedded)** – Alternative Sass compiler for better performance.
- **[tailwindcss](https://tailwindcss.com/)** – Utility-first CSS framework.
- **[vite](https://vitejs.dev/)** – Next-generation frontend tooling for fast development.
- **[vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser)** – Parser for ESLint to analyze Vue files.

---

This setup ensures the project is optimized for **fast development, clean code, and modern UI components**. 🚀

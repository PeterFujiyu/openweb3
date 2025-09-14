# OpenWeb3 Wallet Extension

## Project Overview

OpenWeb3 is a modern Web3 wallet browser extension built with React 19, TypeScript, and Vite. The project implements a complete set of wallet features, including wallet creation, importation, password protection, and mnemonic phrase management. It features a modern user interface with support for dark/light themes and English/Chinese bilingual support.

## Core Technologies

*   **Frontend:** React 19, TypeScript 5.8, Vite 7.1
*   **Styling:** Tailwind CSS 3.4, Framer Motion 12.23, Lucide React
*   **Web3:** ethers.js v6.15, bip39 v3.1
*   **State Management:** Zustand 5.0
*   **Internationalization:** React-i18next 15.7
*   **Browser Extension:** Plasmo Framework 0.90 (in progress)

## Building and Running

### Environment Requirements

*   Node.js 18+
*   npm or yarn

### Development Commands

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Start the development server:**
    ```bash
    npm run dev
    ```
*   **Build for production:**
    ```bash
    npm run build
    ```
*   **Lint the code:**
    ```bash
    npm run lint
    ```
*   **Preview the production build:**
    ```bash
    npm run preview
    ```

## Development Conventions

*   **Code Style:** The project uses TypeScript with strict mode enabled. It follows the functional component pattern for React.
*   **Styling:** Styling is done using Tailwind CSS utility classes.
*   **Internationalization:** All user-facing text should be internationalized using `react-i18next`.
*   **Component Structure:** Components should adhere to the single-responsibility principle.
*   **Commit Style:** Use semantic commit messages.

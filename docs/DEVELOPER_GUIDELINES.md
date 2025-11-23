# Developer Guidelines

Welcome to the **Kalamna Dashboard** developer documentation. This guide is designed to help you understand the project structure, coding conventions, and best practices used in this application.

## 📂 Project Structure

The project follows a feature-based and modular architecture within the `src` directory.

```text
src/
├── api/                # API integration services (Axios/Fetch wrappers)
├── assets/             # Static assets (images, fonts, global styles)
├── components/         # Shared/Common UI components
│   ├── common/         # Generic components (Buttons, Inputs, Modals)
│   ├── layout/         # Layout components (Sidebar, Header)
│   └── ...             # Feature-specific shared components
├── context/            # React Context definitions (Global state)
├── layouts/            # Page layout wrappers (MainLayout, AuthLayout)
├── locales/            # i18n translation files (JSON)
├── pages/              # Page components (Route targets)
├── types/              # TypeScript type definitions and interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── i18n.ts             # Internationalization configuration
```

### Key Directories

- **`api/`**: Contains functions to interact with the backend. Each file typically corresponds to a specific domain (e.g., `auth.ts`, `chat.ts`).
- **`components/common/`**: Reusable UI elements that are agnostic to business logic.
- **`pages/`**: Components that represent full pages. These should primarily compose other components and handle page-level logic.
- **`context/`**: Used for global state management (e.g., `AuthContext`, `ThemeContext`).

## Naming Conventions

- **Files & Components**: Use **PascalCase** (e.g., `AuthLayout.tsx`, `PrimaryButton.tsx`).
- **Functions & Variables**: Use **camelCase** (e.g., `fetchUserData`, `isLoggedIn`).
- **Constants**: Use **UPPER_SNAKE_CASE** (e.g., `API_BASE_URL`).
- **Folders**: Use **kebab-case** for descriptive folder names if they don't directly map to a component class (though currently, we use a mix; prefer consistency with the existing pattern).

## Tech Stack & Tools

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Internationalization**: [react-i18next](https://react.i18next.com/)
- **Routing**: [React Router](https://reactrouter.com/)

## Internationalization (i18n)

We support **Arabic (ar)** and **English (en)**.
- Translation files are located in `src/locales/{lang}/translation.json`.
- Use the `useTranslation` hook to translate text in components.

```tsx
const { t } = useTranslation();
<h1>{t('welcome_message')}</h1>
```

## State Management

We use **React Context** for global state that needs to be accessed across the application, such as:
- User Authentication (`AuthContext`)
- UI Theme / Settings

For local component state, standard React `useState` and `useReducer` hooks are preferred.

## Contribution Workflow

1.  **Issues**: Pick your issue from the repository issues list.
2.  **Branching**: Create a new branch using the issue name/number.
3.  **Development**: Work on your branch.
4.  **Pull Requests**:
    - Open a PR with the same name as the issue.
    - Ensure your PR passes all CI/CD checks (linting, build, etc.) which will be set up soon.
    - Request review from peers.

## Styling Guidelines

- Use **Tailwind CSS** utility classes for styling.
- Avoid writing custom CSS in `.css` files unless absolutely necessary (e.g., for complex animations or third-party overrides).

## Getting Started from Scratch

If you are new to React or this is your first time setting up the project, follow these steps:

### 1. Install Prerequisites
- **Node.js**: Download and install the "LTS" version from [nodejs.org](https://nodejs.org/). This includes `npm` (Node Package Manager).
- **Git**: Download and install from [git-scm.com](https://git-scm.com/).
- **VS Code**: Recommended code editor. Download from [code.visualstudio.com](https://code.visualstudio.com/).

### 2. Recommended VS Code Extensions
Install these extensions for a better development experience:
- **ESLint**: For code quality and error checking.
- **Prettier - Code formatter**: For consistent code styling.
- **Tailwind CSS IntelliSense**: For autocomplete class names.
- **ES7+ React/Redux/React-Native snippets**: For helpful code snippets.

### 3. Setup the Project
1.  **Clone the Repo**:
    Open your terminal (or Git Bash) and run:
    ```bash
    git clone <repository-url>
    cd Kalamna-Dashboard
    ```

2.  **Install Dependencies**:
    This command reads `package.json` and `package-lock.json` to install the exact versions of the libraries required for the project into the `node_modules` folder.
    ```bash
    npm install
    ```
    > **Tip**: To add a new library (e.g., a date picker), run `npm install <library-name>`. To update existing libraries, run `npm update`.

3.  **Start Development Server**:
    This starts a local server so you can view the app in your browser.
    ```bash
    npm run dev
    ```
    Click the link shown in the terminal (usually `http://localhost:5173`) to open the app.

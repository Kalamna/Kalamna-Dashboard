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
<h1>{t("welcome_message")}</h1>;
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

## Deployment (Continuous Delivery)

We use **Vercel** for automatic deployments. This is how the CD (Continuous Delivery) pipeline works:

### 1. Automatic Production Deploys

- **Trigger**: When code is merged into the `main` branch.
- **Action**: Vercel automatically builds and deploys the new version to the live URL.
- **Result**: Users see the latest changes immediately.

### 2. Preview Deployments

- **Trigger**: When a Pull Request (PR) is opened or updated.
- **Action**: Vercel creates a unique "Preview URL" for that specific branch.
- **Result**: You can share this URL with the team to test features _before_ merging them.

### 3. Setup Instructions (For Admins)

1.  Go to [Vercel.com](https://vercel.com) and sign up/login.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select the **Kalamna-Dashboard** repository from GitHub.
4.  **Framework Preset**: Vercel will auto-detect "Vite".
5.  **Build Command**: `npm run build` (default).
6.  **Output Directory**: `dist` (default).
7.  Click **Deploy**.

Below is the **updated documentation section** rewritten cleanly so it clearly explains **how the CI/CD works, what every step does, and how developers should ensure their PRs pass all checks**.

You can copy/paste it directly into your docs.

---

# 🔄 Continuous Integration (CI)

We use **GitHub Actions** to automatically validate the quality and stability of the dashboard codebase.
Every Pull Request **must pass all CI checks** before it can be merged into `main`.

This ensures:

- No broken builds
- No TypeScript errors
- No formatting violations
- No lint issues
- No unused/dead exports sneaking into the codebase

---

## What the CI Pipeline Does

Our CI pipeline runs automatically on:

- **Every Pull Request → main**
- **Every push → main**

The pipeline performs the following checks:

### **1. Prettier Formatting Check**

Ensures that all code follows our standard formatting rules.

- Detects formatting issues
- Prevents inconsistent styling across the team

> Run locally before pushing:

```bash
npm run prettier:check
npm run prettier:write   # if you want to auto-fix issues
```

---

### **2. ESLint Linting**

Validates code quality and catches common mistakes using:

- React rules
- Accessibility rules
- Hooks rules
- TypeScript rules

> Run locally:

```bash
npm run lint
```

---

### **3. TypeScript Type Check (`tsc --noEmit`)**

This step **does not build**, it only verifies types.

It catches:

- Wrong prop types
- Incorrect function signatures
- “any” where it's not allowed
- Mismatched interface usage

> Run locally:

```bash
npm run tsc
```

---

### **4. Build Check**

Ensures the application compiles successfully using Vite.

A failing build means:

- Invalid imports
- Incorrect component exports
- Missing files
- Unused variables removed incorrectly

> Run locally:

```bash
npm run build
```

---

## How Developers Should Validate Locally Before Pushing

Before opening a Pull Request, **you must run all checks locally**:

### **1. Install project dependencies**

```bash
npm install
```

### **2. Format code**

```bash
npm run prettier:write
```

### **3. Run ESLint**

```bash
npm run lint
```

### **4. Run TypeScript check**

```bash
npm run tsc
```

### **5. Test the build**

```bash
npm run build
```

If all of the above pass locally → your PR will pass CI.

---

## Continuous Delivery (CD)

We use **Vercel** for deployment.

### **Production Deployment**

- Trigger: merge into `main`
- Action: Vercel automatically builds and deploys
- Users get the latest version instantly

### **PR Preview Deployments**

- Trigger: Pull Request is opened/updated
- Vercel creates a shareable preview URL
- Team can test UI & logic before merging

---

### Summary: What CI/CD Guarantees

By requiring every PR to pass these checks:

- We avoid broken builds
- We maintain consistent formatting
- We enforce React + TS best practices
- We prevent regressions
- We guarantee that everything deployed to production is stable

This keeps the dashboard codebase **clean, predictable, and production-ready**.

---

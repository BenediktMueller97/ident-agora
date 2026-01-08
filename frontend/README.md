# Ident Agora Frontend

Frontend application for the Ident Agora identity and verifiable credentials management system.

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Linting:** ESLint
- **Formatting:** Prettier

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8081`

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings:

```env
NEXT_PUBLIC_API_URL=http://localhost:8081
NEXT_PUBLIC_API_BASE_PATH=/api
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_REALM=ident-agora
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=frontend-client
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   ├── globals.css   # Global styles
│   │   ├── register/     # Registration page
│   │   └── login/        # Login page
│   ├── components/       # Reusable React components
│   │   └── Header.tsx    # Navigation header
│   ├── services/         # API service modules
│   │   ├── api.ts        # Axios client configuration
│   │   └── authService.ts # Authentication API calls
│   ├── hooks/            # Custom React hooks
│   │   └── useAuth.ts    # Authentication hook
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts      # Shared types
│   └── utils/            # Utility functions
├── public/               # Static assets
├── .env.example          # Example environment variables
├── .env.local            # Local environment variables (git-ignored)
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── postcss.config.mjs    # PostCSS configuration
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Integration

The frontend communicates with the backend API at `http://localhost:8081/api`. The API client is configured in `src/services/api.ts` with:

- Automatic request/response interceptors
- Error handling
- Support for authentication headers

### Example API Usage

```typescript
import { authService } from "@/services/authService";

// Register a new user
const user = await authService.register({
  email: "user@example.com",
  password: "password",
  firstName: "John",
  lastName: "Doe",
});

// Get current user
const currentUser = await authService.getCurrentUser(userId);
```

## Routing

The application uses Next.js App Router:

- `/` - Home page
- `/register` - User registration
- `/login` - User login

## Styling

Tailwind CSS is configured with:

- Custom color variables in `globals.css`
- Support for dark mode
- Custom utility classes

### Example Component with Tailwind

```typescript
export default function MyComponent() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-900">Hello World</h1>
    </div>
  );
}
```

## TypeScript

The project uses TypeScript with strict mode enabled. Type definitions are located in:

- `src/types/` - Shared type definitions
- Component files - Component-specific types

## Development Guidelines

1. **Components** - Keep components small and focused
2. **Hooks** - Use custom hooks for reusable logic
3. **Services** - Centralize API calls in service modules
4. **Types** - Define TypeScript types for all data structures
5. **Styling** - Use Tailwind CSS utility classes
6. **Formatting** - Run `npm run format` before committing

## Acceptance Criteria

- [x] Project starts without errors (`npm run dev`)
- [x] TypeScript compiles without errors
- [x] Grundstruktur is documented (folder structure and README)
- [x] Environment variables configured
- [x] Basic routing set up
- [x] Tailwind CSS integrated
- [x] ESLint and Prettier configured

## Next Steps

Future development tasks:

1. Implement complete registration form
2. Implement login form with Keycloak integration
3. Add protected routes and authentication guards
4. Implement verification status checking
5. Add verifiable credentials management UI
6. Add unit and integration tests
7. Improve error handling and user feedback

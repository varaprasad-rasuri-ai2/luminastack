# LuminaStack AI Studio

Scalable AI application starter kit using **Next.js**, **Docker**, **Prisma**, **PostgreSQL**, and **Mistral LLM** integration.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-luminastack.vercel.app-blue?style=for-the-badge)](https://luminastack.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-61dafb)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ed)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Production Deployment (Docker)](#production-deployment-docker)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Scripts Reference](#scripts-reference)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**LuminaStack AI Studio** is a full-stack AI chat application where users can ask questions and receive concise, markdown-formatted responses powered by Mistral AI. All conversations are persisted to PostgreSQL.

Key highlights:

- AI-powered chat with Mistral (`mistral-small` model)
- Markdown rendering for rich AI responses (headings, code blocks, lists, tables)
- System prompt tuned for concise, direct answers
- PostgreSQL persistence via Prisma ORM
- Multi-stage Docker build with Next.js standalone output
- Auto-migrations on container startup
- Health check endpoint for monitoring
- Works in both local development and production Docker without code changes

---

## Tech Stack

| Layer              | Technology                           |
| ------------------ | ------------------------------------ |
| **Frontend**       | Next.js 16.1.6 (App Router), React 19 |
| **Backend**        | Next.js API Routes                   |
| **AI**             | Mistral API (v1, `mistral-small`)    |
| **Database**       | PostgreSQL 15                        |
| **ORM**            | Prisma 5.7                           |
| **Styling**        | Tailwind CSS 4, @tailwindcss/typography |
| **Markdown**       | react-markdown, remark-gfm           |
| **Containerization** | Docker, Docker Compose             |
| **Runtime**        | Node.js 20 (Alpine)                  |
| **Language**       | TypeScript                           |

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   Browser (localhost:3000)                │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                  Next.js App (lumina-app)                 │
│                                                          │
│  ┌──────────────┐  ┌───────────────┐  ┌───────────────┐ │
│  │  App Router   │  │  API Routes   │  │  lib/         │ │
│  │  page.tsx     │  │  /api/chat    │  │  db.ts        │ │
│  │  layout.tsx   │  │  /api/health  │  │  mistral.ts   │ │
│  └──────────────┘  └───────┬───────┘  └───────┬───────┘ │
└────────────────────────────┼──────────────────┼──────────┘
                             │                  │
                ┌────────────┘                  └───────────┐
                ▼                                           ▼
     ┌─────────────────────┐                 ┌─────────────────────┐
     │  PostgreSQL (db)    │                 │  Mistral API        │
     │  Port 5432          │                 │  (external)         │
     └─────────────────────┘                 └─────────────────────┘
```

**Request flow:**

1. User types a message in the chat UI
2. Frontend sends a POST to `/api/chat`
3. The API route calls Mistral AI with a system prompt for concise answers
4. The response is saved to the `Chat` table in PostgreSQL
5. The saved record (id, prompt, response, timestamp) is returned
6. The frontend renders the response as formatted markdown

---

## Project Structure

```
luminastack/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   │   └── route.ts           # POST /api/chat — AI chat endpoint
│   │   │   └── health/
│   │   │       └── route.ts           # GET /api/health — DB health check
│   │   ├── layout.tsx                 # Root layout (fonts, metadata)
│   │   ├── page.tsx                   # Chat UI with markdown rendering
│   │   └── globals.css                # Tailwind + typography plugin
│   └── lib/
│       ├── db.ts                      # Prisma client singleton
│       └── mistral.ts                 # Mistral API wrapper with system prompt
│
├── prisma/
│   ├── schema.prisma                  # Database schema (Chat model)
│   └── migrations/                    # Auto-generated migration files
│
├── public/                            # Static assets
│
├── Dockerfile                         # Multi-stage build (standalone output)
├── docker-compose.yml                 # PostgreSQL + App orchestration
├── start.sh                           # Entrypoint: runs migrations, then starts app
├── .env.example                       # Environment variable template
├── .dockerignore                      # Excludes .env, node_modules, .next from image
├── package.json                       # Dependencies and scripts
├── next.config.ts                     # Next.js config (standalone output, React Compiler)
├── tsconfig.json                      # TypeScript config
└── README.md
```

---

## Prerequisites

- **Docker** and **Docker Compose** — [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Node.js 20+** — for local development only
- **Mistral API Key** — sign up at [console.mistral.ai](https://console.mistral.ai/)

---

## Local Development Setup

### 1. Clone and install

```bash
git clone https://github.com/your-username/luminastack.git
cd luminastack
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
```

Edit `.env` and add your Mistral API key. For local dev, use `127.0.0.1` as the DB host:

```env
POSTGRES_USER=anonymous
POSTGRES_PASSWORD=Conference!1
POSTGRES_DB=luminadb
DATABASE_URL=postgresql://anonymous:Conference!1@127.0.0.1:5432/luminadb
MISTRAL_API_KEY=your_actual_key_here
```

### 3. Start PostgreSQL

```bash
docker compose up db -d
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app hot-reloads on file changes.

---

## Production Deployment (Docker)

### Quick start

Create a `.env` file with your production credentials:

```env
POSTGRES_USER=anonymous
POSTGRES_PASSWORD=your_strong_password
POSTGRES_DB=luminadb
MISTRAL_API_KEY=your_mistral_api_key
```

Then run:

```bash
docker compose up --build -d
```

This will:

1. Build the Next.js app as a standalone production image
2. Start PostgreSQL with a health check
3. Wait until PostgreSQL is healthy before starting the app
4. Automatically run `prisma migrate deploy` to create/update tables
5. Start the Node.js production server on port 3000

### How it works under the hood

- **Dockerfile** uses a 3-stage build: install deps → build app → minimal production image
- **`output: "standalone"`** in `next.config.ts` produces a self-contained server (~50MB vs full node_modules)
- **`start.sh`** runs migrations then starts `node server.js`
- The app container **waits for the DB health check** before booting (`depends_on: condition: service_healthy`)
- Both services have `restart: always` for automatic recovery
- Secrets are read from environment variables, never baked into the image (`.env` is in `.dockerignore`)

### Useful commands

```bash
# Start everything
docker compose up --build -d

# View logs
docker compose logs -f

# View app logs only
docker compose logs -f app

# Stop everything
docker compose down

# Stop and delete database volume (reset data)
docker compose down -v

# Rebuild only the app
docker compose build app && docker compose up -d app
```

### Reverse proxy (optional)

For a custom domain, put Nginx in front:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Environment Variables

| Variable            | Description                        | Example                                              |
| ------------------- | ---------------------------------- | ---------------------------------------------------- |
| `POSTGRES_USER`     | PostgreSQL username                | `anonymous`                                          |
| `POSTGRES_PASSWORD` | PostgreSQL password                | `Conference!1`                                       |
| `POSTGRES_DB`       | PostgreSQL database name           | `luminadb`                                           |
| `DATABASE_URL`      | Full Prisma connection string      | `postgresql://anonymous:Conference!1@127.0.0.1:5432/luminadb` |
| `MISTRAL_API_KEY`   | API key from Mistral AI console    | `your_key_here`                                      |

**Important notes:**

- For **local dev**, `DATABASE_URL` should use `127.0.0.1` as the host
- For **Docker production**, `DATABASE_URL` is auto-constructed in `docker-compose.yml` using `db` as the host (Docker internal network)
- Never commit `.env` to version control — it's already in `.dockerignore` and should be in `.gitignore`

---

## API Endpoints

### POST `/api/chat`

Send a message and receive an AI response.

**Request:**

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is Docker?"}'
```

**Response (200):**

```json
{
  "id": "a8a9d39f-26ab-457b-aed8-d4122ffc3d35",
  "prompt": "What is Docker?",
  "response": "Docker is a platform for building, shipping, and running applications in containers...",
  "createdAt": "2026-02-20T13:40:21.752Z"
}
```

**Error responses:**

| Status | Body                              | Reason               |
| ------ | --------------------------------- | -------------------- |
| 400    | `{"error": "Message is required"}` | Missing `message` field |
| 500    | `{"error": "Server error"}`       | DB or internal failure |

---

### GET `/api/health`

Check application and database connectivity.

**Response (200):**

```json
{
  "status": "ok",
  "database": "connected"
}
```

**Response (503):**

```json
{
  "status": "error",
  "database": "disconnected"
}
```

---

## Database Schema

Single `Chat` model in `prisma/schema.prisma`:

```prisma
model Chat {
  id        String   @id @default(uuid())
  prompt    String
  response  String
  createdAt DateTime @default(now())
}
```

| Field       | Type     | Description              |
| ----------- | -------- | ------------------------ |
| `id`        | UUID     | Auto-generated unique ID |
| `prompt`    | String   | User's message           |
| `response`  | String   | AI-generated response    |
| `createdAt` | DateTime | Timestamp of creation    |

---

## Scripts Reference

| Script               | Command                          | Purpose                              |
| -------------------- | -------------------------------- | ------------------------------------ |
| `npm run dev`        | `next dev`                       | Start dev server with hot reload     |
| `npm run build`      | `prisma generate && next build`  | Generate Prisma client and build app |
| `npm start`          | `next start`                     | Run production build                 |
| `npm run lint`       | `eslint`                         | Lint the codebase                    |
| `npm run prisma:generate` | `prisma generate`           | Regenerate Prisma client             |
| `npm run prisma:migrate`  | `prisma migrate dev`        | Create and apply migrations (dev)    |

---

## Troubleshooting

### "Server error" on POST /api/chat

- Check if PostgreSQL is running: `docker compose ps`
- Verify `DATABASE_URL` in `.env` uses `127.0.0.1` (not `localhost` or `db`) for local dev
- Run migrations: `npx prisma migrate dev`

### "Can't reach database server"

- Ensure the DB container is running: `docker compose up db -d`
- Wait a few seconds for PostgreSQL to initialize
- Confirm port 5432 is not in use by another process

### Mistral API errors

- Verify `MISTRAL_API_KEY` is set and valid
- The app uses the `v1` endpoint: `https://api.mistral.ai/v1/chat/completions`
- Check your API quota at [console.mistral.ai](https://console.mistral.ai/)

### "Port 3000 is in use"

- Kill the existing process or use a different port:
  ```bash
  npx next dev -p 3001
  ```

### Lock file error ("is another instance of next dev running?")

- Stop all Node processes and remove the lock:
  ```bash
  # Windows
  Remove-Item .next\dev\lock -Force

  # macOS/Linux
  rm -f .next/dev/lock
  ```

### Prisma generate fails with EPERM on Windows

- This happens when Cursor's TypeScript server locks the Prisma engine DLL
- Close the IDE, run `npx prisma generate`, then reopen
- This does not affect the app if the client was previously generated

---

## Future Enhancements

- [ ] Streaming AI responses (SSE)
- [ ] User authentication (JWT)
- [ ] Chat session management (multiple conversations)
- [ ] File upload and processing
- [ ] Rate limiting and API quotas
- [ ] Admin dashboard
- [ ] Multi-model support (OpenAI, Claude, etc.)
- [ ] Voice-to-text input
- [ ] Export chat history

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

**Version:** 0.1.0
**Last Updated:** February 20, 2026

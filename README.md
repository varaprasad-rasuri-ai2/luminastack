# 🚀 LuminaStack AI Studio

A production-ready, full-stack AI web application built with **Mistral AI**, **Next.js**, **PostgreSQL**, and **Docker**.

![LuminaStack AI Studio](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-61dafb)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ed)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Setup Instructions](#-setup-instructions)
- [Docker Instructions](#-docker-instructions)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)

---

## 🎯 Overview

**LuminaStack AI Studio** is a Mistral-powered AI chat application with a modern Next.js frontend and PostgreSQL persistence. It demonstrates:

✅ AI integration (Mistral API)  
✅ Dockerized Next.js application  
✅ PostgreSQL database with Prisma ORM  
✅ RESTful API endpoints  
✅ Production-ready architecture  
✅ Docker Compose orchestration  

Perfect for developers learning AI + Docker, startups building AI SaaS MVPs, or as a portfolio project.

---

## 🧱 Tech Stack

| Layer            | Technology                  |
| ---------------- | --------------------------- |
| **Frontend**     | Next.js 16.1.6 (App Router) |
| **Backend**      | Next.js API Routes          |
| **AI Model**     | Mistral API                 |
| **Database**     | PostgreSQL 15               |
| **ORM**          | Prisma                      |
| **Styling**      | Tailwind CSS 4               |
| **Containerization** | Docker & Docker Compose  |
| **Runtime**      | Node.js 20 (Alpine)         |
| **Language**     | TypeScript                  |

---

## ⭐ Features

### 1️⃣ **AI Chat Interface**
- Real-time text input
- Send prompts to Mistral AI model
- Receive AI-generated responses
- Beautiful, responsive UI

### 2️⃣ **Chat History**
- Persist all conversations in PostgreSQL
- Display full chat history with timestamps
- Organized message display (user vs AI)

### 3️⃣ **Health Monitoring**
- `/api/health` endpoint for system status
- Database connectivity checks
- Docker container health verification

### 4️⃣ **Production-Ready**
- Multi-stage Docker build for optimized images
- Environment variable management
- Error handling and logging
- Type-safe TypeScript implementation

---

## 📂 Project Structure

```
luminastack/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   │   └── route.ts          # Chat API endpoint
│   │   │   └── health/
│   │   │       └── route.ts          # Health check endpoint
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Chat UI page
│   │   └── globals.css               # Global styles
│   └── lib/
│       ├── db.ts                     # Prisma client instance
│       └── mistral.ts                   # Mistral API integration
│
├── prisma/
│   └── schema.prisma                 # Database schema
│
├── public/                           # Static assets
│
├── Dockerfile                        # Multi-stage Docker build
├── docker-compose.yml                # Service orchestration
├── .env.example                      # Environment variable template
├── .env                              # Environment variables (local)
├── package.json                      # Dependencies & scripts
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

---

## ✅ Prerequisites

Before running the project, ensure you have:

- **Docker** & **Docker Compose** installed
  - [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Node.js** 18+ (for local development)
- **Mistral API Key**
  - Sign up at [Mistral AI Console](https://console.mistral.ai/)

---

## 🚀 Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/luminastack.git
cd luminastack
```

### Step 2: Create Environment File

```bash
cp .env.example .env
```

Update `.env` with your credentials:

```env
DATABASE_URL=postgresql://user:password@db:5432/luminadb
MISTRAL_API_KEY=your_actual_mistral_api_key
```

### Step 3: Local Development (Without Docker)

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Docker Instructions

### Quick Start with Docker Compose

Run the entire stack with one command:

```bash
docker-compose up --build
```

This will:
1. Build the Next.js application image
2. Start PostgreSQL database container
3. Run the web application on port 3000
4. Create persistent database volume

### Access the Application

```
http://localhost:3000
```

### View Database (Optional - pgAdmin)

To inspect the database, you can use pgAdmin or any PostgreSQL client:

```
Host: localhost
Port: 5432
Username: user
Password: password
Database: luminadb
```

### Useful Docker Commands

```bash
# Build images
docker-compose build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (careful!)
docker-compose down -v

# Rebuild specific service
docker-compose build web
docker-compose up web
```

---

## 🔌 API Endpoints

### POST `/api/chat`

Send a message to Mistral AI and save to database.

**Request:**
```json
{
  "message": "Explain Docker in simple terms"
}
```

**Response:**
```json
{
  "id": "uuid-string",
  "prompt": "Explain Docker in simple terms",
  "response": "Docker is a containerization platform...",
  "createdAt": "2026-02-20T10:30:45.123Z"
}
```

**Status Codes:**
- `200` - Success
- `400` - Missing message field
- `500` - Server error

---

### GET `/api/health`

Check application and database health status.

**Response (Healthy):**
```json
{
  "status": "ok",
  "database": "connected"
}
```

**Response (Error):**
```json
{
  "status": "error",
  "database": "disconnected"
}
```

**Status Codes:**
- `200` - All systems operational
- `503` - Database connection failed

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@db:5432/luminadb

# Mistral AI API Key
MISTRAL_API_KEY=your_mistral_api_key_here

# Next.js Environment
NODE_ENV=development
```

**Using `.env.example`:**

A template file `.env.example` is included. Copy it and fill in your actual values:

```bash
cp .env.example .env
```

**⚠️ Security Notes:**
- Never commit `.env` to version control
- `.env.local` is already in `.gitignore`
- Keep API keys private
- Use different keys for dev and production

---

## 🛠️ Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Server starts at `http://localhost:3000` with hot reload.

### Generate Prisma Client

```bash
npm run prisma:generate
```

### Run Database Migrations

```bash
npm run prisma:migrate
```

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 📄 Database Schema

The Chat model stores all conversations:

```prisma
model Chat {
  id        String   @id @default(uuid())
  prompt    String
  response  String
  createdAt DateTime @default(now())
}
```

**Fields:**
- `id` - Unique identifier (UUID)
- `prompt` - User's message
- `response` - AI-generated response
- `createdAt` - Timestamp of creation

---

## 🧪 Testing the Application

### Test Chat Endpoint

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is Docker?"}'
```

### Test Health Endpoint

```bash
curl http://localhost:3000/api/health
```

### Through UI

1. Open [http://localhost:3000](http://localhost:3000)
2. Type a message in the textarea
3. Click "Send" or press Ctrl+Enter
4. View the AI response and chat history

---

## 🚢 Deployment

### Deploy to Production

1. **Set Production Environment Variables:**

```bash
# On your production server
export DATABASE_URL=postgresql://...
export MISTRAL_API_KEY=...
export NODE_ENV=production
```

2. **Use Docker Compose:**

```bash
docker-compose -f docker-compose.yml up -d
```

3. **Setup Reverse Proxy (Nginx/Apache)**

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

## 🔮 Future Enhancements

- [ ] User authentication (JWT-based)
- [ ] WebSocket support for real-time chat
- [ ] Streaming AI responses
- [ ] File upload and processing
- [ ] Vector database (Pinecone) for semantic search
- [ ] Voice-to-text integration
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Rate limiting and quotas
- [ ] Admin panel for moderation

---

## 🐛 Troubleshooting

### Docker Container Won't Start

```bash
# Check logs
docker-compose logs web

# Verify environment variables
docker-compose config
```

### Database Connection Error

```bash
# Ensure DB is running
docker-compose ps

# Check DATABASE_URL format
# Should be: postgresql://user:password@db:5432/luminadb
```

### Mistral API Errors

- Verify `MISTRAL_API_KEY` is correct
- Check Mistral API quota and billing
- Ensure network connectivity

### Port Already in Use

```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use 3001 instead of 3000
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Docker Documentation](https://docs.docker.com)
- [Mistral API Documentation](https://docs.mistral.ai/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

Built by a Fullstack Developer transitioning to Architect 🚀

A demonstration of:
- AI integration
- Fullstack architecture
- Containerization best practices
- Production-ready code structure

---

## 📞 Support

For questions or issues:

1. Check existing [GitHub Issues](https://github.com/your-username/luminastack/issues)
2. Review troubleshooting section above
3. Create a new issue with detailed description

---

## 🎉 Acknowledgments

- Mistral AI for their powerful AI models
- Vercel for Next.js
- Prisma for ORM
- Docker for containerization
- The open-source community

---

**Last Updated:** February 20, 2026  
**Version:** 1.0.0  
**Status:** ✅ Production Ready

# Website Q&A App (Scraping + LLM)

## Overview

This is a **full-stack application** that allows users to:

- Enter a **website URL**
- Ask a **question about the website**

The system scrapes the website, sends the content to an LLM, and returns an AI-generated answer based on the scraped data.

The entire application is **Dockerized** and runs using a single Docker Compose command.

---

## Tech Stack

### Frontend
- Next.js
- TanStack Query

### Backend
- Node.js
- Express.js
- Axios
- Cheerio
- Google Gemini API

### Infrastructure
- PostgreSQL
- Docker & Docker Compose

---

### Environment Variables

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
```
---

### Start the App

```bash
docker compose up --build
```

This will spin up three containers:
- Frontend
- Backend
- PostgreSQL

## 🌐 Access the App

| Service  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:3000    |
| Backend  | http://localhost:4000    |

Once Docker is running, the application is immediately usable.

## Features

- Website content scraping
- AI-powered question answering
- Fully Dockerized setup
- Frontend and backend decoupled
- Centralized error handling

---

## Running the Application

### Prerequisites
- Docker
- Docker Compose
- Google Gemini API key

---

## 📋 Future Improvements

- Background job processing using BullMQ
- Task persistence and status tracking with PostgreSQL
-Improved scraping for dynamic websites
- Better content chunking and relevance filtering for LLM prompts

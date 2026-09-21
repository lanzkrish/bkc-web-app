# Bhubaneswar Kitchen Digital Experience (BKC)

This repository is organized as a monorepo containing both the frontend web application and the backend API server for Bhubaneswar Kitchen.

## Repository Structure

```
├── bkc-web-app/       # Frontend application (Next.js, TypeScript, Tailwind CSS)
├── bkc-server/        # Backend API server (Express, Node.js, TypeScript, MongoDB, WhatsApp Cloud API)
├── README.md          # Root repository documentation
└── .gitignore         # Monorepo gitignore rules
```

---

## 1. BKC Web App (`bkc-web-app`)

Modern Next.js web application for Bhubaneswar Kitchen, featuring online table booking, rich menu exploration, and contact forms.

### Getting Started

```bash
cd bkc-web-app
npm install
npm run dev
```

The web application runs on [http://localhost:3000](http://localhost:3000).

---

## 2. BKC Server (`bkc-server`)

Express & TypeScript API backend handling table reservations, menu management, Cloudinary / Cloudflare R2 asset storage, Resend transactional emails, and WhatsApp notifications.

### Environment Setup

Create `.env.local` inside `bkc-server/` based on `bkc-server/.env.example`:

```bash
cd bkc-server
cp .env.example .env.local
# Update .env.local with your actual credentials
```

### Getting Started

```bash
cd bkc-server
npm install
npm run dev
```

The backend server runs on [http://localhost:5001](http://localhost:5001).

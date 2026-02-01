# 🗃️ Flashcards Backend (AdonisJS)

A robust, enterprise-grade backend service built with **AdonisJS v6** and **TypeScript**. This project serves as the core API for the Flashcards ecosystem, designed with a focus on high security and cost-efficient cloud architecture on **Microsoft Azure**.

---

## 🛠️ Tech Stack

| Category | Tools & Frameworks |
| :--- | :--- |
| **Back-End** | ![AdonisJS](https://img.shields.io/badge/AdonisJS_v6-5a45ff?style=for-the-badge&logo=adonisjs&logoColor=white) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) |
| **Validation & Auth** | ![VineJS](https://img.shields.io/badge/VineJS-8B5CF6?style=for-the-badge) ![Shield](https://img.shields.io/badge/Adonis_Shield-5a45ff?style=for-the-badge) |
| **Testing** | ![Japa](https://img.shields.io/badge/Japa-210138?style=for-the-badge) |
| **Infrastructure** | ![Docker](https://img.shields.io/badge/Docker-2496ed?style=for-the-badge&logo=docker&logoColor=white) ![Azure](https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white) |

---

### Key Libraries
* **Validation:** [@vinejs/vine](https://vinejs.dev/) for high-performance schema validation.
* **Security:** [@adonisjs/shield](https://docs.adonisjs.com/guides/security/introduction) for protection against CSRF and XSS.
* **Auth:** [@adonisjs/auth](https://docs.adonisjs.com/guides/auth/introduction) for secure session-based authentication.
* **Testing:** [@japa/runner](https://japa.dev/) for unit and functional testing.
---
## ☁️ Infrastructure & Cloud Strategy

The application is deployed to **Microsoft Azure** using a modern, secure networking topology.

### Private Connectivity via Service Endpoints
To optimize for security and cost, the infrastructure utilizes **Azure Private Endpoints**:

* **Traffic Isolation:** The backend and database communicate over a private Virtual Network (VNet). The API is not exposed to the public internet unless necessary.
* **Cost Optimization:** By using **Service Endpoints** and **Private Link**, we significantly reduce egress charges and data transfer costs between services.
* **Security-First:** This setup prevents lateral movement and ensures that sensitive data (like your MySQL connection) never leaves the private Azure backbone.

---

## 🚀 Getting Started (Development Mode)

To set up the project locally for development, follow these procedures:

### 1. Prerequisites
* **Node.js:** v24 or higher
* **MySQL:** A local instance or Docker container

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd app-flashcards-adonisjs

# Install dependencies
npm install

# Create your local environment file:
cp .env.example .env

# Generate your unique application key:
node ace generate:key

# Ensure your MySQL instance is running, then run the migrations to build your schema:
node ace migration:run

# This project uses Hot Module Replacement (HMR) for an optimized development loop:
npm run dev

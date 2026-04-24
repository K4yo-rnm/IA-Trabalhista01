
---

# 📄 architecture.md (nível profissional)

```md
# 🏗️ System Architecture — IA Trabalhista

Visão arquitetural da aplicação, incluindo camadas, responsabilidades e fluxo de dados.

---

## 📐 High-Level Architecture
Client (Next.js)
↓
API Layer (FastAPI)
↓
Service Layer (Business Logic)
↓
Repository Layer (Data Access)
↓
PostgreSQL

---

## 🧩 Layers Description

### Frontend (Next.js)
- Interface do usuário
- Consumo da API REST
- Gerenciamento de estado

---

### API Layer
- Definição de rotas
- Validação de entrada
- Serialização de respostas

---

### Service Layer
- Regras de negócio
- Pipeline de análise jurídica
- Orquestração de processos

---

### Repository Layer
- Acesso ao banco de dados
- Queries e persistência

---

### Data Layer
- PostgreSQL
- Armazenamento estruturado

---

## 🔄 Data Flow

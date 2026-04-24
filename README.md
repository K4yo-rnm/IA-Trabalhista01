# ⚖️ IA Trabalhista — Automação Jurídica com IA

Aplicação completa para análise automatizada de processos trabalhistas e geração de peças jurídicas, desenvolvida com foco em resolver problemas reais do fluxo jurídico.

---

## 🚀 Visão Geral

Este projeto tem como objetivo automatizar etapas iniciais da análise de processos trabalhistas, reduzindo o tempo gasto na leitura de petições e auxiliando na geração de contestação.

A aplicação permite transformar uma petição inicial em uma estrutura jurídica organizada e um rascunho de defesa em poucos passos.

---

## 🧠 Principais Funcionalidades

* 📄 Upload de petições iniciais em PDF
* 🔍 Extração automática de texto
* ⚖️ Identificação de informações jurídicas relevantes:

  * salário
  * pedidos
  * resumo do caso
* 🧾 Geração automática de rascunho de contestação
* 📂 Histórico de documentos por caso
* 📊 Estruturação de dados para análise jurídica

---

## 💡 Diferencial do Projeto

Este projeto não depende apenas de APIs externas.

Toda a lógica principal foi desenvolvida do zero, incluindo:

* pipeline de processamento de documentos
* análise jurídica baseada em regras
* estruturação dos dados do processo
* geração automatizada de peças

O objetivo é evoluir para uma arquitetura híbrida com modelos open source (LLMs).

---

## 🏗️ Arquitetura do Sistema

```txt
Frontend (Next.js)
↓
Backend (FastAPI)
├── API Routes
├── Services
├── Repositories
├── Schemas
├── Models
↓
PostgreSQL
```

---

## 🧩 Estrutura do Projeto

```txt
backend/
├── app/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── repositories/
│   └── main.py

frontend/
├── app/
├── components/
├── services/
├── types/
└── utils/


docs/
├── api.md
├── ia-pipeline.md
├── architecture.md
├── database.md
├── roadmap.md
```

---

## 💻 Tecnologias Utilizadas

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic

### Frontend

* Next.js
* React
* TailwindCSS

### Infraestrutura

* Docker
* dotenv

---

## ⚙️ Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/ia-trabalhista.git
cd ia-trabalhista
```

---

### 2. Subir o banco de dados

```bash
docker compose up -d
```

---

### 3. Rodar o Backend

```bash
cd backend

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

### 4. Rodar o Frontend

```bash
cd frontend

npm install
npm run dev
```

---

## 📌 Fluxo de Uso

1. Criar um novo caso
2. Enviar a petição inicial (PDF)
3. Visualizar análise automática
4. Gerar contestação

---

## 📚 Documentação

A documentação completa está disponível na pasta `/docs`:

* 🔌 [API](docs/api.md)
* 🧠 [Pipeline de IA](docs/ia-pipeline.md)
* 🏗️ [Arquitetura](docs/architecture.md)
* 🗄️ [Banco de Dados](docs/database.md)
* 🚀 [Roadmap](docs/roadmap.md)

---

## 🔮 Próximos Passos

* 🤖 Integração com modelos open source (LLMs)
* 📄 Exportação de documentos (DOCX/PDF)
* 🧠 Análise jurídica avançada
* 📊 Dashboard e métricas
* 🔐 Autenticação de usuários

---

## 📈 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

* aplicar IA em um problema real
* construir uma arquitetura completa (frontend + backend + banco)
* desenvolver lógica própria além de consumo de APIs
* evoluir para um sistema jurídico inteligente

---

## 🤝 Contato

Se quiser trocar uma ideia sobre o projeto:

* LinkedIn: https://www.linkedin.com/caio-braga-31a573314
* GitHub: https://github.com/K4yo-rnm?tab=repositories

---

## ⭐ Observação

Projeto em evolução contínua, com foco em aprendizado prático e construção de soluções reais com IA.

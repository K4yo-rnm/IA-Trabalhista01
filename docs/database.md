# 🗄️ Database Design — IA Trabalhista

Documentação da estrutura do banco de dados PostgreSQL.

---

## 📊 Entity Relationship Overview


---

## 🧾 Tables

### Cases

| Field          | Type     | Description |
|---------------|----------|------------|
| id            | Integer  | Primary Key |
| title         | String   | Nome do caso |
| client_name   | String   | Parte envolvida |
| process_number| String   | Número do processo |
| status        | String   | Status do caso |
| created_at    | DateTime | Data de criação |

---

### Documents

| Field          | Type     | Description |
|---------------|----------|------------|
| id            | Integer  | Primary Key |
| case_id       | Integer  | Foreign Key |
| file_name     | String   | Nome do arquivo |
| file_path     | String   | Caminho do arquivo |
| extracted_text| Text     | Texto extraído |
| analysis      | JSON     | Dados estruturados |
| created_at    | DateTime | Data de upload |

---

## 🧠 Analysis Field Structure

```json
{
  "reclamante": "...",
  "reclamada": "...",
  "salario": "2500",
  "pedidos": ["Horas extras"],
  "resumo": "..."
}
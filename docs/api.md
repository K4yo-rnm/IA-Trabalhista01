# 🔌 API - IA Trabalhista

## Base URL
http://localhost:8000

## Endpoints

### Criar Caso
POST /cases

### Listar Casos
GET /cases

### Upload Documento
POST /documents/upload

### Listar Documentos
GET /cases/{case_id}/documents

### Gerar Contestação
POST /cases/{case_id}/generate-draft

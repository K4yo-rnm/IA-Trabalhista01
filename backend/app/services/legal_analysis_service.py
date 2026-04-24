import re

def extract_salary(text: set):
    match = re.search(r'R\$ ?([\d\.,]+)', text)
    if match:
        salary = match.group(1)
        salary = salary.rstrip(".")
        return salary
    return None

def extracted_parties(text:str):
    reclamante = None
    reclamada = None

    if "reclamante" in text.lower():
        reclamante = "Possível nome do reclamante"

    if "reclamada" in text.lower():
        reclamada = "Possível empresa"
    
    return reclamante, reclamada

def extract_claims(text: str):
    claims = []

    normalized_text = re.sub(r"\s+", " ", text.lower()).strip()

    if "hora extra" in normalized_text or "horas extras" in normalized_text:
        claims.append("Horas extras")
    if "fgts" in normalized_text:
        claims.append("FGTS")
    if "dano moral" in normalized_text:
        claims.append("Dano mora")
    if "férias" in normalized_text:
        claims.append("Férias")
    if "13º" in normalized_text or "decimo terceiro" in normalized_text:
        claims.append("13º salário")
    
    return claims

def generate_summary(text: str):
    return text[:500] # primeiros 500 carcteres

def analyze_text(text: str):
    reclamante, reclamada = extracted_parties(text)
    salario = extract_salary(text)
    pedidos = extract_claims(text)
    resumo = generate_summary(text)

    return{
        "reclamante": reclamante,
        "reclamada": reclamada,
        "salario": salario,
        "pedidos": pedidos,
        "resumo": resumo
    }
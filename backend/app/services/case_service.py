from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.case_repository import create_case, get_case_by_id
from app.schemas.case_schema import CaseCreate
from app.repositories.case_repository import get_all_cases

def create_new_case(db: Session, case_data: CaseCreate):
    return create_case(db, case_data)

def list_cases(db):
    return get_all_cases(db)

def get_case_details(db: Session, case_id: int):
    try:
        case = get_case_by_id(db, case_id)

        if not case:
            raise HTTPException(status_code=404, detail="Caso não encontrado")
    except:
        print("case_service - falha ao pegar caso detalhado")

    return case
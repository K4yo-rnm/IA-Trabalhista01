from sqlalchemy.orm import Session
from app.models.case_model import Case
from app.schemas.case_schema import CaseCreate

def create_case(db: Session, case_data: CaseCreate):
    case = Case(**case_data.model_dump())
    db.add(case)
    db.commit()
    db.refresh(case)
    return case

def get_all_cases(db):
    return db.query(Case).all()

def get_case_by_id(db: Session, case_id: int):
    try:
        return db.query(Case).filter(Case.id == case_id).first()
    
        
    except:
        print("case_repository.py - falha na busca pelo id")

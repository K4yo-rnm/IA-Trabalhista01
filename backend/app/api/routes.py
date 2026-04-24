#Routes.py

from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.case_schema import CaseCreate, CaseResponse
from app.services.case_service import create_new_case, list_cases
from app.services.case_service import create_new_case, list_cases, get_case_details
from app.schemas.documents_schema import DocumentResponse
from app.services.documents_service import save_document
from app.models.documents_model import Document
from app.services.draft_service import generate_contestation

from typing import List

router = APIRouter()

@router.post("/cases", response_model=CaseResponse)
def create_case_route(case: CaseCreate, db: Session = Depends(get_db)):
    return create_new_case(db, case)

@router.get("/cases", response_model=List[CaseResponse])
def list_case_response(db: Session = Depends(get_db)):
    return list_cases(db)

@router.post("/documents/upload", response_model=DocumentResponse)
def upload_document(
    case_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    return save_document(db, case_id, file)

@router.post("/cases/{case_id}/generate-draft")
def generate_draft(case_id: int, db: Session = Depends(get_db)):
    document = (
        db.query(Document)
        .filter(Document.case_id == case_id)
        .order_by(Document.created_at.desc())
        .first()
    )

    if not document:
        return {"Error": "Documento não encontrado"}
    
    if not document:
        return {"Error": "Documento ainda não possui analise. Reenvie o comuneto"}
    
    analysis = document.analysis

    draft = generate_contestation(analysis)

    return {
        "case_id": case_id,
        "draft": draft
    }

@router.get("/cases/{case_id}", response_model=CaseResponse)
def get_case_route(case_id: int, db: Session = Depends(get_db)):
    return get_case_details(db, case_id)

@router.get("/cases/{case_id}/documents", response_model=List[DocumentResponse])
def list_documents(case_id: int, db: Session = Depends(get_db)):
    documents = (
        db.query(Document)
        .filter(Document.case_id == case_id)
        .order_by(Document.created_at.desc())
        .all()
    )

    return documents
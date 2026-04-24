from sqlalchemy.orm import Session
from app.models.documents_model import Document
from app.services.legal_analysis_service import analyze_text

def create_document(
    db: Session,
    case_id:int,
    file_name:str,
    file_type:str,
    file_path:str,
    extracted_text:str,
    analysis: dict

):
    new_document = Document(
        case_id=case_id,
        file_name=file_name,
        file_type=file_type,
        file_path=file_path,
        extracted_text=extracted_text,
        analysis=analysis
    )

    db.add(new_document)
    db.commit()
    db.refresh(new_document)
    return new_document
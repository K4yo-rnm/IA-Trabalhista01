import os
import shutil
from fastapi import UploadFile
from sqlalchemy.orm import Session
from app.repositories.documents_repository import create_document
from pypdf import PdfReader
from app.services.legal_analysis_service import analyze_text

UPLOAD_DIR = "uploads"

def save_document(db: Session, case_id: int, file: UploadFile):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_path)
    analysis = analyze_text(extracted_text)

    document = create_document(
        db=db,
        case_id=case_id,
        file_name=file.filename,
        file_type=file.content_type,
        file_path=file_path,
        extracted_text=extracted_text,
        analysis=analysis
    )

    return document

def extract_text_from_pdf(file_path: str) -> str:
    text = ""

    try:
        reader = PdfReader(file_path)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    except Exception as e:
        print("Erro ao extrair texto do PDF", e)
    
    return text
from pydantic import BaseModel, ConfigDict
from datetime import datetime

class DocumentResponse(BaseModel):
    id: int
    case_id: int
    file_name: str
    file_type: str | None = None
    file_path: str
    extracted_text: str | None = None
    analysis: dict | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
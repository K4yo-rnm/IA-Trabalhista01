from pydantic import BaseModel, ConfigDict

class CaseCreate(BaseModel):
    title: str
    client_name: str
    process_number: str

class CaseResponse(BaseModel):
    id: int
    title: str
    client_name: str
    process_number: str
    status: str
    model_config = ConfigDict(from_attributes=True)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.models.documents_model import Document
from app.models.case_model import Case

app = FastAPI()

app.include_router(router)

@app.get("/")
def home():
    return {"message": "API funcionando"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.core.database import Base

class Case(Base):
    __tablename__="cases"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    client_name = Column(String, nullable=False)
    process_number = Column(String, nullable=False)
    status = Column(String, default="novo")
    created_at = Column(DateTime, default=datetime.utcnow)

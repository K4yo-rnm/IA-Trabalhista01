from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base

class Draft(Base):
    __tablename__ = "drafts"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=False)
    type = Column(String)
    content = Column(String)
    version = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)
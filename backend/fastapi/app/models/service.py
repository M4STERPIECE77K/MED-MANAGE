from sqlalchemy import Column, String, DateTime, Numeric, Integer, text
from sqlalchemy.dialects.postgresql import UUID
from app.db.base_class import Base

class Service(Base):
    __tablename__ = "services"
    __table_args__ = {"schema": "rdv"}

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    name = Column(String(150), nullable=False)
    description = Column(String, nullable=True)
    duration_minutes = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))

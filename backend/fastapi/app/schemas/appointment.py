from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class AppointmentBase(BaseModel):
    user_id: UUID
    service_id: UUID
    appointment_date: datetime
    status: str = "PENDING"
    notes: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentResponse(AppointmentBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

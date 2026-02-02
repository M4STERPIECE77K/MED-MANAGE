from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.api import deps
from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentResponse, AppointmentCreate
import uuid

router = APIRouter()

@router.get("/", response_model=List[AppointmentResponse])
def get_appointments(db: Session = Depends(deps.get_db)):
    return db.query(Appointment).all()

@router.post("/", response_model=AppointmentResponse)
def create_appointment(appointment_in: AppointmentCreate, db: Session = Depends(deps.get_db)):
    appointment = Appointment(**appointment_in.model_dump())
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment

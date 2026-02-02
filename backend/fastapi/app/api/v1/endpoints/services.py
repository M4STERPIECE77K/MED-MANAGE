from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.api import deps
from app.models.service import Service
from app.schemas.service import ServiceResponse, ServiceCreate
import uuid

router = APIRouter()

@router.get("/", response_model=List[ServiceResponse])
def get_services(db: Session = Depends(deps.get_db)):
    return db.query(Service).all()

@router.post("/", response_model=ServiceResponse)
def create_service(service_in: ServiceCreate, db: Session = Depends(deps.get_db)):
    service = Service(**service_in.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service

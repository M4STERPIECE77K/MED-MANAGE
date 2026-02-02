from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.api import deps
from app.models.user import User
from app.schemas.user import UserResponse, UserCreate
import uuid

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
def get_users(db: Session = Depends(deps.get_db)):
    users = db.query(User).all()
    return users

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: uuid.UUID, db: Session = Depends(deps.get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=UserResponse)
def create_user(user_in: UserCreate, db: Session = Depends(deps.get_db)):
    user = User(
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        email=user_in.email,
        phone=user_in.phone,
        password=user_in.password, # In a real app, hash this!
        role=user_in.role
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


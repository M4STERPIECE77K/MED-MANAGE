from fastapi import APIRouter
from typing import List
from app.schemas.user import UserResponse

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
def get_users():
    return [
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "first_name": "Admin",
            "last_name": "RDV",
            "email": "admin@rdv.com",
            "phone": "0123456789",
            "role": "ADMIN"
        }
    ]

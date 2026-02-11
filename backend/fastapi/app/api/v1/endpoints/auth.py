from fastapi import APIRouter, Response, status

router = APIRouter()

@router.post("/login")
async def login():
    return {"message": "Login successful"}

@router.post("/logout")
async def logout(response: Response):
    # Suppression du cookie de session (si utilisé)
    response.delete_cookie("session_id")
    # On pourrait aussi invalider une session en base de données ici
    return {"message": "Successfully logged out"}

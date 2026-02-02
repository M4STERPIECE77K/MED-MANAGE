from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "RDV FastAPI"
    PROJECT_VERSION: str = "v1"
    API_V1_STR: str = "/api/v1"
    
    DB_HOST: str = "localhost"
    DB_PORT: str = "5432"
    DB_NAME: str = "rdv_db"
    DB_USER: Optional[str] = None
    DB_PASSWORD: Optional[str] = None

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

settings = Settings()

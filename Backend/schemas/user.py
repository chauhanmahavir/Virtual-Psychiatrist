from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class User(BaseModel):
    name: str
    email: str
    password: str
    created_at: datetime
    updated_at: datetime
    
class Response(BaseModel):
    message: Optional[str]
    jwt: Optional[str]
    email: Optional[str]
    password: Optional[str]
    name: Optional[str]
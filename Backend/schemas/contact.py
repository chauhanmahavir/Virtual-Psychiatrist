from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Contact(BaseModel):
    name: str
    email: str
    message: str

class Response(BaseModel):
    message: Optional[str]
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Chat(BaseModel):
    email: str
    file_location: str
    session_id: str
    
class Response(BaseModel):
    session_id: Optional[str]
    session_name: Optional[str]
    message: Optional[str]
    jwt: Optional[str]
    email: Optional[str]
    history: Optional[list]
    chat_history: Optional[list]
    response: Optional[str]
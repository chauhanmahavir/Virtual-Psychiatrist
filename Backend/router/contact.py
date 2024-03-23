from fastapi import APIRouter, Request, status
from fastapi.responses import JSONResponse

from models.contact import Contact
from services.db import connect_mongo_db, insert_message
from schemas.contact import Response
from config.settings import constants

router = APIRouter()

connect_mongo_db()

@router.post("/message")
async def singup(request: Request) -> JSONResponse:
    try:
        body = await request.json()
        contact_model = Contact(name = body["name"], email = body["email"], message = body["message"])
        contact_model.validate()
        insert_message(contact_model)
        response = Response()
        response.message = constants.SUCCESS_MESSAGE
        return JSONResponse(status_code = status.HTTP_200_OK, content = response.dict(exclude_none = True))
    except Exception as e:
        print(e)
        response = Response()
        response.message = constants.ERROR
        return JSONResponse(status_code = status.HTTP_400_BAD_REQUEST, content = response.dict(exclude_none = True))
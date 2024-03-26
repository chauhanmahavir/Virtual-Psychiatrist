from fastapi import APIRouter, Request, status
from fastapi.responses import JSONResponse

from services.db import connect_mongo_db, insert_session
from services.auth import get_jwt_token, check_jwt_token, get_user_data_by_jwt
from services.chat_services.chat import create_session, get_all_sessions, get_chat_history, get_response
from schemas.chat import Response
from config.settings import constants
from models.chat import Chat

router = APIRouter()

connect_mongo_db()

@router.post("/get_session_history")
async def get_session_history(request: Request) -> JSONResponse:
    try:
        jwt_token = get_jwt_token(request)
        validate_jwt_token = check_jwt_token(jwt_token)
        if validate_jwt_token == 100:
            user_details = get_user_data_by_jwt(jwt_token)
            all_sessions = get_all_sessions(user_details["email"])
            response = Response()
            response.message = constants.SUCCESSFULLY_PERFORMED
            response.history = all_sessions
            return JSONResponse(status_code=status.HTTP_200_OK, content=response.dict(exclude_none=True))
        elif validate_jwt_token == 101 or validate_jwt_token == 102:
            response = Response()
            response.message = constants.INVALID_LOGIN
            return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content=response.dict(exclude_none=True))
    except Exception as e:
        print(e)
        response = Response()
        response.message = constants.ERROR
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=response.dict(exclude_none=True))

@router.post("/create_chat_session")
async def create_chat_session(request: Request) -> JSONResponse:
    try:
        body = await request.json()
        session_name = body["session_name"]
        jwt_token = get_jwt_token(request)
        validate_jwt_token = check_jwt_token(jwt_token)
        if validate_jwt_token == 100:
            user_details = get_user_data_by_jwt(jwt_token)
            session_id, file_path = create_session(user_details["email"])
            chat_model = Chat(email = user_details["email"], file_location = file_path, session_id = session_id, session_name = session_name)
            chat_model.validate()
            insert_session(chat_model)
            response = Response()
            response.message = constants.SUCCESSFULLY_PERFORMED
            response.session_id = session_id
            return JSONResponse(status_code=status.HTTP_200_OK, content=response.dict(exclude_none=True))
        elif validate_jwt_token == 101 or validate_jwt_token == 102:
            response = Response()
            response.message = constants.INVALID_LOGIN
            return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content=response.dict(exclude_none=True))
    except Exception as e:
        print(e)
        print(e.__traceback__.tb_lineno)
        response = Response()
        response.message = constants.ERROR
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=response.dict(exclude_none=True))

@router.post("/get_chat_by_session")
async def get_chat_by_session(request: Request) -> JSONResponse:
    try:
        body = await request.json()
        session_id = body["session_id"]
        jwt_token = get_jwt_token(request)
        validate_jwt_token = check_jwt_token(jwt_token)
        if validate_jwt_token == 100:
            user_details = get_user_data_by_jwt(jwt_token)
            chat_history = get_chat_history(user_details["email"], session_id)
            response = Response()
            response.message = constants.SUCCESSFULLY_PERFORMED
            response.chat_history = chat_history
            return JSONResponse(status_code=status.HTTP_200_OK, content=response.dict(exclude_none=True))
        elif validate_jwt_token == 101 or validate_jwt_token == 102:
            response = Response()
            response.message = constants.INVALID_LOGIN
            return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content=response.dict(exclude_none=True))
    except Exception as e:
        print(e)
        print(e.__traceback__.tb_lineno)
        response = Response()
        response.message = constants.ERROR
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=response.dict(exclude_none=True))

@router.post("/generate_message")
async def generate_message(request: Request) -> JSONResponse:
    try:
        body = await request.json()
        session_id = body["session_id"]
        message = body["message"]
        jwt_token = get_jwt_token(request)
        validate_jwt_token = check_jwt_token(jwt_token)
        if validate_jwt_token == 100:
            user_details = get_user_data_by_jwt(jwt_token)
            chat_response = get_response(user_details["email"], session_id, message)
            response = Response()
            response.message = constants.SUCCESSFULLY_PERFORMED
            response.response = chat_response
            return JSONResponse(status_code=status.HTTP_200_OK, content=response.dict(exclude_none=True))
        elif validate_jwt_token == 101 or validate_jwt_token == 102:
            response = Response()
            response.message = constants.INVALID_LOGIN
            return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content=response.dict(exclude_none=True))
    except Exception as e:
        print(e)
        print(e.__traceback__.tb_lineno)
        response = Response()
        response.message = constants.ERROR
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=response.dict(exclude_none=True))
from fastapi import APIRouter, Request, status
from fastapi.responses import JSONResponse

from models.user import User
from services.db import connect_mongo_db, insert_one_user, search_by_email, update_user_details_by_email
from services.auth import generate_jwt_token, get_jwt_token, check_jwt_token, get_user_data_by_jwt
from schemas.user import Response
from config.settings import constants

router = APIRouter()

connect_mongo_db()

@router.post("/signup")
async def singup(request: Request) -> JSONResponse:
    try:
        body = await request.json()
        user_model = User(name = body["name"], email = body["email"], password = body["password"])
        user_model.validate()
        insert_one_user(user_model)
        response = Response()
        response.message = constants.SUCCESS_SIGNUP
        return JSONResponse(status_code = status.HTTP_200_OK, content = response.dict(exclude_none = True))
    except Exception as e:
        print(e)
        response = Response()
        response.message = constants.ERROR
        return JSONResponse(status_code = status.HTTP_400_BAD_REQUEST, content = response.dict(exclude_none = True))

@router.post("/login")
async def login(request: Request) -> JSONResponse:
    try:
        body = await request.json()
        email = body["email"]
        password = body["password"]
        user_details = search_by_email(email)
        for i in user_details:
            if i.email == email and i.password == password:
                # create_base_structure(email=email)
                jwt_token = generate_jwt_token(email=email, password=password)
                response = Response()
                response.jwt = str(jwt_token)
                response.message = constants.SUCCESS_LOGIN
                return JSONResponse(status_code = status.HTTP_200_OK, content = response.dict(exclude_none = True))
        else:
            response = Response()
            response.message = constants.INVALID_LOGIN
            return JSONResponse(status_code = status.HTTP_401_UNAUTHORIZED, content = response.dict(exclude_none = True))
    except Exception as e:
        print(e)
        response = Response()
        response.message = constants.ERROR
        return JSONResponse(status_code = status.HTTP_400_BAD_REQUEST, content = response.dict(exclude_none = True))

@router.get("/get_user_details")
async def get_user_details(request: Request) -> JSONResponse:
    try:
        jwt_token = get_jwt_token(request)
        validate_jwt_token = check_jwt_token(jwt_token)
        print(validate_jwt_token)
        if validate_jwt_token == 100:
            user_details = get_user_data_by_jwt(jwt_token)
            user_details = search_by_email(email = user_details["email"])
            response = Response()
            for i in user_details:
                response.name = i.name
                response.email = i.email
                response.password = i.password
            response.message = constants.SUCCESSFULLY_PERFORMED
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

@router.post("/update_user_details")
async def update_user_details(request: Request) -> JSONResponse:
    try:
        body = await request.json()
        jwt_token = get_jwt_token(request)
        validate_jwt_token = check_jwt_token(jwt_token)
        print(validate_jwt_token)
        if validate_jwt_token == 100:
            user_details = get_user_data_by_jwt(jwt_token)
            user_details = search_by_email(email = user_details["email"])
            update_user_details_by_email(body)
            response = Response()
            response.name = body["name"]
            response.email = body["email"]
            response.password = body["password"]
            response.message = constants.SUCCESSFULLY_PERFORMED
            return JSONResponse(status_code = status.HTTP_200_OK, content = response.dict(exclude_none = True))
        elif validate_jwt_token == 101 or validate_jwt_token == 102:
            response = Response()
            response.message = constants.INVALID_LOGIN
            return JSONResponse(status_code = status.HTTP_401_UNAUTHORIZED, content = response.dict(exclude_none = True))
    except Exception as e:
        print(e)
        print(e.__traceback__.tb_lineno)
        response = Response()
        response.message = constants.ERROR
        return JSONResponse(status_code = status.HTTP_400_BAD_REQUEST, content = response.dict(exclude_none = True))
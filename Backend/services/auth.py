import jwt
from config.settings import jwt_setting
from datetime import datetime, timedelta
from services.db import check_user_data
from fastapi import Request

def check_jwt_token(jwt_token : str) -> int:
    """Validate JWT Token

    Args:
        jwt_token (String): Jwt Token as a String

    Returns:
        Int:  100 = Token is Valid and user is authenticated.
              101 = Token is Expired.
              102 = Token is Valid and not expired but password may changed.
    """
    decoded = jwt.decode(jwt_token, jwt_setting.JWT_Secret, algorithms=["HS256"])
    current_time = str(datetime.now())
    remaining_time = (datetime.strptime(decoded["expiration"], jwt_setting.FMT) - datetime.strptime(current_time, jwt_setting.FMT)).total_seconds()
    if remaining_time > 0:
        return check_user_data(email = decoded["email"], password = decoded["password"])
    else:
        return 101
    
def generate_jwt_token(email: str, password: str) -> str:
    jwt_token = jwt.encode({
                    "email" : email,
                    "password" : password,
                    "expiration" : str(datetime.now() + timedelta(seconds=jwt_setting.JWT_Expiry_Time))
                }, jwt_setting.JWT_Secret)
    return jwt_token

def get_jwt_token(request: Request) -> str:
    header = request.headers
    jwt_token = header['jwt_token']
    return jwt_token

def get_user_data_by_jwt(jwt_token: str) -> dict:
    decoded = jwt.decode(jwt_token, jwt_setting.JWT_Secret, algorithms=["HS256"])
    response = {}
    response['email'] = decoded['email']
    response['password'] = decoded['password']
    response['jwt_token'] = jwt_token
    return response
from pydantic import BaseSettings

class DBSettings(BaseSettings):
    db_name: str = "virtual-psychiatrist"
    db_host: str = "localhost"
    db_port: int = 27017

db_settings = DBSettings()

class Constants(BaseSettings):
    SUCCESS_SIGNUP: str = "Successfully Singed Up!"
    SUCCESS_LOGIN: str = "Successfully Logged In!"
    INVALID_LOGIN: str = "Invalid Login!"
    ERROR: str = "Error Occured. Please Try again leter!"
    SUCCESSFULLY_PERFORMED: str = "Successfully Performed!"

constants = Constants()

class JWT(BaseSettings):
    JWT_Secret: str = "Femj4ul1V2Xk3A3Amy6w7cE9gVAdn96Y"
    JWT_Expiry_Time: int = 86400
    FMT: str = "%Y-%m-%d %H:%M:%S.%f"

jwt_setting = JWT()
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
    SUCCESS_MESSAGE: str = "Successfully Send Message!"

constants = Constants()

class JWT(BaseSettings):
    JWT_Secret: str = "Femj4ul1V2Xk3A3Amy6w7cE9gVAdn96Y"
    JWT_Expiry_Time: int = 86400
    FMT: str = "%Y-%m-%d %H:%M:%S.%f"

jwt_setting = JWT()

class FileStructure(BaseSettings):
    SERVER_URL: str = "http://localhost:8000/"
    BASE_STRUCTURE: list = ["/chat"]
    USER_DATA: str = "./user_data/"
    CHAT_LOCATION: str = "/chat/"

file_structure = FileStructure()

class MLModel(BaseSettings):
    DEVICE: str = "cpu"
    TOKENIZATION_MODEL: str = "gpt2"
    MODEL_PATH: str = "./services/chat_services/Models/New_E6"
    MAX_LENGTH: int = 1024
    TEMPERATURE: float = 0.7
    REPETITION_PENALTY: float = 1.0
    TOP_K: int = 50
    TOP_P: float = 0.92
    DO_SAMPLE: bool = True
    NUM_RETURN_SEQUENCES: int = 1

ml_config = MLModel()
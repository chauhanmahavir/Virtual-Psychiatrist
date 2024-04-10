from mongoengine import connect
from datetime import datetime

from config.settings import db_settings
from models.user import User
from models.contact import Contact
from models.chat import Chat

def connect_mongo_db():
    """Connect to the Database
    """
    # connect(db=db_settings.db_name, host=db_settings.db_host, port=db_settings.db_port)
    connect(db=db_settings.db_name, host = db_settings.db_server)

def insert_one_user(Object : User):
    """Insert One Record in Database

    Args:
        Object (User): Object of the User
    """
    Object.save()

def search_by_email(email : str) -> User:
    """Search Record By Email

    Args:
        email (str): Email ID of the User

    Returns:
        User: Object of the data
    """
    user_data = User.objects(email = email)
    return user_data

def check_user_data(email: str, password: str) -> int:
    """Check User is valid or Not

    Args:
        email (str): User Emial ID
        password (str): User Password

    Returns:
        Code: 100 = User is Valid.
              102 = User is not Valid. 
    """
    user_data = User.objects(email = email)
    for i in user_data:
        if i.email == email and i.password == password:
            return 100
    else:
        return 102

def update_user_details_by_email(body: dict) -> None:
    User.objects(email = body["email"]).update_one(set__name = body["name"], set__password = body["password"])

def insert_message(Object : Contact):
    """Insert One Message in Database

    Args:
        Object (Contact): Object of the User
    """
    Object.save()

def insert_session(Object : Chat):
    """Insert One Session in Database

    Args:
        Object (Chat): Object of the User
    """
    Object.save()

def get_all_chats(email : str) -> Chat:
    chat_data = Chat.objects(email = email)
    return chat_data

def get_chat_location(email : str, session_id : str) -> str:
    chat_data = Chat.objects(email = email, session_id = session_id).only('file_location').first()
    return chat_data.file_location
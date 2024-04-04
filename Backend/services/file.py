import os
from random import randint
from datetime import datetime
import re

from config.settings import file_structure


def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return str(randint(range_start, range_end))

def create_base_structure(email: str) -> None:
    if os.path.exists(file_structure.USER_DATA) == False:
        os.mkdir(file_structure.USER_DATA)
    base_folder = file_structure.USER_DATA + email
    
    is_exist = os.path.exists(base_folder)
    if is_exist == False:
        os.mkdir(base_folder)
        for i in file_structure.BASE_STRUCTURE:
            sub_folders_path = base_folder + i
            os.mkdir(sub_folders_path)

def create_chat_file(path: str) -> str:
    file_name = random_with_N_digits(10) + ".txt"
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    current_date_time = str(dt_string)
    initial_message = "CHAT STARTED AT: " + current_date_time + "\n"
    file_path = path + file_name
    file_obj = open(file_path, "w")
    file_obj.write(initial_message)
    file_obj.close()
    return file_path

def get_chat_by_file(path: str) -> str:
    file_data = open(path, "r").readlines()[1:]
    print(file_data)
    data = []
    for line in file_data:
        sender, message = line.strip().split(':', 1)
        data.append({"sender": sender.strip(), "message": re.sub(r'\s+', ' ', message.strip())})
    return data

def old_chat(path: str) -> str:
    file_data = open(path, "r").readlines()[1:]
    old_data = ""
    for line in file_data:
        line = line.replace("\n", "")
        old_data = old_data + line + " "
    return old_data

def update_chat_file(path: str, message: str, response: str) -> None:
    file_obj = open(path, "a")
    file_obj.write(f"human: {message}\n")
    file_obj.write(f"gpt: {response}\n")
    file_obj.close()
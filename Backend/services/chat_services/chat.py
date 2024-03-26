import os
import uuid
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

from config.settings import file_structure, ml_config
from services.file import create_chat_file, get_chat_by_file, old_chat, update_chat_file
from services.db import get_all_chats, get_chat_location

def tokenization():
    tokenizer = GPT2Tokenizer.from_pretrained(ml_config.TOKENIZATION_MODEL)
    tokenizer.add_special_tokens({'pad_token': '[PAD]'})
    return tokenizer

def load_model():
    model = GPT2LMHeadModel.from_pretrained(ml_config.MODEL_PATH).eval()
    return model

tokenizer = tokenization()
model = load_model()

def create_session(email: str) -> str:
    create_chat_session_path = file_structure.USER_DATA + email + file_structure.CHAT_LOCATION
    file_path = create_chat_file(create_chat_session_path)
    session_id = str(uuid.uuid4().hex)
    return session_id, file_path

def get_all_sessions(email: str) -> str:
    all_chats = get_all_chats(email)
    chats = []
    for chat in all_chats._iter_results():
        del chat._data["id"]
        chat._data["created_at"] = str(chat._data["created_at"].strftime('%y-%m-%d %H:%M:%S'))
        chats.append(chat._data)
    return chats

def get_chat_history(email: str, session_id: str) -> list:
    chat_location = get_chat_location(email, session_id)
    chat_data = get_chat_by_file(chat_location)
    return chat_data

def remove_prefix(main_string, substring):
    return main_string[len(substring):]

def generate(prompt: str) -> str:
    input_ids = tokenizer.encode(prompt.lower(), return_tensors='pt')
    output_sequences = model.generate(
            input_ids = input_ids,
            max_length = ml_config.MAX_LENGTH,
            temperature = ml_config.TEMPERATURE,
            repetition_penalty = ml_config.REPETITION_PENALTY,
            top_k = ml_config.TOP_K,
            num_beams = 1,
            top_p = ml_config.TOP_P,
            do_sample = ml_config.DO_SAMPLE,
            num_return_sequences = 1,
            pad_token_id = tokenizer.eos_token_id,
            attention_mask = input_ids.new_ones(input_ids.shape),
            early_stopping = True,
        )
    output_sequence = [token.item() for token in output_sequences[0] if token is not None]
    response = tokenizer.decode(output_sequence)
    print(prompt)
    print(response)
    response = remove_prefix(response, prompt)
    gpt_index = response.find("gpt")
    human_index = response.find("human")
    if gpt_index > human_index:
        response = response[:human_index].strip()
    elif gpt_index < human_index:
        response = response[:gpt_index].strip()
    if "[PAD]" in response:
        pad_index = response.index("[PAD]")
        response = response[:pad_index]
    print(prompt)
    print(response)
    return response

def get_response(email: str, session_id: str, message: str) -> str:
    chat_location = get_chat_location(email, session_id)
    prepare_context = old_chat(chat_location)
    append_human = prepare_context + " human: " + message
    prompt = append_human + " gpt: "
    res = generate(prompt)
    update_chat_file(chat_location, message, res)
    return res
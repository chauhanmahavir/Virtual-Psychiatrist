from fastapi import FastAPI
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from router import user
from router import contact
from router import chat

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.mount("/static", StaticFiles(directory="static", html = True), name="static")

app.include_router(user.router, prefix="/user")

app.include_router(contact.router, prefix="/contact")

app.include_router(chat.router, prefix="/chat")

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
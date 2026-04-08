from fastapi import FastAPI
from app.api import Todo

app = FastAPI()

app.include_router(todo.router)

@app.get("/")
def root():
    return {"message": "Todo API with MongoDB is running"}
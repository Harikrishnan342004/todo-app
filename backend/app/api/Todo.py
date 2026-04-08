# Routes 
from fastapi import APIRouter, HTTPException
from app.db import todo_collection
from app.schemas import Todo,UpdateTodo
from app.models import todo_helper
from bson import ObjectId


router = APIRouter(prefix="/todos", tags=["Todos"])

# CREATE Progress
@router.post("/")
async def create_todo(todo: Todo):
    new_todo = await todo_collection.insert_one(
                                               todo.dict() 
                                               )
    created = await todo_collection.find_one(
                                        {
                                           "_id": new_todo.inserted_id
                                        }
                                        )
    return todo_helper(created)    

# READ ALL
@router.get("/")
async def get_todos_ALL():

    todos_list_storage_var = []

    async for t in todo_collection.find():
        todos_list_storage_var.append(todo_helper(p))


    return todos_list_storage_var

# READ ONE 
@router.put("/{id}")
async def get_todos(id : str):

    todo_for_single = await todo_collection.find_one({"_id" : ObjectId(id)})

    if todo_for_single:
        return todo_helper(todo_for_single)
    raise HTTPException(status_code=404, detail="Sorry , Your Todo is not Found")


# UPDATE
@router.put("/id")
async def updating_todo( id : str , todo : UpdateTodo ):
    update_data = {}
    for key , value in todo.dict().items():
        if value is not None:
            update_data[k] = value
    
    result = await todo_collection.update_one({})
    





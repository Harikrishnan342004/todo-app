# Routes 
from fastapi import APIRouter, HTTPException
from app.db.database import todo_collection 
from app.schemas.todo_schemas import Todo,UpdateTodo
from app.models.todo_models import todo_helper
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
    print(created)
    return todo_helper(created)    

# READ ALL
@router.get("/")
async def get_todos_ALL():

    todos_list_storage_var = []

    async for t in todo_collection.find():
        todos_list_storage_var.append(todo_helper(t))


    return todos_list_storage_var

# READ ONE 
@router.get("/{id}")
async def get_todos(id : str):



    todo_for_single = await todo_collection.find_one({"_id" : ObjectId(id)})


    print("heloo" , todo_for_single)
    
    if todo_for_single:
        print("to-", todo_helper(todo_for_single) )
        return todo_helper(todo_for_single)
    
   
    raise HTTPException(status_code=404, detail="Sorry , Your Todo is not Found")


# UPDATE
@router.put("/{id}")
async def updating_todo( id : str , todo : UpdateTodo ):
    update_data = {}
    for key , value in todo.dict().items():
        if value is not None:
            update_data[key] = value
    
    result = await todo_collection.update_one(
          {"_id": ObjectId(id)},
          {"$set": update_data}
        )
    print("put statement" ,result)
    if result.modified_count == 1:
        after_updated = await todo_collection.find_one(
            {
                "_id":ObjectId(id)
            }
            )
        return todo_helper(after_updated)
    raise HTTPException(status_code=404, detail="Todo not found")

# DELETE Progress Going On

@router.delete("/{id}")
async def delete_todo_method(id: str):
    result = await todo_collection.delete_one(
            {
                "_id" : ObjectId(id)
            }
            )
    if(result.deleted_count == 1):
            return {"message": "Todo deleted"}
        
    raise HTTPException(status_code=404, detail="Todo not found")
        
                        


    





#  ← DB logic

from app.db.database import todo_collection
from app.models.todo_model import todo_helper
from bson import ObjectId

async def create_todo(todo_data: dict):
    new_todo = await todo_collection.insert_one(todo_data)
    created = await todo_collection.find_one({"_id": new_todo.inserted_id})
    return todo_helper(created)

async def get_all_todos():
    todos = []
    async for t in todo_collection.find():
        todos.append(todo_helper(t))
    return todos

async def get_single_todo(id: str):
    todo = await todo_collection.find_one({"_id": ObjectId(id)})
    if todo:
        return todo_helper(todo)

async def update_todo(id: str, data: dict):
    result = await todo_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": data}
    )
    if result.modified_count == 1:
        updated = await todo_collection.find_one({"_id": ObjectId(id)})
        return todo_helper(updated)

async def delete_todo(id: str):
    result = await todo_collection.delete_one({"_id": ObjectId(id)})
    return result.deleted_count == 1
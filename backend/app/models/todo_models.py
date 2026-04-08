# ------------- DB Models

# Simple rule: Pydantic = validate input. todo_helper = format output.

from bson import ObjectId

# todo_helper is a Serializer, Not a Validator
# convert MongoDB data → Python dic

def todo_helper(todo) -> dict:
    print("check", todo)
    return {
        "id"          : str(todo["_id"]),
        "title"       : str(todo["title"]),
        "description" : todo.get("description"),
        "completed"   : todo["completed"]
        }
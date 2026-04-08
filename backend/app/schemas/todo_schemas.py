#  ← Pydantic schemas

from pydantic import baseModel
from typing import Optional

class Todo(BaseModel):
    title : str
    description : Optional[str] = None
    completed: Optional[bool] = False   # default value

class UpdateTodo(baseModel):
    title: Optional[str]
    description : Optional[str]
    completed: Optional[bool] = False
#  ← Pydantic schemas

from pydantic import BaseModel
from typing import Optional

class Todo(BaseModel):
    title : str
    description : Optional[str] = None
    completed: Optional[bool] = False   # default value

class UpdateTodo(BaseModel):
    title: Optional[str]
    description : Optional[str]
    completed: Optional[bool] = None
from app.db.database import database
from app.models.user_models import user_helper
from app.core.security import hash_password , verify_password,create_access_token
from bson import ObjectId

user_collection = database.get_collection("user")

# REGISTER PROGRESS

async def register_user(user_data: dict):
    # checking if email already exists

    existing_user = await user_collection.find_one({"email": user_data["email"]})

    if existing_user:
        return None 
    
    # Hashing Progress
    user_data["password"] = hash_password(user_data["password"])

    # Save 
    new_user = await user_collection.insert_one(user_data)
    created =  await user_collection.find_one({"_id": new_user.inserted_id})
    return user_helper(created)

# LOGIN Progress

async def login_user(email: str, password: str):

    user = await user_collection.find_one({"email": email})

    if not user:
        return None 

    if not verify_password(password , user["password"]):
        return None   # <- wrong password
    
    # Create JWT token
    token = create_access_token({"sub": str(user["_id"])})
    return {"access_token": token , "token_type":"bearer"}


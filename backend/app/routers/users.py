from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
import sqlite3
from ..database import get_db
from ..schemas import UserIn, Token
from ..crud import create_user, authenticate_user
from ..auth import create_access_token, get_current_user

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_in: UserIn, db: sqlite3.Connection = Depends(get_db)) :
  try :
    create_user(db, user_in.username, user_in.password)
  except sqlite3.IntegrityError :
    raise HTTPException(status.HTTP_400_BAD_REQUEST, "이미 존재하는 유저네임")
  return {"msg": "회원가입 성공!"}

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: sqlite3.Connection = Depends(get_db)) :
  user = authenticate_user(db, form_data.username, form_data.password)
  if not user :
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="유저네임 또는 비번 틀림",
      headers={"WWW-Authenticate": "Bearer"},
    )
  access_token = create_access_token({"sub": user["username"]})
  return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me")
def read_users_me(current_user=Depends(get_current_user)) :
  return {"username": current_user["username"]}
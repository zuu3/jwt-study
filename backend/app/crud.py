import sqlite3
from passlib.context import CryptContext

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user(db: sqlite3.Connection, username: str):
  return db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()

def create_user(db: sqlite3.Connection, username: str, password: str):
  hashed = pwd_ctx.hash(password)
  cursor = db.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed))
  db.commit()
  return cursor.lastrowid

def verify_password(plain_pw: str, hashed_pw: str):
  return pwd_ctx.verify(plain_pw, hashed_pw)

def authenticate_user(db: sqlite3.Connection, username: str, password: str):
  user = get_user(db, username)
  print(user)
  if not user or not verify_password(password, user["password"]) :
    return None
  if user["disabled"]:
    return None
  return user
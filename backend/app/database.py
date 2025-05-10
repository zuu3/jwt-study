import os
import sqlite3
from typing import Generator

BASE_DIR = os.path.dirname(os.path.dirname(__file__))  
DB_PATH = os.path.join(BASE_DIR, "users.db")          

def get_db() -> Generator[sqlite3.Connection, None, None]:
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

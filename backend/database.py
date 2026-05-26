import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Đọc link database từ file .env
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Khởi tạo động cơ kết nối
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Hàm xử lý kết nối an toàn cho từng Request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
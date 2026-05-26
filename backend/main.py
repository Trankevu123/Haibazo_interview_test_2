from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db
import models, schemas

# Tự động tạo bảng
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Book Review API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Dấu * nghĩa là cho phép mọi ứng dụng (Web, Mobile) gọi vào
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các lệnh GET, POST, PUT, DELETE
    allow_headers=["*"],
)

# ==========================================
# API CHO TÁC GIẢ (AUTHORS)
# ==========================================

# 1. API Lấy danh sách toàn bộ tác giả
@app.get("/authors/", response_model=list[schemas.AuthorResponse])
def get_authors(db: Session = Depends(get_db)):
    return db.query(models.Author).all()

# 2. API Thêm một tác giả mới
@app.post("/authors/", response_model=schemas.AuthorResponse)
def create_author(author: schemas.AuthorCreate, db: Session = Depends(get_db)):
    new_author = models.Author(name=author.name)
    db.add(new_author)
    db.commit()
    db.refresh(new_author)
    return new_author


# ==========================================
# API CHO SÁCH (BOOKS)
# ==========================================

# 1. API Lấy danh sách toàn bộ Sách
@app.get("/books/", response_model=list[schemas.BookResponse])
def get_books(db: Session = Depends(get_db)):
    return db.query(models.Book).all()

# 2. API Thêm một cuốn Sách mới
@app.post("/books/", response_model=schemas.BookResponse)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    new_book = models.Book(title=book.title, author_id=book.author_id)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book


# ==========================================
# API CHO ĐÁNH GIÁ (REVIEWS)
# ==========================================

# 1. API Lấy danh sách toàn bộ Đánh giá
@app.get("/reviews/", response_model=list[schemas.ReviewResponse])
def get_reviews(db: Session = Depends(get_db)):
    return db.query(models.Review).all()

# 2. API Thêm một Đánh giá mới
@app.post("/reviews/", response_model=schemas.ReviewResponse)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    new_review = models.Review(content=review.content, book_id=review.book_id)
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review

# ==========================================
# API XÓA (DELETE)
# ==========================================

# 1. Xóa Tác giả
@app.delete("/authors/{author_id}")
def delete_author(author_id: int, db: Session = Depends(get_db)):
    author = db.query(models.Author).filter(models.Author.id == author_id).first()
    if not author:
        raise HTTPException(status_code=404, detail="Không tìm thấy tác giả")
    db.delete(author)
    db.commit()
    return {"message": "Đã xóa tác giả thành công!"}

# 2. Xóa Sách
@app.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Không tìm thấy sách")
    db.delete(book)
    db.commit()
    return {"message": "Đã xóa sách thành công!"}

# 3. Xóa Đánh giá
@app.delete("/reviews/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Không tìm thấy đánh giá")
    db.delete(review)
    db.commit()
    return {"message": "Đã xóa đánh giá thành công!"}

# ==========================================
# API SỬA (PUT)
# ==========================================

# 1. Sửa Tác giả
@app.put("/authors/{author_id}", response_model=schemas.AuthorResponse)
def update_author(author_id: int, author_data: schemas.AuthorCreate, db: Session = Depends(get_db)):
    # Tìm xem tác giả có tồn tại không
    author = db.query(models.Author).filter(models.Author.id == author_id).first()
    if not author:
        raise HTTPException(status_code=404, detail="Không tìm thấy tác giả")
    
    # Cập nhật thông tin mới
    author.name = author_data.name
    db.commit()
    db.refresh(author)
    return author

# 2. Sửa Sách
@app.put("/books/{book_id}", response_model=schemas.BookResponse)
def update_book(book_id: int, book_data: schemas.BookCreate, db: Session = Depends(get_db)):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Không tìm thấy sách")
    
    book.title = book_data.title
    book.author_id = book_data.author_id
    db.commit()
    db.refresh(book)
    return book

# 3. Sửa Đánh giá
@app.put("/reviews/{review_id}", response_model=schemas.ReviewResponse)
def update_review(review_id: int, review_data: schemas.ReviewCreate, db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Không tìm thấy đánh giá")
    
    review.content = review_data.content
    review.book_id = review_data.book_id
    db.commit()
    db.refresh(review)
    return review
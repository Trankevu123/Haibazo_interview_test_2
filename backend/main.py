from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db
import models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title = "Book Review API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/authors/", response_model=list[schemas.AuthorResponse])
def get_authors(db: Session = Depends(get_db)):
    return db.query(models.Author).all()
    

@app.post("/authors/", response_model=schemas.AuthorResponse)
def create_author(author: schemas.AuthorCreate, db: Session = Depends(get_db)) :
    new_author = models.Author(name=author.name)
    db.add(new_author)
    db.commit()
    db.refresh(new_author)
    return new_author

@app.get("/books/", response_model=list[schemas.BookResponse])
def get_books(db: Session = Depends(get_db)):
    return db.query(models.Book).all()

@app.post("/books/", response_model=schemas.BookResponse)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    new_book = models.Book(title=book.title, author_id=book.author_id)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book

@app.get("/reviews/", response_model=list[schemas.ReviewResponse])
def get_reviews(db: Session = Depends(get_db)):
    return db.query(models.Review).all()

@app.post("/reviews/", response_model=schemas.ReviewResponse)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    new_review = models.Review(content=review.content, book_id=review.book_id)
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review

@app.delete("/authors/{author_id}")
def delete_author(author_id: int, db: Session = Depends(get_db)):
    author = db.query(models.Author).filter(models.Author.id == author_id).first()
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    db.delete(author)
    db.commit()
    return {"detail": "Author deleted successfully"}

@app.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    db.delete(book)
    db.commit()
    return {"detail": "Book deleted successfully"}

@app.delete("/reviews/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    db.delete(review)
    db.commit()
    return {"detail": "Review deleted successfully"}


@app.put("/authors/{author_id}", response_model=schemas.AuthorResponse)
def update_author(author_id: int, author_data: schemas.AuthorCreate, db: Session = Depends(get_db)):
    author = db.query(models.Author).filter(models.Author.id == author_id).first()
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    author.name = author_data.name
    db.commit()
    db.refresh(author)
    return author

@app.put("/books/{book_id}", response_model=schemas.BookResponse)
def update_book(book_id: int, book_data: schemas.BookCreate, db: Session = Depends(get_db)):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    book.title = book_data.title
    book.author_id = book_data.author_id
    db.commit()
    db.refresh(book)
    return book

@app.put("/reviews/{review_id}", response_model=schemas.ReviewResponse)
def update_review(review_id: int, review_data: schemas.ReviewCreate, db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.content = review_data.content
    review.book_id = review_data.book_id
    db.commit()
    db.refresh(review)
    return review

# Ep Railway chay lai lần 2
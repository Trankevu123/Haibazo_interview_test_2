from pydantic import BaseModel

# Khuôn gốc
class AuthorBase(BaseModel):
    name: str

# Khuôn dùng khi tạo mới Tác giả
class AuthorCreate(AuthorBase):
    pass

# Khuôn dùng khi trả dữ liệu ra ngoài (có thêm ID)
class AuthorResponse(AuthorBase):
    id: int

    class Config:
        from_attributes = True


# ==========================================
# KHUÔN CHO SÁCH (BOOKS)
# ==========================================

class BookBase(BaseModel):
    title: str
    author_id: int  # Sách bắt buộc phải biết ai là tác giả

class BookCreate(BookBase):
    pass

class BookResponse(BookBase):
    id: int

    class Config:
        from_attributes = True


# ==========================================
# KHUÔN CHO ĐÁNH GIÁ (REVIEWS)
# ==========================================

class ReviewBase(BaseModel):
    content: str
    book_id: int  # Đánh giá này thuộc về cuốn sách nào?

class ReviewCreate(ReviewBase):
    pass

class ReviewResponse(ReviewBase):
    id: int

    class Config:
        from_attributes = True
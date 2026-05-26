const API_BASE_URL = "https://haibazointerviewtest2-production.up.railway.app";

export const apiService = {
 // === API TÁC GIẢ ===
 getAuthors: async () => {
    const res = await fetch(`${API_BASE_URL}/authors/`);
    return res.json();
 },
 createAuthor: async (name) => {
    const res = await fetch(`${API_BASE_URL}/authors/`,{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    return res.json();
 },
 updateAuthor: async (authorId, name) => {
    const res = await fetch(`${API_BASE_URL}/authors/${authorId}`,{
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    return res.json();
 },
 deleteAuthor: async (authorId) => {
    const res = await fetch(`${API_BASE_URL}/authors/${authorId}`,{
        method: 'DELETE',
    });
    return res.json();
 },

 // === API SÁCH ===
 getBooks: async () => {
    const res = await fetch(`${API_BASE_URL}/books/`);
    return res.json();
 },
 createBook: async (title, authorId) => {
    const res = await fetch(`${API_BASE_URL}/books/`,{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author_id: authorId }),
    });
    return res.json();
 },
 updateBook: async (bookId, title, authorId) => {
    const res = await fetch(`${API_BASE_URL}/books/${bookId}`,{
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author_id: authorId }),
    });
    return res.json();
 },
 deleteBook: async (bookId) => {
    const res = await fetch(`${API_BASE_URL}/books/${bookId}`,{
        method: 'DELETE',
    });
    return res.json();
 },

 // === API ĐÁNH GIÁ ===
 getReviews: async () => {
    const res = await fetch(`${API_BASE_URL}/reviews/`);
    return res.json();
 },
 createReview: async (content, bookId) => {
    const res = await fetch(`${API_BASE_URL}/reviews/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, book_id: bookId }),
    });
    return res.json();
 },
 updateReview: async (reviewId, content, bookId) => {
    const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, book_id: bookId }),
    });
    return res.json();
 },
 deleteReview: async (reviewId) => {
    const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    return res.json();
 }
};
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import BookCard from '../components/BookCard';
import AuthorCard from '../components/AuthorCard';
import ReviewCard from '../components/ReviewCard'; // Import thêm Thẻ Đánh giá

const Home = () => {
  const [activeMenu, setActiveMenu] = useState('Books');
  const [activeTab, setActiveTab] = useState('List');
  const [openMenu, setOpenMenu] = useState('Books');

  // --- KHO DỮ LIỆU HỆ THỐNG ---
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [reviews, setReviews] = useState([]); // Thêm state lưu Đánh giá
  const [loading, setLoading] = useState(false);

  // --- STATE FORM: SÁCH ---
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  // --- STATE FORM: TÁC GIẢ ---
  const [authorName, setAuthorName] = useState('');
  const [editingAuthor, setEditingAuthor] = useState(null);

  // --- STATE FORM: ĐÁNH GIÁ (MỚI THÊM) ---
  const [reviewContent, setReviewContent] = useState('');
  const [reviewBookId, setReviewBookId] = useState('');
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const booksData = await apiService.getBooks();
      const authorsData = await apiService.getAuthors();
      const reviewsData = await apiService.getReviews(); // Lấy dữ liệu Đánh giá
      setBooks(booksData);
      setAuthors(authorsData);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- HÀM TRA CỨU TÊN (DỊCH MÃ ID) ---
  const getAuthorName = (id) => {
    const author = authors.find(a => a.id === id);
    return author ? author.name : "Không xác định";
  };

  const getBookTitle = (id) => {
    const book = books.find(b => b.id === id);
    return book ? book.title : "Sách không tồn tại hoặc đã bị xóa";
  };

  // ==========================================
  // XỬ LÝ LOGIC: SÁCH
  // ==========================================
  const handleEditBookClick = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthorId(book.author_id);
    setActiveTab('Create');
  };

  const handleSubmitBook = async (e) => {
    e.preventDefault();
    if (!title || !authorId) return alert("Vui lòng nhập tên và chọn tác giả!");
    try {
      if (editingBook) {
        await apiService.updateBook(editingBook.id, title, parseInt(authorId));
      } else {
        await apiService.createBook(title, parseInt(authorId));
      }
      setTitle(''); setAuthorId(''); setEditingBook(null); 
      fetchData(); setActiveTab('List'); 
    } catch (error) {
      alert("Lỗi khi lưu sách!");
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Xóa cuốn sách này?")) {
      await apiService.deleteBook(bookId);
      fetchData();
    }
  };

  // ==========================================
  // XỬ LÝ LOGIC: TÁC GIẢ
  // ==========================================
  const handleEditAuthorClick = (author) => {
    setEditingAuthor(author);
    setAuthorName(author.name);
    setActiveTab('Create');
  };

  const handleSubmitAuthor = async (e) => {
    e.preventDefault();
    if (!authorName) return alert("Vui lòng nhập tên tác giả!");
    try {
      if (editingAuthor) {
        await apiService.updateAuthor(editingAuthor.id, authorName);
      } else {
        await apiService.createAuthor(authorName);
      }
      setAuthorName(''); setEditingAuthor(null);
      fetchData(); setActiveTab('List');
    } catch (error) {
      alert("Lỗi khi lưu tác giả!");
    }
  };

  const handleDeleteAuthor = async (authorId) => {
    if (window.confirm("Xóa tác giả này? Các cuốn sách thuộc tác giả này cũng sẽ bị mất!")) {
      await apiService.deleteAuthor(authorId);
      fetchData();
    }
  };

  // ==========================================
  // XỬ LÝ LOGIC: ĐÁNH GIÁ (MỚI THÊM)
  // ==========================================
  const handleEditReviewClick = (review) => {
    setEditingReview(review);
    setReviewContent(review.content);
    setReviewBookId(review.book_id);
    setActiveTab('Create');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewContent || !reviewBookId) return alert("Vui lòng nhập nội dung đánh giá và chọn sách!");
    try {
      if (editingReview) {
        await apiService.updateReview(editingReview.id, reviewContent, parseInt(reviewBookId));
      } else {
        await apiService.createReview(reviewContent, parseInt(reviewBookId));
      }
      setReviewContent(''); setReviewBookId(''); setEditingReview(null);
      fetchData(); setActiveTab('List');
    } catch (error) {
      alert("Lỗi khi lưu đánh giá!");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Bạn có chắc muốn xóa bài đánh giá này không?")) {
      await apiService.deleteReview(reviewId);
      fetchData();
    }
  };

  // ==========================================
  // LOGIC ĐIỀU HƯỚNG TAB
  // ==========================================
  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'Create') {
      if (!editingBook) { setTitle(''); setAuthorId(''); }
      if (!editingAuthor) { setAuthorName(''); }
      if (!editingReview) { setReviewContent(''); setReviewBookId(''); }
    }
  };

  // --- STYLES CSS ---
  const menuStyle = (menuName) => ({
    padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    fontWeight: '600', borderRadius: '8px', marginBottom: '4px', transition: 'all 0.2s',
    color: activeMenu === menuName ? '#2563eb' : '#475569',
    backgroundColor: activeMenu === menuName ? '#eff6ff' : 'transparent',
  });

  const subMenuStyle = (tabName) => ({
    padding: '10px 16px 10px 44px', cursor: 'pointer', fontSize: '14px', borderRadius: '8px', marginTop: '4px',
    color: activeTab === tabName ? '#2563eb' : '#64748b',
    fontWeight: activeTab === tabName ? '600' : '400',
    backgroundColor: activeTab === tabName ? '#eff6ff' : 'transparent',
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui' }}>
      
      {/* SIDEBAR BÊN TRÁI */}
      <div style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px', paddingLeft: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>📚</span> BookAdmin
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['Authors', 'Books', 'Reviews'].map(menu => (
            <div key={menu}>
              <div onClick={() => { setOpenMenu(openMenu === menu ? null : menu); setActiveMenu(menu); handleSwitchTab('List'); }} style={menuStyle(menu)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>{menu === 'Authors' ? '👤' : menu === 'Books' ? '📖' : '⭐'}</span>
                  {menu}
                </div>
                <span>{openMenu === menu ? 'v' : '>'}</span>
              </div>
              
              {openMenu === menu && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div onClick={() => handleSwitchTab('List')} style={subMenuStyle('List')}>📄 Danh sách (List)</div>
                  <div onClick={() => { 
                    handleSwitchTab('Create'); 
                    setEditingBook(null); setEditingAuthor(null); setEditingReview(null);
                  }} style={subMenuStyle('Create')}>
                    ➕ Thêm mới (Create)
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* KHU VỰC NỘI DUNG CHÍNH BÊN PHẢI */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: 0, color: '#1e293b', fontSize: '28px' }}>
            {activeMenu === 'Books' ? 'Quản Lý Sách' : activeMenu === 'Authors' ? 'Quản Lý Tác Giả' : 'Quản Lý Đánh Giá'}
          </h1>
        </div>

        {/* ========================================== */}
        {/* 1. HIỂN THỊ QUẢN LÝ SÁCH */}
        {/* ========================================== */}
        {activeMenu === 'Books' && (
          <>
            {activeTab === 'List' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                {loading ? <p>Đang tải...</p> : books.map(book => {
                  const bookWithAuthorName = { ...book, author_name: getAuthorName(book.author_id) };
                  return <BookCard key={book.id} book={bookWithAuthorName} onDelete={handleDeleteBook} onEdit={handleEditBookClick} />;
                })}
              </div>
            )}
            {activeTab === 'Create' && (
              <div style={{ maxWidth: '500px', backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
                <form onSubmit={handleSubmitBook} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '14px' }}>Tên sách</label>
                    <input type="text" placeholder="Nhập tiêu đề sách..." value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '14px' }}>Tác giả</label>
                    <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px', cursor: 'pointer', boxSizing: 'border-box', backgroundColor: 'white' }}>
                      <option value="">-- Click để chọn Tác giả --</option>
                      {authors.map(author => (<option key={author.id} value={author.id}>{author.name}</option>))}
                    </select>
                  </div>
                  <button type="submit" style={{ marginTop: '8px', backgroundColor: editingBook ? '#10b981' : '#2563eb', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>
                    {editingBook ? '💾 Cập Nhật Sách' : '➕ Tạo Sách'}
                  </button>
                  {editingBook && <button type="button" onClick={() => { setEditingBook(null); setActiveTab('List'); }} style={{ backgroundColor: '#f1f5f9', color: '#64748b', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>❌ Hủy</button>}
                </form>
              </div>
            )}
          </>
        )}

        {/* ========================================== */}
        {/* 2. HIỂN THỊ QUẢN LÝ TÁC GIẢ */}
        {/* ========================================== */}
        {activeMenu === 'Authors' && (
          <>
            {activeTab === 'List' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                {loading ? <p>Đang tải...</p> : authors.map(author => (
                  <AuthorCard key={author.id} author={author} onDelete={handleDeleteAuthor} onEdit={handleEditAuthorClick} />
                ))}
              </div>
            )}
            {activeTab === 'Create' && (
              <div style={{ maxWidth: '500px', backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
                <form onSubmit={handleSubmitAuthor} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '14px' }}>Tên Tác Giả</label>
                    <input type="text" placeholder="Nhập tên tác giả..." value={authorName} onChange={(e) => setAuthorName(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }} />
                  </div>
                  <button type="submit" style={{ marginTop: '8px', backgroundColor: editingAuthor ? '#10b981' : '#2563eb', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>
                    {editingAuthor ? '💾 Cập Nhật Tác Giả' : '➕ Tạo Tác Giả'}
                  </button>
                  {editingAuthor && <button type="button" onClick={() => { setEditingAuthor(null); setActiveTab('List'); }} style={{ backgroundColor: '#f1f5f9', color: '#64748b', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>❌ Hủy</button>}
                </form>
              </div>
            )}
          </>
        )}

        {/* ========================================== */}
        {/* 3. HIỂN THỊ QUẢN LÝ ĐÁNH GIÁ (BẢN HOÀN CHỈNH ĐỈNH CAO) */}
        {/* ========================================== */}
        {activeMenu === 'Reviews' && (
          <>
            {activeTab === 'List' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                {loading ? <p>Đang tải...</p> : reviews.length === 0 ? <p style={{ color: '#64748b' }}>Chưa có bài đánh giá nào.</p> : reviews.map(review => {
                  const reviewWithBookTitle = { ...review, book_title: getBookTitle(review.book_id) };
                  return <ReviewCard key={review.id} review={reviewWithBookTitle} onDelete={handleDeleteReview} onEdit={handleEditReviewClick} />;
                })}
              </div>
            )}
            {activeTab === 'Create' && (
              <div style={{ maxWidth: '500px', backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
                <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '14px' }}>Chọn cuốn sách đánh giá</label>
                    <select value={reviewBookId} onChange={(e) => setReviewBookId(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px', cursor: 'pointer', boxSizing: 'border-box', backgroundColor: 'white' }}>
                      <option value="">-- Click để chọn Sách --</option>
                      {books.map(book => (<option key={book.id} value={book.id}>{book.title}</option>))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '14px' }}>Nội dung đánh giá</label>
                    <textarea placeholder="Nhập cảm nghĩ của bạn về cuốn sách này..." value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px', boxSizing: 'border-box', minHeight: '120px', fontFamily: 'inherit', resize: 'vertical' }} />
                  </div>
                  <button type="submit" style={{ marginTop: '8px', backgroundColor: editingReview ? '#10b981' : '#2563eb', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>
                    {editingReview ? '💾 Cập Nhật Đánh Giá' : '➕ Tạo Đánh Giá'}
                  </button>
                  {editingReview && <button type="button" onClick={() => { setEditingReview(null); setActiveTab('List'); }} style={{ backgroundColor: '#f1f5f9', color: '#64748b', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>❌ Hủy</button>}
                </form>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Home;
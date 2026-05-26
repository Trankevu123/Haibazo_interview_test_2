// src/components/BookCard.jsx
import React from 'react';

const BookCard = ({ book, onDelete, onEdit }) => {
  return (
    <div className="book-card" style={{
      border: '1px solid #eaeaea',
      borderRadius: '16px',
      padding: '20px',
      width: '260px',
      backgroundColor: '#ffffff',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
      transition: 'transform 0.2s ease, boxShadow 0.2s ease',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'between'
    }}>
      {/* 1. Ảnh bìa minh họa độc đáo lấy theo tên sách */}
      <div style={{
        width: '100%',
        height: '180px',
        backgroundColor: '#f5f7fa',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        border: '1px solid #f0f0f0'
      }}>
        <span style={{ fontSize: '48px' }}>📖</span>
      </div>

      {/* 2. Thông tin nội dung */}
      <div style={{ flexGrow: 1 }}>
        <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' }}>
          ID Sách: {book.id}
        </span>
        <h3 style={{ margin: '4px 0 8px 0', color: '#1a1a1a', fontSize: '18px', lineHeight: '1.4' }}>
          {book.title}
        </h3>
        <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
          👤 Tác giả: {book.author_name}
        </p>
      </div>

      {/* 3. Điểm đánh giá sao cố định */}
      <div style={{ color: '#ff9800', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        ★★★★☆ <span style={{ color: '#444', fontWeight: '600' }}>4.0</span>
      </div>

      {/* 4. Nút hành động */}
      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <button
        onClick={() => onEdit(book)}
        style={{ 
          backgroundColor: '#f5f7fa', 
          color: '#4a5568', 
          border: '1px solid #e2e8f0', 
          padding: '8px 12px', 
          borderRadius: '8px', 
          cursor: 'pointer', 
          flex: 1,
          fontWeight: '500'
        }}>Sửa</button>
        
        <button 
          onClick={() => onDelete(book.id)}
          style={{ 
            backgroundColor: '#fff5f5', 
            color: '#e53e3e', 
            border: '1px solid #fed7d7', 
            padding: '8px 12px', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            flex: 1,
            fontWeight: '500'
          }}
        >Xóa</button>
      </div>
    </div>
  );
};

export default BookCard;
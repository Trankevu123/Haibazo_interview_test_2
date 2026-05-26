// src/components/ReviewCard.jsx
import React from 'react';

const ReviewCard = ({ review, onDelete, onEdit }) => {
  return (
    <div style={{
      border: '1px solid #e2e8f0', 
      borderRadius: '16px', 
      padding: '24px', 
      width: '280px',
      backgroundColor: '#ffffff', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '24px' }}>⭐</span>
        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>
          MÃ ĐÁNH GIÁ: {review.id}
        </span>
      </div>
      
      {/* Nội dung review in nghiêng */}
      <p style={{ color: '#334155', fontSize: '15px', lineHeight: '1.6', flex: 1, fontStyle: 'italic', margin: '0 0 16px 0' }}>
        "{review.content}"
      </p>
      
      {/* Tên sách được review */}
      <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '20px' }}>
        <p style={{ color: '#64748b', fontSize: '13px', margin: 0, fontWeight: '500' }}>
          📖 Sách: <span style={{ color: '#0f172a', fontWeight: '600' }}>{review.book_title}</span>
        </p>
      </div>
      
      {/* Nút hành động */}
      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <button 
          onClick={() => onEdit(review)} 
          style={{ flex: 1, padding: '8px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', color: '#475569', fontWeight: '500' }}
        >Sửa</button>
        <button 
          onClick={() => onDelete(review.id)} 
          style={{ flex: 1, padding: '8px', backgroundColor: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '8px', cursor: 'pointer', color: '#e53e3e', fontWeight: '500' }}
        >Xóa</button>
      </div>
    </div>
  );
};

export default ReviewCard;
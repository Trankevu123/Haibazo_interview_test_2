// src/components/AuthorCard.jsx
import React from 'react';

const AuthorCard = ({ author, onDelete, onEdit }) => {
  return (
    <div style={{
      border: '1px solid #e2e8f0', 
      borderRadius: '16px', 
      padding: '24px 20px', 
      width: '220px',
      backgroundColor: '#ffffff', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      textAlign: 'center',
      transition: 'transform 0.2s'
    }}>
      {/* Avatar Tác giả */}
      <div style={{ 
        fontSize: '40px', 
        marginBottom: '16px', 
        backgroundColor: '#f1f5f9', 
        width: '80px', 
        height: '80px', 
        borderRadius: '50%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        👤
      </div>
      
      {/* Thông tin */}
      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>
        MÃ TÁC GIẢ: {author.id}
      </span>
      <h3 style={{ margin: '8px 0 20px 0', color: '#1e293b', fontSize: '18px' }}>
        {author.name}
      </h3>
      
      {/* Nút hành động */}
      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
        <button 
          onClick={() => onEdit(author)} 
          style={{ flex: 1, padding: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', color: '#475569', fontWeight: '500' }}
        >Sửa</button>
        <button 
          onClick={() => onDelete(author.id)} 
          style={{ flex: 1, padding: '8px', backgroundColor: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '8px', cursor: 'pointer', color: '#e53e3e', fontWeight: '500' }}
        >Xóa</button>
      </div>
    </div>
  );
};

export default AuthorCard;
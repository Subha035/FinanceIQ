import React from 'react';
import { createPortal } from 'react-dom';
import { X, Edit3, Trash2, Calendar, Tag, Type } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/helpers';
import './TransactionDetailModal.css';

export default function TransactionDetailModal({ transaction, onClose, onEdit, onDelete }) {
  React.useEffect(() => {
    const layoutContent = document.querySelector('.layout-content');
    if (layoutContent) layoutContent.style.overflowY = 'hidden';
    return () => { 
      if (layoutContent) layoutContent.style.overflowY = 'auto'; 
    };
  }, []);

  if (!transaction) return null;

  return createPortal(
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal detail-modal animate-scale">
        <div className="detail-compact-header">
          <div className={`detail-type-indicator ${transaction.type}`} />
          <span className="detail-compact-title">Transaction Details</span>
          <span className="detail-txn-id" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', marginLeft: 'auto', marginRight: '0.75rem', letterSpacing: '0.02em' }}>
            #{transaction.id}
          </span>
          <button className="detail-close-minimal" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="detail-compact-body">
          <div className="detail-main-row">
            <h3 className="detail-desc-text">{transaction.description}</h3>
            <div className={`detail-amount-text ${transaction.type}`}>
              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
            </div>
          </div>

          <div className="detail-meta-list">
            <div className="detail-meta-item">
              <Calendar size={12} />
              <span>{formatDate(transaction.date)}</span>
            </div>
            <div className="detail-meta-item">
              <Tag size={12} />
              <span className="category-pill-mini">{transaction.category}</span>
            </div>
          </div>
        </div>

        {(onEdit || onDelete) && (
          <div className="detail-compact-footer">
            {onDelete && (
              <button className="btn-detail-trash" onClick={onDelete} title="Delete">
                <Trash2 size={14} />
              </button>
            )}
            {onEdit && (
              <button className="btn-detail-edit-mini" onClick={onEdit}>
                <Edit3 size={14} /> Edit Transaction
              </button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

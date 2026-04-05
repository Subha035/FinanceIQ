import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Type, Tag, Calendar, IndianRupee, Check } from 'lucide-react';
import useStore from '../../store/useStore';
import './TransactionModal.css';

const CATEGORIES = [
  'Food & Dining', 'Transport', 'Shopping', 'Entertainment',
  'Healthcare', 'Utilities', 'Rent', 'Education', 'Gym & Fitness',
  'Salary', 'Freelance Income', 'Investment Return',
];

const INCOME_CATEGORIES = ['Salary', 'Freelance Income', 'Investment Return'];

function getDefaultForm() {
  return {
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: 'Food & Dining',
    type: 'expense',
    amount: '',
  };
}

export default function TransactionModal({ transaction, onClose }) {
  const { addTransaction, updateTransaction } = useStore();
  const isEdit = !!transaction;

  const [form, setForm] = useState(
    isEdit
      ? { date: transaction.date, description: transaction.description, category: transaction.category, type: transaction.type, amount: String(transaction.amount) }
      : getDefaultForm()
  );
  const [error, setError] = useState('');

  useEffect(() => {
    const layoutContent = document.querySelector('.layout-content');
    if (layoutContent) layoutContent.style.overflowY = 'hidden';
    return () => {
      if (layoutContent) layoutContent.style.overflowY = 'auto';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => {
      const updated = { ...f, [name]: value };
      // Auto-set type based on category
      if (name === 'category') {
        const isInc = INCOME_CATEGORIES.includes(value);
        updated.type = isInc ? 'income' : 'expense';
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim()) { setError('Description is required'); return; }
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) { setError('Enter a valid amount'); return; }
    if (!form.date) { setError('Date is required'); return; }

    const txn = { ...form, amount: Number(form.amount) };
    if (isEdit) updateTransaction(transaction.id, txn);
    else addTransaction(txn);
    onClose();
  };

  return createPortal(
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal animate-scale">
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-icon-badge">
              {isEdit ? <Check size={20} /> : <Plus size={20} />}
            </div>
            <h2 className="modal-title">{isEdit ? 'Edit Transaction' : 'New Transaction'}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Prominent Amount Section */}
          <div className="amount-input-wrap">
            <div className="amount-label">How much?</div>
            <div className="amount-field">
              <span className="amount-currency">₹</span>
              <input
                className="amount-input"
                name="amount"
                type="number"
                min="0.01"
                step="any"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                autoFocus
              />
            </div>
          </div>

          <div className="form-main">
            <div className="form-group-fancy">
              <label className="form-label">
                <Type size={14} className="form-icon" /> Description
              </label>
              <input
                className="input-fancy"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Where did it go? (e.g. Starbucks)"
              />
            </div>

            <div className="form-row">
              <div className="form-group-fancy">
                <label className="form-label">
                  <Tag size={14} className="form-icon" /> Category
                </label>
                <select className="input-fancy" name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group-fancy">
                <label className="form-label">
                  <Calendar size={14} className="form-icon" /> Date
                </label>
                <input className="input-fancy" name="date" type="date" value={form.date} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group-fancy">
              <label className="form-label">Classification</label>
              <div className="type-toggle-fancy">
                {['expense', 'income'].map(t => (
                  <button
                    key={t}
                    type="button"
                    className={`type-btn-fancy ${form.type === t ? `active-${t}` : ''}`}
                    onClick={() => setForm(f => ({ ...f, type: t }))}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && <div className="form-error-box">{error}</div>}

          <div className="modal-footer">
            <button type="button" className="btn-cancel-fancy" onClick={onClose}>Discard</button>
            <button type="submit" className="btn-submit-fancy">
              {isEdit ? 'Save Changes' : 'Confirm Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

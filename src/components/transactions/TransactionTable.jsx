import React, { useState } from 'react';
import { Edit2, Trash2, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import useStore from '../../store/useStore';
import { formatDate, formatCurrency } from '../../utils/helpers';
import TransactionModal from './TransactionModal';
import TransactionDetailModal from './TransactionDetailModal';
import './TransactionTable.css';

export default function TransactionTable({ transactions }) {
  const { role, deleteTransaction, filters, setFilter } = useStore();
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSort = (col) => {
    if (filters.sortBy === col) {
      setFilter('sortDir', filters.sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setFilter('sortBy', col);
      setFilter('sortDir', 'desc');
    }
  };

  const SortIcon = ({ col }) => {
    if (filters.sortBy !== col) return <ArrowUpDown size={13} className="sort-icon sort-icon--inactive" />;
    return filters.sortDir === 'asc'
      ? <ChevronUp size={13} className="sort-icon sort-icon--active" />
      : <ChevronDown size={13} className="sort-icon sort-icon--active" />;
  };

  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>No transactions found</p>
        <p style={{ fontSize: '0.875rem' }}>Try adjusting your filters or adding a new transaction.</p>
      </div>
    );
  }

  return (
    <>
      <div className="txn-table-wrap">
        <table className="txn-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('date')} className="sortable">
                <span>Date</span><SortIcon col="date" />
              </th>
              <th>Description</th>
              <th onClick={() => handleSort('category')} className="sortable">
                <span>Category</span><SortIcon col="category" />
              </th>
              <th>Type</th>
              <th onClick={() => handleSort('amount')} className="sortable th-right">
                <span>Amount</span><SortIcon col="amount" />
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="txn-row" onClick={() => setSelectedTxn(t)}>
                <td className="td-date">
                  <span>{formatDate(t.date)}</span>
                  <span className="txn-id">{t.id}</span>
                </td>
                <td className="td-desc">{t.description}</td>
                <td>
                  <span className="category-pill">{t.category}</span>
                </td>
                <td>
                  <span className={`badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
                    {t.type}
                  </span>
                </td>
                <td className={`td-amount ${t.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal Overlay */}
      {selectedTxn && (
        <TransactionDetailModal
          transaction={selectedTxn}
          onClose={() => setSelectedTxn(null)}
          onEdit={role === 'admin' ? () => setShowEditModal(true) : null}
          onDelete={role === 'admin' ? () => {
            if (window.confirm(`Delete "${selectedTxn.description}"?`)) {
              deleteTransaction(selectedTxn.id);
              setSelectedTxn(null);
            }
          } : null}
        />
      )}

      {/* Edit Modal renders on top of Detail Modal as a centered popup */}
      {showEditModal && selectedTxn && (
        <TransactionModal
          transaction={selectedTxn}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}

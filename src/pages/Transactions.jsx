import React, { useMemo, useState } from 'react';
import { Plus, Search, SlidersHorizontal, X, Download } from 'lucide-react';
import useStore from '../store/useStore';
import { exportToCSV, exportToJSON } from '../utils/helpers';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionModal from '../components/transactions/TransactionModal';
import './Pages.css';

const CATEGORIES = [
  'all', 'Food & Dining', 'Transport', 'Shopping', 'Entertainment',
  'Healthcare', 'Utilities', 'Rent', 'Education', 'Gym & Fitness',
  'Salary', 'Freelance Income', 'Investment Return',
];

export default function Transactions() {
  const { role, filters, setFilter, resetFilters, getFilteredTransactions, transactions } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const filtered = useMemo(getFilteredTransactions, [getFilteredTransactions, filters, transactions]);

  const hasActiveFilters = filters.search || filters.type !== 'all' || filters.category !== 'all' || filters.dateFrom || filters.dateTo;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">
            {filtered.length} transaction{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => exportToCSV(filtered)}>
            <Download size={14} /> CSV
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => exportToJSON(filtered)}>
            <Download size={14} /> JSON
          </button>
          {role === 'admin' && (
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
              <Plus size={15} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar card" style={{ marginBottom: '1rem' }}>
        <div className="filter-row">
          {/* Search */}
          <div className="filter-search">
            <Search size={15} className="filter-search-icon" />
            <input
              className="input"
              style={{ paddingLeft: '2.25rem' }}
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
            />
          </div>

          {/* Type */}
          <select className="input filter-select" value={filters.type} onChange={(e) => setFilter('type', e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category */}
          <select className="input filter-select" value={filters.category} onChange={(e) => setFilter('category', e.target.value)}>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
            ))}
          </select>

          {/* Date range */}
          <input className="input filter-date" type="date" value={filters.dateFrom}
            onChange={(e) => setFilter('dateFrom', e.target.value)} title="From date" />
          <input className="input filter-date" type="date" value={filters.dateTo}
            onChange={(e) => setFilter('dateTo', e.target.value)} title="To date" />

          {hasActiveFilters && (
            <button className="btn btn-ghost btn-sm" onClick={resetFilters} title="Clear filters">
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      <TransactionTable transactions={filtered} />

      {showAddModal && (
        <TransactionModal transaction={null} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

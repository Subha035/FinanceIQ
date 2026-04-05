import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';



const useStore = create(
  persist(
    (set, get) => ({
      // Data
      transactions: mockTransactions,

      // Role
      role: 'admin', // 'admin' | 'viewer'
      setRole: (role) => set({ role }),

      // Theme
      darkMode: true,
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      // Filters (Transactions page)
      filters: {
        search: '',
        type: 'all',
        category: 'all',
        dateFrom: '',
        dateTo: '',
        sortBy: 'date',
        sortDir: 'desc',
      },
      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),
      resetFilters: () =>
        set({
          filters: {
            search: '',
            type: 'all',
            category: 'all',
            dateFrom: '',
            dateTo: '',
            sortBy: 'date',
            sortDir: 'desc',
          },
        }),

      // CRUD (Admin only)
      addTransaction: (txn) =>
        set((s) => {
          // Compute next ID from current max to avoid collisions after page reload
          const maxId = s.transactions.reduce((max, t) => {
            const num = parseInt(t.id.replace('TXN', ''), 10);
            return num > max ? num : max;
          }, 0);
          return {
            transactions: [
              { ...txn, id: `TXN${String(maxId + 1).padStart(4, '0')}` },
              ...s.transactions,
            ],
          };
        }),

      updateTransaction: (id, data) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      // Computed filtered transactions
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let list = [...transactions];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          list = list.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q) ||
              t.id.toLowerCase().includes(q)
          );
        }
        if (filters.type !== 'all') {
          list = list.filter((t) => t.type === filters.type);
        }
        if (filters.category !== 'all') {
          list = list.filter((t) => t.category === filters.category);
        }
        if (filters.dateFrom) {
          list = list.filter((t) => t.date >= filters.dateFrom);
        }
        if (filters.dateTo) {
          list = list.filter((t) => t.date <= filters.dateTo);
        }

        list.sort((a, b) => {
          let valA = a[filters.sortBy];
          let valB = b[filters.sortBy];
          if (filters.sortBy === 'amount') {
            valA = Number(valA);
            valB = Number(valB);
          }
          if (valA < valB) return filters.sortDir === 'asc' ? -1 : 1;
          if (valA > valB) return filters.sortDir === 'asc' ? 1 : -1;
          return 0;
        });

        return list;
      },
    }),
    {
      name: 'finance-dashboard-store',
      partialize: (s) => ({
        transactions: s.transactions,
        role: s.role,
        darkMode: s.darkMode,
      }),
    }
  )
);

export default useStore;

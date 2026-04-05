# FinanceIQ — Finance Dashboard

A premium, interactive **Finance Dashboard** built with React + Vite. Track income, expenses, and spending patterns with rich visualizations and role-based access control.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✨ Features

### Dashboard Overview
- **4 Summary Cards** — Total Balance, Monthly Income, Monthly Expenses, Savings Rate — each with MoM trend indicators
- **Balance Trend Chart** — Area chart showing income vs expenses over the last 6 months (Recharts)
- **Spending Breakdown** — Donut chart categorizing all-time expenses by category
- **Monthly Bar Chart** — Side-by-side income, expense, and savings comparison

### Transactions
- **60+ mock transactions** pre-loaded across 6 months
- **Search** — by description, category, or transaction ID
- **Filter** — by type (income/expense), category, and date range
- **Sort** — by date, amount, or category (ascending/descending)
- **Export** — Download filtered transactions as CSV or JSON

### Role-Based UI (RBAC)
| Feature | Viewer | Admin |
|---|---|---|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |

Switch roles using the dropdown in the header (persisted to localStorage).

### Insights
- Highest spending category this month
- Month-over-month expense change (% and ₹)
- Expense-to-income ratio with health indicator
- Top 3 all-time expense categories with visual bar

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| State | Zustand (with persist middleware) |
| Charts | Recharts |
| Icons | Lucide React |
| Styling | Vanilla CSS (CSS custom properties) |
| Persistence | localStorage via Zustand |

---

## 🎨 Design Decisions

- **CSS Custom Properties** for theming — dark/light mode toggle with zero JS overhead
- **Zustand** chosen for its minimal boilerplate vs Redux, with built-in `persist` for localStorage
- **Recharts** for its React-native composable API — easy to customize with custom tooltips
- **Computed selectors** (`getFilteredTransactions`) keep filter logic in the store and out of components
- **Role state** stored in Zustand + localStorage — survives page refresh
- **All data is mock** — no backend needed; `mockData.js` generates realistic transactions with `Intl.NumberFormat` for INR formatting

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Sidebar, Header, Layout
│   ├── cards/           # SummaryCard
│   ├── charts/          # BalanceTrendChart, SpendingPieChart, MonthlyBarChart
│   ├── transactions/    # TransactionTable, TransactionModal
│   └── insights/        # InsightsPanel
├── pages/               # Dashboard, Transactions, Insights
├── store/               # useStore.js (Zustand)
├── data/                # mockData.js
├── utils/               # helpers.js (formatters, export, compute functions)
└── styles/              # index.css (global design system)
```

---

## 🌙 Optional Enhancements (All Implemented)

- ✅ **Dark Mode** — toggle in header, CSS variable–based
- ✅ **LocalStorage Persistence** — transactions, role, and theme survive refresh
- ✅ **Export (CSV & JSON)** — on Transactions page, exports filtered results
- ✅ **Animations** — fade-in, slide-in, hover lifts throughout
- ✅ **Fully Responsive** — collapsible sidebar, stacked layouts on mobile

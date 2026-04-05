# Finance Dashboard UI — Implementation Plan

A full-featured, interactive Finance Dashboard built with **React + Vite**, styled with **Vanilla CSS**, using **Zustand** for state management and **Recharts** for visualizations. Designed to be premium, responsive, and role-aware.

## Proposed Changes

### Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS with CSS custom properties (no Tailwind)
- **State**: Zustand (lightweight, no boilerplate)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Persistence**: localStorage via Zustand middleware

---

### Project Structure

```
d:/Zorvyn_frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/         # Sidebar, Header, Layout wrapper
│   │   ├── cards/          # SummaryCard
│   │   ├── charts/         # BalanceTrendChart, SpendingPieChart, MonthlyBarChart
│   │   ├── transactions/   # TransactionTable, TransactionModal, Filters
│   │   └── insights/       # InsightsPanel
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   └── Insights.jsx
│   ├── store/
│   │   └── useStore.js     # Zustand store with persist
│   ├── data/
│   │   └── mockData.js     # 50+ mock transactions
│   ├── utils/
│   │   └── helpers.js      # formatters, export helpers
│   ├── styles/
│   │   ├── index.css       # global tokens, resets
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── charts.css
│   ├── App.jsx
│   └── main.jsx
├── README.md
└── package.json
```

---

### Core Features

#### 1. Dashboard Overview
- **4 Summary Cards**: Total Balance, Monthly Income, Monthly Expenses, Savings Rate
- **Balance Trend Chart**: Area/Line chart showing last 6 months of balance changes
- **Spending Breakdown**: Donut chart by category (Food, Transport, Entertainment, etc.)

#### 2. Transactions Section
- Table with columns: Date, Description, Category, Type (Income/Expense), Amount
- **Search**: by description or category
- **Filter**: by type (all/income/expense), by category, by date range
- **Sort**: by date, amount, category
- Admin role: **Add / Edit / Delete** transaction via modal

#### 3. Role-Based UI
- **Viewer**: Read-only access (no add/edit/delete buttons)
- **Admin**: Full CRUD access + can see admin badge in header
- Role switcher: Dropdown in header/sidebar
- State persisted in Zustand + localStorage

#### 4. Insights Section
- Highest spending category this month
- Month-over-month expense comparison
- Income vs Expense ratio
- Top 3 spending categories ranked
- Savings trend indicator

#### 5. Optional Enhancements (all included)
- **Dark Mode**: Toggle in header, CSS variable-based
- **LocalStorage Persistence**: Transactions, role, theme
- **Export**: CSV and JSON download buttons (Transactions page)
- **Animations**: Smooth transitions, card hover effects, page transitions
- **Mobile Responsive**: Collapsible sidebar, stacked layouts

---

## Verification Plan

### Browser Testing (via browser_subagent)
1. Launch dev server: `npm run dev` from `d:\Zorvyn_frontend`
2. Open `http://localhost:5173` and verify:
   - Dashboard loads with summary cards
   - Charts render correctly
   - Role switcher changes UI (Admin vs Viewer)
   - Transactions can be filtered/searched
   - Dark mode toggle works
   - Add/Edit modal works for Admin
   - Responsive on mobile viewport (375px)
   - Export buttons download files

### Manual Verification Steps
1. Switch role to **Viewer** → confirm no Add/Edit/Delete buttons appear
2. Switch role to **Admin** → confirm CRUD buttons appear; add a transaction; verify it appears in the list and charts update
3. Search "groceries" in transactions → confirm filtered results
4. Click dark mode toggle → entire UI switches theme
5. Export CSV → file downloads with correct data

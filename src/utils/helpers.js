// Format currency in INR
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date to readable string
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Get month name from date string
export function getMonthName(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

// Get YYYY-MM from date string
export function getMonthKey(dateStr) {
  return dateStr.slice(0, 7);
}

// Export to CSV
export function exportToCSV(transactions, filename = 'transactions.csv') {
  const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map(t => [
    t.id,
    t.date,
    `"${t.description}"`,
    t.category,
    t.type,
    t.amount,
  ]);
  const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Export to JSON
export function exportToJSON(transactions, filename = 'transactions.json') {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Compute summary stats from transactions
export function computeSummary(transactions) {
  const now = new Date('2026-04-04');
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const prevMonthKey = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}`;

  const currentMonth = transactions.filter(t => t.date.startsWith(currentMonthKey));
  const prevMonth = transactions.filter(t => t.date.startsWith(prevMonthKey));

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const monthlyIncome = currentMonth.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const monthlyExpense = currentMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const prevMonthlyExpense = prevMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const prevMonthlyIncome = prevMonth.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);

  const savingsRate = monthlyIncome > 0 ? Math.round(((monthlyIncome - monthlyExpense) / monthlyIncome) * 100) : 0;

  return { balance, totalIncome, totalExpense, monthlyIncome, monthlyExpense, savingsRate, prevMonthlyExpense, prevMonthlyIncome };
}

// Get monthly data for chart (last 6 months)
export function getMonthlyChartData(transactions) {
  const months = [];
  const now = new Date('2026-04-04');
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    const mTxns = transactions.filter(t => t.date.startsWith(key));
    const income = mTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = mTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    months.push({ month: label, income, expense, savings: income - expense });
  }
  return months;
}

// Get spending breakdown by category (current month expenses)
export function getCategoryBreakdown(transactions) {
  const now = new Date('2026-04-04');
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  // Use all expenses for broader view
  const expenses = transactions.filter(t => t.type === 'expense');
  const map = {};
  expenses.forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

// Get insights
export function getInsights(transactions) {
  const now = new Date('2026-04-04');
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const prevMonthKey = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}`;

  const currentExpenses = transactions.filter(t => t.type === 'expense' && t.date.startsWith(currentMonthKey));
  const prevExpenses = transactions.filter(t => t.type === 'expense' && t.date.startsWith(prevMonthKey));

  // Top spending category
  const catMap = {};
  currentExpenses.forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
  const topCategory = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0];

  // Top 3 categories (all time)
  const allCatMap = {};
  transactions.filter(t => t.type === 'expense').forEach(t => { allCatMap[t.category] = (allCatMap[t.category] || 0) + t.amount; });
  const top3 = Object.entries(allCatMap).sort((a, b) => b[1] - a[1]).slice(0, 3);

  const currentTotal = currentExpenses.reduce((s, t) => s + t.amount, 0);
  const prevTotal = prevExpenses.reduce((s, t) => s + t.amount, 0);
  const expenseChange = prevTotal > 0 ? Math.round(((currentTotal - prevTotal) / prevTotal) * 100) : 0;

  const currentIncome = transactions.filter(t => t.type === 'income' && t.date.startsWith(currentMonthKey)).reduce((s, t) => s + t.amount, 0);
  const ratio = currentIncome > 0 ? Math.round((currentTotal / currentIncome) * 100) : 0;

  return { topCategory, top3, currentTotal, prevTotal, expenseChange, ratio };
}

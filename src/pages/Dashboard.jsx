import React, { useMemo } from 'react';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Percent } from 'lucide-react';
import useStore from '../store/useStore';
import { computeSummary, getMonthlyChartData, getCategoryBreakdown, formatCurrency } from '../utils/helpers';
import SummaryCard from '../components/cards/SummaryCard';
import BalanceTrendChart from '../components/charts/BalanceTrendChart';
import SpendingPieChart from '../components/charts/SpendingPieChart';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import './Pages.css';

export default function Dashboard() {
  const { transactions, role } = useStore();

  const summary = useMemo(() => computeSummary(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyChartData(transactions), [transactions]);
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions]);

  const expenseChange = summary.prevMonthlyExpense > 0
    ? Math.round(((summary.monthlyExpense - summary.prevMonthlyExpense) / summary.prevMonthlyExpense) * 100)
    : 0;

  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(summary.balance),
      icon: Wallet,
      color: '#6366f1',
      change: undefined,
    },
    {
      title: 'Monthly Income',
      value: formatCurrency(summary.monthlyIncome),
      icon: ArrowUpCircle,
      color: '#10b981',
      change: summary.prevMonthlyIncome > 0
        ? Math.round(((summary.monthlyIncome - summary.prevMonthlyIncome) / summary.prevMonthlyIncome) * 100)
        : undefined,
      changeLabel: 'vs last month',
    },
    {
      title: 'Monthly Expenses',
      value: formatCurrency(summary.monthlyExpense),
      icon: ArrowDownCircle,
      color: '#ef4444',
      change: -expenseChange,
      changeLabel: 'vs last month',
    },
    {
      title: 'Savings Rate',
      value: `${summary.savingsRate}%`,
      icon: Percent,
      color: '#f59e0b',
      change: undefined,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            {role === 'admin' ? (
              <span className="badge badge-admin">Admin</span>
            ) : (
              <span className="badge" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>Viewer</span>
            )}
            &nbsp;Overview of your financial activity
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid stagger" style={{ marginBottom: '1.25rem' }}>
        {cards.map((card, i) => (
          <SummaryCard key={card.title} {...card} index={i} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="charts-grid" style={{ marginBottom: '1.25rem' }}>
        <BalanceTrendChart data={monthlyData} />
        <SpendingPieChart data={categoryData} />
      </div>

      {/* Bar Chart */}
      <MonthlyBarChart data={monthlyData} />
    </div>
  );
}

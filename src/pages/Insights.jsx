import React, { useMemo } from 'react';
import useStore from '../store/useStore';
import { getInsights, getMonthlyChartData } from '../utils/helpers';
import InsightsPanel from '../components/insights/InsightsPanel';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import './Pages.css';

export default function Insights() {
  const { transactions, role } = useStore();
  const insights = useMemo(() => getInsights(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyChartData(transactions), [transactions]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Insights</h1>
          <p className="page-subtitle">Smart observations about your spending habits</p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state card">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531a3.374 3.374 0 00-.547-.547z" />
          </svg>
          <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>No data available</p>
          <p style={{ fontSize: '0.875rem' }}>Add some transactions to see insights.</p>
        </div>
      ) : (
        <>
          <section style={{ marginBottom: '1.25rem' }}>
            <h2 className="section-title">Key Metrics</h2>
            <InsightsPanel insights={insights} />
          </section>

          <section>
            <h2 className="section-title">Monthly Trend</h2>
            <MonthlyBarChart data={monthlyData} />
          </section>
        </>
      )}
    </div>
  );
}

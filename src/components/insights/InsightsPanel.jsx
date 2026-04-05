import React from 'react';
import { TrendingUp, TrendingDown, Award, BarChart2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import './InsightsPanel.css';

export default function InsightsPanel({ insights }) {
  const { topCategory, top3, expenseChange, ratio, currentTotal, prevTotal } = insights;

  const cards = [
    {
      icon: Award,
      color: '#f59e0b',
      title: 'Top Spending Category',
      main: topCategory ? topCategory[0] : 'N/A',
      sub: topCategory ? `${formatCurrency(topCategory[1])} this month` : 'No data',
    },
    {
      icon: expenseChange <= 0 ? TrendingDown : TrendingUp,
      color: expenseChange <= 0 ? '#10b981' : '#ef4444',
      title: 'Month-over-Month Expenses',
      main: `${expenseChange > 0 ? '+' : ''}${expenseChange}%`,
      sub: `${formatCurrency(prevTotal)} → ${formatCurrency(currentTotal)}`,
    },
    {
      icon: BarChart2,
      color: '#6366f1',
      title: 'Expense-to-Income Ratio',
      main: `${ratio}%`,
      sub: ratio < 70 ? '✅ Healthy spending habit' : ratio < 90 ? '⚠️ Watch your expenses' : '🚨 Overspending risk',
    },
  ];

  return (
    <div className="insights-grid stagger">
      {cards.map((card, i) => (
        <div key={i} className="insight-card animate-fade" style={{ animationDelay: `${i * 0.08}s` }}>
          <div className="insight-icon" style={{ '--ic': card.color }}>
            <card.icon size={20} />
          </div>
          <div className="insight-body">
            <p className="insight-label">{card.title}</p>
            <p className="insight-value" style={{ color: card.color }}>{card.main}</p>
            <p className="insight-sub">{card.sub}</p>
          </div>
        </div>
      ))}

      {/* Top 3 breakdown */}
      {top3 && top3.length > 0 && (
        <div className="insight-card insight-card--wide animate-fade" style={{ animationDelay: '0.25s' }}>
          <div className="insight-icon" style={{ '--ic': '#3b82f6' }}>
            <BarChart2 size={20} />
          </div>
          <div className="insight-body" style={{ flex: 1 }}>
            <p className="insight-label">Top 3 All-Time Expense Categories</p>
            <div className="top3-list">
              {top3.map(([cat, amt], i) => {
                const max = top3[0][1];
                const pct = Math.round((amt / max) * 100);
                return (
                  <div key={cat} className="top3-item">
                    <div className="top3-label">
                      <span className="top3-rank">#{i + 1}</span>
                      <span>{cat}</span>
                    </div>
                    <div className="top3-bar-wrap">
                      <div className="top3-bar" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="top3-amount">{formatCurrency(amt)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

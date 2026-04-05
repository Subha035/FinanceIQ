import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import './Charts.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__label">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="chart-tooltip__item">
            {p.name}: ₹{p.value.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function BalanceTrendChart({ data }) {
  return (
    <div className="chart-card animate-fade" style={{ animationDelay: '0.1s' }}>
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Balance Trend</h3>
          <p className="chart-subtitle">Income vs Expenses over 6 months</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)', paddingTop: '8px' }} />
          <Area type="monotone" dataKey="income" name="Income" stroke="#10b981" strokeWidth={2}
            fill="url(#incomeGrad)" dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }} />
          <Area type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" strokeWidth={2}
            fill="url(#expenseGrad)" dot={{ r: 3, fill: '#ef4444', strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

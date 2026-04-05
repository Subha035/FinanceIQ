import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Charts.css';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__label">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.fill }} className="chart-tooltip__item">
          ₹{payload[0].value.toLocaleString('en-IN')} ({payload[0].payload.percent}%)
        </p>
      </div>
    );
  }
  return null;
};


export default function SpendingPieChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const enriched = data.map((d, i) => ({
    ...d,
    fill: COLORS[i % COLORS.length],
    percent: total > 0 ? ((d.value / total) * 100).toFixed(1) : 0,
  }));

  return (
    <div className="chart-card animate-fade" style={{ animationDelay: '0.15s' }}>
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Spending Breakdown</h3>
          <p className="chart-subtitle">By category (all time)</p>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="empty-state" style={{ height: 260 }}>No expense data</div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie 
              data={enriched} 
              cx="50%" 
              cy="50%" 
              innerRadius={60} 
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {enriched.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: '1.5rem' }}
              formatter={(value, entry) => (
                <span style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 500 }}>
                  {value} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({entry.payload.percent}%)</span>
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

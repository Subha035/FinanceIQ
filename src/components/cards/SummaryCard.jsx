import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './SummaryCard.css';

export default function SummaryCard({ title, value, change, changeLabel, icon: Icon, color, index }) {
  const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className="summary-card animate-fade" style={{ animationDelay: `${index * 0.06}s` }}>
      <div className="summary-card__header">
        <span className="summary-card__title">{title}</span>
        <div className="summary-card__icon" style={{ '--card-color': color }}>
          <Icon size={18} />
        </div>
      </div>
      <div className="summary-card__value">{value}</div>
      {change !== undefined && (
        <div className={`summary-card__change summary-card__change--${trend}`}>
          <TrendIcon size={13} />
          <span>{Math.abs(change)}% {changeLabel}</span>
        </div>
      )}
    </div>
  );
}

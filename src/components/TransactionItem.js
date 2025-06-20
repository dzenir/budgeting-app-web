import React from 'react';

function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = new Date(
    timestamp.seconds ? timestamp.seconds * 1000 : timestamp
  );
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function TransactionItem({ transaction }) {
  const isIncome = transaction.type === 'Income';
  const amountColor = isIncome ? '#16a34a' : '#dc2626';

  return (
    <div className="transaction-item">
      <div className="row">
        <span className="label">Type:</span>
        <span>{transaction.type}</span>
      </div>
      <div className="row">
        <span className="label">Category:</span>
        <span>{transaction.category || 'Uncategorized'}</span>
      </div>
      <div className="row">
        <span className="label">Date:</span>
        <span>{formatDate(transaction.createdAt)}</span>
      </div>
      <div className="row">
        <span className="label">Amount:</span>
        <span style={{ color: amountColor }}>
          {transaction.currency || '€'}
          {parseFloat(transaction.amount).toFixed(2)}
        </span>
      </div>
    </div>
  );
}

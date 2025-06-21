import React from 'react';
import './TransactionItem.css';

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

  return (
    <div className="transaction-item">
  <div className="transaction-row">
    <div className="transaction-label">Type:</div>
    <div className="transaction-value">{transaction.type}</div>
  </div>
  <div className="transaction-row">
    <div className="transaction-label">Category:</div>
    <div className="transaction-value">{transaction.mainCategory || '—'}</div>
  </div>
  <div className="transaction-row">
    <div className="transaction-label">Subcategory:</div>
    <div className="transaction-value">{transaction.subCategory || '—'}</div>
  </div>
  <div className="transaction-row">
    <div className="transaction-label">Date:</div>
<div className="transaction-value">
  {formatDate(transaction.date || transaction.createdAt)}
</div>
  </div>
  <div className="transaction-row">
    <div className="transaction-label">Amount:</div>
    <div className="transaction-value" style={{ color: isIncome ? 'green' : 'red' }}>
      {transaction.amount}
    </div>
  </div>
</div>

  );
}

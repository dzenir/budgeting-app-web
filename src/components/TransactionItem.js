import React from 'react';

export default function TransactionItem({ transaction }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-200">
      <div>
        <p className="text-sm font-medium text-gray-900">
          {transaction.name}
        </p>
        <p className="text-xs text-gray-500">{transaction.category}</p>
      </div>
      <div className="text-sm font-semibold text-gray-800">
        €{transaction.amount}
      </div>
    </div>
  );
}

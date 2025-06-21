import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/firebaseService';
import TransactionItem from '../components/TransactionItem';
import './AllTransactions.css';

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const load = async () => {
      if (!userId) return;
      const data = await fetchTransactions(userId);
      setTransactions(data);
    };

    load();
  }, [userId]);

  return (
    <div className="all-transactions-container">
      <h1>All Transactions</h1>
      <div className="all-transactions-list">
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
}

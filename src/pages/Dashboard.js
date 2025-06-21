import React, { useEffect, useState } from 'react';
import './DashboardPage.css';
import { fetchTransactions, addTransaction } from '../services/firebaseService';
import TransactionItem from '../components/TransactionItem';
import TransactionForm from '../components/TransactionForm';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState('KM');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: 'Income',
    mainCategory: '',
    subCategory: '',
    amount: '',
    description: '',
    recurring: false,
    paymentMethod: '',
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const loadTransactions = async () => {
      if (!userId) return;
      const data = await fetchTransactions(userId);
      setTransactions(data);
    };

    loadTransactions();
  }, [userId]);

  const handleSubmit = async () => {
    if (!form.mainCategory || !form.subCategory || !form.amount) {
      alert('Please fill in all required fields.');
      return;
    }

    const data = {
      ...form,
      amount: parseFloat(form.amount),
      createdAt: new Date(),
    };

    await addTransaction(userId, data);
    const updated = await fetchTransactions(userId);
    setTransactions(updated);

    setShowForm(false);
    setForm({
      type: 'Income',
      mainCategory: '',
      subCategory: '',
      amount: '',
      description: '',
      recurring: false,
      paymentMethod: '',
    });
  };

  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="dashboard">
      <h1>Overview</h1>

      <div className="cards">
        <div className="card">
          <p>Total Balance</p>
          <h2>{currency}{balance.toFixed(2)}</h2>
        </div>
        <div className="card">
          <p>This Month's Spend</p>
          <h2>{currency}{totalExpense.toFixed(2)}</h2>
        </div>
        <div className="card">
          <p>Remaining Budget</p>
          <h2>{currency}{balance.toFixed(2)}</h2>
        </div>
      </div>

      <div className="currency-switch">
        {['KM', '€', '$'].map(cur => (
          <button
            key={cur}
            onClick={() => setCurrency(cur)}
            className={currency === cur ? 'active' : ''}
          >
            {cur}
          </button>
        ))}
      </div>

      <button className="add-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Income / Expense'}
      </button>

      {showForm && (
        <TransactionForm form={form} setForm={setForm} onSubmit={handleSubmit} />
      )}

      <div className="dashboard-header">
  <div className="transactions-header-wrapper">
  <h3>Recent Transactions</h3>
  <a href="/all-transactions" className="view-all-link-recent-transactions">View All</a>
</div>
</div>

<div className="transactions-table">
  {transactions.slice(0, 5).map(transaction => (
    <TransactionItem key={transaction.id} transaction={transaction} />
  ))}
</div>

    </div>
  );
}

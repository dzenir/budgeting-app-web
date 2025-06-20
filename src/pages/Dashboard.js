import React, { useEffect, useState } from 'react';
import './DashboardPage.css';
import { fetchTransactions, addTransaction } from '../services/firebaseService';
import TransactionItem from '../components/TransactionItem';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState('KM');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: 'Income',
    category: '',
    amount: '',
    description: '',
    recurring: false,
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
    if (!form.category || !form.amount) {
      alert('Please enter both category and amount.');
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
      category: '',
      amount: '',
      description: '',
      recurring: false,
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
        <div className="form">
          <select onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
          <label>
            <input
              type="checkbox"
              checked={form.recurring}
              onChange={e => setForm(f => ({ ...f, recurring: e.target.checked }))}
            />
            Recurring monthly
          </label>
          <button onClick={handleSubmit}>Save</button>
        </div>
      )}

      <h3>Recent Transactions:</h3>
      <div className="transactions">
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

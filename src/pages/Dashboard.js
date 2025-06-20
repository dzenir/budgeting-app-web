import React, { useEffect, useState } from 'react';
import './DashboardPage.css'; // we'll style it separately
import { db } from '../firebase'; // instead of '../firebaseConfig'
import { collection, addDoc, getDocs } from 'firebase/firestore';

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

  const fetchTransactions = async () => {
    const snapshot = await getDocs(collection(db, 'users', userId, 'transactions'));
    const fetched = snapshot.docs.map(doc => doc.data());
    setTransactions(fetched);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async () => {
    const newTx = {
      ...form,
      amount: parseFloat(form.amount),
      date: new Date().toLocaleDateString(),
    };
    await addDoc(collection(db, 'users', userId, 'transactions'), newTx);
    setForm({ type: 'Income', category: '', amount: '', description: '', recurring: false });
    setShowForm(false);
    fetchTransactions();
  };

  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
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
        {transactions.map((tx, idx) => (
          <div key={idx} className="transaction">
            <div>
              <strong>{tx.category}</strong>
              {tx.description && <small>{tx.description}</small>}
            </div>
            <div>
              <span style={{ color: tx.type === 'Income' ? 'green' : 'red' }}>
                {currency}{tx.amount.toFixed(2)}
              </span>
              <small>{tx.date}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

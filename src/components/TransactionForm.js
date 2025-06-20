// 📁 src/components/TransactionForm.js

import React from 'react';
import DropdownGroup from './DropdownGroup';
import { incomeCategories, expenseCategories, paymentMethods } from '../constants/categories';
import './TransactionForm.css';

export default function TransactionForm({ form, setForm, onSubmit }) {
  const isIncome = form.type === 'Income';
  const categoryGroups = isIncome ? incomeCategories : expenseCategories;
  const subItems = categoryGroups.find(g => g.group === form.mainCategory)?.items || [];

  return (
    <div className="form">
      <select
        className="full-width"
        value={form.type}
        onChange={e => setForm(f => ({ ...f, type: e.target.value, mainCategory: '', subCategory: '' }))}
      >
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      <DropdownGroup
        label=""
        value={form.mainCategory}
        onChange={e => setForm(f => ({ ...f, mainCategory: e.target.value, subCategory: '' }))}
        options={categoryGroups}
        placeholder="Main Category"
      />

      <DropdownGroup
        label=""
        value={form.subCategory}
        onChange={e => setForm(f => ({ ...f, subCategory: e.target.value }))}
        options={[{ group: '', items: subItems }]}
        placeholder="Subcategory"
      />

      <DropdownGroup
        label=""
        value={form.paymentMethod}
        onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
        options={[{ group: '', items: paymentMethods }]}
        placeholder="Payment Method"
      />

      <input
        className="full-width"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
      />

      <input
        className="full-width"
        type="text"
        placeholder="Description (optional)"
        value={form.description}
        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
      />

      <div className="checkbox-row">
  <input
    type="checkbox"
    id="recurring"
    checked={form.recurring}
    onChange={e => setForm(f => ({ ...f, recurring: e.target.checked }))}
  />
  <label htmlFor="recurring">Recurring monthly</label>
</div>

      <button className="save-button" onClick={onSubmit}>Save</button>
    </div>
  );
}
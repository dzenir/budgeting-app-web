import React from 'react';
import DropdownGroup from './DropdownGroup';
import { incomeCategories, expenseCategories, paymentMethods } from '../constants/categories';
import './TransactionForm.css';

export default function TransactionForm({ form, setForm, onSubmit }) {
  const isIncome = form.type === 'Income';
  const categoryGroups = isIncome ? incomeCategories : expenseCategories;

  // Main categories are the group names
  const mainCategoryOptions = categoryGroups.map(g => g.group);

  // Subcategories come from the selected group
  const selectedGroup = categoryGroups.find(g => g.group === form.mainCategory);
  const subItems = selectedGroup ? selectedGroup.items : [];

  return (
    <div className="form">
      {/* Type Selector */}
      <select
        className="full-width"
        value={form.type}
        onChange={e =>
          setForm(f => ({
            ...f,
            type: e.target.value,
            mainCategory: '',
            subCategory: ''
          }))
        }
      >
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      {/* Main Category Dropdown */}
      <DropdownGroup
        value={form.mainCategory}
        onChange={e => setForm(f => ({
          ...f,
          mainCategory: e.target.value,
          subCategory: '' // reset subcategory on change
        }))}
        options={[{ group: '', items: mainCategoryOptions }]}
        placeholder="Main Category"
      />

      {/* Subcategory Dropdown */}
      <DropdownGroup
        value={form.subCategory}
        onChange={e => setForm(f => ({ ...f, subCategory: e.target.value }))}
        options={[{ group: '', items: subItems }]}
        placeholder="Subcategory"
      />

      {/* Payment Method Dropdown */}
      <DropdownGroup
        value={form.paymentMethod}
        onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
        options={[{ group: '', items: paymentMethods }]}
        placeholder="Payment Method"
      />

      {/* Amount Input */}
      <input
        className="full-width"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
      />

      {/* Description Input */}
      <input
        className="full-width"
        type="text"
        placeholder="Description (optional)"
        value={form.description}
        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
      />

      {/* Recurring Checkbox */}
      <div className="checkbox-row">
        <label>
          <input
            type="checkbox"
            checked={form.recurring}
            onChange={e => setForm(f => ({ ...f, recurring: e.target.checked }))}
          />
          <span>Recurring monthly</span>
        </label>
      </div>

      {/* Submit Button */}
      <button className="save-button" onClick={onSubmit}>
        Save
      </button>
    </div>
  );
}

import React from 'react';

export default function DropdownGroup({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map(group =>
          group.items.map(item => (
            <option key={item} value={item}>
              {group.group ? `${group.group} – ${item}` : item}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

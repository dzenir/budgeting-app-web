import React from 'react';

export default function DropdownGroup({ value, onChange, options, placeholder }) {
  const flatOptions = options.flatMap(group => group.items);

  return (
    <select className="full-width" value={value} onChange={onChange}>
      {value === '' && (
        <option value="" disabled hidden>{placeholder}</option>
      )}
      {flatOptions.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
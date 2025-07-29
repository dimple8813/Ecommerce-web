import React from 'react';

function Sidebar({ filters, setFilters, categories, brands, tags }) {
  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const alreadySelected = prev[type].includes(value);
      const updatedValues = alreadySelected
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updatedValues };
    });
  };

  const renderCheckboxes = (items, type) => (
    items.map((item, index) => (
      <div className="form-check" key={index}>
        <input
          className="form-check-input"
          type="checkbox"
          checked={filters[type].includes(item)}
          onChange={() => handleFilterChange(type, item)}
          id={`${type}-${item}`}
        />
        <label className="form-check-label" htmlFor={`${type}-${item}`}>
          {item}
        </label>
      </div>
    ))
  );

  return (
    <div>
      <h5>Filter by Category</h5>
      {renderCheckboxes(categories, 'category')}
      <hr />
      <h5>Filter by Brand</h5>
      {renderCheckboxes(brands, 'brand')}
      <hr />
      <h5>Filter by Tag</h5>
      {renderCheckboxes(tags, 'tag')}
    </div>
  );
}

export default Sidebar;

import React from 'react';

const YearDropdown = ({ startYear, endYear, selectedYear, onYearChange }) => {
  const generateYears = (start, end) => {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years;
  };

  const years = generateYears(startYear, endYear);

  return (
    <select value={selectedYear} onChange={(e) => onYearChange(e.target.value)} style={{position:'relative',top:'7px',backgroundColor:'rgb(0 79 154)',color:'white',borderRadius:'5px',border:'none',width:'112px',height:'34px'}}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    
    </select>
  );
};

export default YearDropdown;


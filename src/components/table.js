import React, { useState, useRef } from 'react';

function TableGenerator() {
  const [numRows, setNumRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [xArray, setXArray] = useState([]);
  const [fArray, setFArray] = useState([]);
  const [interpolateValue, setInterpolateValue] = useState('');

  const numRowsInputRef = useRef(null);

  const handleNumRowsChange = (e) => { //Number of rows can only be whole numbers
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && Number.isInteger(value) && value >= 0) {
      setNumRows(value);
    }
  };

  const handleCellValueChange = (e, rowIndex, columnName) => { //Table input can only be integers
    const { value } = e.target;
    if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      const updatedData = [...tableData];
      updatedData[rowIndex][columnName] = value;
      setTableData(updatedData);
    }
  };

  const handleInterpolateValueChange = (e) => { //input can only be integers
    const { value } = e.target;
    if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      setInterpolateValue(value);
    }
  };

  const generateTable = () => { //creates the empty table
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push({
        x: '',
        f: ''
      });
    }
    setTableData(rows);
  };

  const handleDataOperation = () => { //putiing values from table to arrays
    const xValues = [];
    const fValues = [];

    tableData.forEach((row) => { //ATM prints the arrays of data inputted by user
      xValues.push(row.x);
      fValues.push(row.f);
    });

    setXArray(xValues);
    setFArray(fValues);

    console.log('xArray:', xValues);
    console.log('fArray:', fValues);
    console.log('Value to interpolate:', interpolateValue);
  };

  const handleRandomizeValues = () => {
    const randomizedData = tableData.map((row) => ({
      x: (Math.random() * 200 - 100).toFixed(2),
      f: (Math.random() * 200 - 100).toFixed(2)
    }));

    setTableData(randomizedData);
  };

  const handleReset = () => {
    setNumRows(0);
    setTableData([]);
    setXArray([]);
    setFArray([]);
    setInterpolateValue('');
  
    if (numRowsInputRef.current) {
      numRowsInputRef.current.value = ''; // Clearing the input field
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <label htmlFor="numRowsInput">Enter the number of rows: </label>
        <input
          type="number"
          id="numRowsInput"
          ref={numRowsInputRef}
          onChange={handleNumRowsChange}
          min="0"
        />
        <button onClick={generateTable}>Generate Table</button>
        {tableData.length > 0 && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>x</th>
                  <th>f</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={row.x}
                        onChange={(e) => handleCellValueChange(e, index, 'x')}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.f}
                        onChange={(e) => handleCellValueChange(e, index, 'f')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <label htmlFor="interpolateValueInput">Value to interpolate:</label>
            <input
              type="text"
              id="interpolateValueInput"
              value={interpolateValue}
              onChange={handleInterpolateValueChange}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <button onClick={handleDataOperation}>Store and Print Data</button>
              <button onClick={handleRandomizeValues}>Randomize Values</button>
              <button onClick={handleReset}>Reset</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TableGenerator;

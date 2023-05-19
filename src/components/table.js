import React, { useState } from 'react';

function TableGenerator() {
  const [numRows, setNumRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [xArray, setXArray] = useState([]);
  const [yArray, setYArray] = useState([]);
  const [interpolateValue, setInterpolateValue] = useState('');

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
        fx: ''
      });
    }
    setTableData(rows);
  };

  const handleDataOperation = () => { //putiing values from table to arrays
    const xValues = [];
    const yValues = [];

    tableData.forEach((row) => {
      xValues.push(row.x);
      yValues.push(row.fx);
    });

    setXArray(xValues);
    setYArray(yValues);
 
    //ATM prints the arrays of data inputted by the user in console
    console.log('x:', xValues);
    console.log('y:', yValues);
    console.log('Value to interpolate:', interpolateValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <label htmlFor="numRowsInput">Enter the number of rows: </label>
        <input type="number" id="numRowsInput" onChange={handleNumRowsChange} min="0" />
        <button onClick={generateTable}>Generate Table</button>
        {tableData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>x</th>
                <th>f(x)</th>
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
                      value={row.fx}
                      onChange={(e) => handleCellValueChange(e, index, 'fx')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <label htmlFor="interpolateValueInput">Value to interpolate:</label>
        <input
          type="text"
          id="interpolateValueInput"
          value={interpolateValue}
          onChange={handleInterpolateValueChange}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button onClick={handleDataOperation}>Store and Print Data</button>
        </div>
      </div>
    </div>
  );
}

export default TableGenerator;

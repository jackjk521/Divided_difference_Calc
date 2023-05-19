import React, { useState, useRef } from "react";

const TableGenerator = (props) => {
	const [numRows, setNumRows] = useState(0);
	const [tableData, setTableData] = useState([]);
	const [xArray, setXArray] = useState([]);
	const [fArray, setFArray] = useState([]);
	const [interpolateValue, setInterpolateValue] = useState(0);
  const [output, newOutput] = useState('');
  const [equation, newEquation] = useState('');
	const numRowsInputRef = useRef(null);

	function round(value, decimals) {
		return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
	}

	function dividedRecursion(n, m, x, f) {
		if (n == m) {
			return f[n];
		} else {
			return (
				(dividedRecursion(n + 1, m, x, f) - dividedRecursion(n, m - 1, x, f)) /
				(x[m] - x[n])
			);
		}
	}

  const PolynomialMaker = (x, f, givenX) =>{
    var final = f[0];
    var equation;
    var stringequation;
    givenX = parseFloat(givenX)
    var string = final;
    final = parseFloat(final)
    for (let i = 0; i < x.length - 1; i++) {
      equation = 1;
      stringequation = "";
      for (let j = 0; j < i + 1; j++) {
        equation *= (givenX - x[j]);
        stringequation = stringequation + "(x - " + x[j] + ")";
      }
      var dividedAnswer = dividedRecursion(0, i + 1, x, f);
      equation *= dividedAnswer;
      final += equation;
      string = string + " + " + stringequation + "(" + round(dividedAnswer, 5) + ")";
    }
    newEquation(string);
    newOutput(final);
    props.parentCallback(final, string, x, f)
  }

	const handleNumRowsChange = (e) => {
		//Number of rows can only be whole numbers
		const value = parseInt(e.target.value, 10);
		if (!isNaN(value) && Number.isInteger(value) && value >= 0) {
			setNumRows(value);
		}
	};

	const handleCellValueChange = (e, rowIndex, columnName) => {
		//Table input can only be integers
		const { value } = e.target;
		if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value) || value === "") {
			const updatedData = [...tableData];
			updatedData[rowIndex][columnName] = value;
			setTableData(updatedData);
		}
	};

	const handleInterpolateValueChange = (e) => {
		//input can only be integers
		const { value } = e.target;
		if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value) || value === "") {
			setInterpolateValue(value);
		}
	};

	const generateTable = () => {
		//creates the empty table
		const rows = [];
		for (let i = 0; i < numRows; i++) {
			rows.push({
				x: "",
				f: "",
			});
		}
		setTableData(rows);
	};

	const handleDataOperation = () => {
		//putiing values from table to arrays
		const xValues = [];
		const fValues = [];

		tableData.forEach((row) => {
			//ATM prints the arrays of data inputted by user
			xValues.push(row.x);
			fValues.push(row.f);
		});

		setXArray(xValues);
		setFArray(fValues);

		PolynomialMaker(xValues, fValues, interpolateValue);
	};

	const handleRandomizeValues = () => {
		const randomizedData = tableData.map((row) => ({
			// x: (Math.random() * 200 - 100).toFixed(2),
			x: (Math.random() * 20 - 10).toFixed(2),
			// f: (Math.random() * 200 - 100).toFixed(2),
			f: (Math.random() * 20 - 10).toFixed(2),
		}));

		setTableData(randomizedData);
	};

	const handleReset = () => {
		setNumRows(0);
		setTableData([]);
		setXArray([]);
		setFArray([]);
		setInterpolateValue("");
    newEquation('');
    newOutput('');
		props.parentCallback('', '', [], [])

		if (numRowsInputRef.current) {
			numRowsInputRef.current.value = ""; // Clearing the input field
		}
	};

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  paddingBottom: '1rem' }}  className="table-container">
      <div className="container">
  <div className="row justify-content-center">
    <div className="col-lg-6">
      <label htmlFor="numRowsInput">Enter the number of rows: </label>
      <div className="row">
        <div className="col-md-8">
          <input
            type="number"
            id="numRowsInput"
            ref={numRowsInputRef}
            onChange={handleNumRowsChange}
            min="0"
            className="form-control mb-2"
          />
        </div>
        <div className="col-md-4">
          <button onClick={generateTable} className="btn btn-primary mb-2">Generate Table</button>
        </div>
      </div>

      {tableData.length > 0 && (
        <div>
          <table className="table">
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
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.f}
                      onChange={(e) => handleCellValueChange(e, index, 'f')}
                      className="form-control"
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
            className="form-control mb-2"
          />
          <div className="d-flex justify-content-center"  style={{ padding: '1rem' }}>
            <button onClick={handleDataOperation} className="btn btn-success me-2">Show Output</button>
            <button onClick={handleRandomizeValues} className="btn btn-secondary me-2">Randomize Values</button>
            <button onClick={handleReset} className="btn btn-danger">Reset</button>
          </div>
        </div>
      )}
      {output && (
        <><div className="output-container mt-3">
                <p className="mb-0">
                  <strong>Function:</strong> {equation}
                </p>
              </div><div className="output-container mt-3">
                  <p className="mb-0">
                  <strong>Output: </strong> {output}
                  </p>
              </div></>
      )}
    </div>
  </div>
</div>
    </div>
  );
}

export default TableGenerator;

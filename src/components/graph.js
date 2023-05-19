import Desmos from "desmos";
import { useState, useRef, useLayoutEffect } from "react";
import Swal from "sweetalert2";

const GraphComponent = ({ x, y, fx }) => {
	const elem = useRef(null);
	const calculatorRef = useRef(null);
	const [mode, setMode] = useState("points");

	const isValidArray = (arr) =>
  		arr.every((value) => !isNaN(parseFloat(value)));

	const handleModeChange = (event) => {
		setMode(event.target.value);
	};

	useLayoutEffect(() => {
		const divElem = elem.current;

		if (!calculatorRef.current) {
			const calculator = Desmos.GraphingCalculator(divElem, {
				expressions: false,
			});
			calculatorRef.current = calculator;
		}

		const calculator = calculatorRef.current;
		calculator.setBlank();

		if (mode === "points") {
			if (x && x.length > 0 && y && y.length > 0) {
				if (isValidArray(x) && isValidArray(y)) {
					calculator.setExpression({
						type: "table",
						columns: [
							{ latex: "x", values: x },
							{ latex: "y", values: y, lines: 1 },
						],
					});
				} else {
					Swal.fire({
						title: "Error!",
						text: "Invalid points given",
						icon: "error",
					});
				}
			} else {
				Swal.fire({
					title: "Error!",
					text: "No points given",
					icon: "error",
				});
			}
		} else {
			if (fx && fx !== "") {
				calculator.setExpression({ id: "graph", latex: fx });
			} else {
				Swal.fire({
					title: "Error!",
					text: "No function given",
					icon: "error",
				});
			}
		}
	}, [x, y, fx, mode]);

	return (
		<>
			<div className="d-flex flex-column justify-content-center align-items-center">
				<div className="mb-2">
					<label className="mx-2">
						<input
							className="mx-1"
							type="radio"
							value="points"
							checked={mode === "points"}
							onChange={handleModeChange}
						/>
						Points
					</label>
					<label className="mx-2">
						<input
							className="mx-1"
							type="radio"
							value="function"
							checked={mode === "function"}
							onChange={handleModeChange}
						/>
						Function
					</label>
				</div>
				<div ref={elem} style={{ width: "600px", height: "400px" }} />
			</div>
		</>
	);
};

export default GraphComponent;

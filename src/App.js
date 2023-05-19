import "./App.css";
import GraphComponent from "./components/graph";
import SideNavigation from "./components/sideNavigation";
import Tex2SVG from "react-hook-mathjax";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import TableGenerator from "./components/table";
import React, { useState, useEffect } from "react";

function App() {
	const [xArr, setXArr] = useState([]);
	const [fArr, setFArr] = useState([]);
	const [fx, setFx] = useState("");

	const output = (final, string, x, f) => {
		console.log(final);
		console.log(string);

		setXArr(x);
		setFArr(f);
		setFx(string);
	};

	return (
		<div class="container-fluid">
			<div class="row flex-nowrap">
				<SideNavigation />
				<div class="col py-3">
					<h2>Divided Differences</h2>

					<div id="Introduction">
						<h4>Introduction</h4>
						<p class="lead">
							The divided differences method is a numerical procedure for
							interpolating a polynomial given a set of points. Divided
							differences is a recursive division process. Given a sequence of
							data points , the method calculates the coefficients of the
							interpolation polynomial of these points in the Newton form.
						</p>
					</div>

					<div id="program">
						<h4>Program</h4>
						<TableGenerator parentCallback={output} />
						<GraphComponent x={xArr} y={fArr} fx={fx} />
					</div>

					<div id="specification">
						<h4>Specification</h4>I put the new Forgi's on the Jeep I trap until
						the bloody bottoms is underneath 'Cause all my niggas got it out the
						streets I keep a hunnid racks inside my jeans I remember hittin' the
						mall with the whole team Now a nigga can't answer calls 'cause I'm
						ballin' I was wakin' up, gettin' racks in the mornin' I was broke
						now I'm rich, these niggas salty
					</div>
					<div id="conclusion">
						<h4>Conclusion</h4>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

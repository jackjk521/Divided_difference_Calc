import "./App.css";
import GraphComponent from "./components/graph";
import SideNavigation from "./components/sideNavigation";
import Tex2SVG from "react-hook-mathjax";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import TableGenerator from "./components/table";
import React, { useState, useEffect } from "react";
import { BiBook } from "react-icons/bi";
import { BsExclamationCircleFill } from "react-icons/bs";

function App() {
  const [xArr, setXArr] = useState([]);
  const [fArr, setFArr] = useState([]);
  const [fx, setFx] = useState("");
  const [displayGraph, setDisplayGraph] = useState(false)

  const output = (final, string, x, f) => {
    console.log(final);
    console.log(string);

    setXArr(x);
    setFArr(f);
    setFx(string);
	setDisplayGraph(prev => !prev)
  };

  return (
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <SideNavigation />
        <div class="col py-3">
          <h2 className="d-flex justify-content-center">Divided Differences</h2>
          <div id="introduction">
            <h4>Introduction</h4>
            <p class="lead">
              The divided differences method is a numerical procedure for
              interpolating a polynomial given a set of points. Divided
              differences is a recursive division process. Given a sequence of
              data points, the method calculates the coefficients of the
              interpolation polynomial of these points in the Newton form.
            </p>
          </div>
          <hr />
          <div id="specification">
            <h4>Specification</h4>
            <div class="row">
              <div class="col-md-6">
                <div class="card mb-3">
                  <div class="card-header">
                    <h5 class="mb-0">
                      User Manual <BiBook />{" "}
                    </h5>
                  </div>
                  <div class="card-body">
                    <ol>
                      <li>You must input the number of rows</li>
                      <li>
                        A table will be generated where you will be able to
                        input the (x,y) points
                      </li>
                      <li>
                        Input the value to interpolate
                        <ul>
                          <li>
                            You may also generate randomized values for the
                            (x,y) points
                          </li>
                        </ul>
                      </li>
                      <li>
                        Click on the Show Output button to generate the output
                      </li>
                      <li>
                        The output will display the polynomial function and the
                        final answer
                      </li>
                      <li>
                        Click on the Reset button to clear the table and fields
                      </li>
                      <li>
                        The graph will be generated from the list of (x,y)
                        points inputted
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card mb-3">
                  <div class="card-header">
                    <h5 class="mb-0">
                      Limitations <BsExclamationCircleFill />{" "}
                    </h5>
                  </div>
                  <div class="card-body">
                    <ul>
                      <li>
                        User must input points x along with the corresponding
                        coefficients y
                      </li>
                      <li>User must input point to interpolate</li>
                      <li>
                        The program will accept integer and decimal inputs
                      </li>
                      <li>The program will show a graph</li>
                      <li>
                        The program will output the interpolating polynomial
                      </li>
                      <li>
                        The program does not accept any function as an input
                      </li>
                      <li>The program does not show the method and steps</li>
                      <li>
                        Randomized values only fall under the range of -10 to 10
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div id="program">
            <h4>Program</h4>
            <TableGenerator parentCallback={output} />
            {displayGraph && <GraphComponent x={xArr} y={fArr} fx={fx} />} 
          </div>
          <hr />
          {/* <div id="conclusion"  class="container my-4 py-3 border">
						<h4 class="text-center">Conclusion</h4>
						<p class="text-justify lead text-center" >
							The project focused on implementing the divided differences method, an iterative numerical procedure for interpolating a polynomial given a set of points. 
							The significance of this method lies in its use in polynomial interpolation. It helps in predicting values within a known range of data or analyzing the 
							behavior of complex systems. <br></br>
							The implementation uses a recursive process of calculating divided differences for generating the coefficients of the interpolation polynomial in 
							Newton's form. The procedure used for calculating these coefficients, starting from the zeroth divided difference and recursively progressing through 
							to the nth divided difference, was thoroughly outlined. <br></br>
							The resulting polynomial, formed through the divided differences method, demonstrated the systematic approach of the procedure, and underlined its practicality in generating a polynomial that closely fits a given set of data points.
							Limitations of the implementation were also outlined, defining the scope of its application. It was clearly stated that the implementation accepts integer and decimal inputs, providing both the interpolated polynomial and a graphical representation for ease of understanding. However, it was clarified that the implementation does not accept function inputs. The range of values was confined to between -10 and 10, limiting its application to this domain.
							In conclusion, the project was successful in implementing the divided differences method for polynomial interpolation. It provided a concrete application of mathematical theory into a practical tool that could be of immense use in areas requiring interpolation or curve fitting, such as data analysis, forecasting, and engineering design, among others. Although the project had certain limitations, its effectiveness in its defined range provides a strong foundation for future expansion and enhancement.
						</p>
					</div> */}
        </div>
      </div>
    </div>
  );
}

export default App;

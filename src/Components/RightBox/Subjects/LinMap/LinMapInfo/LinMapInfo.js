import React from 'react';
import './LinMapInfo.css'
import MathJax from 'react-mathjax2'

const equation = `f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi`

const LinMapInfo = () => {
	return (
		<div className="bg-black p2 pushLeft">
			<p>Definition:</p>
			<p>Theorems: </p>
			<p>
				Algebraic Examples:
			</p>
			<span style={{textAlign: 'center'}}>
				<MathJax.Context>
					<div>
						<MathJax.Node inline>{equation}</MathJax.Node>
					</div>
				</MathJax.Context>
            </span>
		</div>
	);
}


export default LinMapInfo;
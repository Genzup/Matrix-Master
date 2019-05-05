import React from 'react';
import {connect} from 'react-redux';
//eslint-disable-next-line
import tachyons from 'tachyons';
import Matrix from '../../Reusable/Matrix/Matrix';
import MatrixSelect from '../../Reusable/MatrixSelect/MatrixSelect';
import CalculateButton from '../../Reusable/CalculateButton/CalculateButton';
import math from 'mathjs';
import {
	setCreateDot, 
	setModifyDotArray1, 
	setModifyDotArray2,
	setSolveDot, 
} from './State/actions';

const mapStateToProps = (state) => { 
  	return {
  		rows: state.createMatrix.DotRows, 
  		matrixArray1: state.createMatrix.DotArray1,
  		matrixArray2: state.createMatrix.DotArray2,
  		solve: state.createMatrix.DotSolve, 
	}
} 

const mapDispatchToProps = (dispatch) => { 
 	return {
 		setCreate: (event) => dispatch(
 			setCreateDot(
 				document.getElementById('rowsDot').value, 
 			) 
 		),

 		setModify: (event) => dispatch(
 			setModifyDotArray1(
 				event.target.id, 
 				event.target.value
 			)
 		),
 		setModify2: (event) => dispatch(
 			setModifyDotArray2(
 				event.target.id, 
 				event.target.value
 			)
 		), 
		setSolve: () => dispatch(
 			setSolveDot()
 		), 
	}
}

var flatten = function(arr) {
    var out = [];
    for(var i = 0; i < arr.length; i++) {
        out.push.apply(out, Array.isArray(arr[i]) ? flatten(arr[i]) : [ arr[i] ]);
    }
    return out;
};

class Dot extends React.Component {
	componentWillUnmount() {
		console.log('component has unmounted')
	}
	renderMatrices() {
		const { rows, setModify, setModify2, setSolve } = this.props;
		if (!rows) return; 
		return(
			<div> 
				<div>
					<Matrix 
						assignID="matG" 
						rows={rows} 
						cols={1} 
						onChangeFunction={setModify}
					/>
					<Matrix 
						assignID="matH" 
						rows={rows} 
						cols={1} 
						onChangeFunction={setModify2}
					/>
				</div>
				<CalculateButton onClickFunction={setSolve} />
			</div>
		);
	}
	renderCaption() {
		const { rows, matrixArray1, matrixArray2, solve } = this.props;
		return(
			<React.Fragment>
				{
					(solve) ? 
						<p>
							The Dot Product is { math.dot(flatten(matrixArray1), flatten(matrixArray2)) }
						</p>
					:(rows) ?
						<p>Click submit to compute</p>
					: 
						<p>Select the size of the matrices</p>
				}
			</React.Fragment>
		);
	}
	render() {
		const { setCreate } = this.props;
		return(
			<div className="bg-black p2">
				<h1 className="center">Dot Product</h1>
				<MatrixSelect	setId="rowsDot"  onChangeFunction={setCreate} />
				{ this.renderMatrices() }
				{ this.renderCaption() }
			</div> 
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dot);  
import React from 'react';
import {connect} from 'react-redux';
import Matrix from '../../Reusable/Matrix/Matrix';
import CalculateButton from '../../Reusable/CalculateButton/CalculateButton';
import MatrixPrint from '../../Reusable/MatrixPrint/MatrixPrint';
import math from 'mathjs';
import {
	setCreateCross, 
	setModifyCrossMatrix1, 
	setModifyCrossMatrix2, 
	setSolveCross, 
} from './State/actions';

const mapStateToProps = (state) => { 
  	return {
  		rows: state.createMatrix.CrossRows, 
  		matrixArray1: state.createMatrix.CrossArray1,
  		matrixArray2: state.createMatrix.CrossArray2,
  		solve: state.createMatrix.solveCross, 
	};
};

const mapDispatchToProps = (dispatch) => { 
 	return {
 		setCreate: (event) => dispatch(
 			setCreateCross() 
 		),

 		setModify1: (event) => dispatch(
 			setModifyCrossMatrix1(
 				event.target.id, 
 				event.target.value
 			)
 		),
 		setModify2: (event) => dispatch(
 			setModifyCrossMatrix2(
 				event.target.id, 
 				event.target.value
 			)
 		), 
		setSolve: () => dispatch(
 			setSolveCross()
 		), 
	};
};

var flatten = function(arr) {
    var out = [];
    for(var i = 0; i < arr.length; i++) {
        out.push.apply(out, Array.isArray(arr[i]) ? flatten(arr[i]) : [ arr[i] ]);
    }
    return out;
};

const solvedMatrix = (matrixArray1, matrixArray2) => {
	const solvedMatrix1D = math.cross(flatten(matrixArray1), flatten(matrixArray2));
	return [[solvedMatrix1D[0]], [solvedMatrix1D[1]], [solvedMatrix1D[2]]];
};

class Cross extends React.Component {
	componentWillUnmount() {
		console.log('component has unmounted')
	}
	componentDidMount() {
		this.props.setCreate();
	}
	render() {
		const {rows, matrixArray1, matrixArray2, solve, setModify1, setModify2, setSolve} = this.props;
		return(
			<div className="bg-black p2">
				<h1 className="center">Cross Product</h1>
				<div> 
					<div>
						<Matrix assignID="matI" rows={rows} cols="1" onChangeFunction={setModify1}/>
						<div className="symbol"><p>x</p></div>
						<Matrix assignID="matJ" rows={rows} cols="1" onChangeFunction={setModify2}/>
					</div>
					<CalculateButton onClickFunction={setSolve} />
				</div>
				{
					(solve) ? 
						<MatrixPrint solvedMatrix={solvedMatrix(matrixArray1, matrixArray2)} /> 
					:(rows) ?
						<p>Click submit to compute</p>
					: 
						<p>Select the size of the matrices</p>
				}
			</div> 
		);
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cross);  
import React from 'react';
import {connect} from 'react-redux';
//eslint-disable-next-line
import tachyons from 'tachyons';
import Matrix from '../../Reusable/Matrix/Matrix';
import MatrixSelect from '../../Reusable/MatrixSelect/MatrixSelect';
import CalculateButton from '../../Reusable/CalculateButton/CalculateButton';
//import MatrixExpon from './MatrixExpon/MatrixExpon'
import MatrixPrint from '../../Reusable/MatrixPrint/MatrixPrint';
import math from 'mathjs';
import {
	setCreateExpon, 
	setModifyExponMatrix, 
	setSolveExpon, 
} from './State/actions';

const mapStateToProps = (state) => { 
  	return {
  		rows: state.createMatrix.ExponRows, 
  		matrixArray: state.createMatrix.ExponArray,
  		solve: state.createMatrix.solveExpon, 
	}
}

const mapDispatchToProps = (dispatch) => { 
 	return {
 		setCreate: (event) => dispatch(
 			setCreateExpon(
 				document.getElementById('rowsExpon').value, 
 			) 
 		),

 		setModify: (event) => dispatch(
 			setModifyExponMatrix(
 				event.target.id, 
 				event.target.value
 			)
 		), 
		setSolve: () => dispatch(
 			setSolveExpon()
 		), 
	}
}

const solvedMatrix = (matrix) => math.expm(matrix)._data;

class Expon extends React.Component {
	componentWillUnmount() {
		console.log('component has unmounted')
	}
	renderMatrices() {
		const { rows, setModify, setSolve } = this.props;
		if (!rows) return null; 
		return(
			<div> 
				<div>
					<Matrix 
						assignID="matG" 
						rows={rows} 
						cols={rows} 
						onChangeFunction={setModify}
					/>
				</div>
				<CalculateButton onClickFunction={setSolve} />
			</div>
		);
	}
	renderCaption() {
		const { solve, rows, matrixArray } = this.props;
 		return(
			<React.Fragment>
				{
					(solve) ?
						<MatrixPrint solvedMatrix={solvedMatrix(matrixArray)} />
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
				<h1 className="center">Matrix Exponential</h1>
				<div> 
					<MatrixSelect
						setId="rowsExpon"  
						onChangeFunction={setCreate}
					/>
				</div>
				{ this.renderMatrices() }
				{ this.renderCaption() }
			</div> 
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Expon);  
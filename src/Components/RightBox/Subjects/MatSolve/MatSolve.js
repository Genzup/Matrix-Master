import React from 'react';
import {connect} from 'react-redux';
//eslint-disable-next-line
import tachyons from 'tachyons';
import Matrix from '../../Reusable/Matrix/Matrix';
import MatrixSelect from '../../Reusable/MatrixSelect/MatrixSelect';
import CalculateButton from '../../Reusable/CalculateButton/CalculateButton';
import SolVector from './SolVector/SolVector';
import MatrixPrint from '../../Reusable/MatrixPrint/MatrixPrint';
import math from 'mathjs';
import {
	setCreateMatrixSolve,
	setModifyMatrixSolve,
	setModifyMatrixBSolve,
	setSolveMatrixSolve
} from './State/actions';

const mapStateToProps = (state) => { 
  	return {
  		rows: state.createMatrix.MatSolveRows, 
  		matrixArray: state.createMatrix.MatSolveArray,
  		bArray: state.createMatrix.MatSolveBArray,
  		solve: state.createMatrix.solveMatSolve, 
	}
} 

const mapDispatchToProps = (dispatch) => { 
 	return {
 		setCreate: (event) => dispatch(
 			setCreateMatrixSolve(
 				document.getElementById('RowsColsSolve').value, 
 			)
 		),

 		setModify: (event) => dispatch(
 			setModifyMatrixSolve(
 				event.target.id, 
 				event.target.value
 			)
 		), 
 		setModify2: (event) => dispatch(
 			setModifyMatrixBSolve(
 				event.target.id, 
 				event.target.value
 			)
 		), 
		setSolve: () => dispatch(
 			setSolveMatrixSolve()
 		), 
	}
}

const solvedMatrix = (matrix, vector) => math.lusolve(matrix, vector);

class MatSolve extends React.Component {
	renderMatrices() {
		const { rows, setModify, setModify2, setSolve } = this.props; 
		if (!rows) return null; 
		return(
			<div> 
				<div>
					<Matrix assignID='mat7' rows={rows} cols={rows} onChangeFunction={setModify}/>
					<SolVector rows={rows}/>
					<div className="symbol"><p>=</p></div>
					<Matrix assignID='mat8' rows={rows} cols={1} onChangeFunction={setModify2}/>
				</div>
				<CalculateButton onClickFunction={setSolve} />
			</div>
		);
	}
	renderCaption() {
		const {rows, matrixArray, solve, bArray} = this.props;
		return(
			<React.Fragment>
				{
					(solve) ? 
						<div>
							<SolVector rows={rows}/>
							<div className="symbol"><p>=</p></div>
							<MatrixPrint solvedMatrix={solvedMatrix(matrixArray, bArray)} />
						</div>
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
				<h1 className="center">Solving nxn Matrix for x</h1>
				<div> 
					<MatrixSelect
						setId="RowsColsSolve"  
						onChangeFunction={setCreate}
					/>
				</div>
				{ this.renderMatrices() }
				{ this.renderCaption() }
			</div> 
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MatSolve);  









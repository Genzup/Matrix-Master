import React from 'react';
import {connect} from 'react-redux';
//eslint-disable-next-line
import tachyons from 'tachyons'; 
import './MatAdd.css';
import Matrix from '../../Reusable/Matrix/Matrix'; 
import MatrixSelect from '../../Reusable/MatrixSelect/MatrixSelect';
import CalculateButton from '../../Reusable/CalculateButton/CalculateButton';
import MatrixPrint from '../../Reusable/MatrixPrint/MatrixPrint';
import math from 'mathjs';
import {
	setCreateMatrix,
	setChangeMatrix,
	setAddMatrix
} from './State/actions';

const mapStateToProps = state => {
	return {
		row: state.createMatrix.row,
		col: state.createMatrix.col,
		matrixArray1: state.createMatrix.matrixArray1,
		matrixArray2: state.createMatrix.matrixArray2,
		addMatrix: state.createMatrix.addMatrix
	}
}

const mapDispatchToProps = (dispatch) => { 
 	return {
		setCreateMatrix: (event) => dispatch(
			setCreateMatrix(
				document.getElementById('rows').value, 
				document.getElementById('cols').value
			)
		),
		setChangeMatrix: (event) => dispatch(
			setChangeMatrix(
				event.target.id, 
				event.target.value
			)
		),
		setAddMatrix: () => dispatch(setAddMatrix())
	}
}

const solvedMatrix = (matrix1, matrix2) => math.add(matrix1, matrix2);

class MatAdd extends React.Component {
	renderSelect() {
		const { setCreateMatrix } = this.props;
		return(
			<div> 
				<MatrixSelect
					setId="rows"
					onChangeFunction={setCreateMatrix}
				/>
				<MatrixSelect
					setId="cols"
					onChangeFunction={setCreateMatrix}
				/>
			</div>
		);
	}
	renderMatrices() {
		const { row, col, setChangeMatrix } = this.props; 
		if (!col) return null; 
		return(
			<div> 
				<div>
					<Matrix 
						assignID='mat1' 
						rows={row} 
						cols={col} 
						onChangeFunction={setChangeMatrix}
					/>
					<div className="symbol"><p>+</p></div>
					<Matrix 
						assignID='mat2' 
						rows={row} 
						cols={col} 
						onChangeFunction={setChangeMatrix}
					/>
				</div>
				<CalculateButton onClickFunction={setAddMatrix} />
			</div>
		);
 	}
 	renderCaption() {
		const { col, matrixArray1, matrixArray2, addMatrix } = this.props
 		return(
 			<React.Fragment>
 				{
					(addMatrix) ? 
						<MatrixPrint solvedMatrix={solvedMatrix(matrixArray1, matrixArray2)} />
					:(col) ?
						<p>Click submit to compute</p>
					: 
						<p>Select the size of the matrices</p>
				}
 			</React.Fragment>
 		);
 	}
	render() {
		return(
				<div className="bg-black p2">
					<h1 className="center">Matrix Addition </h1>
					{ this.renderSelect() }
					{ this.renderMatrices() }
					{ this.renderCaption() }
				</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MatAdd); 
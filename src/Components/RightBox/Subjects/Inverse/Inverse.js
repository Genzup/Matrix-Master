import React from 'react';
import {connect} from 'react-redux';
//eslint-disable-next-line
import tachyons from 'tachyons';
import Matrix from '../../Reusable/Matrix/Matrix';
import MatrixSelect from '../../Reusable/MatrixSelect/MatrixSelect';
import CalculateButton from '../../Reusable/CalculateButton/CalculateButton';
import MatrixPrint from '../../Reusable/MatrixPrint/MatrixPrint';
import math from 'mathjs';
import {
	setCreateInverse, 
	setModifyInverseMatrix, 
	setSolveInverse, 
} from './State/actions';

const mapStateToProps = (state) => { 
  	return {
  		rows: state.createMatrix.InverseRows, 
  		matrixArray: state.createMatrix.InverseArray,
  		solve: state.createMatrix.solveInverse, 
	}
} 

const mapDispatchToProps = (dispatch) => { 
 	return {
 		setCreate: (event) => dispatch(
 			setCreateInverse(
 				document.getElementById('rowsInv').value, 
 			) 
 		),

 		setModify: (event) => dispatch(
 			setModifyInverseMatrix(
 				event.target.id, 
 				event.target.value
 			)
 		), 
		setSolve: () => dispatch(
 			setSolveInverse()
 		), 
	}
}

const solvedMatrix = (matrix) => {
	if (!math.det(matrix)) return <p>The following cannot be inversed, the determinant is 0</p>
	return <MatrixPrint solvedMatrix={math.inv(matrix)} />
}

class Inverse extends React.Component {
	componentWillUnmount() {
		console.log('component has unmounted')
	}
	renderMatrices() {
		const { rows, setModify, setSolve } = this.props;
		if (!rows) return null; 
		return(
			<div> 
				<div>
					<Matrix assignID="matB" rows={rows} cols={rows} onChangeFunction={setModify}/>
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
						solvedMatrix(matrixArray)
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
				<h1 className="center">Inverse</h1>
				<div> 
					<MatrixSelect
						setId="rowsInv"  
						onChangeFunction={setCreate} 
					/>
				</div>
				{ this.renderMatrices() }
				{ this.renderCaption() }
			</div> 
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Inverse);  

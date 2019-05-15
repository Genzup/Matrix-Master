import React from 'react';
import {connect} from 'react-redux';
//eslint-disable-next-line
import tachyons from 'tachyons';
import './ScaMult.css'
import Matrix from '../../Reusable/Matrix/Matrix';
import MatrixSelect from '../../Reusable/MatrixSelect/MatrixSelect';
import CalculateButton from '../../Reusable/CalculateButton/CalculateButton';
import MatrixPrint from '../../Reusable/MatrixPrint/MatrixPrint';
import math from 'mathjs';
import {
	setCreateSM,
	setScaMultMatrix, 
	setChangeMatrixSM, 
	setScaleValue
} from './State/actions';
 
const mapStateToProps = (state) => { 
  	return {
  		rows: state.createMatrix.ScaMultRows, 
  		cols: state.createMatrix.ScaMultCols, 
  		matrixArray: state.createMatrix.ScaMultMatrixArray,
  		solve: state.createMatrix.ScaMultMatrix, 
  		scale: state.createMatrix.ScaleValue
	}
} 

const mapDispatchToProps = (dispatch) => { 
 	return {
 		setCreateSM: (event) => dispatch( 
 			setCreateSM(
 				document.getElementById('RowsSM').value, 
 				document.getElementById('ColsSM').value
 			)
 		),
 		setSolve: () => dispatch(
 			setScaMultMatrix()
 		), 
 		setChangeMatrixSM: (event) => dispatch(
 			setChangeMatrixSM(
 				event.target.id, 
 				event.target.value
 			)
 		), 
 		setScale: (event) => dispatch(
 			setScaleValue(
 				event.target.value
 			)
 		)
	}
}

const solvedMatrix = (scale, matrix) => {
	if (!scale) scale = 1;
	return math.multiply(scale, matrix);
}


class ScaMult extends React.Component {
	renderSelect() {
		const { setCreateSM } = this.props;
		return(
			<div> 
				<MatrixSelect
					setId="RowsSM"
					onChangeFunction={setCreateSM}
				/>
				<MatrixSelect
					setId="ColsSM"
					onChangeFunction={setCreateSM}
				/>
			</div>
		);
	}
	renderMatrices() {
		const { cols, setScale, rows, setSolve } = this.props; 
		if (!cols) return null; 
		return(
			<div> 
				<div>
					<input id="scaleInput" className="matBox" onChange={setScale}/>
					<Matrix assignID={'mat3'} rows={rows} cols={cols} onChangeFunction={setChangeMatrixSM}/>
				</div>
				<CalculateButton onClickFunction={setSolve} />
			</div>
		);
	}
	renderCaption() {
		const {rows, solve, matrixArray, scale} = this.props;
		return (
			<React.Fragment>
				{
					(solve) ? 
						<MatrixPrint solvedMatrix={solvedMatrix(scale, matrixArray)} />
					:(rows) ?
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
				<h1 className="center">Scalar Multiplication</h1>
				{ this.renderSelect() }
				{ this.renderMatrices() }
				{ this.renderCaption() }
			</div> 
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ScaMult);  














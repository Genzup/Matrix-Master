import React from 'react';
import {connect} from 'react-redux';
import Matrix from '../../Reusable/Matrix/Matrix';
import CalculateButton from '../../Reusable/CalculateButton/CalculateButton';
import math from 'mathjs';
import {
	setCreatePgram, 
	setModifyPgram1, 
	setModifyPgram2, 
	setModifyPgram3, 
	setSolvePgram, 
} from './State/actions';

const mapStateToProps = (state) => {
  	return {
  		rows: state.createMatrix.PgramRows,
  		matrixArray1: state.createMatrix.PgramVector1, 
  		matrixArray2: state.createMatrix.PgramVector2,
  		matrixArray3: state.createMatrix.PgramVector3,
  		solve: state.createMatrix.solvePgram, 
	};
};

const mapDispatchToProps = (dispatch) => {
 	return {
 		setCreate: (event) => dispatch(
 			setCreatePgram(document.getElementById('rowsPgram').value)
 		),

 		setModify: (event) => dispatch(
 			setModifyPgram1(
 				event.target.id, 
 				event.target.value
 			)
 		), 
 		setModify2: (event) => dispatch(
 			setModifyPgram2(
 				event.target.id, 
 				event.target.value
 			)
 		),
 		setModify3: (event) => dispatch(
 			setModifyPgram3(
 				event.target.id, 
 				event.target.value
 			)
 		), 
		setSolve: () => dispatch(
 			setSolvePgram()
 		), 
	};
};

const CaculateArea = (vector1, vector2, vector3 = null) => {
	if (vector3) {
		return Math.abs(math.det(math.concat(vector1, vector2, vector3)))
	}
	return Math.abs(math.det(math.concat(vector1, vector2))) 
}


class AreaPgram extends React.Component {
	componentWillUnmount() {
		console.log('component has unmounted')
	}

	renderSelect() {
		const {setCreate} = this.props;
		return(
			<select 
				id="rowsPgram"
				className="matDim"
				onChange={setCreate}
				style={{ width: '130px'  }}
			>
				<option value="0">Select</option>
			 	<option value="2">Parallelogram</option>
			 	<option value="3">Parallelopiped</option>
			</select>
		);
	}

	renderMatrices() {
		const {rows, setModify, setModify2, setModify3, setSolve} = this.props;
		return( rows &&
			<div> 
				<div>
					u = <Matrix 
							assignID='matD' 
							rows={rows} 
							cols={1} 
							onChangeFunction={setModify}
						/>
					
					v = <Matrix 
							assignID='matE' 
							rows={rows} 
							cols={1} 
							onChangeFunction={setModify2}
						/>

					{ rows === "3" &&
						<React.Fragment>
							w = <Matrix assignID='matF' rows={rows} cols={1} onChangeFunction={setModify3}/>
						</React.Fragment>
					}
				</div>
				<CalculateButton onClickFunction={setSolve} />
			</div>
		);
	}

	renderCaption() {
		const {matrixArray1, matrixArray2, matrixArray3, solve, rows} = this.props;
		return(
			(solve && rows === "2") ? 
				<p>The area of the Parallelogram is {CaculateArea(matrixArray1, matrixArray2)}</p>

			: (solve && rows === "3") ?
				<p>The area of the Parallelogram is {CaculateArea(matrixArray1, matrixArray2, matrixArray3)}</p>

			: (!rows || rows === "0") ? 
				<p>Select Parallelogram or Parallelopiped</p>

			: <p>Click submit to compute</p>
		);
	}

	render() {
		return(
			<div className="bg-black p2">
				<h1 className="center">Area of Parallelogram</h1>
				{ this.renderSelect() }
				{ this.renderMatrices() }
				{ this.renderCaption() }
			</div> 
		);
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaPgram);  
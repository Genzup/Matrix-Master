import React from 'react';
import {connect} from 'react-redux';
//eslint-disable-next-line
import tachyons from 'tachyons';
import Matrix from '../../Reusable/Matrix/Matrix';
import MatrixSelect from '../../Reusable/MatrixSelect/MatrixSelect';
import CalculateButton from '../../Reusable/CalculateButton/CalculateButton';
import math from 'mathjs';
import {
	setCreateDet, 
	setModifyDetMatrix, 
	setSolveDet, 
} from './State/actions';

const mapStateToProps = (state) => { 
  	return {
  		rows: state.createMatrix.DetRows, 
  		matrixArray: state.createMatrix.DetArray,
  		solve: state.createMatrix.solveDet, 
	};
};

const mapDispatchToProps = (dispatch) => { 
 	return {
 		setCreate: (event) => dispatch(
 			setCreateDet(
 				document.getElementById('rowsDet').value, 
 			) 
 		),
 		setModify: (event) => dispatch(
 			setModifyDetMatrix(
 				event.target.id, 
 				event.target.value
 			)
 		), 
		setSolve: () => dispatch(
 			setSolveDet()
 		), 
	};
};

class Det extends React.Component {
	componentWillUnmount() {
		console.log('component has unmounted')
	}
	renderSelect() {
		const { setCreate } = this.props;
		return(
			<div> 
				<MatrixSelect
					setId="rowsDet"  
					onChangeFunction={setCreate}
				/>
			</div>
		);
	}
	renderMatrices() {
		const { rows, setModify, setSolve } = this.props;
		if (!rows) return;
		return(
			<div> 
				<div>
					<Matrix 
						assignID="matC" 
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
		const {rows, matrixArray, solve } = this.props;
		return(
			<React.Fragment>
			{
				(solve) ? 
					<p>
						The determinant is { math.det(matrixArray) }
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
		return(
			<div className="bg-black p2">
				<h1 className="center">Determinant</h1>
				{ this.renderSelect() }
				{ this.renderMatrices() }
				{ this.renderCaption() }
			</div> 
		);
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Det);  
import React from 'react';
import {connect} from 'react-redux';
//eslint-disable-next-line
import tachyons from 'tachyons';
import Matrix from '../../Reusable/Matrix/Matrix';
import MatrixSelect from '../../Reusable/MatrixSelect/MatrixSelect';
import CalculateButton from '../../Reusable/CalculateButton/CalculateButton';
import math from 'mathjs';
import {
	setCreateTrace, 
	setModifyTraceMatrix, 
	setSolveTrace, 
} from './State/actions';

const mapStateToProps = (state) => { 
  	return {
  		rows: state.createMatrix.TraceRows, 
  		matrixArray: state.createMatrix.TraceArray,
  		solve: state.createMatrix.solveTrace, 
	}
} 

const mapDispatchToProps = (dispatch) => { 
 	return {
 		setCreate: (event) => dispatch(
 			setCreateTrace(
 				document.getElementById('rowsTrace').value, 
 			) 
 		),

 		setModify: (event) => dispatch(
 			setModifyTraceMatrix(
 				event.target.id, 
 				event.target.value
 			)
 		), 
		setSolve: () => dispatch(
 			setSolveTrace()
 		), 
	}
}

class Trace extends React.Component {
	render() {
		const {rows, matrixArray, solve, setCreate, setModify, setSolve} = this.props;
		return(
			<div className="bg-black p2">
				<h1 className="center">Trace</h1>
				<div> 
					<MatrixSelect
						setId="rowsTrace"
						onChangeFunction={setCreate}
					/>
				</div>
				{ 
					(rows) ?
						<div> 
							<div>
								<Matrix 
									assignID='matH'
									rows={rows}
									cols={rows}
									onChangeFunction={setModify}
								/>
							</div>
							<CalculateButton onClickFunction={setSolve} />
						</div>
					:  
						<p></p>
				}
				{
					(solve) ? 
						<p>
							The Trace is { math.trace(matrixArray) }
						</p>
					:(rows) ?
						<p>Click submit to compute</p>
					: 
						<p>Select the size of the matrices</p>
				}
			</div> 
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Trace);  
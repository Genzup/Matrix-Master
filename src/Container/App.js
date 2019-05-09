import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
//eslint-disable-next-line
import tachyons from 'tachyons';
import MMtitle from '../Components/MMtitle/MMtitle';
import RightBox from '../Components/RightBox/RightBox';
import RightInfo from '../Components/RightBox/RightInfo';
import MyButton from '../Components/MyButton/MyButton';
import { 
  setNewPage, 
  setStartPage
} from '../State/actions';

const mapStateToProps = (state) => { 
  return {
    page: state.newPage.page 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPage: (event) => dispatch(
      setNewPage(
        event.target.value
      )
    ), 
    setStartPage: () => dispatch(
      setStartPage()
    )
  }
}

const BUTTON_NAMES = [
  "Home",
  "Dot Product",
  "Cross Product",
  "Matrix Addition",
  "Scalar Multiplication",
  "Transpose",
  "Matrix Multiplication",
  "Solve Matrix",
  "Linear Mapping",
  "Inverse",
  "Determinant",
  "Area of Parallelogram",
  "Exponential",
  "Trace",
  "Contributors"
];

class App extends Component {
  componentDidMount() {
    this.props.setStartPage();
  }

  renderButtons(setNewPage) {
    return(
      BUTTON_NAMES.map(name => {
        return 
        <MyButton 
          buttonName={name} 
          setNewPage={setNewPage}
        />
      })
    );
  }

  render() {
    const {
      setNewPage, 
      page
    } = this.props;
    const { renderButtons } = this;
    return (
      <div className='App'>
        <MMtitle/>
        <details className="dropMenu white">
          <summary>
            <input 
              type="button"
              className="no-underline near-white bg-animate bg-near-black hover-bg-gray 
                         inline-flex items-center"
              value="Page"
              style={{fontSize: "12.5px"}}
            />
          </summary>
          { renderButtons(setNewPage) }
        </details>
        <div className="left bg-blue white b--lightest-blue br3">
          { renderButtons(setNewPage) }
        </div>
        <RightInfo page={page}/>
        <RightBox page={page}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
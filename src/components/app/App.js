import './App.css';
import React from 'react'
import { connect } from 'react-redux'
import {increment, decrement} from '../../state/actions'

const App = ({count, increment, decrement}) => {

  return (
    <div className="App">
        <h1 className='text-4xl'>notAmazon</h1>
        <div className='my-4 mx-4'>
          <h3 className='my-2'>Redux State</h3>
          <button onClick={() => decrement()}>
            decrement
          </button>
          {count}
          <button onClick={() => increment()}>
            increment
          </button>
        </div>
    </div>  
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

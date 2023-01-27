import React from 'react'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Calculator from './calculator'
import thunkMiddleware from 'redux-thunk';
import expressionsReducer from './calculator/reducers/expressions';


const store = createStore(
    expressionsReducer,
    applyMiddleware(thunkMiddleware)
);

const App = () => {
    return (
        <Provider store={store}>
            <Calculator/>
         </Provider>
    )

}

export default App;
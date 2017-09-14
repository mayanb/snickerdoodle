import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import productReducer from './components/Products/ProductsReducers.jsx'
import processReducer from './components/Processes/ProcessesReducers.jsx'


export default function(data) {
  var reducer = combineReducers({products: productReducer, processes: processReducer})
  const store = createStore(reducer, applyMiddleware(thunkMiddleware))

  return store
}
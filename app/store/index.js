import {createStore} from 'redux';
import CartReducer from '../reducers/CartReducer.js';
import DetailsReducer from '../reducers/DetailsReducer.js';

export default store = createStore(DetailsReducer);
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getRootReducer from './reducers';


export default function getStore(navReducer) {
    return store = createStore(getRootReducer(navReducer), undefined, applyMiddleware(thunk))
}

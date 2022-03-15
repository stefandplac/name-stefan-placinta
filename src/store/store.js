import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {dataR} from '../reducers/dataR';
import {cartR} from '../reducers/cartR';

const preloadedState={
    dataR:{
        products:[],
        categoryFilter:'all',
        loading:true,
        error:'',
        currencyLabel:'USD',  
        currency:[],     
    },
    cartR:{
        cartProducts:[],
        total:{
            amount:0,
            currencyLabel:'',
            currencySymbol:'',
          
        },
        quantity:0
    }
   
} ;
const rootReducers = combineReducers({
    dataR,
    cartR,
  

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;

const store = createStore(rootReducers, preloadedState, composeEnhancer(applyMiddleware(thunk)));
export default store;
import * as actions from '../actionTypes/types';

export const dataR = (state={products:[], categoryFilter:"all", users:[], loading:true, error:'', currencyLabel:'USD', currency:[]},action)=>{
    switch(action.type){
        case actions.LOADING_STATUS:
            return {...state, loading:action.loading};
        case actions.FETCH_FILTERED_PRODUCTS:
            return {...state,  products:action.payload, categoryFilter:action.filterC};
        case actions.UPDATE_CURRENCY:
            return {...state, currencyLabel:action.currencyUpdate};
        case actions.GET_PRICES:
            return {...state, currency:action.getPrices};
        
    default:
        return state;
    }
}

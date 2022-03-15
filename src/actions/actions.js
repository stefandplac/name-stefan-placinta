import * as actions from '../actionTypes/types';

export const fetchProducts = (prod)=>(dispatch)=>{
       dispatch({type:actions.FETCH_DATA,
                 payload:prod,
    
    })
}
export const fetchFilterByCategory =(prod, categoryFilter)=>(dispatch)=>{
    dispatch({type:actions.FETCH_FILTERED_PRODUCTS,
              payload:prod,
              filterC:categoryFilter,
    })
}
export const updateCurrencyLabel = (currencyLabel)=>(dispatch)=>{
    dispatch({type:actions.UPDATE_CURRENCY,
              currencyUpdate: currencyLabel,
    
    })
}
export const getPrices = (prices)=>(dispatch)=>{
    dispatch({type:actions.GET_PRICES,
              getPrices:prices,
    })
}
export const currencyChange=(newValue)=>(dispatch)=>{
    dispatch({type:actions.UPDATE_CURRENCY,
              currencyUpdate:newValue,
    })
}
export const loadingStatus=(loadingValue)=>(dispatch)=>{
    dispatch({type:actions.LOADING_STATUS,
              loading:loadingValue,
    })
}

//actions for cartR  reducer
export const updateProductDetails=(cartProducts)=>(dispatch)=>{
    dispatch({type:actions.UPDATE_PRODUCT_DETAILS,
             cartList:cartProducts,
    })
}
export const addToCart=(product,totalP)=>(dispatch)=>{
    dispatch({type:actions.ADD_TO_CART,
               newProduct:product,
               total:totalP                
    })
}




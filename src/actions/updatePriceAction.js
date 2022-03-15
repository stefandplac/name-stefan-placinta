import * as actions from '../actionTypes/types';



export const updatePriceAction=(cartProducts, currencyLabel)=>(dispatch)=>{
  
    let newProductList=[];
    let newP={};
    //this.props.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].amount
    cartProducts.map((product)=>{
        newP ={
            name:product.name,
            photo:product.photo,
            quantity:product.quantity,
            price:{
                amount:product.allPrices?.filter((price)=>price.currency.label===currencyLabel)[0].amount,
                currencyLabel:product.allPrices?.filter((price)=>price.currency.label===currencyLabel)[0].currency.label,
                currencySymbol:product.allPrices?.filter((price)=>price.currency.label===currencyLabel)[0].currency.symbol,
            },
            attributes:[...product.attributes],
            allAttributes:[...product.allAttributes],
            allPrices:[...product.allPrices],
         };
         newProductList.push(newP);
    });

    dispatch({type:actions.UPDATE_PRICE_IN_CART,
              cartList: newProductList,
    });
}
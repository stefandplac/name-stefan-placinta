import React, { Component } from 'react';
import MiniDisplayColors from './MiniDisplayColors';
import MiniDisplayAttribute from './MiniDisplayAttribute';
import { connect } from 'react-redux';
import {updateProductQty} from '../actions/updateProductQty';
import {deleteProduct} from '../actions/deleteProduct';
import DisplayAttributeText from './DisplayAttributeText';


class BigCartProduct extends Component {
    updateQuantity=(event)=>{
        //here we will update the quantity in the store in cart product list or delete the product if quantity reach 0
        //we know the position of the product by index
        if(event.target.id==="increaseBtn"){
            let x = 1;
              this.props.updateProductQty(this.props.index,this.props.cartProducts,x);
        }
        else {
            
            let x = -1;
            if((this.props.product.quantity-1)===0){
                this.props.deleteProduct(this.props.index, this.props.cartProducts);
            }
            else{
                this.props.updateProductQty(this.props.index, this.props.cartProducts,x);
            }
    
        }
    }
    changeBtnBack=(event)=>{
        event.target.className==="bigQuantityPDown" ? event.target.className="bigQuantityP" : event.target.className="bigQuantityPDown";
    }
  render() {
    return (
       
    <div className="bigCartContainer">
      <div className="bigCartBoxCol">
              <div className="bigCartPTitle">
                  {this.props.product.name}
              </div>
              <div className="bigPPrice">
                  {`${this.props.product.price.currencySymbol} ${this.props.product.price.amount}`}
              </div>
              <div className="attributeBottom">
                    {this.props.product.allAttributes?.map((attribute)=>(
                        <div key={attribute.name}>
                        {(attribute.items[0].displayValue==="Yes"||attribute.items[0].displayValue==="No") ? (
                               
                                <>
                                {attribute.items?.map((item, index)=>(
                                    <DisplayAttributeText selectedAtt={this.props.product.attributes} key={index} color={item.value} attributeId={attribute.id} value={item.displayValue} classSelected="attributeNameBig" classUnselected="attributeNameBigUnselected"/>
                                ))}
                                </>
                                
                        )            
                         :  attribute.name==="Color" ? ( 
                                <div className="bigPAttributeBox"> 
                                    {attribute.items?.map((item)=>(
                                         <MiniDisplayColors   selectedAtt={this.props.product.attributes} key={item.id} color={item.value} attributeId={attribute.id} value={item.displayValue} classSelected="colorBox colorBox-selected" classUnselected="colorBox"/>                 
                                     ))}
                                 </div>
                          )     
                          :(
                                <div className="bigPAttributeBox"> 
                                    {attribute.items?.map((item)=>(
                                         <MiniDisplayAttribute   selectedAtt={this.props.product.attributes} key={item.id} value={item.displayValue} attributeId={attribute.id} item={item} classSelected="attributeBox attributeBox-selected" classUnselected="attributeBox"/>             
                                    ))}
                                </div>
                           ) }
                         </div>
                    ))}
              </div>
      </div>
      <div className="bigCartBoxRow">
              
              <div className="bigCartQuantityBox">
                    <div className="bigQuantityP" id="increaseBtn" onClick={this.updateQuantity} onMouseDown={this.changeBtnBack} onMouseUp={this.changeBtnBack}>+</div>
                    <div className="bigQuantityInput" name="quantity">{this.props.product.quantity} </div> 
                    <div className="bigQuantityP" id="decreaseBtn" onClick={this.updateQuantity} onMouseDown={this.changeBtnBack} onMouseUp={this.changeBtnBack}>-</div>
              </div>
              <div className="bigCartPhotoContainer">
                     <img src={this.props.product.photo} className="bigCartPhotoDisplay" alt=""/>
              </div>
      </div>
      
    </div>
   

    )
  }
}
const mapStateToProps=(state)=>{
    return{
        cartProducts:state.cartR.cartProducts,
        totalPrice:state.cartR.total,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
         updateProductQty:(index,cartP,qty)=>{dispatch(updateProductQty(index,cartP,qty))},
         deleteProduct:(index,cartP,qty)=>{dispatch(deleteProduct(index,cartP,qty))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BigCartProduct);

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class ShowProduct extends Component{
    
    render(){
        
        return(
             <div className={this.props.classN}> 
                       <div className="productImageContainer">
                          
                              <Link to={`/product/${this.props.id}`}>
                                 <img className="productImage" src={this.props.gallery} alt=""></img>
                              </Link>
                       </div>
                       
                        
                        <div className="cardTitlePrice">
                            <div className="cardTitle">
                                <> {this.props.name} </>
                                
                            </div>
                            <div style={{justifySelf:"flex-end"}}>
                            {this.props.cartProducts.filter((product)=>product.name===this.props.name).length===0 ? (<></>)
                                   :(
                                    <>
                                    <img src='img/cart-icon.svg' alt="" className="productCartIcon"/></>
                                   ) }
                            </div>
                        </div>
                        <div className="cardPriceBox"> 
                            {`${this.props.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].currency.symbol}${this.props.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].amount}`}
                           
                        </div>
                        <>
                         {this.props.inStock===false? (<img className="outofstockImg" src="img/outofstock.svg" alt=""/>)
                         :(<></>)}
                       </>
                       
        </div>
            
                       

                  
                
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        currencyLabel:state.dataR.currencyLabel,
        cartProducts:state.cartR.cartProducts,
    }
}
export default connect(mapStateToProps)(ShowProduct);
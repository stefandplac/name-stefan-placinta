import React, { Component } from 'react';
import {connect} from 'react-redux';
import { useParams } from "react-router-dom";

import DisplayBig from '../components/DisplayBig';
import ProductInfo from '../components/ProductInfo';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Product extends Component {
  //let productId= useParams();
    constructor(props) {
        super(props);
        this.state={
             id:this.props.params.id,
             product:{},
             source: "",
            
         }
    } ;
  
  componentDidMount(){
    let prod = this.props.products.filter((prod)=> prod.id === this.state.id);
    this.setState({product:prod[0],
                   source: prod[0].gallery[0],
                
                 });
    
    }
  handleClick=(event)=>{
    this.setState({source:event.target.src});
  }
  
  render() {
    
    return (
      <div className="productDetailsPage">
        <div className="carouselContainer">
          
                   {this.state.product.gallery?.map((photo,index)=>(
                       <div className="imageCarouselContainer" key={index}>
                           <img src={photo} className="displayImageCarousel" onClick={this.handleClick} alt=""></img>
                      </div>
                    
                   ))}
        </div>
        <div className="displayBigContainer" >
            <DisplayBig source={this.state.source}/>
        </div>
        <div className="productInfo">
            <ProductInfo product={this.state.product} description={this.state.product.description}/>
        </div>
        
       
        
         
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
    products:state.dataR.products,
    
    
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
   
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withParams(Product));
/*
<ul className="list-group list-group-flush">
                   {this.state.product.gallery?.map((photo,index)=>(
                       <li key={index} className="list-group-item">
                           <img src={photo} className="img-fluid"></img>
                       </li>
                    
                   ))}
         </ul>
         */
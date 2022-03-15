import React, { Component } from 'react';
import {connect} from 'react-redux';

import ShowProduct from '../components/ShowProduct';


 class Categories extends Component {
   
    handleChange=(event)=>{
        let x = event.target.value;
        this.props.updateProducts(x);
      }
  render() {
    return (
   <>
      
         {this.props.errorM!=='' ? (
          <>
                <div className="" style={{display:"flex",justifyContent:"center",alignItems:"center", margin:"50px",width:"1000px"}}>
                  
                  <div className="errorClass">
                    
                    {`#### Error: ${this.props.errorM}        :(  `}</div>
                 
                </div>
          </>
        ) 
         : this.props.loading===true ? (
         <>
               <button className="">
                 <span className="" >
                   Loading data........
                 </span>
               </button>
         </>)
        : (
          <>
           
            <div className="showProducts">
              
                   {this.props.products?.map((product)=>(
                    <div key={product.id}>
                       {product.inStock===true ? (
                              <ShowProduct key={product.id} id={product.id} name={product.name} inStock={product.inStock} gallery={product.gallery[0]}
                                price={product.prices} category={product.category} product={product} classN={`productCard `}/>
                      ):(
                        <ShowProduct key={product.id} id={product.id} name={product.name} inStock={product.inStock} gallery={product.gallery[0]}
                        price={product.prices} category={product.category} product={product} classN={`productCard productCart-unavailable`}/>
             
                      )}
                     </div>
                    ))}
               
         
             </div>
          </>
          
        )}

    </>
     
    )
  }
}
const mapStateToProps=(state)=>{
    return{
        loading: state.dataR.loading,
        error: state.dataR.error,
        products: state.dataR.products,
        categoryFilter:state.dataR.categoryFilter
    }
}
export default connect(mapStateToProps)(Categories);

/*
in case I need to modify the design back

 <div className="" style={{border:"1px solid red", padding:"5px"}}>
             <select className="" id="categories" name="categories" value={this.props.categoryFilter} onChange={this.handleChange}>
               <option value="all" >all</option>
               <option value="clothes">clothes</option>
               <option value="tech">tech</option>
             </select>
           </div>
*/


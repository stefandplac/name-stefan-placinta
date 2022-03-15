import {useQuery} from '@apollo/client';
import * as queries from './queries/queries';
import { useEffect,useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchFilterByCategory as fetchFiltered} from './actions/actions';
import Categories from './pages/Categories';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Product from './pages/Product';
import Cart from './pages/Cart';
import {getPrices, currencyChange, loadingStatus} from './actions/actions';
import MiniCart from './components/MiniCart';
import {updatePriceAction} from './actions/updatePriceAction';
import {updateTotalCart} from './actions/updateTotalCart';
import NavigationCategory from './components/NavigationCategory';

function  App() {
     
  const categoryFilter = useSelector((state)=>state.dataR.categoryFilter);
  
  const dispatch = useDispatch();
  const currency= useSelector((state)=>state.dataR.currency);
  const currencyLabel=useSelector((state)=>state.dataR.currencyLabel);
  const cartQuantity=useSelector((state)=>state.cartR.quantity);
  const cartProducts = useSelector((state)=>state.cartR.cartProducts);
  
  const {loading,error, data} = useQuery(queries.GET_CATEGORIES); 
  let prod = {...data};
  let prod2=[];

  const [minicart, setMinicart]=useState("hidden");
  const [mainBack, setMainBack]=useState("#ffffff");
  const [errorMessage, setErrorMessage]=useState('');
  
  useEffect(()=>{
    if(error){
      console.log(error.message);
      setErrorMessage(error.message);
    }
    else {
     if(loading===false){
         updateProducts(categoryFilter);
         //#########################
         let p =[];
         data.categories[0]?.products[0]?.prices?.map((price)=> p.push(price.currency));
         dispatch(getPrices(p));
         ///##################
         dispatch(loadingStatus(loading));
     
     };
    }
    
     
  },[loading, categoryFilter,data, dispatch,error]);

  useEffect(()=>{
        dispatch(updateTotalCart(cartProducts));
  },[cartProducts,currencyLabel,dispatch]);
  
 
function updateProducts(category){    
    for(let i=0; i<prod.categories.length;i++){
      if(category=== data.categories[i].name){
        prod2=[...data.categories[i].products];
        dispatch(fetchFiltered(prod2, category));
        return;
      }
    }
  }
  function minicartDisplayIn(){
    setMinicart("visible");
    setMainBack("rgba(57,55,72,0.22)");
    document.getElementById("minicart").focus();
  }
  function minicartDisplayOut(){
    setMinicart("hidden");
    setMainBack("#ffffff");
  }
  function currencyUpdate(event){  
    let x= event.target.value;
    console.log(x);
      dispatch(currencyChange(x));
      dispatch(updatePriceAction(cartProducts, x));
  }

 
 
  return (
  <Router>
    <div className="grid-container">
      <header >
        <div className="navigation">
          {data?.categories.map((category,index)=>(
                   <Link to="/" style={{textDecoration:"none"}} key={index}>
                              <NavigationCategory catName={category.name} updateProducts={updateProducts} categoryF={categoryFilter}/>
                    </Link>
          ))}
          </div>
         <div id="logo" className="a-logo">
           <Link to="/"><img src='/img/a-logo.svg' alt="page logo"/></Link>
         </div>
         <div className="actions" onMouseLeave={minicartDisplayOut}>
               <div className="currency_symbol">
                 <select className="selectCurrency" id="currencySelector"  value={currencyLabel} onChange={currencyUpdate} >
                    
                 {currency.map((currency)=>(
                       <option className="currencyOption shadow" key={currency.label} value={currency.label}>{`${currency.symbol} ${currency.label}`}</option>
                     ))}
                 </select>
               </div>
               <div className="minicartDiv" >
                   <img src="/img/empty_cart.svg" alt="empty cart" onClick={minicartDisplayIn}/>
                   {cartQuantity===0? (<></>)
                   :(
                     <div className='minicartBadge'   onClick={minicartDisplayIn}>
                          <span className="minicartBadgeSpan">{cartQuantity}</span>
                   </div>
                   )}
                   <div className="minicartContainer" style={{visibility:`${minicart}`}}>
                   <div style={{width:"325px",height:"40px", background:"transparent"}}></div>    
                   <div   id="minicart"  name="minicart" className="minicart"  >
                          <MiniCart />
                   </div>
                   </div>
      
               </div>
         </div>
          </header>
      
      <main style={{backgroundColor:`${mainBack}`}}>
        
        <Routes>
          <Route path="/" element={ <Categories updateProducts={updateProducts} errorM={errorMessage}/>}></Route>
          <Route path="/product/:id"  element={<Product />} ></Route>
        
          <Route path="/cart" element={<Cart />}></Route>
    
        </Routes>
          
     </main>
         <footer className="row center">
           
         </footer>
    
    </div>
  </Router>
  );
}

export default App;

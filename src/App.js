import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch  } from "react-router-dom";
import Navbar from "./components/Navbar";
import FooterPage from "./components/Footer";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import { ProductConsumer } from "./context";
import ProceedToPay from "./components/Cart/ProceedToPay"
import Register from "./components/Register"
import Payment from "./components/Payment"
import Login from "./components/Login";
import Profile from "./components/Profile";
import LoginBg from "./icons/lucianbg1.jpg"
import PaymentBg from "./icons/shadesBrush.jpg"
import RegisterBg from "./icons/lucian_bg_3.jpg"

class App extends Component {
  constructor(props) {
    super(props);
    this.footerRef=React.createRef();
   
  }

  render() {
    return (  
      
      <ProductConsumer>
        {value => {
          const { cart } = value;
console.log("is registered ",value.isRegistered)
console.log("cart ",value)
          
            return (
              <React.Fragment>     
                 <Navbar isRegistered ={value.isRegistered} name={value.name} footerRef={this.footerRef}/>
              <Switch>
                <Route path="/"  exact component={ProductList} />
                <Route path="/details" render={(props) => <Details {...props} newProduct={value.newProduct}/>} />
                <Route path="/cart" component={Cart} />
                <Route path="/Register" render={(props)=><Register {...props} isRegistered={value.isRegistered} email={value.emailId} name={value.name} ImagePath={RegisterBg}/>} />
                <Route path="/payment"  render={(props) => <Payment {...props} cart={cart} total={value.cartSubTotal} email={value.emailId} ImagePath={PaymentBg}/>}/>  
                <Route path="/Login" render={(props) => <Login {...props} email={value.emailId} ImagePath={LoginBg}/>}/>
                <Route component={Default} />
              </Switch>
              <Modal isRegistered={value.isRegistered} name={value.name}/>
              <div ref={this.footerRef}>
              <FooterPage/></div>
              </React.Fragment>
            );
          
        }}
      </ProductConsumer>
      
    );
  }
}

export default App;

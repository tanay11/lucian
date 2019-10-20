import React, { Component } from "react";
import Title from "./../Title";
import { Link } from "react-router-dom";
import styled from "styled-components";
import img from '../../icons/shadesBrush.jpg'
import axios from "axios";

const ModalContainer = styled.div`
position: fixed;
top: 0;
left: 0;
right:0;
bottom: 0;
width: 26%;
align-items: center;
background: white;
margin: 0 40%;
z-index: 5;
border: 2px solid;
list-style-type: none; 
overflow-y:scroll;
`;


export default class ProceedToPay extends Component {

  sendUserCart=()=>{
    const currentUser={}
    axios.get('http://localhost:4000/users?email='+this.props.emailId)
    .then(response => {
      currentUser={
          id:response.data[0].id,
          name:response.data[0].name,
          emailId:response.data[0].emailId,
          contact:response.data[0].contact,
          product:this.props.cart
      }

        console.log("Now User ",this.state.name,this.state.user)
        console.log("Response Login ",response.data)
      })
      .catch(function(error) {
        alert("Enable to Proceed ... Try again")
    })

    axios
				.post("http://localhost:3002/api/form", currentUser)
				.then(response => {
					console.log("Getting ", response);
				})
				.catch(err => {
					console.log("Trying to print ", err);
				});
  }
    
  render() {
    const cart = this.props.cart;
    const cartTotal = this.props.cartTotal;
    const clearCart = this.props.clearCart;
    const isRegistered=this.props.isRegistered;

    const emptyCart = cart.length === 0 ? true : false;
    
    console.log("cart in proceedtopsy",cart)

    return (

           <ModalContainer >
        {!emptyCart && (
          <div className="container">
          <Title name="Your" title="Items" />
          {
              cart.map((item)=>
              <div>
              <img
            src={item.img}
            style={{ width: "4rem", heigth: "3rem" }}
            className="img-fluid"
            alt=""
          />
              <li>{item.title}</li>
              <li>{item.price}</li>
              </div>
              )
          }
            <div className="row">
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                <Link to="/">
                  <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    clear cart
                  </button>
                </Link>
                
                <h5>
                  <span className="text-title">Your total :</span>{" "}
                  <strong>$ {cartTotal} </strong>
                </h5>
                {/* <PayPalButton
                  totalAmount={cartTotal}
                  clearCart={clearCart}
                  history={history}
                /> */}
                
              </div>
            </div>
            {isRegistered?
            <Link to="/payment">
            <button className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={this.sendUserCart}
                    >Pay Now</button>  </Link>:<Link to="/Register">
                    <button className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    >Pay Now</button>
                    </Link>}
          </div>
        )}
        </ModalContainer>
       
    );
  }
}

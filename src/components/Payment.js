import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import axios from 'axios';

const PaymentDiv=styled.div`
background-image: url(${props => props.ImagePath});
margin: 10% 30%;
text-align: center;
border: 1px solid blue;
padding: 10% 0;
`

export default class Payment extends Component {
  
  price=this.props.total;   
  email=this.props.email;
  product=this.props.cart;
  constructor(props) {
    super(props);


    this.state = {
      id:0,
        name: '',
        emailId: '',
        contact: '',
        location:'',
        completeAddress:'',
        zipcode:'',
        product:[]
    }
}


componentDidMount() {
    this.getUser()
}
getUser=()=>{
console.log("this.props.email",this.email)
  axios.get('http://localhost:4000/users?email='+this.props.email)
            .then(response => {
                this.setState({
                  id:response.data[0].id,
                  name:response.data[0].name,
                  emailId:response.data[0].emailId,
                  contact:response.data[0].contact,
                  location:response.data[0].location,
                  completeAddress:response.data[0].completeAddress,
                  zipcode:response.data[0].zipcode, 
                  product:response.data[0].product,
                  
                });
                console.log("get response ",response.data)
                console.log("Id for put req ",this.state.id)
              })
              .catch(function(error) {
                console.log(error)
            })
}


sendCompleteProduct=()=>{
  const newCustomer = {
    name: this.state.name,
    email: this.props.email,
    contact: this.state.contact,
    location:this.state.location,
    completeAddress:this.state.completeAddress,
    zipcode:this.state.zipcode,
    product:this.product
  }
  axios.put('http://localhost:4000/users/'+this.state.id,newCustomer)
            .then(response => {
                
                console.log("put response",this.product)
              })
              .catch(function(error) {
                console.log(error)
            })
}
  render() {

    return (

             <PaymentDiv ImagePath={this.props.ImagePath}>
             <label>Please transfer ₹{this.price} to account </label>
            <div>1065046656851</div>
            <div>OR</div>
            <p>
              Click on this button after completing payment
            </p>
            <button className="btn btn-outline-danger text-uppercase mb-3 px-5"
                  onClick={this.sendCompleteProduct}
                    >Click After Payment</button>
         </PaymentDiv> 
         
      );
  }
}


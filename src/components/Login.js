import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { ProductConsumer } from "../context";
import axios from 'axios';
import "./Login.css";
import Profile from './Profile'
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginWrapper=styled.div`
background-image: url(${props => props.ImagePath});
width:100%;
height:100%;
padding:11rem;
`
export default class Login extends Component {
    email=this.props.email;
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
        product:[],
        user:false,
        modal:false
    };
  }

  validateForm() {
    return this.state.emailId.length > 0 ;
  }

  toggle=()=> {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit =() => {
    console.log("Aaya main andar")
    this.setState({
      modal:true
    })
  }

  getUser=()=>{
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
          user:true
        });


        console.log("Now User ",this.state.name,this.state.user)
        console.log("Response Login ",response.data)
      })
      .catch(function(error) {
        alert("OOPs... Sorry you are not our registered customerq")
        console.log("Sorry you are not our registered customer")

    })
   
    console.log("from dialog")
    
    
  }
  
 
  render() {
    return (
        <ProductConsumer>
        {value => {
       return(
      <LoginWrapper ImagePath={this.props.ImagePath}>
        <form>
        <div className="form-group">
                        <label>Email : </label>
                        <input  type="email"
                                className="form-control"
                                value={value.emailId}
                                onChange={value.onChangeEmail}
                                required/>
                    </div>
                    <div className="form-group">
                        <input type="button"  value="Login" onClick={()=>{
                            this.getUser();
                            value.getRegistered(this.state.user);
                            value.setName(this.state.name);
                            this.handleSubmit();
                        }} className="btn btn-primary" />
                        {/* <p>{this.state.name}</p> */}
                    </div>
                    {this.state.modal?<Profile modal={this.state.modal} name={this.state.name} isRegistered={this.state.user} toggle={this.toggle}/>:null}
        </form>
        
         
        
      </LoginWrapper>)
         }}
         </ProductConsumer>
    );
    
  }
}
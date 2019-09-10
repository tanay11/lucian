import React, { Component } from "react";
import {BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import {ReactComponent as Logo} from '../icons/logo.svg'
import {ReactComponent as Cart} from '../icons/cart.svg'
import { ButtonContainer } from "./Button";
import Profile from "./Profile"

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state={
      active:false,
      modal: false
    }
  }
  scrollToTopWithCallback=()=> {
        this.props.footerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    // let scroller = scrollToComponent(this.props.footerRef, { offset: 0, align: 'top', duration: 200});
    // scroller.on('end', () => console.log('Scrolling end!') );
  }
  toggle=()=> {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  
  render() {
    const {name,isRegistered}=this.props;
    return (
      
      <Nav className="navbar navbar-expand-sm  navbar-dark px-sm-5">
           <Logo className="icon"/>
        
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
            <img src="img/LucianPE.png" className="Lucian-img" alt="" />
            </Link>
          </li>
        </ul>

        {/* { this.props.name.length>0 ?<h4>Hi {this.props.name}  !!!</h4>:null} */}
        <div className="nav-icons">
        <Link to="/"><button className="nav-btn" value="Home"> 
         
                Home
              </button></Link>

              
              <button className="nav-btn" value="About" onClick={()=>this.scrollToTopWithCallback()}>
                About
                </button>
              <button className="nav-btn"  value="Profile" onClick={()=>this.toggle()}>
                Profile
                </button>
                {this.state.modal?<Profile modal={this.state.modal} name={name} isRegistered={isRegistered} toggle={this.toggle}/>:null}
              <button className="nav-btn"  onClick={()=>this.scrollToTopWithCallback()}>
                Contact
              </button>
            </div>

        <Link to="/cart" className="ml-auto">
          <CartButton>
            <span>
              <Cart className="carticon"/>
            </span>
           {"  "} Cart
          </CartButton>
        </Link>
      </Nav>
    );
  }
}

const CartButton=styled.button`
width: 9%;
border: 2px solid white;
border-radius: 50px 20px;
position: absolute;
right: 1%;
}
`

const Nav = styled.nav`
  background: #3E4095;
  max-height:8em;
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }
  @media (max-width: 576px) {
    .navbar-nav {
      flex-direction: row !important;
`;

// const ButtonContainer = styled.button`
//   text-transform: capitalize;
// font - size: 1.4rem;
// background: transparent;
// border: 0.05rem solid var(--lightBlue);
// border - radius: 0.5rem;
// padding: 0.2rem 0.5rem;
// outline - color: red;
// cursor: pointer;
// display: inline - block;
// margin: 0.2rem 0.5rem 0.2rem 0;
// transition: all 0.5s ease -in -out;
//   &: hover {
//   background: var(--lightBlue);
//   color: var(--mainBlue);
// }
// `;

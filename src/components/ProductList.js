import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { Link } from "react-router-dom";
import { storeProducts } from "../data";
import styled from "styled-components";
import SlideShow from "./Slider"
import { ProductConsumer } from "../context";
import {ReactComponent as ProfileIcon} from '../icons/profile.svg'
import {ReactComponent as LoginIcon} from '../icons/user.svg'
import {About} from './About'

const ProductsCont=styled.div`
  display:grid;
  grid-template-columns:50% 50%;
  padding: 0 7rem;
`
const DeliveryButton=styled.button`
border: 2px solid white;
border-radius: 50px 20px;
}
`

export default class ProductList extends Component {
  state = {
    products: storeProducts
  };
  render() {
    return (
      <React.Fragment>
        <ProductWrapper>
          <div className="wrapper-container">
          <div className="toolbar">      
                <Link to="/register">
              <DeliveryButton><span><ProfileIcon className="carticon"/>{"  "}Register</span></DeliveryButton></Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/Login">
              <DeliveryButton><span><LoginIcon className="carticon"/>{"  "}Login</span></DeliveryButton></Link></div>
            <SlideShow className="height-control"/>

            <Title name="our" title="products" />
            <ProductsCont>
              <h3 style={{"marginLeft":"15rem","marginTop":"2rem","textShadow":"2px 0 grey"}}>Interior</h3>
              <h3 style={{"marginLeft":"15rem","marginTop":"2rem","textShadow":"2px 0 grey"}}>Exterior</h3>
              <ProductConsumer id="nav-id">
                {value => {
                  return value.products.map(product => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </ProductsCont>
            <About/>

          </div>

        </ProductWrapper>
      </React.Fragment>
    );
  }
}

const ProductWrapper = styled.section``;

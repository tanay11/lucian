import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
import { storeProducts } from "../data";
import styled from "styled-components";
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.clicked=false;
    // This binding is necessary to make `this` work in the callback
    this.handlePress = this.handlePress.bind(this);
  }
  
  handlePress(){
    this.clicked=true;
  }

  
  render() {

    const ShadeButton = styled.button`
    border:none;
    height:80px;
    width:100px;
    &:focus{
      border:2px solid brown;
      opacity:0; 
    }
    `
    return (
      <ProductConsumer>
        {value => {

          const {
            id,
            title,
            types,
            company,
            img,
            info,
            Availability,
            inCart,
            size,
            rang
          } = this.props.newProduct;
          

          return (
            <div className="container py-5">
              {console.log("ab update hua",value.newProduct)}
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* end of title */}
              <div className="row">
                <div className="col-10 mx-auto col-md-3 my-2">
                  <img src={img} className="img-fluid" alt="" />
                </div>
                {/* prdoduct info */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h1> {title}</h1>
                  {types &&
                  <p> 
                  <label>
                  <input type="radio" name={id} value="Interior" onClick={value.handleSelectedType} checked={value.selectedType=="Interior"}/>Interior
                  </label>
                  <label> <input type="radio" name={id} value="Exterior" onClick={value.handleSelectedType} checked={value.selectedType=="Exterior"}/>Exterior
                  </label>
                  </p>
                  }
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                   {id==8?<h3>Please Select Minimum 6 shades</h3>: <h3>Do you want to add Shades in your colour</h3>}
                <br/>
                <div onClick={this.handlePress}>
                  <button className={`${rang ? rang[rang.length-1]=="Narangi"?'button-active':'my-button':'my-button'}`} value="Narangi" onClick={value.handleColor}>
                  <img src="img/narangi.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="GreenGold"?'button-active':'my-button':'my-button'}`} value="GreenGold" onClick={value.handleColor}>
                  <img src="img/greengold.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="Jamuni"?'button-active':'my-button':'my-button'}`} value="Jamuni" onClick={value.handleColor}>
                  <img src="img/jamuni.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="JollyHolly"?'button-active':'my-button':'my-button'}`} value="JollyHolly" onClick={value.handleColor}>
                  <img src="img/jolly holly.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="Lemon"?'button-active':'my-button':'my-button'}`} value="Lemon" onClick={value.handleColor}>
                  <img src="img/lemon.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="Magenta"?'button-active':'my-button':'my-button'}`} value="Magenta" onClick={value.handleColor}>
                  <img src="img/magenta.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="Mayur"?'button-active':'my-button':'my-button'}`} value="Mayur" onClick={value.handleColor}>
                  <img src="img/mayur.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="Maroon"?'button-active':'my-button':'my-button'}`} value="Maroon" onClick={value.handleColor}>
                  <img src="img/maroon.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="Mehendi"?'button-active':'my-button':'my-button'}`} value="Mehendi" onClick={value.handleColor}>
                  <img src="img/mehendi.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="NagpuriOrange"?'button-active':'my-button':'my-button'}`} value="NagpuriOrange" onClick={value.handleColor}>
                  <img src="img/nagpuri orange.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="Orange"?'button-active':'my-button':'my-button'}`} value="Orange" onClick={value.handleColor}>
                  <img src="img/orange.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="OxfordBlue"?'button-active':'my-button':'my-button'}`} value="OxfordBlue" onClick={value.handleColor}>
                  <img src="img/oxford blue.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="Revel"?'button-active':'my-button':'my-button'}`} value="Revel" onClick={value.handleColor}>
                  <img src="img/Revel.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="SignalRed"?'button-active':'my-button':'my-button'}`} value="SignalRed" onClick={value.handleColor}>
                  <img src="img/signal red.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="SportyYellow"?'button-active':'my-button':'my-button'}`} value="SportyYellow" onClick={value.handleColor}>
                  <img src="img/sporty yellow.png" className="img-fluid" alt="" />
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className={`${rang ? rang[rang.length-1]=="TerraCotta"?'button-active':'my-button':'my-button'}`} value="TerraCotta" onClick={value.handleColor}>
                  <img src="img/terracotta.png" className="img-fluid" alt="" />
                  </button> 
                  </div>
                  
                  <br/>
                  <br/>
                  <h4><i>Available Sizes</i></h4>
                  {Availability.map(item=>{
                    return (<div><label><input type="radio" title={item.key} name="Size" value={item.size} onClick={value.handleSize}/>
                    {item.size}</label></div>);
                  })}
                  <br/>
                  </p>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about product :
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/* buttons */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        if( id !=8 ){
                        value.addToCart(id);}
                        value.openModal(id);
                        if(this.clicked){
                          id==8?value.generateMultipleShade():
                          value.generateShade(id)
                        }
                      }}
                    >
                      {inCart ? "in cart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

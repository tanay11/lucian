import React, { Component } from "react";
export default class CartItem extends Component {
  render() {
    const { id, title, img, price, total, count,color } = this.props.item;
    const { increment, decrement,removeShade, removeItem } = this.props.value;
    console.log("item ",this.props.item)
    return (
      <div className="row my-1 text-capitalize text-center">
        <div className="col-10 mx-auto col-lg-2">
          <img
            src={img}
            style={{ width: "5rem", heigth: "5rem" }}
            className="img-fluid"
            alt=""
          />
        </div>
        {color?
        <div className="col-10 mx-auto col-lg-2 ">
          <span className="d-lg-none">Shade :</span> {color}
        </div>:
        <div className="col-10 mx-auto col-lg-2 ">
          <span className="d-lg-none">product :</span> {title}
        </div>}
        
        
        <div className="col-10 mx-auto col-lg-2 ">
          <strong>
            <span className="d-lg-none">price :</span> ₹{price}
          </strong>
        </div>
        <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0 ">
          <div className="d-flex justify-content-center">
            <div>
              <span
                className="btn btn-black mx-1"
                onClick={() => {
                  return decrement(id);
                }}
              >
                -
              </span>
              <span className="btn btn-black mx-1">{count}</span>
              <span
                className="btn btn-black mx-1"
                onClick={() => {
                  return increment(id);
                }}
              >
                +
              </span>
            </div>
          </div>
        </div>
        <div className="col-10 mx-auto col-lg-2 ">
          {color?
        <div className=" cart-icon" onClick={() => removeShade(id)}>
            <i className="fas fa-trash" />
          </div>:
          <div className=" cart-icon" onClick={() => removeItem(id)}>
            <i className="fas fa-trash" />
          </div>}
        </div>

        <div className="col-10 mx-auto col-lg-2 ">
          <strong>item total : ₹{total} </strong>
        </div>
      </div>
    );
  }
}
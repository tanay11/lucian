import React, { Component } from "react";
import { storeProducts, detailProduct ,shade} from "./data";


const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
      products: [],
      shades:[],
      detailProduct: detailProduct,
      cart: [],
      modalOpen: false,
      newProduct:detailProduct,
      modalProduct: detailProduct,
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0,
      selectedType:"Interior",
      isRegistered:false,
      emailId:"",
      name:"",
      selectedSize:"",
      key:3,
      rang:[]
    }
  
  componentDidMount() {
    this.setProducts();
    this.setShade();
  }
   
  setShade=()=>{
    let shades=[];
    shade.forEach(item => {
      shades.push(item)
    });
    this.setState(()=>{
      return { shades }
    })
  }
  setName=(title)=>{
  this.setState({
    name:title
  })
  console.log("Name in context",title)
  }

  handleColor=(e)=>{
    this.setState({
      rang: [...this.state.rang, e.currentTarget.value]
    },()=>{console.log("EveryTime I set cOLOR",this.state.rang)})
    //()=>{this.len=this.state.rang.length}
    }


    handleSelectedType = (event) =>{

      const product = this.state.products.find(item => item.id === parseInt(event.currentTarget.name))
    if(product.types){
      this.setState({
          newProduct: product[event.currentTarget.value] ,
          selectedType:event.currentTarget.value
      },()=>{console.log("meri mehnat chl jaa",this.state.newProduct)});
    }
    }

  setProducts = () => {
    let products = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    this.setState(() => {
      return { products };
    }, this.checkCartItems);
  };
  handleSize=(event)=>{
    this.setState({
      selectedSize: event.target.value,
      key:(event.target.title-1)
  })  
  }
  getRegistered=(user)=>{
    this.setState({
      isRegistered:user
    })
    console.log("isregister ",this.state.isRegistered)
  }


  getItem = id => {
    console.log("Inside Get item",id)
    console.log("Inside Get item product ",this.state.products)
    const product = this.state.products.find(item => item.id === id);
    console.log("Product ",product)
    if(product.types){
      this.setState({
          newProduct: product[this.state.selectedType] ,
          selectedType:product.specify
      });
    }
    else{
      this.setState({
        newProduct: product
    });
    }
    return this.state.newProduct;
    
  };

  onChangeName=(e)=> {
    this.setState({
        name: e.target.value
    });
}
  onChangeEmail=(e)=> {
    this.setState({
        emailId: e.target.value
    });
  
  
    console.log("Registered email flow",this.state.emailId)
}

generateMultipleShade= ()=>{
  
  let tempShades={...this.state.shades}  
  let cartShades=[]
  let colours=[];
  colours=[...this.state.rang]
  const arr=Object.values(tempShades)
  colours.map((shadeSelected)=>{
    var f;
    var found = arr.some(function(item, index) { f = index; return item.color == shadeSelected; });
    const shade=tempShades[f]
    shade.incart=true;
    const price=shade.price
    shade.count=1
    shade.total=price
    cartShades.push(shade)
  })
  this.setState(()=>{
  return {
  cart:[...this.state.cart,cartShades],
  rang:[]
  }
  },this.addTotals)
  
  }


  generateShade= (id)=>{
    const tempShades={...this.state.shades}  
    const colours=this.state.rang[this.state.rang.length-1];
    const arr=Object.values(tempShades)
    var f;
    var found = arr.some(function(item, index) { f = index; return item.color == colours; });
    const shade=tempShades[f]
    shade.incart=true;
    const price=shade.price
    shade.count=1
    shade.total=price
    const product = this.getItem(id)
    product.inCart = true;
    product.count = 1;
    const cost=product.Availability[this.state.key].price;
    product.price=cost;
    product.total = cost;
    this.setState(()=>{
    return {
    cart:[...this.state.cart,product,shade],
    rang:[]
    }
    },this.addTotals)
    
    }

  addToCart = id => {
    let tempProducts = [...this.state.products];
    const product = this.getItem(id);
    product.inCart = true;
    product.count = 1;
    const amt = product.Availability[this.state.key].price;
    product.price=amt;
    product.total = amt;

    this.setState(() => {
      return {
        products: [...tempProducts],
        cart: [...this.state.cart, product],
        detailProduct: { ...product }
      };
    }, this.addTotals);
  };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(() => {
      return {
        cart: [...tempCart]
      };
    }, this.addTotals);
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotals);
    }
  };
  getTotals = () => {
    // const subTotal = this.state.cart
    //   .map(item => item.total)
    //   .reduce((acc, curr) => {
    //     acc = acc + curr;
    //     return acc;
    //   }, 0);
    let subTotal = 0;
    console.log("Cart at Total",this.state.cart)
    this.state.cart.map(item =>
      item.length > 1 ? item.map(
        color=>( 
          (subTotal += color.total) )
      ):
       (subTotal += item.total));
    const tempTax = subTotal * 0.18;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total
    };
  };
  addTotals = () => {
    const totals = this.getTotals();
    this.setState(
      () => {
        return {
          cartSubTotal: totals.subTotal,
          cartTax: totals.tax,
          cartTotal: totals.total
        };
      },
      () => {
        // console.log(this.state);
      }
    );
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    let removedProduct = this.getItem(id)
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      };
    }, this.addTotals);
  };
  removeShade= id => {
    let tempShades = [...this.state.shades];
    let tempCart = [...this.state.cart];
    var f;
    var found = tempShades.some(function(item, index) { f = index; return item.id == id; });
    let removedProduct=tempShades[f]
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],
        shades: [...tempShades]
      };
    }, this.addTotals);
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          getItem : this.getItem,
          openModal: this.openModal,
          getRegistered:this.getRegistered,
          handleSize:this.handleSize,
          generateShade:this.generateShade,
          generateMultipleShade:this.generateMultipleShade,
          onChangeEmail:this.onChangeEmail,
          onChangeName:this.onChangeName,
          closeModal: this.closeModal,
          setName:this.setName,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          removeShade:this.removeShade,
          handleColor:this.handleColor,
          handleSelectedType:this.handleSelectedType,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

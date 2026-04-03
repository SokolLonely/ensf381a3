import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import flavors from "../data/flavors";

function FlavorItem({ id, name, price, image, description, onAdd }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className="flavorcard"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>{price}</p>
      {showDescription && <p>{description}</p>}
      <button onClick={() => onAdd({ id, name, price })}>Add to Order</button>
    </div>
  );
}
function FlavorCatalog({handleAddClick})
 { return(
   <div className="flavor-grid">
          {flavors.map((ice_cream) => (
            <FlavorItem
              key={ice_cream.id}
              {...ice_cream}
              onAdd={handleAddClick}
            />
          ))}
        </div>
  ) 
}
function OrderItem({id,  name, quantity, price, onRemove }) {
  console.log("price ={"+ price+ "}, qunatity = {"+quantity +"}");
  return (
    <div className="order-item">
      <p>{name}</p>
      <p>Quantity: {quantity}</p>
      <p>Total: ${(price.slice(1) * quantity).toFixed(2)}</p>
      <button className="remove" onClick={() => onRemove({ id, name, price })}> Remove item </button>
    </div>
  );
}

function OrderList({ cart, handleRemoveClick }) {
  var total_price = 0;
  for (const el of cart)
  {
    total_price += parseFloat(el.price.slice(1)) *el.quantity;
  }
  return (
    <div className="order-list">
      <h3>Shopping Cart</h3>
      {cart.length === 0 ? (<p>No items in your order</p>)
       : (
        cart.map((item) => (
          <OrderItem
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onRemove={handleRemoveClick}
          />
        ))
      )}

      {total_price > 0 && (
        <h4>Total: ${total_price.toFixed(2)}</h4>
      )}
    </div>
  );
}

function FlavorsPage() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const handleAddClick = ({ id, name, price }) => {
    setCart((prevCart) => {
      const existsItem = prevCart.find((item) => item.id === id);
      if (existsItem) {

        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id, name, price, quantity: 1 }];
      }
    });
  };  
  const handleRemoveClick = ({ id, name, price }) => {
    setCart((prevCart) =>
    prevCart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0) // remove items with 0 quantity
  );
  }; 
  return (
    <div className="flavors-page">
      <Header />
      <div className="content">
        <FlavorCatalog handleAddClick={handleAddClick} />
        <OrderList cart={cart} handleRemoveClick = {handleRemoveClick}/>
      </div>
      <Footer/>
    </div>
  );
}

export default FlavorsPage;
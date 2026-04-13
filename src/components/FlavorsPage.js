import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";

const API_BASE = 'http://localhost:5000';

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

function FlavorCatalog({ flavors, handleAddClick }) {
  return (
    <div className="flavor-grid">
      {flavors.map((ice_cream) => (
        <FlavorItem
          key={ice_cream.id}
          {...ice_cream}
          onAdd={handleAddClick}
        />
      ))}
    </div>
  );
}

function OrderItem({ flavorId, name, quantity, price, onRemove }) {
  const numericPrice = typeof price === 'string' ? parseFloat(price.replace('$', '')) : price;
  return (
    <div className="order-item">
      <p><strong>{name}</strong></p>
      <p>Quantity: {quantity}</p>
      <p>Price: ${(numericPrice * quantity).toFixed(2)}</p>
      <button className="remove" onClick={() => onRemove(flavorId)}>Remove Item</button>
    </div>
  );
}

function OrderList({ cart, handleRemoveClick, handlePlaceOrder, orderMessage }) {
  let totalPrice = 0;
  for (const item of cart) {
    const numericPrice = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price;
    totalPrice += numericPrice * item.quantity;
  }

  return (
    <div className="order-list">
      <h3>Your Order</h3>
      {cart.length === 0 ? (
        <p>No items in your order</p>
      ) : (
        cart.map((item) => (
          <OrderItem
            key={item.flavorId}
            flavorId={item.flavorId}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onRemove={handleRemoveClick}
          />
        ))
      )}

      {totalPrice > 0 && (
        <>
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
          <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
      {orderMessage && (
        <p style={{ color: orderMessage.type === 'success' ? 'green' : 'red', fontWeight: 'bold', marginTop: '10px' }}>
          {orderMessage.text}
        </p>
      )}
    </div>
  );
}

function FlavorsPage() {
  const [flavors, setFlavors] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderMessage, setOrderMessage] = useState(null);
  const userId = localStorage.getItem('userId');

  // Fetch flavors from backend
  useEffect(() => {
    fetch(`${API_BASE}/flavors`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.flavors) {
          setFlavors(data.flavors);
        }
      })
      .catch((err) => console.error('Error fetching flavors:', err));
  }, []);

  // Fetch cart from backend 
  useEffect(() => {
    if (userId) {
      fetch(`${API_BASE}/cart?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.cart) {
            setCart(data.cart);
          }
        })
        .catch((err) => console.error('Error fetching cart:', err));
    }
  }, [userId]);

  const handleAddClick = async ({ id, name, price }) => {
    const existingItem = cart.find((item) => item.flavorId === id);

    try {
      let response;
      if (existingItem) {
        // Already in cart 
        response = await fetch(`${API_BASE}/cart`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: parseInt(userId),
            flavorId: id,
            quantity: existingItem.quantity + 1,
          }),
        });
      } else {
        // New item — POST to add
        response = await fetch(`${API_BASE}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: parseInt(userId),
            flavorId: id,
          }),
        });
      }

      const data = await response.json();
      if (data.success && data.cart) {
        setCart(data.cart);
      } else {
        setOrderMessage({ type: 'error', text: data.message || 'Failed to update cart.' });
      }
    } catch (error) {
      setOrderMessage({ type: 'error', text: 'An error occurred updating the cart.' });
    }
  };

  const handleRemoveClick = async (flavorId) => {
    try {
      const response = await fetch(`${API_BASE}/cart`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: parseInt(userId),
          flavorId: flavorId,
        }),
      });

      const data = await response.json();
      if (data.success && data.cart) {
        setCart(data.cart);
      }
    } catch (error) {
      setOrderMessage({ type: 'error', text: 'An error occurred removing the item.' });
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: parseInt(userId) }),
      });

      const data = await response.json();
      if (data.success) {
        setCart([]);
        setOrderMessage({ type: 'success', text: data.message || 'Order placed successfully!' });
      } else {
        setOrderMessage({ type: 'error', text: data.message || 'Failed to place order.' });
      }
    } catch (error) {
      setOrderMessage({ type: 'error', text: 'An error occurred placing the order.' });
    }
  };

  return (
    <div className="flavors-page">
      <Header />
      <div className="content">
        <FlavorCatalog flavors={flavors} handleAddClick={handleAddClick} />
        <OrderList
          cart={cart}
          handleRemoveClick={handleRemoveClick}
          handlePlaceOrder={handlePlaceOrder}
          orderMessage={orderMessage}
        />
      </div>
      <Footer />
    </div>
  );
}

export default FlavorsPage;
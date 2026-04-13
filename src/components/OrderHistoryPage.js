import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const API_BASE = 'http://localhost:5000';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetch(`${API_BASE}/orders?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.orders) {
            setOrders(data.orders);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching orders:', err);
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <div>
      <Header />
      <div className="main-section" style={{ minHeight: '72vh' }}>
        <h2>Order History</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>You have not placed any orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.orderId} className="order-history-card">
              <h4>Order #{order.orderId}</h4>
              <p className="order-date">{order.timestamp}</p>
              {order.items.map((item, idx) => {
                const numericPrice = typeof item.price === 'string'
                  ? parseFloat(item.price.replace('$', ''))
                  : item.price;
                return (
                  <p key={idx}>
                    {item.name} x {item.quantity} = ${(numericPrice * item.quantity).toFixed(2)}
                  </p>
                );
              })}
              <p><strong>Total: ${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}</strong></p>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default OrderHistoryPage;
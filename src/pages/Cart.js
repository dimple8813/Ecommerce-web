import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  // Ensure every cart item has a quantity on first load
  useEffect(() => {
    const updatedItems = cartItems.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedItems);
  }, []);

  const removeItem = (indexToRemove) => {
    const updatedItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedItems);
  };

  const updateQuantity = (index, delta) => {
    const updatedItems = [...cartItems];
    const currentQty = updatedItems[index].quantity || 1;
    const newQty = currentQty + delta;

    if (newQty >= 1) {
      updatedItems[index].quantity = newQty;
      setCartItems(updatedItems);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="container mt-5">
      <h2>🛒 Cart Summary</h2>

      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: '80px',
                    height: 'auto',
                    marginRight: '15px',
                    objectFit: 'cover',
                  }}
                />
                <div className="flex-grow-1">
                  <h5>{item.title}</h5>
                  <p className="mb-1">
                    Price: ${item.price} × {item.quantity || 1} ={' '}
                    <strong>${(item.price * (item.quantity || 1)).toFixed(2)}</strong>
                  </p>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateQuantity(index, -1)}
                    >
                      -
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" disabled>
                      {item.quantity || 1}
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateQuantity(index, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-danger btn-sm ms-3"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>

          <div className="d-grid gap-2 mt-3">
  <button className="btn btn-primary btn-lg" onClick={() => navigate('/checkout')}>
    Proceed to Checkout
  </button>
</div>
        </>
      )}
    </div>
  );
}

export default Cart;

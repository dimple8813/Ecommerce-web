import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function Checkout({ cartItems }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">💳 Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty. Please add items before checking out.</p>
      ) : (
        <div className="row">
          {/* User Info Form */}
          <div className="col-md-6 mb-4">
            <Card className="p-4 shadow-sm rounded-4">
              <h4 className="mb-3">🧑 Shipping Information</h4>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="John Doe" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="you@example.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="123 Main St" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="City" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formZip">
                  <Form.Label>ZIP / Postal Code</Form.Label>
                  <Form.Control type="text" placeholder="123456" />
                </Form.Group>
              </Form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="col-md-6 mb-4">
            <Card className="p-4 shadow-sm rounded-4">
              <h4 className="mb-3">🧾 Order Summary</h4>
              <ul className="list-group mb-3">
                {cartItems.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{item.title} × {item.quantity}</span>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
              <h5 className="d-flex justify-content-between">
                <span>Total:</span>
                <span className="text-success">${totalPrice.toFixed(2)}</span>
              </h5>

              <div className="d-grid mt-4">
                <Button variant="success" size="lg">
                  Place Order
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Cart from './pages/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './AuthContext';
import Login from './pages/Login';
import Checkout from './pages/Checkout';


function App() {
    const { user, logout } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.quantity || 1) * item.price, 0);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">MyApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>

              {/* Cart Dropdown */}
              <li className="nav-item dropdown" style={{ position: 'relative' }}>
                <span
                  className="nav-link dropdown-toggle text-warning"
                  id="cartDropdown"
                  style={{ cursor: 'pointer' }}
                >
                  🛒 Cart: {totalQuantity}
                </span>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="cartDropdown"
                  style={{
                    display: 'none',
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    minWidth: '300px',
                    zIndex: 1000,
                  }}
                >
                  {cartItems.length === 0 ? (
                    <li className="dropdown-item">Cart is empty</li>
                  ) : (
                    <>
                      {cartItems.map((item, index) => (
                        <li key={index} className="dropdown-item d-flex align-items-center">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'cover',
                              marginRight: '10px',
                            }}
                          />
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{item.title}</div>
                            <div style={{ fontSize: '12px', color: '#555' }}>
                              ${item.price} × {item.quantity || 1}
                            </div>
                          </div>
                        </li>
                      ))}
                      <li><hr className="dropdown-divider" /></li>
                      <li className="dropdown-item text-end fw-bold text-success">
                        Total: ${totalPrice.toFixed(2)}
                      </li>
                      <li>
                        <Link to="/cart" className="dropdown-item text-center text-primary">
                          Go to Cart →
                        </Link>
                      </li>
                       {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">👋 {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            )}
                    </>
                  )}
                </ul>

                {/* Hover to open dropdown */}
                <style>{`
                  .nav-item.dropdown:hover .dropdown-menu {
                    display: block !important;
                  }
                `}</style>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;

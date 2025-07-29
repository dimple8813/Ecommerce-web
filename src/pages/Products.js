import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { Modal, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import ProductDetailModal from './components/ProductDetailModal'; // Ensure this path is correct

function Products({ cartItems, setCartItems }) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({ category: [], brand: [], tag: [] });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [tags] = useState(['smartphone', 'laptop', 'watch', 'tablet', 'camera']);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const [message, setMessage] = useState('');

  const [showDetail, setShowDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, [setCartItems]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data.products);
        setProducts(data.products);
        setCategories([...new Set(data.products.map(p => p.category))]);
        setBrands([...new Set(data.products.map(p => p.brand))]);
      });
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];
    if (filters.category.length) {
      filtered = filtered.filter(p => filters.category.includes(p.category));
    }
    if (filters.brand.length) {
      filtered = filtered.filter(p => filters.brand.includes(p.brand));
    }
    if (filters.tag.length) {
      filtered = filtered.filter(p =>
        filters.tag.some(tag => p.title.toLowerCase().includes(tag))
      );
    }
    setProducts(filtered);
    setCurrentPage(1);
  }, [filters, allProducts]);

  const handleAddToCart = (product) => {
    const exists = cartItems.find(item => item.id === product.id);
    if (!exists) {
      setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
      setMessage(`${product.title} added to cart!`);
    } else {
      setMessage(`${product.title} is already in the cart.`);
    }
    setTimeout(() => setMessage(''), 2000);
  };

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  const indexOfLast = currentPage * productsPerPage;
  const currentProducts = products.slice(indexOfLast - productsPerPage, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <Sidebar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            brands={brands}
            tags={tags}
          />
        </div>

        {/* Product Grid */}
        <div className="col-md-9">
          <h2 className="mb-4">Products</h2>

          {message && (
            <div className="alert alert-info">{message}</div>
          )}

          <div className="row">
            {currentProducts.map(product => {
              const isAdded = cartItems.some(item => item.id === product.id);
              return (
                <div className="col-md-4 mb-4" key={product.id}>
                  <div className="card h-100">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-between align-items-center">
                        {product.title}
                        <FaEye
                          role="button"
                          className="text-primary"
                          onClick={() => handleViewDetail(product)}
                          title="View Details"
                        />
                      </h5>
                      <p>${product.price}</p>
                      <button
                        className={`btn ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => handleAddToCart(product)}
                        disabled={isAdded}
                      >
                        {isAdded ? 'Added' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {products.length > productsPerPage && (
            <nav>
              <ul className="pagination justify-content-center">
                {[...Array(totalPages)].map((_, idx) => (
                  <li
                    key={idx}
                    className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Modal for full product detail */}
          {showDetail && selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setShowDetail(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;

import React from 'react';


function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close float-end" onClick={onClose}></button>
        <h2>{product.title}</h2>
 
        {/* Images */}
        <div className="mb-3">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product ${index}`}
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginRight: '10px' }}
            />
          ))}
        </div>

        {/* Basic Info */}
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Discount:</strong> {product.discountPercentage}%</p>
        <p><strong>Rating:</strong> {product.rating}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>SKU:</strong> {product.sku}</p>
        <p><strong>Weight:</strong> {product.weight}g</p>

        {/* Dimensions */}
        {product.dimensions && (
          <p><strong>Dimensions:</strong> {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm</p>
        )}

        {/* Extra Info */}
        <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
        <p><strong>Shipping Info:</strong> {product.shippingInformation}</p>
        <p><strong>Availability:</strong> {product.availabilityStatus}</p>
        <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
        <p><strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity}</p>

        {/* Tags */}
        <p><strong>Tags:</strong> {product.tags?.join(', ')}</p>

        {/* Meta Info */}
        <p><strong>Barcode:</strong> {product.meta?.barcode}</p>
        {product.meta?.qrCode && (
          <img src={product.meta.qrCode} alt="QR Code" width={100} />
        )}

        {/* Reviews */}
        {product.reviews?.length > 0 && (
          <>
            <h5 className="mt-3">Reviews:</h5>
            <ul>
              {product.reviews.map((review, idx) => (
                <li key={idx}>
                  <strong>{review.reviewerName}</strong> ({review.rating}★): {review.comment}
                </li>
              ))}
            </ul>
          </>
        )}

        <button className="btn btn-danger mt-3" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ProductDetailModal;

import React from "react";

function Home() {
  return (
    <div className="container my-5">

      {/* Hero Banner */}
      <div className="row align-items-center bg-light p-4 rounded-4 mb-5 shadow-sm">
        <div className="col-md-6">
          <h1 className="display-5 fw-bold">Up to 35% Off Beds & Sofas</h1>
          <p className="lead">Discover comfort and style at unbeatable prices.</p>
          <button className="btn btn-warning px-4 py-2">Shop Now</button>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="https://picsum.photos/id/1018/600/400"
            alt="Hero"
            className="img-fluid rounded-4"
          />
        </div>
      </div>

      {/* Features */}
      <div className="row text-center mb-5">
        {[
          { icon: "bi-truck", label: "Free Shipping" },
          { icon: "bi-shield-check", label: "10-Year Warranty" },
          { icon: "bi-clock-history", label: "30-Night Trial" },
        ].map((item, index) => (
          <div className="col-md-4" key={index}>
            <i className={`bi ${item.icon} fs-1 text-warning mb-3`}></i>
            <h5>{item.label}</h5>
            <p>Enjoy premium services with every order.</p>
          </div>
        ))}
      </div>

      {/* Our Favorites */}
      <h2 className="text-center mb-4">Our Favorites</h2>
      <div className="row g-4 mb-5">
        {[1025, 1024, 1022, 1021].map((imgId, i) => (
          <div className="col-md-3" key={i}>
            <div className="card h-100 shadow-sm">
              <img
                src={`https://picsum.photos/id/${imgId}/400/300`}
                className="card-img-top"
                alt={`Favorite ${i + 1}`}
              />
              <div className="card-body">
                <h5 className="card-title">Product {i + 1}</h5>
                <p className="card-text">Elegant, affordable, and modern design.</p>
                <button className="btn btn-outline-dark w-100">View Product</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMI Banner */}
      <div className="bg-warning text-dark text-center p-5 mb-5 rounded-4 shadow">
        <h3>Easy EMI with 0% Interest</h3>
        <p className="mb-3">Pay later options available for every budget.</p>
        <button className="btn btn-dark">Know More</button>
      </div>

      {/* Top Rated */}
      <h2 className="text-center mb-4">Top Rated</h2>
      <div className="row g-4 mb-5">
        {[1035, 1040, 1043].map((imgId, i) => (
          <div className="col-md-4" key={i}>
            <div className="card h-100 shadow-sm">
              <img
                src={`https://picsum.photos/id/${imgId}/400/300`}
                className="card-img-top"
                alt={`Top Rated ${i + 1}`}
              />
              <div className="card-body">
                <h5 className="card-title">Top Product {i + 1}</h5>
                <p className="card-text">Loved by thousands of happy customers!</p>
                <button className="btn btn-outline-dark w-100">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div className="text-center mb-5">
        <h3 className="mb-3">What Our Customers Say</h3>
        <blockquote className="blockquote">
          <p>"Best purchase ever. The bed is so comfy and delivery was fast!"</p>
          <footer className="blockquote-footer">A Happy Buyer</footer>
        </blockquote>
      </div>

    </div>
  );
}

export default Home;

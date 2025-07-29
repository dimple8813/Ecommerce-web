import React from 'react';

function About() {
  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">About Us</h2>

      {/* Company Info */}
      <section className="mb-5">
        <h4>Our Company</h4>
        <p>
          We are a forward-thinking company committed to providing top-notch products and services.
          With years of experience, our focus is on innovation, customer satisfaction, and delivering exceptional value.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mb-5">
        <h4>Our Mission</h4>
        <p>
          Our mission is to revolutionize the way people shop online by offering high-quality, affordable products
          combined with an outstanding customer experience.
        </p>
      </section>

      {/* Team Members */}
      <section className="mb-5">
        <h4>Meet Our Team</h4>
        <ul>
          <li><strong>Jane Doe</strong> – CEO</li>
          <li><strong>John Smith</strong> – CTO</li>
          <li><strong>Emily Johnson</strong> – Marketing Head</li>
        </ul>
      </section>

      {/* Contact Info */}
      <section>
        <h4>Contact Information</h4>
        <p>Email: support@myapp.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Main Street, Suite 400, Tech City</p>
      </section>
    </div>
  );
}

export default About;

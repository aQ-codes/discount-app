"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const Cart = () => {
  const [quantities, setQuantities] = useState([1, 1, 1, 2]);
  const [offerPopup, setOfferPopup] = useState({ product: null });
  const [offersModalVisible, setOffersModalVisible] = useState(false);

  const handleQuantityChange = (index, delta) => {
    setQuantities((prev) =>
      prev.map((qty, i) => (i === index ? Math.max(1, qty + delta) : qty))
    );
  };

  const toggleOfferPopup = (productIndex) => {
    setOfferPopup((prev) => ({ product: prev.product === productIndex ? null : productIndex }));
  };

  const openOffersModal = () => {
    setOffersModalVisible(true);
  };

  const closeOffersModal = () => {
    setOffersModalVisible(false);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="breadcrumb">
          <a href="/">Home</a> &gt; <a href="/cart">Cart</a>
        </div>
      </section>

      <div className="product-count">
        <h2>04 Items</h2>
      </div>

      <div className="cart-container">
        {/* Product List */}
        <div className="product-list">
          {/* Product Item 1 */}
          <div className="product-container">
            <div className="product-item">
              <Image src="/assets/icons/image1.png" alt="Davidoff" width={100} height={100} />
              <div className="product-details">
                <h3>DAVIDOFF</h3>
                <p>Cool Water Eau De Toilette for Men</p>
                <p className="price">$360</p>
                <div className="pop">
                  <p className="offer" onClick={() => toggleOfferPopup(0)}>
                    1 Offers Available
                    <span className="offer-image">
                      <Image src="/assets/icons/iemo.png" alt="Offer" width={20} height={20} />
                    </span>
                  </p>
                  {offerPopup.product === 0 && (
                    <div className="offer-popup">
                      <p><strong>Offers Applied</strong></p>
                      <p>Buy 1 Get 1 Free</p>
                      <button onClick={() => toggleOfferPopup(null)}>Close</button>
                    </div>
                  )}
                </div>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(0, -1)}>-</button>
                  <span className="quantity">Qty: {quantities[0]}</span>
                  <button onClick={() => handleQuantityChange(0, 1)}>+</button>
                </div>
              </div>
              <div className="product-actions">
                <Image src="/assets/icons/delete.png" alt="Delete" width={20} height={20} />
              </div>
            </div>
          </div>
          {/* Repeat similar structure for other products */}

          {/* Product Item 2 */}
          <div className="product-container">
            <div className="product-item">
              <Image src="/assets/icons/image2.png" alt="Armani" width={100} height={100} />
              <div className="product-details">
                <h3>ARMANI</h3>
                <p>Acqua di Gio Profumo for Men</p>
                <p className="price">$400</p>
                <div className="pop">
                  <p className="offer" onClick={() => toggleOfferPopup(1)}>
                    1 Offers Available
                    <span className="offer-image">
                      <Image src="/assets/icons/iemo.png" alt="Offer" width={20} height={20} />
                    </span>
                  </p>
                  {offerPopup.product === 1 && (
                    <div className="offer-popup">
                      <p><strong>Offers Applied</strong></p>
                      <p>Buy 2 Get 1 Free</p>
                      <button onClick={() => toggleOfferPopup(null)}>Close</button>
                    </div>
                  )}
                </div>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(1, -1)}>-</button>
                  <span className="quantity">Qty: {quantities[1]}</span>
                  <button onClick={() => handleQuantityChange(1, 1)}>+</button>
                </div>
              </div>
              <div className="product-actions">
                <Image src="/assets/icons/delete.png" alt="Delete" width={20} height={20} />
              </div>
            </div>
          </div>
          {/* Repeat structure for other products */}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Details</h3>
          <div className="summary-item">
            <span>Bag total</span>
            <span>$1390</span>
          </div>
          <div className="summary-item">
            <span>Discount</span>
            <span className="discount">- $450</span>
          </div>
          <div className="pop">
            <p className="offers-applied" onClick={openOffersModal}>
              3 offers Applied <span className="info-icon">i</span>
            </p>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>$940</span>
          </div>
          <p className="congrats-message">
            Congratulations! You've Saved $450 today!
          </p>
          <button className="checkout-btn">Go to Checkout</button>
        </div>
      </div>

      {/* Modal Popup for Offers */}
      {offersModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeOffersModal}>&times;</span>
            <h4>5 Offers Applied</h4>
            <ul>
              <li><strong>Buy 1 Get 1 Free</strong></li>
              <li>Buy 3 or More & Pay Just <strong>$75 Each!</strong></li>
              <li>Special Combo: Buy Cool Water + Calvin Klein & Get <strong>$10 Off</strong> on Calvin Klein</li>
              <li>Limited Time Only: <strong>15% Off</strong> When You Buy in the Next 2 Days</li>
              <li>Gucci Deal: Buy 2 units for <strong>10% off</strong>, or 4+ units for <strong>20% off</strong>.</li>
            </ul>
            <div className="total-discount">
              <span>Total Discount</span>
              <span className="discount-amount">- $345</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

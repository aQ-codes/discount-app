"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { axiosInstance } from "@/config/axios-config";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discountMessages, setDiscountMessages] = useState([]);
  const [offerPopup, setOfferPopup] = useState({ product: null });
  const [offersModalVisible, setOffersModalVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [originalTotal, setOriginalTotal] = useState(0);
  const [productDetails, setProductDetails] = useState([]);

  let discount = (originalTotal - total).toFixed(2);

  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
      const itemsArray = Object.entries(storedCartItems).map(([id, data]) => ({
        productId: id,
        ...data,
      }));
      setCartItems(itemsArray);
    }
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const detailsArray = await Promise.all(
        cartItems.map(async (item) => {
          try {
            const response = await axiosInstance.get(`/customer/product/${item.productId}`);
            return response.data;
          } catch (error) {
            console.error(`Error fetching details for product ${item.productId}`, error);
            return null;
          }
        })
      );

      setProductDetails(detailsArray);
    };

    if (cartItems.length) {
      fetchProductDetails();
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length > 0) {
      fetchDiscountedTotal(cartItems);
    }
  }, [cartItems]);

  const fetchDiscountedTotal = async (updatedCart) => {
    const cartArray = updatedCart.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    try {
      const response = await axiosInstance.post("/customer/totalprice", { cartItems: cartArray });
      setTotal(response.data.discountedtotal);
      setDiscountMessages(response.data.discountsApplied);
      setOriginalTotal(response.data.subtotal);
    } catch (error) {
      console.log("Error fetching total:", error);
    }
  };

  const handleQuantityChange = useCallback((productId, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );

    const updatedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    updatedCartItems[productId].quantity = Math.max(
      1,
      updatedCartItems[productId].quantity + delta
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  }, []);

  // Function to remove item from cart
  const removeFromCart = (productId) => {

    const updatedCartItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCartItems);

    // Update localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    delete storedCartItems[productId];
    localStorage.setItem("cartItems", JSON.stringify(storedCartItems));

    alert("Item removed from cart!");
  };

  const toggleOfferPopup = (productId) => {
    setOfferPopup((prev) => ({
      product: prev.product === productId ? null : productId,
    }));
  };

  const openOffersModal = () => setOffersModalVisible(true);
  const closeOffersModal = () => setOffersModalVisible(false);

  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="breadcrumb">
          <Link href="/">Home</Link> &gt;
          <a href="/cart">Cart</a>
        </div>
      </section>

      <div className="product-count">
        <h2>{cartItems.length} Items</h2>
      </div>

      <div className="cart-container">
        {/* Product List */}
        <div className="product-list">
          {cartItems.map((item) => (
            <div className="product-container" key={item.productId}>
              <div className="product-item">
                <Image src={item.pic} alt="common_image" width={100} height={100} />
                <div className="product-details">
                  <h3>{item.brand}</h3>
                  <p>{item.name}</p>
                  <p className="price">${item.price}</p>
                  <div className="pop">
                    {offerPopup.product === item.productId && (
                      <div className="offer-popup">
                        <p><strong>Offers Applied</strong></p>
                        <p>Buy 1 Get 1 Free</p>
                        <button onClick={() => toggleOfferPopup(null)}>Close</button>
                      </div>
                    )}
                  </div>
                  <div className="quantity-controls">
                    <button className="qty-btn" onClick={() => handleQuantityChange(item.productId, -1)}>-</button>
                    <span className="quantity">Qty: {item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleQuantityChange(item.productId, 1)}>+</button>
                  </div>
                </div>
                <div className="product-actions">
                  <Image 
                    src="/assets/icons/delete.png" 
                    alt="Delete" 
                    width={40} 
                    height={40} 
                    className="img"
                    onClick={() => removeFromCart(item.productId)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Details</h3>
          <div className="summary-item">
            <span>Bag total</span>
            <span>${originalTotal}</span>
          </div>
          <div className="summary-item">
            <span>Discount</span>
            <span className="discount">- ${discount}</span>
          </div>
          <div className="pop">
            <p className="offers-applied" onClick={openOffersModal}>
              {discountMessages.length} offers Applied <span className="info-icon"></span>
            </p>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <p className="congrats-message">
            Congratulations! You’ve Saved {discount} today!
          </p>
          <button className="checkout-btn">Go to Checkout</button>
        </div>
      </div>

      {/* Modal Popup for Offers */}
      {offersModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeOffersModal}>
              <Image 
                src="/assets/images/img/cross.svg" 
                alt="Close Icon" 
                width={40} 
                height={40} 
              />
            </span>
            <h4>{discountMessages.length} Offers Applied</h4>
            <ul>
              {discountMessages.map((item) => (
                <li key={item.length}>{item}</li>
              ))}
            </ul>
            <div className="total-discount">
              <span>Total Discount</span>
              <span className="discount-amount">{discount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

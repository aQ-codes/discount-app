"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserAxiosInstance } from '@/config/axios-config';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await UserAxiosInstance.get('/products'); 
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="main-content-wrapper">
      <div className="explore-block">
        <div className="image-container">
          <Image src="/assets/images/img/img-2.svg" alt="Explore Image" className="full-width-image" height={100} width={80}/>
        </div>
      </div>

      <div className="collections">
        <div className="collection-right">
          <div className="our-collections">Our Collections</div>
          <div className="results-info">
            <div className="results-count">Showing {products.length} results</div>
            <div className="sort-by">
              <span>Sorted by : <b>Popularity</b>
                <Image className="mt-50" src="/assets/images/img/down-arrow.svg" alt="" height={100} width={80}/>
              </span>
            </div>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="className-card">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="text-center image-wrap">
                    <div className="image-block">
                      <Image src={product.imageUrl || "/assets/images/img/default-product.svg"} alt={product.name} className="product-image" height={100} width={80}/>
                    </div>
                    <div className="heart-wrapper">
                      <Image src="/assets/images/img/heart.svg" alt="Heart" className="heart-image" height={100} width={80}/>
                    </div>
                    {product.badge && (
                      <div className="badge-wrapper">
                        <Image src="/assets/images/img/badge.svg" alt="Badge" className="badge-image" height={100} width={80}/>
                      </div>
                    )}
                  </div>

                  <div className="details-block">
                    <div className="head-1">{product.brand}</div>
                    <p className="sub-head-1">{product.name}</p>
                    <p className="price">${product.price}</p>
                    <button className="buy-button">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;

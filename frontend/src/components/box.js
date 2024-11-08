import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

const Box = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign up and get 20% off on your first order." />
      </Head>
      <div className="box">
        <div className="col-4"></div>
          <div className="col-4 sign-text">
            Sign up and get 20% off on your first order.
            <a href="/register">Sign Up Now</a>
          </div>
          <div className="col-4">
            <Image 
              src="/assets/images/img/cross.svg" 
              alt="Close Icon" 
              width={20} 
              height={20} 
              />
          </div>
        </div>
    </>
  );
}

export default Box;

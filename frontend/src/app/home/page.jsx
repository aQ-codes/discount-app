import Box from '@/components/box'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ProductsListing from '@/components/products/products-listing'
import React from 'react'

const page = () => {
  return (
    <div>
        <Box/>
        <Navbar/>
        <ProductsListing/>
        <Footer/>
    </div>

  )
}

export default page
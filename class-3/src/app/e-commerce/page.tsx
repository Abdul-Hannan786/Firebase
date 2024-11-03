import React from 'react'
import Products from '../components/Products'
import Cart from '../components/Cart'

const Ecommerce = () => {
  return (
    <div className='p-10'>
        <h1 className='text-4xl font-bold text-center'>Hello E-Commerce</h1>
        <Products />
        <Cart />
    </div>
  )
}

export default Ecommerce
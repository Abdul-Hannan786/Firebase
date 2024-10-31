import { useProductStore } from '@/store/product-store'
import React from 'react'

const Cart = () => {
    const {cart} = useProductStore()
  return (
    <div>
    <table>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total Price</th>
      </tr>
      {Object.keys(cart).map((key) => (
          <tr key={key}>
            <td>{cart[key].title}</td>
            <td>{cart[key].price}</td>
            <td>{cart[key].qty}</td>
            <td>{cart[key].price * cart[key].qty}</td>
          </tr>
        ))}
      <tr>
          <th></th>
          <th></th>
          <th></th>
          {/* <th>{grandTotalPrice}</th> */}
        </tr>
      </table>
    </div>
  )
}

export default Cart
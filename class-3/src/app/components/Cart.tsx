"use client";

import { useProductStore } from "@/store/product-store";

const Cart = () => {
  const cart = useProductStore(store => store.cart);

  const values = Object.values(cart)
  const grandTotalPrice = values.reduce((prevPrice, {qty, price}) => qty * price + prevPrice, 0)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="border-black border-2 p-2 text-center">S.No</th>
            <th className="border-black border-2 p-2 text-center">Name</th>
            <th className="border-black border-2 p-2 text-center">Price</th>
            <th className="border-black border-2 p-2 text-center">Quantity</th>
            <th className="border-black border-2 p-2 text-center">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cart).map((key, index) => (
            <tr key={key}>
              <th className="border-black border-2 p-2 text-center">{index + 1}</th>
              <td className="border-black border-2 p-2 text-center">{cart[key].title}</td>
              <td className="border-black border-2 p-2 text-center">{cart[key].price}</td>
              <td className="border-black border-2 p-2 text-center">{cart[key].qty}</td>
              <td className="border-black border-2 p-2 text-center">{cart[key].price * cart[key].qty}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th className="border-black border-2 p-2 text-center">Grand Total: {grandTotalPrice}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Cart;

import { createFileRoute, Link } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ContainerLayout from '../layouts/ContainerLayout'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'

export const Route = createFileRoute('/cart')({
  component: Cart,
})

function Cart() {
  const { products, currency, cartItems, updateQuantity, getCartAmount, delivery_fee } = useContext(ShopContext)!;
  const [cartData, setCartData] = useState<any[]>([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="animate-fade-in border-t pt-10 sm:pt-14 pb-24">
      <ContainerLayout>
        <div className="text-2xl mb-8">
          <Title text1="YOUR" text2="CART" />
        </div>

        <div>
          {cartData.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <img src={assets.cart_icon} alt="Empty Cart" className="w-10 opacity-30" />
              </div>
              <p className="text-gray-500 text-lg mb-6 font-medium">Your cart is currently empty.</p>
              <Link to="/" className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1">
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartData.map((item, index) => {
                const productData = products.find((product) => product.id === item._id);
                if (!productData) return null;

                return (
                  <div
                    key={index}
                    className="p-4 sm:p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
                  >
                    {/* Product Image & Info */}
                    <div className="flex items-start gap-4 flex-1 w-full">
                      <Link to={`/product/$productid`} params={{ productid: productData.id }} className="shrink-0 cursor-pointer overflow-hidden rounded-xl">
                        <img className="w-24 sm:w-28 h-24 sm:h-28 object-cover hover:scale-105 transition-transform duration-500" src={productData.image[0]} alt={productData.name} />
                      </Link>

                      <div className="flex flex-col gap-1 sm:gap-2 justify-center h-full pt-1">
                        <Link to={`/product/$productid`} params={{ productid: productData.id }} className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 hover:text-black transition-colors">
                          <p>{productData.name}</p>
                        </Link>
                        <div className="flex items-center gap-3 mt-1 sm:mt-0">
                          <p className="font-extrabold text-lg text-gray-900">{currency}{productData.price}</p>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold uppercase tracking-wider rounded-md border border-gray-200">Size: {item.size}</span>
                        </div>
                      </div>
                    </div>

                    {/* Controls Row (Mobile friendly) */}
                    <div className="flex items-center justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-gray-100">

                      {/* Quantity Selector */}
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 shadow-sm">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-600 hover:text-black transition-all active:scale-95 cursor-pointer"
                        >
                          <FiMinus size={16} />
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-600 hover:text-black transition-all active:scale-95 cursor-pointer"
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="p-2 sm:ml-6 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartData.length > 0 && (
          <div className="flex flex-col lg:flex-row justify-end mt-12 sm:mt-20">
            <div className="w-full lg:w-[450px]">
              <div className="text-2xl mb-6">
                <Title text1="CART" text2="TOTALS" />
              </div>

              <div className="flex flex-col gap-4 text-sm text-gray-600 border border-gray-100 p-6 sm:p-8 bg-white shadow-sm rounded-2xl">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-500">Subtotal</p>
                  <p className="font-bold text-gray-800 text-base">{currency}{getCartAmount()}.00</p>
                </div>
                <div className="w-full h-px bg-gray-100" />
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-500">Shipping Fee</p>
                  <p className="font-bold text-gray-800 text-base">{currency}{delivery_fee}.00</p>
                </div>
                <div className="w-full h-px bg-gray-100" />
                <div className="flex justify-between items-center pt-2">
                  <b className="text-lg text-gray-800">Total</b>
                  <b className="text-xl text-gray-900">{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
                </div>
              </div>

              <div className="w-full mt-6 sm:mt-8">
                <Link to="/place-order" className="w-full block text-center bg-black text-white text-xs sm:text-sm px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl uppercase font-bold tracking-widest active:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </ContainerLayout>
    </div>
  )
}

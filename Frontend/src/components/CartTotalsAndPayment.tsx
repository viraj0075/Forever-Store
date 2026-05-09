import React, { useContext } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';

interface CartTotalsAndPaymentProps {
  method: string;
  setMethod: (method: string) => void;
}

export default function CartTotalsAndPayment({ method, setMethod }: CartTotalsAndPaymentProps) {
  const { getCartAmount, delivery_fee, currency } = useContext(ShopContext)!;

  return (
    <div className="mt-8 flex-1">
      <div className="text-xl sm:text-2xl mb-6">
        <Title text1="CART" text2="TOTALS" />
      </div>
      
      <div className="flex flex-col gap-4 text-sm text-gray-600 border border-gray-100 p-6 sm:p-8 bg-gray-50/50 shadow-sm rounded-2xl">
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-500">Subtotal</p>
          <p className="font-bold text-gray-800 text-base">{currency}{getCartAmount()}.00</p>
        </div>
        <div className="w-full h-px bg-gray-200" />
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-500">Shipping Fee</p>
          <p className="font-bold text-gray-800 text-base">{currency}{delivery_fee}.00</p>
        </div>
        <div className="w-full h-px bg-gray-200" />
        <div className="flex justify-between items-center pt-2">
          <b className="text-lg text-gray-800">Total</b>
          <b className="text-xl text-gray-900">{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
        </div>
      </div>

      <div className="mt-12">
        <Title text1={'PAYMENT'} text2={'METHOD'} />
        {/* Payment Methods Selection */}
        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          <div onClick={() => setMethod('stripe')} className={`flex items-center gap-3 border p-4 px-6 cursor-pointer rounded-xl transition-all shadow-sm hover:shadow-md ${method === 'stripe' ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-200 bg-white'}`}>
            <p className={`min-w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-black border-black' : 'border-gray-300'}`}></p>
            <img className="h-6 mx-4 object-contain" src={assets.stripe_logo} alt="Stripe" />
          </div>
          <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-3 border p-4 px-6 cursor-pointer rounded-xl transition-all shadow-sm hover:shadow-md ${method === 'razorpay' ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-200 bg-white'}`}>
            <p className={`min-w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-black border-black' : 'border-gray-300'}`}></p>
            <img className="h-6 mx-4 object-contain" src={assets.razorpay_logo} alt="Razorpay" />
          </div>
          <div onClick={() => setMethod('cod')} className={`flex items-center gap-3 border p-4 px-6 cursor-pointer rounded-xl transition-all shadow-sm hover:shadow-md ${method === 'cod' ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-200 bg-white'}`}>
            <p className={`min-w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-black border-black' : 'border-gray-300'}`}></p>
            <p className="text-gray-600 text-sm font-bold tracking-wide uppercase mx-4">Cash on delivery</p>
          </div>
        </div>

        <div className="w-full text-end mt-12">
          <button type="submit" className="w-full lg:w-auto bg-black text-white text-sm px-10 py-5 rounded-2xl uppercase font-bold tracking-widest active:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

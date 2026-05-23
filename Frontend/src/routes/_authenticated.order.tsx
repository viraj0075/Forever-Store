import { createFileRoute, Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import ContainerLayout from '../layouts/ContainerLayout'
import Title from '../components/Title'

export const Route = createFileRoute('/_authenticated/order')({
  component: Order,
})

function Order() {
  const { orders, currency } = useContext(ShopContext)!;

  return (
    <div className="animate-fade-in border-t pt-10 sm:pt-14 pb-24">
      <ContainerLayout>
        <div className="text-2xl mb-8">
          <Title text1="MY" text2="ORDERS" />
        </div>

        <div>
          {orders.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg mb-6 font-medium">You have no active orders.</p>
              <Link to="/" className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1">
                START SHOPPING
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map((orderGroup, groupIndex) => (
                <div key={groupIndex} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-4">
                  {/* Order Header */}
                  <div className="bg-gray-50 border-b border-gray-100 p-4 sm:px-6 flex flex-col sm:flex-row justify-between gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Order ID</p>
                      <p className="font-bold text-gray-800 uppercase">#{orderGroup.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Date Placed</p>
                      <p className="font-bold text-gray-800">{orderGroup.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Total Amount</p>
                      <p className="font-bold text-gray-800">{currency}{orderGroup.amount}.00</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:p-6 flex flex-col gap-6">
                    {orderGroup.items.map((item: any, index: number) => (
                      <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="flex items-start gap-4 flex-1">
                          <img className="w-20 sm:w-24 h-20 sm:h-24 object-cover rounded-xl border border-gray-100 shadow-sm" src={item.image[0]} alt={item.name} />
                          <div className="flex flex-col justify-center h-full pt-1">
                            <p className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">{item.name}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                              <p className="font-extrabold text-gray-900">{currency}{item.price}</p>
                              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                              <p>Quantity: <span className="font-bold text-black">{item.quantity}</span></p>
                              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                              <p>Size: <span className="font-bold text-black">{item.size}</span></p>
                            </div>
                            <p className="mt-2 text-xs sm:text-sm text-gray-500">Payment: <span className="font-medium uppercase text-gray-700">{item.paymentMethod}</span></p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse"></span>
                            <p className="text-sm md:text-base font-semibold text-gray-700">{item.status}</p>
                          </div>
                          <button className="border border-gray-300 px-4 sm:px-6 py-2 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm cursor-pointer active:scale-95">
                            Track Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ContainerLayout>
    </div>
  )
}

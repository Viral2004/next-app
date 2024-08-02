"use client"
import React, { useState, useEffect } from 'react'
import OrderSummary from '@/components/OrderSummary'
import { fetchStoreItemData } from '@/action/signUpAction'
import { useSession } from 'next-auth/react'

const Cart = () => {
  const { data: session } = useSession()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (session) {
      getData()
    }
  }, [session])

  const getData = async () => {
    let res = await fetchStoreItemData(session.user.email)
    setItems(res)
  }

  const handleBack = () => {
    window.history.back()
  }

  return (
    <>
      <div className="cart w-full h-screen bg-slate-300 overflow-auto flex flex-col">
        <div className="Heading text-3xl font-bold text-center w-full my-7 relative">
          <div className="back absolute left-4 top-1/2 transform -translate-y-1/2">
            <button onClick={handleBack} className="bg-blue-500 text-xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5h-12m0 0L5 1m-4 4L5 9" />
              </svg>
            </button>
          </div>
          <h1>Your Cart</h1>
        </div>

        <div className="card flex flex-col md:flex-row md:items-start w-full flex-1 px-4 md:px-8 py-4 md:py-6 gap-4 md:gap-6 overflow-auto">
          <div className="items flex flex-col gap-3 flex-1">
            {items.length === 0 && <p className="text-center text-lg">Not ordered yet</p>}
            {items && items.map((item) => (
              <div key={item._id} className='flex flex-col md:flex-row bg-white shadow-md rounded-xl p-4 items-center justify-between md:justify-start text-xl'>
                <img className='w-24 h-24 md:w-32 md:h-32 object-cover rounded-md' src="/khamn.jpg" alt="" />
                <div className='flex-1 text-center md:text-left md:ml-4'>
                  <h2 className='font-bold'>{item.name}</h2>
                  <p>{item.amount}₹</p>
                </div>
                {/* <p className='hidden md:block'>Quantity: 1</p> */}
              </div>
            ))}
          </div>

          <div className="ordersummary flex-shrink-0 md:sticky md:top-4 w-full md:w-80">
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

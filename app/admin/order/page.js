'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { storeItem } from '@/action/signUpAction'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Order = () => {
  const { data: session } = useSession()

  const handleAdd = (itemName, itemAmount) => {
    storeItem({ name: itemName, amount: itemAmount, email: session.user.email })
    toast('👍Your cart added!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="order w-full overflow-auto pb-3 bg-slate-300 h-screen">
        <div className="card vochar bg-blue-900 w-full flex flex-col sm:flex-row justify-between items-center text-white p-3">
          <div className="vochar p-4 sm:p-9 flex flex-col gap-4">
            <h3 className='font-bold text-lg sm:text-2xl w-full'>India's Fastest Food Delivery In Minutes</h3>
          </div>
          <div className="img">
            <img className='w-20 sm:w-28 rounded-full' src="/delivery.jpg" alt="Delivery" />
          </div>
        </div>
        <div className="info">
          <h2 className='text-2xl sm:text-3xl font-bold text-center my-6'>Browse Popular Categories</h2>
        </div>
        <div className="cards px-4">
          <div className='flex flex-wrap gap-5 justify-center'>
            <div className="max-w-xs sm:max-w-sm shadow-2xl rounded-2xl dark:bg-gray-800 dark:border-gray-700">
              <Link href="#">
                <img className='w-full object-cover rounded-t-2xl' src="/khamn.jpg" alt="Khaman Dhokla" />
              </Link>
              <div className="p-5">
                <Link href="#">
                  <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Khaman Dhokla</h5>
                </Link>
                <Link href="#">
                  <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">50₹</h5>
                </Link>
                <div className='flex gap-3 justify-center items-center'>
                  <Link onClick={() => handleAdd("khaman", "50")} href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add to cart
                  </Link>
                </div>
              </div>
            </div>
            <div className="max-w-xs sm:max-w-sm shadow-2xl rounded-2xl dark:bg-gray-800 dark:border-gray-700">
              <Link href="#">
                <img className='w-full object-cover rounded-t-2xl' src="/khamn.jpg" alt="Pizza" />
              </Link>
              <div className="p-5">
                <Link href="#">
                  <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pizza</h5>
                </Link>
                <Link href="#">
                  <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">100₹</h5>
                </Link>
                <div className='flex gap-3 justify-center items-center'>
                  <Link onClick={() => handleAdd("pizza", "100")} href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add to cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link href={'/admin/cart'} className="fixed bottom-7 right-5 sm:right-10 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Go to cart
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>
    </>
  )
}

export default Order

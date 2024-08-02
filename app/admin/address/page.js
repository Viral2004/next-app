"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { storeAddress } from '@/action/signUpAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Address = () => {
    const { data: session } = useSession()
    const [data, setData] = useState({})

    useEffect(() => {
        if (session && session.user) {
            setData({ ...data, email: session.user.email })
        }
    }, [session])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleBack = () => {
        window.history.back()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        storeAddress(data)
        toast('Address added👌', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "custom-toast",
        });
        console.log(data)
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={false}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='h-screen overflow-auto flex bg-slate-300 w-full'>

            <div className="btn absolute top-7 left-1/4 sm:left-1/3 lg:left-1/4 ">
                <button onClick={handleBack} className="bg-blue-500 text-xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0L5 1M1 5l4 4" />
                    </svg>
                </button>
            </div>
            <div className="form w-full sm:w-3/4 lg:w-1/2 mx-auto p-4 sm:p-8 flex flex-col justify-center">
                <div className="info mb-8">
                    <h2 className="text-center text-2xl font-bold">
                        Add your address here
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <input onChange={handleChange} value={data.name || ''}
                            name="name"
                            type="text"
                            placeholder="Enter Your Name"
                            className="w-full px-3 py-2 border rounded-lg"
                            />
                    </div>
                    <div>
                        <input
                            onChange={handleChange}
                            value={data.roomno || ''}
                            name="roomno"
                            type="text"
                            placeholder="Enter your flat no/street name"
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <input
                            onChange={handleChange}
                            value={data.address || ''}
                            name="address"
                            type="text"
                            placeholder="Enter your village name"
                            className="w-full px-3 py-2 border rounded-lg"
                            />
                    </div>
                    <div>
                        <select
                            onChange={handleChange}
                            value={data.city || ''}
                            name="city"
                            className="w-full px-3 py-2 border rounded-lg"
                            >
                            <option value="">Select City</option>
                            <option value="Surat">Surat</option>
                            <option value="Baroda">Baroda</option>
                            <option value="Ahemdabad">Ahemdabad</option>
                            <option value="Bardoli">Bardoli</option>
                            <option value="Vyara">Vyara</option>
                        </select>
                    </div>
                    <div>
                        <select
                            onChange={handleChange}
                            value={data.country || ''}
                            name="country"
                            className="w-full px-3 py-2 border rounded-lg"
                            >
                            <option value="">Select Country</option>
                            <option value="India">India</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                            Add
                        </button>
                    </div>
                </form>
            </div>
                            </div>
        </>
    )
}

export default Address

'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchAllData, updateProfile } from '@/action/signUpAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Update = () => {
    const [file, setFile] = useState()
    const [data, setData] = useState({})
    const { data: session, update } = useSession()
    const router = useRouter()

    const handleUploadFile = async (e) => {
        e.preventDefault()
        if (!file) {
            alert('Please Choose file')
            return
        }
        const formData = new FormData()
        if (session) {
            formData.append('file', file)
            formData.append('email', session.user.email)
        }
        try {
            const response = await fetch('/api/uplode_img', {
                method: 'POST',
                body: formData,
            })
            const data = await response.json()
            toast('File Updated👌', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: "custom-toast",
            })
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    useEffect(() => {
        if (session) {
            getdata()
        }
    }, [router, session])

    const handleBack = () => {
        window.history.back()
    }

    const getdata = async () => {
        let allData = await fetchAllData(session.user.email)
        setData(allData)
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmite = async (e) => {
        update()
        let a = await updateProfile(e, session.user.email)
        toast('Profile Updated👌', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            progressClassName: 'custom-progress-bar',
            theme: "light",
        })
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
            <div className='flex w-full bg-slate-300 min-h-screen'>
                <div className="btn absolute top-7 left-1/4 sm:left-1/3 lg:left-1/4">
                    <button onClick={handleBack} className="bg-blue-500 text-xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1M1 5L5 1M1 5l4 4" />
                        </svg>
                    </button>
                </div>
                <div className="form w-full sm:w-3/4 lg:w-1/2 mx-auto p-4 sm:p-8 flex flex-col justify-center">
                    <div className="info mb-8">
                        <h2 className="text-center text-2xl font-bold">
                            Update Your Profile - Take the Best Experience Here
                        </h2>
                    </div>
                    <form action={handleSubmite} className='flex flex-col gap-5'>
                        <div>
                            <input
                                onChange={handleChange}
                                value={data.name || ''}
                                name="name"
                                type="text"
                                placeholder="Update Name"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                value={data.email || ''}
                                name="email"
                                type="email"
                                placeholder="Enter Email"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                value={data.username || ''}
                                name="username"
                                type="text"
                                placeholder="Update Username"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                value={data.password || ''}
                                name="password"
                                type="password"
                                placeholder="Update Password"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                    <form onSubmit={handleUploadFile} className='flex flex-col sm:flex-row justify-between items-center my-6 gap-4'>
                        <input
                            className="block w-full sm:w-1/2 text-lg text-black border border-white rounded-lg cursor-pointer bg-white dark:text-gray-700 focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-blue-700"
                            id="large_size"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <button type='submit' className='bg-blue-500 w-full sm:w-auto text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Update

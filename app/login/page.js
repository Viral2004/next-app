"use client"

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React, { useState ,useEffect} from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const Page = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [Login, setLogin] = useState({})
  useEffect(() => {
    if(session){
        router.push('/admin/dashboard')
    }
  }, [session,router])
  

  const handleChange = (e) => {
    setLogin({ ...Login, [e.target.name]: e.target.value })
 
  }

  const handleSubmit = async (event) => {
    // event.preventDefault()
   //now sign session work
   await signIn('credentials', { email: Login.email, password: Login.password })
  }

  return (
    <>
      <div className="h-screen bg-slate-100">
        <Navbar />

        <div className="signup w-full mx-auto">
          <div className="w-1/2 mx-auto p-8 flex flex-col">
            <div className="info mb-8">
              <h2 className="text-center text-2xl font-bold">
                Login - Take the Best Experience Here
              </h2>
            </div>

            <div className="form">
              <form action={handleSubmit} className="flex flex-col gap-5">
                <div className="">
                  <input
                    value={Login.email ? Login.email : ''}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Enter email/username"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="">
                  <input
                    value={Login.password ? Login.password : ''}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Page

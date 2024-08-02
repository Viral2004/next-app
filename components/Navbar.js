"use client"
import React from 'react'
import Link from 'next/link'

import { useSession, signIn, signOut } from 'next-auth/react'


const Navbar = () => {
    const { data: session } = useSession()
    return (
        <>
            <nav className='bg-slate-800 flex items-center justify-between px-5 py-2 text-white'>
                <div className="  logo flex justify-start gap-3 items-center">
                    <Link href={'/'}><img className='w-14 rounded-full' src="./delivery.jpg" alt="" /></Link>
                    <Link href={'/'}><h1 className='text-xl font-bold'>Jay Parmatma</h1></Link>
                </div>

            <div className="buttons flex gap-3">

            {!session && 
                <div className="login flex flex-col ">


                    <Link href={'/login'}><button type="button" className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">Log in</button></Link>
                </div>
                }

               {!session && 
               <div className="singup flex flex-col ">


                    <Link href={'/singup'} ><button type="button" className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-md text-sm px-5 py-2.5 text-center  dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">Sign Up</button></Link>
                </div>
                }
                
               {session && 
                <div className="singout flex flex-col ">


                    <Link href={'/'} ><button onClick={()=>signOut()}  type="button" className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-md text-sm px-5 py-2.5 text-center  dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">Log out</button></Link>
                </div>
                }
            </div>





            </nav>



        </>
    )
}

export default Navbar

"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'


const Sidebar = () => {
    const pathname = usePathname();
    const [animate, setAnimate] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(true)

    const handleClick = () => {
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
        }, 1000)
    }
    const handleOpenSidebar = () => {
        setOpenSidebar(!openSidebar)
    }
   
    useEffect(() => {
        // Function to handle window resize
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setOpenSidebar(false); // Set openSidebar to false when screen is less than lg
            } else {
                setOpenSidebar(true); // Set openSidebar to true when screen is lg or larger
            }
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div>
            <div className={`Sidebar py-2 md:py-0    ${openSidebar ? 'w-72' : 'w-full md:w-16'}  transition-all duration-300 text-white inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] h-20 md:h-full md:min-h-screen`}>
                <div >
                    <button className="hidden lg:block text-2xl relative top-3 left-5" onClick={handleOpenSidebar}>
                        ☰
                    </button>
                    {openSidebar && <div className="py-11 px-3 logo flex justify-start gap-3 items-center">
                        <Link href={'/'} >
                            <img className='w-16 rounded-full' src="/delivery.jpg" alt="Logo" />
                        </Link>
                        <Link href={'/'}>
                            <h1 className='text-xl font-bold'>Jay Parmatma</h1>
                        </Link>
                    </div>}
                    {/* <div className={`searchBtn flex justify-center ${openSidebar ? 'px-4' : 'px-2 my-12'} `}>
                        <img className={`${openSidebar ? 'rounded-l-md w-10' : 'rounded-md  '}  bg-slate-700 `} src="/search.gif" alt="Search Icon" />
                        {openSidebar && <input type="text" placeholder='Search' className='w-full h-10 rounded-r-md bg-slate-700 text-white px-3' />}
                    </div> */}
                    <div className="listItems">
                        {animate && <div className="red-line"></div>}
                        <ul className={`flex flex-row justify-evenly  items-center md:items-stretch md:justify-start  gap-0 md:flex-col md:gap-2 ${openSidebar ? 'px-4 py-6' : 'px-2  py-0 md:py-36'} `}>
                            <Link href={'/admin/dashboard'} onClick={handleClick}><li className={`flex ${openSidebar?'gap-5':'flex-col gap-2 py-2'}  items-center justify-start p-3 cursor-pointer rounded-md 
                               active: ${pathname === '/admin/dashboard'|| pathname === '/admin/update' ? 'bg-slate-800  hover:bg-slate-700' : 'hover:bg-slate-700'}`}>
                                <img className='w-8 rounded-full' src="/dashboard.gif" alt="Dashboard Icon" />
                                {openSidebar && <p className='text-md'>Dashboard</p>}
                               {!openSidebar && <div className={`active: ${pathname === '/admin/dashboard' ? 'bg-white h-1 w-5 rounded-full' : ''}`}></div>}
                            </li></Link>
                            <Link href={'/admin/order'} onClick={handleClick}><li className={`flex ${openSidebar?'gap-5':'flex-col gap-2 py-2'} items-center justify-start p-3 cursor-pointer rounded-md 
                               active: ${pathname === '/admin/order' ? 'bg-slate-800 hover:bg-slate-700' : 'hover:bg-slate-700'} active: ${pathname === '/admin/cart' ? 'bg-slate-800 hover:bg-slate-700' : 'hover:bg-slate-700'}`}>
                                <img className='w-8 rounded-full' src="/orders.gif" alt="Orders Icon" />
                                {openSidebar && <p className='text-md'>Orders</p>}
                                {!openSidebar && <div className={`active: ${pathname === '/admin/order' ? 'bg-white h-1 w-5 rounded-full' : ''} `}></div>}
                            </li></Link>
                            <Link href={'/admin/chat'} onClick={handleClick}><li className={`flex ${openSidebar?'gap-5':'flex-col gap-2 py-2'} items-center justify-start p-3 cursor-pointer rounded-md 
                               active: ${pathname === '/admin/chat' ? 'bg-slate-800 hover:bg-slate-700' : 'hover:bg-slate-700'}`}>
                                <img className='invert w-8' src="/chat.gif" alt="Chat Icon" />
                                {openSidebar && <p className='text-md'>Chat</p>}
                                {!openSidebar && <div className={`active: ${pathname === '/admin/chat' ? 'bg-white h-1 w-5 rounded-full' : ''}`}></div>}
                            </li></Link>
                                   <Link href={'/admin/settings'} onClick={handleClick}><li className={`flex ${openSidebar?'gap-5':'flex-col gap-2 py-2'} items-center justify-start p-3 cursor-pointer rounded-md 
                                      active: ${pathname === '/admin/settings' ? 'bg-slate-800 hover:bg-slate-700' : 'hover:bg-slate-700'}`}>
                                       <img className='w-8 rounded-full invert' src="/Settings.gif" alt="Delivery Boy Icon" />
                                       {openSidebar && <p className='text-md'>Setting</p>}
                                       {!openSidebar && <div className={`active: ${pathname === '/admin/deliveryboy' ? 'bg-white h-1 w-5 rounded-full' : ''}`}></div>}
                                   </li></Link>
                        </ul>
                    </div>
                    {openSidebar && <div className="logout flex flex-col px-4">
                        <button type="button" onClick={() => signOut()} className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">Log out</button>
                    </div>}
                </div>
                {openSidebar && <div className='relative bottom-0 text-white flex justify-center px-4'>
                    <p className='text-center'>Copyright &copy; Jay Parmatma - All rights reserved!</p>
                </div>}
            </div>
        </div>
    )
}

export default Sidebar

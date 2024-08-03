"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchAllData } from '@/action/signUpAction'

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [showProfile, setshowProfile] = useState(true)
  const [showOrder, setShowOrder] = useState(false)
  const [showPayment, setshowPayment] = useState(false)
  const [data, setData] = useState({})
  const [profilePic, setProfilePic] = useState(null)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    if(session){
      getdata()
      fetchProfilePhoto()
    }
    if(!session){
      router.push('/login')
    }
  }, [router, session])

  const handleProfileChange = () => {
    setshowProfile(true)
    setShowOrder(false)
    setshowPayment(false)
  }

  const handleOrderChange = () => {
    setshowProfile(false)
    setShowOrder(true)
    setshowPayment(false)
  }

  const handlePaymentChange = () => {
    setshowPayment(true)
    setshowProfile(false)
    setShowOrder(false)
  }

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange); // Safari
    document.addEventListener('msfullscreenchange', handleFullScreenChange); // IE11

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('msfullscreenchange', handleFullScreenChange);
    };
  }, []);

  const getdata = async() => {
    let allData =  await fetchAllData(session.user.email);
    setData(allData);
  }

  const fetchProfilePhoto = async() => {
    try {
      const response = await fetch(`/api/getImg?timestamp=${new Date().getTime()}`, {
        headers: {},
      });
      const blob = await response.blob();

      if (blob.type.startsWith('image/') && blob.size > 0) {
        const url = URL.createObjectURL(blob);
        setProfilePic(url);
      } else {
        setProfilePic(null);
      }
    } catch(error) {
      setProfilePic(null)
    }
  }

  const handleClickImg = () => {
    if(!isFullScreen) {
      let imgClick =  document.getElementById("ProfilePic");
      if (imgClick.requestFullscreen) {
        imgClick.requestFullscreen();
      } else if (imgClick.webkitRequestFullscreen) { // Safari
        imgClick.webkitRequestFullscreen();
      } else if (imgClick.msRequestFullscreen) { // IE11
        imgClick.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE11
          document.msExitFullscreen();
        }
        setIsFullScreen(false);
      }
    }
  }

  return (
    <>
      <div className='wrapper w-full'>
        <div className="dashboard px-4 w-full bg-slate-300 h-screen overflow-auto">
          <div className="hello flex justify-between items-center py-3">
            <h2 className='text-2xl font-bold'>Hello {data.name}</h2>
            <div className="profile">
              <img onClick={handleClickImg} className='h-20 w-20 cursor-pointer rounded-full' src={profilePic || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`} alt="ProfilePic" id='ProfilePic' />
            </div>
          </div>
          <div className="card vochar bg-blue-900 w-full my-7 flex flex-col sm:flex-row justify-between items-center text-white p-3 pr-8 rounded-xl">
            <div className="vochar flex-1 p-4 flex flex-col gap-4">
              <h3 className='font-bold text-xl sm:text-2xl'>Get Discount Voucher Up To 20%</h3>
              <p className='text-sm sm:text-base'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati itaque ipsam dolore facere sunt necessitatibus quas eius eum, iusto.</p>
            </div>
            <div className="img w-full flex justify-center sm:w-auto">
              <img className='w-[65%] sm:w-3/4 rounded-full' src="/piza.gif" alt="Pizza" />
            </div>
          </div>

          <div className="cards flex justify-start flex-col sm:flex-row gap-3 sm:gap-0 w-full sm:justify-evenly overflow-auto">
            <div className="cursor-pointer w-full sm:w-1/4 xl:w-1/6 p-1 px-2 md:p-2 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-800">
              <div onClick={handleProfileChange}>
                <h5 className="text-center text-xl tracking-tight text-gray-900 dark:text-white">Your Profile</h5>
              </div>
            </div>

            <div className="cursor-pointer w-full sm:w-1/4 xl:w-1/6 p-1 px-2 md:p-2 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div onClick={handleOrderChange}>
                <h5 className="text-center text-xl tracking-tight text-gray-900 dark:text-white">Your Orders</h5>
              </div>
            </div>
            <div className="cursor-pointer w-full sm:w-1/4 xl:w-1/6 p-1 px-2 md:p-2 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div onClick={handlePaymentChange}>
                <h5 className="text-center text-xl tracking-tight text-gray-900 dark:text-white">Your Payments</h5>
              </div>
            </div>
          </div>

          {showProfile &&
            <div className="flex flex-col items-center my-10">
              <div className="relative px-4 flex flex-col items-center rounded-[20px] w-full sm:w-3/4 mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500">
                <div className="mt-2 mb-8 w-full">
                  <h4 className="px-2 text-xl font-bold text-black">Your Profile</h4>
                  <p className="mt-2 px-2 text-base text-gray-600">Hi {data.name}, would you like to update your profile?</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 w-full">
                  <p className="text-base font-medium text-gray-600">Name: <span className="font-bold">{data.name}</span></p>
                  <p className="text-base font-medium text-gray-600">Email: <span className="font-bold">{data.email}</span></p>
                  <p className="text-base font-medium text-gray-600">Phone: <span className="font-bold">{data.phone}</span></p>
                  <p className="text-base font-medium text-gray-600">Address: <span className="font-bold">{data.address}</span></p>
                </div>
                <button className="mt-4 mb-4 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700" onClick={() => router.push('/profile/edit')}>Edit Profile</button>
              </div>
            </div>
          }
          {showOrder &&
            <div className="flex flex-col items-center my-10">
              <div className="relative px-4 flex flex-col items-center rounded-[20px] w-full sm:w-3/4 mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500">
                <div className="mt-2 mb-8 w-full">
                  <h4 className="px-2 text-xl font-bold text-black">Your Orders</h4>
                  <p className="mt-2 px-2 text-base text-gray-600">Hi {data.name}, here are your recent orders.</p>
                </div>
                {/* Replace with actual order details */}
                <div className="w-full px-2">
                  <p className="text-base text-gray-600">Order details will go here.</p>
                </div>
              </div>
            </div>
          }
          {showPayment &&
            <div className="flex flex-col items-center my-10">
              <div className="relative px-4 flex flex-col items-center rounded-[20px] w-full sm:w-3/4 mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500">
                <div className="mt-2 mb-8 w-full">
                  <h4 className="px-2 text-xl font-bold text-black">Your Payments</h4>
                  <p className="mt-2 px-2 text-base text-gray-600">Hi {data.name}, here are your recent payments.</p>
                </div>
                {/* Replace with actual payment details */}
                <div className="w-full px-2">
                  <p className="text-base text-gray-600">Payment details will go here.</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Dashboard;

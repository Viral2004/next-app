"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import PaymentsDetails from '@/components/PaymentsDetails'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchAllData } from '@/action/signUpAction'
import { storePhoto } from '@/action/signUpAction'





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
   
  }, [router,session])
  

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
  // getdata from the fetchAllData
  const getdata = async() => {
    
    let allData =  await fetchAllData(session.user.email);
    setData(allData);
   
  }
 
  const fetchProfilePhoto = async() => {
    try{

      const response = await fetch('/api/getImg', {
        headers: {
          
          method: 'GET',
        },});
      const blob = await response.blob();

      if (blob.type.startsWith('image/') && blob.size > 0) {
        const url = URL.createObjectURL(blob);
        setProfilePic(url);
      } else {
        // Blob is not a valid image or it's empty, set profilePic to null
        setProfilePic(null);
      }
    }catch(error){
      setProfilePic(null)
    }

     

    
  }
  const handlClickImg = () => {
    
    if(!isFullScreen){
      let imgClick =  document.getElementById("ProfilePic");
      if (imgClick.requestFullscreen) {
        imgClick.requestFullscreen();
      } else if (imgClick.webkitRequestFullscreen) { /* Safari */
        imgClick.webkitRequestFullscreen();
      } else if (imgClick.msRequestFullscreen) { /* IE11 */
        imgClick.msRequestFullscreen();
      }
      setIsFullScreen(true);
    }
    else{
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
      <div className="dashboard px-4 w-full  bg-slate-300  h-screen overflow-auto">

        <div className="hello flex justify-between items-center py-3">
          <h2 className='text-2xl  font-bold'>Hello {data.name}</h2>
          <div className="profile "><img onClick={handlClickImg} className='h-20 w-20 cursor-pointer rounded-full' src={profilePic || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png` } alt="ProfilePic" id='ProfilePic' /></div>
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

          <div className=" cursor-pointer w-full sm:w-1/4 xl:w-1/6 p-1 px-2 md:p-2 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-800">
            <div onClick={handleProfileChange}>
              <h5 className="text-center text-xl  tracking-tight text-gray-900 dark:text-white">Your Profile</h5>
            </div>

          </div>

          <div className="cursor-pointer w-full sm:w-1/4 xl:w-1/6 p-1 px-2 md:p-2 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div onClick={handleOrderChange}>
              <h5 className="text-center text-xl  tracking-tight text-gray-900 dark:text-white">Your Orders</h5>
            </div>

          </div>
          <div className=" cursor-pointer w-full sm:w-1/4 xl:w-1/6 p-1 px-2 md:p-2 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div onClick={handlePaymentChange}>
              <h5 className="text-center text-xl  tracking-tight text-gray-900 dark:text-white">Your Payments</h5>
            </div>

          </div>

        </div>
        {showProfile &&
  <div className="flex flex-col  items-center my-10">
    <div className="relative px-4 flex flex-col items-center rounded-[20px] w-full sm:w-3/4 mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:bg-navy-800 dark:!shadow-none p-3">
      <div className="w-full flex items-center justify-between">
        <h4 className="px-2 text-2xl my-3 mx-4 font-bold text-black">
          Your Profile
        </h4>
      </div>

      <div className="info w-full  overflow-x-auto">
        <table className="w-full min-w-[300px]">
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-black">Name</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{data.name}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-black">Email</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{data.email}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-black">Username</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{data.username}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-black">Password</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{data.password}</td>
            </tr>
          </tbody>
        </table>
      </div>
        <div className='flex flex-col sm:flex-row w-full gap-2 sm:gap-4 my-7'>
          <Link href={'/admin/update'}>
            <button type="submit" className="bg-blue-900 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-800">
              Update Your Profile
            </button>
          </Link>
          <Link href={'/admin/address'}>
            <button type="submit" className="bg-blue-900 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-800">
              Add Your Address
            </button>
          </Link>
        </div>
    </div>
  </div>
}



        {showOrder &&

          <div className="order">
            <div className="container mx-auto mt-10">
              <h1 className="text-3xl font-bold ">Incoming Orders</h1>

              <div className="flex items-center justify-between mt-6">
                <input
                  type="text"
                  placeholder="Search here"
                  className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"

                />

              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className='bg-slate-600 '>

                      <th className="font-bold px-4 py-3 text-left text-white ">
                        Processing Status
                      </th>
                      <th className="font-bold px-4 py-3 text-left text-white ">
                        Name
                      </th>
                      <th className="font-bold px-4 py-3 text-left text-white ">
                        Ship Status
                      </th>
                      <th className="font-bold px-4 py-3 text-left text-white ">
                        Order Date
                      </th>
                      <th className="font-bold px-4 py-3 text-left text-white ">
                        Order Number
                      </th>
                      <th className="font-bold px-4 py-3 text-left text-white ">
                        Shipping Method
                      </th>
                      <th className="font-bold px-4 py-3 text-left text-white ">
                        Country
                      </th>

                    </tr>
                  </thead>
                  <tbody>

                    <tr className='bg-slate-400'>
                      <td className="px-4 py-3 border-t border-gray-200">
                        in Progress
                      </td>
                      <td className="px-4 py-3 border-t border-gray-200">
                        Viral Mistry
                      </td>
                      <td className="px-4 py-3 border-t border-gray-200">
                        Note shiped
                      </td>
                      <td className="px-4 py-3 border-t border-gray-200">
                        23-05-2024
                      </td>
                      <td className="px-4 py-3 border-t border-gray-200">
                        23243569
                      </td>
                      <td className="px-4 py-3 border-t border-gray-200">
                        Expresh Delivery
                      </td>
                      <td className="px-4 py-3 border-t border-gray-200">
                        India
                      </td>

                    </tr>
                  </tbody>


                </table>
              </div>
            </div>
            <Link href={'/admin/order'} className="fixed bottom-7 right-10 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Order Now
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>

          </div>





        }

        {showPayment &&

          <div className="order">
            <div className="container mx-auto mt-10">
              <h1 className="text-3xl font-bold ">Payment History</h1>

              <div className="flex items-center justify-between mt-6">
                <input
                  type="text"
                  placeholder="Search here"
                  className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"

                />

              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className='bg-slate-600 '>

                     
                      <th className="font-bold px-4 py-3 text-left text-white ">
                        Name
                      </th>
                    
                      <th className="font-bold px-4 py-3 text-left text-white ">
                        Transation Date
                      </th>
                      <th className="font-bold px-4 py-3 text-left text-white ">
                        Amount
                      </th>
                      <th className="font-bold px-4 py-3 text-left text-white ">
                        Payments
                      </th>

                      
                      
                   

                    </tr>
                  </thead>
                  <tbody>

                    <tr className='bg-slate-400'>
                      <td className="px-4 py-3 border-t border-gray-200">
                        Viral Mistry
                      </td>
                      <td className="px-4 py-3 border-t border-gray-200">
                       30-01-2024
                      </td>
                      <td className="px-4 py-3 border-t border-gray-200">
                        2000
                      </td>
                      <td className="px-4 py-3 border-t border-gray-200">
                        Show
                      </td>
                      
                   

                    </tr>
                  </tbody>


                </table>
              </div>
            </div>
          </div>

        }





      </div>
      {/* <div className="overflow-hidden absolute right-0 bg-slate-100
 ">
        <PaymentsDetails/>
      </div> */}
      </div>


    </>
  )
}

export default Dashboard

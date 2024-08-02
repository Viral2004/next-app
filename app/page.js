import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className=" h-screen bg-slate-100 ">

        <Navbar />
        <div className="">
          {/* take welcome to delivery website on home page */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center my-8">
              <h1 className="text-4xl font-bold ">Welcome to Jay Parmatma</h1>

            </div>
            <div className="info flex flex-col gap-4">
              <p className="text-center">This is a Delivery website you want to make Account Please click here</p>

              <div className="singup flex flex-col items-center ">

                <Link href={'/admin/dashboard'}   >
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Go to Dashboard</button></Link>
              </div>
            </div>
          </div>




        </div>

        <Footer />
      </div>



    </>
  );
}

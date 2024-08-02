"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React, { useState } from 'react';
import { storeData } from '@/action/signUpAction';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [signUp, setSignUp] = useState({});
    const [error, setError] = useState({});
    const router =  useRouter();

    const handleChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

       
        let response = await storeData(signUp);


        if (response.error) {
            setError({ email: response.error });
        }
        router.push('/login')
    };

    return (
        <>
            <div className="h-screen bg-slate-100">
                <Navbar />
                <div className="signup w-full mx-auto">
                    <div className="w-1/2 mx-auto p-8 flex flex-col">
                        <div className="info mb-8">
                            <h2 className="text-center text-2xl font-bold">
                                Sign Up - Take the Best Experience Here
                            </h2>
                        </div>
                        <div className="form">
                            <form action={handleSubmit} className="flex flex-col gap-5">
                                <div>
                                    <input
                                        onChange={handleChange}
                                        value={signUp.name ? signUp.name : ""}
                                        name="name"
                                        type="text"
                                        placeholder="Enter only Name"
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <input
                                        onChange={handleChange}
                                        value={signUp.email ? signUp.email : ""}
                                        name="email"
                                        type="email"
                                        placeholder="Enter email"
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                    <span className="text-red-700">{error.email}</span>
                                </div>
                                <div>
                                    <input
                                        onChange={handleChange}
                                        value={signUp.username ? signUp.username : ""}
                                        name="username"
                                        type="text"
                                        placeholder="Create username"
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <input
                                        onChange={handleChange}
                                        value={signUp.password ? signUp.password : ""}
                                        name="password"
                                        type="password"
                                        placeholder="Create password"
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Confirm password"
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Page;

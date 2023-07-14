"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function LoginPage() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [disabledButton, setdisabledButton] = useState(true)
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
          setdisabledButton(false)
        } else {
          setdisabledButton(true)
        }
      }, [user])

    const router = useRouter()

    const onLogin = async (e: any) => {
        e.preventDefault();
        
        try {
            setisLoading(true)
            const res = await axios.post('/api/users/login', user);
            console.log('Login Success!', res.data);
            toast.success(`Logged in as: ${res.data?.user}`);
            router.push('/profile');
      
          } catch (error: any) {
            console.log('Login Error: ', error.message)
            toast.error(error.message);
      
          } finally {
            setisLoading(false)
          }

    }

    return (
        <section className="bg-white">
            <div><Toaster/></div>
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section
                    className="relative hidden lg:flex h-32 items-end  lg:col-span-5 lg:h-full xl:col-span-6"
                >
                    <img
                        alt="Login"
                        src="/login.svg"
                        className="absolute inset-0 h-full w-full"
                    />
                </section>

                <main
                    className="flex items-center justify-start px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block">
                            <Link
                                className="mt-16 lg:mt-0 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                                href="/"
                            >
                                <span className="sr-only">Home</span>
                                <Image src={`/logo.png`} height={60} width={60} alt='logo' />
                            </Link>

                            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl" >
                                Login
                            </h1>
                        </div>

                        <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={onLogin}>

                            <div className="col-span-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 border-2 outline-none bg-white py-1 px-3 text-gray-700 shadow-sm"
                                    required
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 border-2 outline-none bg-white py-1 px-3 text-gray-700 shadow-sm"
                                    required
                                />
                            </div>

                            <div className="col-span-6 -my-2">
                                <a href="#" className="text-stone-700 text-sm underline-offset-1 underline font-light">
                                    Forgot Password?
                                </a>
                            </div>


                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                {disabledButton ? (
                                    <button
                                    disabled
                                    type="submit"
                                    className="inline-block shrink-0 rounded-md border border-blue-400 bg-blue-400 px-12 py-3 text-sm font-medium text-white cursor-not-allowed"
                                >
                                    Login
                                </button>
                                ):(
                                    <button
                                    type="submit"
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition-transform hover:shadow-lg hover:scale-105 hover:shadow-blue-500"
                                >
                                    {isLoading ? 'Loading...' : 'Login'}
                                </button>
                                )}

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    New here?{' '}
                                    <Link href="/signup" className="text-gray-700 underline">Sign Up</Link>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default LoginPage
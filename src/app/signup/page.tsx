"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import axios from "axios";
import { toast } from 'react-hot-toast';

function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [disabledButton, setdisabledButton] = useState(true);
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setdisabledButton(false)
    } else {
      setdisabledButton(true)
    }
  }, [user])


  const onSignup = async (e: any) => {
    e.preventDefault();
    try {
      setisLoading(true)
      const res = await axios.post('/api/users/signup', user);
      console.log('SignUp Success!', res.data);
      router.push('/login');

    } catch (error: any) {
      console.log('Signup Error: ', error.message)
      toast.error(error.message);

    } finally {
      setisLoading(false)
    }
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section
          className="relative hidden lg:flex h-32 items-end  lg:col-span-5 lg:h-full xl:col-span-6"
        >
          <img
            alt="Sign Up"
            loading='lazy'
            src="/signup.svg"
            className="absolute h-full w-full"
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
                Sign Up
              </h1>
            </div>

            <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={onSignup}>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="mt-1 w-full rounded-md border-gray-200 border-2 outline-none bg-white py-1 px-3 text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
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

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our {' '}
                  <a href="#" className="text-gray-700 underline">
                    terms and conditions
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-gray-700 underline">privacy policy</a>.
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                {disabledButton ? (
                  <button
                    type="submit"
                    disabled
                    className="inline-block shrink-0 rounded-md border border-blue-400 bg-blue-400 px-12 py-3 text-sm font-medium text-white transition-colors cursor-not-allowed"
                  >
                    Create an account
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition-transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500"
                  >
                    {isLoading ? 'Loading...' : 'Create an account'}
                  </button>
                )}

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?{' '}
                  <Link href="login" className="text-gray-700 underline">Log in</Link>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}

export default SignUpPage
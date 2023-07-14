'use client';
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

function ProfilePage() {
  const router = useRouter()
  const [data, setdata] = useState('nothing')
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout Success');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setdata(res.data.user._id)
  }
  return (
    <div className='flex flex-col min-h-screen justify-center items-center font-mono'>
      <div><Toaster /></div>
      <div className='w-full md:w-1/2 flex flex-col items-center justify-center gap-2 p-6 border-2 shadow-lg'>
        <h1 className='font-medium text-lg'>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <h2 className='p-1 bg-yellow-400'>{data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>
          {data}
        </Link>}</h2>
        <hr />

        <div className='flex justify-evenly items-center gap-2'>
          <button
            onClick={logout}
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-2 py-3 text-sm font-medium text-white w-full"
          >
            Logout
          </button>

          <button
            onClick={getUserDetails}
            className="inline-block shrink-0 rounded-md border border-purple-600 bg-purple-600 px-2 py-3 text-sm font-medium text-white w-full"
          >
            Get Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
import React from 'react'

function UserProfile({ params }: { params: { id: string } }) {
    return (
        <div className='min-h-screen grid place-content-center'>
            <div className='flex flex-col justify-center items-center border border-gray-200 px-14 py-14 shadow-lg'>
                <div className="px-4 sm:px-0 text-center">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Account Information</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal and demographic details.</p>
                </div>

                <div className="mt-6 border-gray-100">
                    <img src="https://sujeetgund.vercel.app/sujeet.jpg" height={100} width={100} className='rounded-full border-2' alt="Profile Photo" title='Profile Photo' />
                </div>
                <div className="mt-6 border-gray-100/60">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="dt">ID</dt>
                            <dd className="dd">{params.id}</dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="dt">Username</dt>
                            <dd className="dd">Backend Developer</dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="dt">Email address</dt>
                            <dd className="dd">margotfoster@example.com</dd>
                        </div>
                    </dl>
                    
                    <div className='mt-3 flex flex-col justify-evenly sm:flex-row'>
                        <button className='py-2 px-2 mb-1 sm:mb-0 rounded-md bg-green-600 text-white text-sm hover:scale-105 transition-transform hover:shadow-lg hover:shadow-green-400'>Change Password</button>
                        <button className='py-2 px-2 rounded-md bg-transparent text-red-600 border-red-600 border hover:bg-red-600 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-red-400 transition-all text-sm'>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
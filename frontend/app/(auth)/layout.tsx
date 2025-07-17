import React from 'react'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-col flex-1 lg:justify-center items-center p-4 lg:p-10 lg:px-60 py-10'>
        <div className='flex justify-center items-center gap-2'>
            <h1 className='mt-20 h-20 text-3xl sm:text-4xl md:text-5xl'>Emplloyee Management</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout
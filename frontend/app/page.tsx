import Usercard from '@/Component/Usercard';
import {getFiles } from '@/utils/api'
import { cookies } from 'next/headers';
import Link from 'next/link';


interface User {
  _id:string;
  firstname: string;
  lastname: string;
  email: string;
  contactno: string
  DOB: string;
  gender: string;
  department: string;
  dateOfJoining: string;
  status:string;
  picture:string
}

const page = async () => {
  const token = (await cookies()).get('token')?.value || ''
  const employe = await getFiles({token: token})
  const type = employe.type
  

  return (
    <div className='w-full h-screen'>
      {type==='admin' && <div className='top-5 -left-5 z-5 absolute flex justify-end p-3 w-full h-15'>
        <Link href={'/admin'} className='flex items-center bg-blue-600 px-3 rounded-md h-full'>+ Add Employe</Link>
      </div>} 
      <div className='gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6 lg:p-10 h-full overflow-y-scroll'>
        {employe.user.map((user:User)=>(
          <Usercard key={user._id} user={user}/>
        ))}
      </div>
    </div>
  )
}

export default page

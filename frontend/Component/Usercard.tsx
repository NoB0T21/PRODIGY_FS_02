'use client'
import { Delete, Edit } from '@/Component/Icons';
import { useState } from 'react';
import { revalidateFilesPage } from '@/utils/serveraction';
import { deleteUsers } from '@/utils/api'
import Cookies from 'js-cookie'
import ViewUser from '@/Component/ViewUser';
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

const usercard = ({user}:{user:User}) => {
  const token = Cookies.get("token") || "";
  const [users,setUsers] = useState<User>({
      _id:'',
      firstname: '',
      lastname: '',
      email: '',
      contactno:'',
      DOB: '',
      gender: '',
      department: '',
      dateOfJoining: '',
      status:'',
      picture:'',
    })
    const [show,setShow] = useState<boolean>(false)

    const deleteUser = async ({userId}: {userId: string}) => {
    const data = await deleteUsers({token,userId})
    revalidateFilesPage()
  }

  return (
    <div className='bg-zinc-800 hover:bg-zinc-700 p-4 hover:p-3 rounded-lg h-90 transition-all duration-300 ease-in-out0'>
      <div onClick={()=>{setShow(true);setUsers(user)}}  className="bg-transprant rounded-lg w-full h-52 overflow-hidden">
        <img className="w-full h-full object-center object-cover" src={user.picture}/> 
      </div>
      <h3 className="mt-3 text-xl tracking-tighter">{`${user.firstname} ${user.lastname}`}</h3>
      <h5 className="text-zinc-500">{user.email}</h5>
      <div className="flex justify-between mt-2">
        <Link className="group1 flex flex-col items-center text-zinc-200 hover:text-yellow-400 transition-all duration-300 ease-in-out" href={`edit/${user._id}`}>
        <div className='size-7'><Edit/></div>
            Edit User</Link>
        <div onClick={()=>deleteUser({userId:user._id})} className="group2 flex flex-col items-center text-red-200 hover:text-red-400 transition-all duration-500 ease-in-out">
          <div className='size-7'><Delete/></div>
            Delete User</div>
      </div>
      { show && 
        <div className='top-0 left-0 z-5 absolute flex flex-col items-center backdrop-blur-sm p-3 sm:p-10 w-full h-full'>
          <div className='flex justify-end w-full'>
            <div onClick={()=>setShow(false)} className='flex justify-center items-center bg-red-500 px-1 rounded-full size-8'>X</div>
          </div>
          <div className='w-full h-full'><ViewUser user={users}/></div>
        </div>
      }
    </div>
  )
}

export default usercard

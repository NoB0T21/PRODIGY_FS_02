import Image from "next/image";

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

const ViewUser = ({user}:{user:User}) => {
  return (
    <div className='flex justify-center w-full h-full md:h-2/3'>
      <div className='flex flex-col gap-5 md:grid grid-cols-2 bg-zinc-800 p-4 rounded-md w-full md:w-200 h-full overflow-y-scroll'>
        <Image className="w-full md:w-full h-60 md:h-full object-contain" width={1960} height={1080} src={user.picture} alt="Profile"/>
        <div className='flex justify-center md:justify-start md:items-center gap-3 w-full h-full'>
          <div className="flex flex-col justify-start gap-4">
            <p>name  </p>
            <p>Email </p>
            <p>Gender </p>
            <p>Date Of Birth </p>
            <p>Mobile no. </p>
            <br />
            <p>Date Of Joining  </p>
            <p>Department </p>
            <p>Status </p>
          </div>
          <div className="flex flex-col justify-start gap-4 break-all">
            <p>: {user.firstname} {user.lastname}</p>
            <p>: {user.email}</p>
            <p>: {user.gender}</p>
            <p>: {user.DOB}</p>
            <p>: {user.contactno}</p>
            <br />
            <p>: {user.dateOfJoining}</p>
            <p>: {user.department}</p>
            <p className="relative w-18">: {user.status} <div className={`${user.status === 'Inactive' && 'top-0 -right-1 bg-red-500'} ${user.status === 'Active' && 'top-0 right-3 bg-green-500 animate-ping'} absolute rounded-full size-2`}></div></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewUser

'use client'

import { useState } from "react";
import {z} from "zod";
import { PulseLoader } from "react-spinners";
import {api} from "@/utils/api"
import { useRouter } from "next/navigation";
import { convertFileToUrl } from "@/utils/utils";
import Toasts from "@/Component/toasts/Toasts";
import Image from "next/image";
import Cookies from 'js-cookie'

const employeSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  contactno: z.string().min(10, "number length should be 10").max(10,"number length should be 10"),
  DOB: z.string().refine((date) => {return new Date(date) <= new Date();},
  {
    message: "Date of Birth cannot be in the future"
  }),
  gender: z.string().min(1, "Gender is required"),
  department: z.string().min(1, "Department is required"),
  dateOfJoining: z.string().min(1, "Gender is required"),
  status: z.string().min(1, "Status is required"),
});

const page = () => {
  const token = Cookies.get("token") || "";
  const [formData, setFormData] = useState<{
    firstname?: string;
    lastname?: string;
    email?: string;
    contactno?: string
    DOB?: string;
    gender?: string;
    department?: string;
    dateOfJoining?: string;
    status?:string;
  }>({})
  const [error, setError] = useState<{
    firstname?: string;
    lastname?: string;
    email?: string;
   contactno?: string
    DOB?: string;
    gender?: string;
    department?: string;
    dateOfJoining?: string;
    status?:string;
  }>({})
    const router=useRouter()
    const [showToast,setShowToast] = useState(false)
    const [responseMsg,setResponseMsg] = useState('')
    const [tostType,setTostType] = useState('warningMsg')
    const [loading,setLoading] = useState(false)
    const [file,setFile] = useState<File>()
    const getTodayDate = new Date().toISOString().split("T")[0];

    const formGroups = [
      [
        { name: 'firstname', type: 'text', label: 'Firstname*' },
        { name: 'lastname', type: 'text', label: 'Lastname*' },
        { name: 'email', type: 'email', label: 'Email*' },
      ],
      [
        { name: 'contactno', type: 'number', label: 'Contact No*' },
        { name: 'DOB', type: 'date', label: 'Date Of Birth*', max: getTodayDate},
        { name: 'dateOfJoining', type: 'date', label: 'Date Of Joining*' },
      ],
    ];

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setShowToast(false)
      setLoading(true)

      let parserResult: any = employeSchema.safeParse({
        firstname:formData.firstname,
        lastname:formData.lastname,
        email: formData.email,
        contactno: formData.contactno,
        DOB: formData.DOB,
        gender: formData.gender,
        department: formData.department,
        dateOfJoining: formData.dateOfJoining,
        status: formData.status,
      })
      if(!parserResult.success){
        const errorMessages = parserResult.error.flatten().fieldErrors
          setError({
            firstname:errorMessages.firstname?.[0],
            lastname:errorMessages.lastname?.[0],
            email: errorMessages.email?.[0],
            contactno: errorMessages.contactno?.[0],
            DOB: errorMessages.DOB?.[0],
            gender: errorMessages.gender?.[0],
            department: errorMessages.department?.[0],
            dateOfJoining: errorMessages.dateOfJoining?.[0],
            status: errorMessages.status?.[0],
          })
        setLoading(false)
        return
      }

      setError({
        firstname: '',
        lastname: '',
        email: '',
        contactno: '',
        DOB: '',
        gender: '',
        department: '',
        dateOfJoining: '',
        status: '',
      })

      const form = new FormData();
        form.append('firstname', formData.firstname || '');
        form.append('lastname', formData.lastname || '');
        form.append('email', formData.email || '');
        form.append('contactno', formData.contactno || '');
        form.append('DOB', formData.DOB || '');
        form.append('gender', formData.gender || '');
        form.append('department', formData.department || '');
        form.append('dateOfJoining', formData.dateOfJoining || '');
        form.append('status', formData.status || '');
        if (file) {
          form.append('file', file);
        }

      const response = await api.post('/user/create',form,{
        headers: {
                Authorization: `Bearer ${token}`,
              },
        withCredentials: true
      })
      if(response.status !== 201){
        setResponseMsg(response.data.message)
        if(response.status === 202)setTostType('infoMsg');
        setLoading(false)
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
          }, 3000);
          return
        }
        router.refresh()
        router.push('/')
        setLoading(false)
      }
  
  return (
    <div className="mx-auto px-4 py-6 max-w-5xl">
      <h1 className="mb-6 font-semibold text-xl md:text-2xl text-center">Employee Management</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {formGroups.map((group, i) => (
          <div key={i} className="gap-4 grid grid-cols-1 md:grid-cols-3">
            {group.map((field) => (
              <div key={field.name} className="relative">
                {error && (
                  <p className="mb-1 text-red-500 text-xs">{error[field.name as keyof typeof error]}</p>
                )}
                <input
                  name={field.name}
                  type={field.type}
                  max={field.max || ''}
                  value={formData[field.name as keyof typeof formData] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  required
                  className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                  {field.label}
                </label>
              </div>
            ))}
          </div>
        ))}

        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          <div className="relative">
            {error.gender && <p className="mb-1 text-red-500 text-xs">{error.gender}</p>}
            <select
              value={formData.gender || ''}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="relative">
            {error.department && <p className="mb-1 text-red-500 text-xs">{error.department}</p>}
            <select
              value={formData.department || ''}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white"
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Developer">Developer</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="relative">
            {error.status && <p className="mb-1 text-red-500 text-xs">{error.status}</p>}
            <select
              value={formData.status || ''}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Bench">Bench</option>
            </select>
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-start md:items-center gap-4">
          <label className="relative bg-purple-700 px-4 py-2 rounded-md text-white cursor-pointer">
            Upload Profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0])}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
          {file && (
            <div className="mt-4 md:mt-0 w-24 h-24">
              <Image
                width={96}
                height={96}
                className="rounded-full w-full h-full object-cover"
                src={convertFileToUrl(file)}
                alt="Profile"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md font-semibold text-md text-white"
          >
            {loading ? <PulseLoader color="#fff" /> : 'Submit'}
          </button>
        </div>
      </form>
      {showToast &&  <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </div>
  )
}

export default page

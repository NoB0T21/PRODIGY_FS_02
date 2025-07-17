'use client';

import { useState } from "react";
import { z } from "zod";
import { PulseLoader } from "react-spinners";
import {api} from "../utils/api"
import { useRouter } from "next/navigation";
import Toasts from "./toasts/Toasts";
import Cookies from "js-cookie";


const signInSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
});

const AuthForm = () => {
    const [formData, setFormData] = useState<{
        name?: string;
        email?: string;
        picture?: string;
        password?: string;
        confirm?: string;
        file?: File
    }>({})
    const [error, setError] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirm?: string
    }>({})
    const router=useRouter()
    const [show,setShow] = useState(false)
    const [showToast,setShowToast] = useState(false)
    const [responseMsg,setResponseMsg] = useState('')
    const [tostType,setTostType] = useState('warningMsg')
    const [loading,setLoading] = useState(false)
    const [file,setFile] = useState<File>()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormData({...formData, file: file})
        setShowToast(false)
        setLoading(true)
        let parserResult: any
        
        parserResult = signInSchema.safeParse({
            email: formData.email,
            password: formData.password
        })


        if(!parserResult.success){
            const errorMessages = parserResult.error.flatten().fieldErrors
                setError({
                    name: errorMessages.name?.[0],
                    email: errorMessages.email?.[0],
                    password: errorMessages.password?.[0],
                    confirm: errorMessages.confirm?.[0]
                })
                setError({
                    name: '',
                    email: errorMessages.email?.[0],
                    password: errorMessages.password?.[0],
                    confirm: errorMessages.password?.[0]
                })


            setLoading(false)
            return
        }

        setError({
            name: '',
            email: '',
            password: '',
            confirm: ''
        })
        const form = new FormData();
            form.append('email', formData.email || '');
            form.append('password', formData.password || '');

        const response = await api.post('/user/signin',form,{
            withCredentials: true
        })

        if(response.status !== 201){
            setResponseMsg(response.data.message)
            if(response.status === 202)setTostType('infoMsg');
            setLoading(false)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
              }, 6000);
            return
        }

        const token = response.data.token
        const raw = response.data.user;
        const user = {
            _id: raw._id,
            name: raw.name,
            email: raw.email,
            picture: raw.picture
        };
                
        Cookies.set('user',user._id, { expires: 1 });
          Cookies.set("token", token, {
            expires: 1, // days
            sameSite: "strict",
            secure: true
        });
        router.push('/')
        setLoading(false)
    }

  return (
    <>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-1 rounded-md w-full md:w-2/3 lg:w-full">
            <div className="relative w-2/3 lg:w-1/2">
                {error.email && <p className="mb-1 text-red-500 text-xs">{error.email}</p>}
                <input name='email' type="email" value={formData.email} onChange={(e) => {setFormData({...formData, email: e.target.value})}}required 
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>Email*</span>
                </label>
            </div>
            <div className="relative w-2/3 lg:w-1/2">
                {error.password && <p className="mb-1 text-red-500 text-xs">{error.password}</p>}
                <input name='password' type={show?'text':'password'} value={formData.password} onChange={(e) => {setFormData({...formData, password: e.target.value})}}required 
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>Password*</span>
                </label>
                <div onClick={() =>setShow(!show)} className='right-4 z-1 absolute flex justify-end p-2 rounded-full text-gray-400 -translate-y-9'>
                    { show ? 'Show':'hide' }
                </div>
            </div>
            <div className="w-2/3 lg:w-1/2">
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-md w-full font-semibold text-md">{loading? <PulseLoader color="#fff"/>:'Sign-in'}</button>
            </div>
        </form>
        {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </>
  )
}

export default AuthForm
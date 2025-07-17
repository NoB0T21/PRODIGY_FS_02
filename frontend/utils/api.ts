import axios from "axios";
import { redirect } from "next/navigation";


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || ""
})

export const getFiles = async ({ token }: { token: string }) => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/get`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
            next: {
                tags: ['employes'], 
            },
        })

        const users = await res.json()
        return users
    }catch(error){
        redirect('/sign-up');
    }
}

export const deleteUsers = async ({ token, userId }: { token: string , userId: string}) => {
    try{
        const res = await api.get(`/user/delete/${userId}`,{
            withCredentials: true,
            headers:{
                 Authorization: `Bearer ${token}`,
            }
        })
        return res.data
    }catch(error){
        redirect('/');
    }
}
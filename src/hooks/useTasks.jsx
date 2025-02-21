import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTasks = () => {

    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
     console.log(user.email);
    const {data: tasks = [], refetch} = useQuery({
        queryKey: [ user?.email,'tasks'],
        enabled: !!user?.email, 
        queryFn: async()=>{
            const res = await axiosSecure.get(`/tasks/${user.email}`)
            console.log(res.data);
            return res.data
        }
    })
    return [tasks, refetch]
};

export default useTasks;
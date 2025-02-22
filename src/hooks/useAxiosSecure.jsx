import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: 'https://task-management-server-beta-ten.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: 'https://task-flow-server-eta.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
import React from 'react';
// import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import Navbar from '../shared/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className=' min-h-screen'>
                <Outlet></Outlet>
            </div>
            {/* footer  */}
            <Footer></Footer>
            <Toaster></Toaster>
        </div>
    );
};

export default MainLayout;
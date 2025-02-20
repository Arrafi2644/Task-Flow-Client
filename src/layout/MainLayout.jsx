import React from 'react';
// import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import Navbar from '../shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className=' min-h-screen'>
                <Outlet></Outlet>
            </div>
            {/* footer  */}
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
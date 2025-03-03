import React from 'react';

const Footer = () => {
    return (
       <div className='bg-pink-700 '>
         <footer className="footer max-w-7xl w-11/12 mx-auto footer-center  text-base-content p-6">
        <aside>
          <p className='text-white'>Copyright © {new Date().getFullYear()} - All right reserved by Task Flow.com</p>
        </aside>
      </footer>
       </div>
    );
};

export default Footer;
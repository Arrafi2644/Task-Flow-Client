import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const Banner = () => {
  const {signInWithGoogle, user, logout} = useContext(AuthContext)
    
  const handleSignInWithGoogle = () => {
         signInWithGoogle()
         .then(result => {
          if(result?.user){
              toast.success("Login successful!")
          }
         })
         .catch(err => {
          console.log(err);
          if(result?.user){
              toast.error("Something went wrong! Try again.")
          }
         })
  }


    return (
        <div className='bg-pink-600'>

        <div className="hero max-w-7xl w-11/12 mx-auto min-h-screen">
  <div className="hero-content text-center">
    <div className="">
      <h1 className="text-5xl font-bold text-white">The everything app, for work.</h1>
      <p className="py-6 w-full md:w-2/3 mx-auto text-white">
      One app for projects, knowledge, conversations and more. Get more done faster—together.
      </p>
      <button onClick={handleSignInWithGoogle} className="btn bg-pink-700 hover:bg-pink-800 text-white">Get Started. It's Free</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default Banner;
import React, { useContext } from 'react';
import Banner from '../../components/Banner/Banner';
import { AuthContext } from '../../Context/AuthProvider';

const Home = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            {
                user ? <div className='bg-pink-600'> 
                <div className="py-10 max-w-7xl w-11/12 mx-auto min-h-screen">
                  {/* banner head section  */}
                  <div>
                    <h2 className='text-2xl md:text-3xl font-bold text-center pb-8 text-white'>Make your task</h2>
                  </div>
      
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 text-white'>
                    <div className='border rounded-md p-4 bg-pink-600'>
                      {/* category-title  */}
                      <div>
                        <h2 className='font-bold text-xl md:text-2xl text-center pb-4'>To-Do Task</h2>
                      </div>
                      {/* category-content  */}
                      <div>
                        <button className="btn w-full btn-sm bg-pink-700 hover:bg-pink-800 text-white">+ Add Task</button>
                      </div>
                    </div>
                    <div className='border rounded-md p-4'>
                      {/* category-title  */}
                      <div>
                        <h2 className='font-bold text-xl md:text-2xl text-center'>Progress Task</h2>
                      </div>
                      {/* category-content  */}
                      <div>
                      </div>
      
                    </div>
                    <div className='border rounded-md  p-4'>
                      {/* category-title  */}
                      <div>
                        <h2 className='font-bold text-xl md:text-2xl text-center'>Done Task</h2>
                      </div>
                      {/* category-content  */}
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                :      
                <Banner/>
            }
        </div>
    );
};

export default Home;
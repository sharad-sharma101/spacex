import React, { useState } from 'react'
//this detail modal open for every launch
const Detail = (props) => {

  return (

    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

            <div className='flex' >
              <div className=' rounded m-2' >
                <img
                  src={props.info[0].links.mission_patch}
                  width="100px"
                  height="130px"
                  alt="logo" />
              </div>
              <div className='flex flex-col m-2 ' >
                <div className='flex my-0' >
                  <h3 className='text-xl mx-3 py-2' >{props.info[0].mission_name}</h3>
                  <p className={` ${props.info.launch_success ? "text-teal-600 bg-green-100" : "text-red-800 bg-red-100"} focus:outline-none focus:ring focus:ring-violet-300 rounded-full font-bold p-2 inline`}
                  >{props.info.launch_success ? "Success" : "Failed"} </p>
                </div>
                <h3>Links :</h3>
                <div className='flex' >
                  <i class="fa-solid fa-browser"></i>
                  <i class="fa-brands fa-facebook mx-1 "></i>
                  <i class="fa-brands fa-instagram mx-1"></i>
                  <i class="fa-brands fa-twitter mx-1"></i>
                </div>
              </div>
            </div>


            <div className='m-2 p-1' >
              <p>{props.info[0].details}</p>
              <a href='/' className='text-blue-500' >Wikipedia</a>
            </div>

            <div className='flex flex-col m-2 p-2 ' >
              <div className='border-b-2 my-2 py-2 ' >
                <h3><span className="text-xl" >Launch Site</span> {props.info[0].launch_site.site_name}  </h3>
              </div>
              <div className='border-b-2 my-2 py-2 ' >
                <h3><span className="text-xl" >Rocket Name</span> {props.info[0].rocket.rocket_name}  </h3>
              </div>
              <div className='border-b-2 my-2 py-2 ' >
                <h3><span className="text-xl" >Launch Year</span> {props.info[0].launch_year}</h3>
              </div>
              <div className='border-b-2 my-2 py-2 ' >
                <h3><span className="text-xl" >Rocket Type</span> {props.info[0].rocket.rocket_type}  </h3>
              </div>
            </div>



            <div className="bg-gray-50 px-4 py-3 sm:flex justify-center sm:flex-row-reverse sm:px-6">
              <button type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={props.switch}
              >Cancel</button>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}
export default Detail

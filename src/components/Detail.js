import React from 'react'

const Detail = (props) => {
    
  return (
  
<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div>
          <div>
            <img 
            src={`${props.info.links ? `${props.info.links.mission_patch_small}` : ""}`} 
            width="10px"
            height="10px"
            alt="logo" />
          </div>  
          <div>
                <h3>{props.info.mission_name}</h3>
                <p className = {` ${props.info.launch_success ? "text-teal-600 bg-green-100" : "text-red-800 bg-red-100" } focus:outline-none focus:ring focus:ring-violet-300 rounded-full font-bold p-2 inline`}
                >{props.info.launch_success ? "Success" : "Failed"} </p>
          </div>
        </div>
        <p>{props.info.details}</p>
        <a href={`${props.info.links ? `${props.info.links.wikipedia}` : ""}`}  >Wikipedia</a>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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

import React, { useEffect, useState } from 'react'
import axios from "axios";
import Detail from './Detail'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './loader.css'

const Dashboard = () => {
let histery = useNavigate();
const [OpenModal, setOpenModal] = useState(false)
const [ModalData, setModalData] = useState([])
const [data, setdata] = useState([])
const [filler, setfiller] = useState([])
const [time , settime] = useState([]);
const [FilterParams , setFilterParams] = useSearchParams();
const [status, setstatus] = useState('1')
const [wait, setwait] = useState(true)

  useEffect(() => {
    async function fetchData() {
        try { 
          await axios.get("https://api.spacexdata.com/v3/launches")
          .then(res => res.data)
          .then(ele => {
            setdata(ele) ;  
            setfiller(ele)
          })
        } catch (error) {
          console.log(error);
        }}
    fetchData();
    
}, [] )
  
  useEffect(() => {
    if(filler.length > 0){
      setwait(false)
    }else{
      setwait(true)
    }
  }, [filler])
  

  function hundleModal(id){
    setModalData(
        filler.filter(ele => ele.flight_number  === id )
    )
    setOpenModal(true);
  }
  function hundle(e){
    settime(e.target.value)
  }
  function hundle1(e){
    setstatus(e.target.value)
  }

  
  useEffect(() => {
    if(status === "3"){
        setfiller(
            data.filter(ele =>  ele.launch_success
            )) 
         histery("/success=1");
    } else if(status === "4"){
        setfiller(
            data.filter(ele =>  !(ele.launch_success) 
            ))  
            histery("/success=0");    
    }else {
          setfiller(data)
          histery("/");
    }
  }, [status])
  
  useEffect(() => {
    if(time === "7"){
       setfiller(
        filler.filter(ele => new Date(ele.launch_date_utc) - new Date() > -252329141266)
       )    
       histery("/past=7");
    } 
    else if(time === "5"){
      setfiller(
        filler.filter(ele => new Date(ele.launch_date_utc) - new Date() > -189170697557)
       ) 
       histery("/past=5");
    }else if(time === "3"){
      setfiller(
        filler.filter(ele => new Date(ele.launch_date_utc) - new Date() > -126098549582)
       ) 
       histery("/past=5");
    }else{
      setfiller(
        filler.filter(ele => new Date(ele.launch_date_utc) - new Date() < 0)
       ) 
    }
  }, [time])
  


  return (
    <div>
    
      <div className='flex justify-around mb-[1rem] ' >
      <select id="Timing" value={time}  onChange={hundle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="all">All Past Launchs</option>
            <option value="7">Past 7 year</option>
            <option value="5">Past 5 year</option>
            <option value="3">Past 3 year</option>
       </select>
       <select id="status" value={status}  onChange={hundle1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="1">All Launches</option>
            <option value="3">Successful Launches</option>
            <option value="4">Failed Launches</option>
       </select>
       </div>

       <div className='flex justify-center'>
         
<div className="relative overflow-y-scroll h-[30rem] border-4 border-gray-50 ">
    <table className="w-full text-sm text-left overflow-auto text-gray-500 dark:text-gray-400  ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    No.
                </th>
                <th scope="col" className="px-6 py-3">
                    Launched(UTC)
                </th>
                <th scope="col" className="px-6 py-3">
                    Location
                </th>
                <th scope="col" className="px-6 py-3">
                    Mission
                </th>
                <th scope="col" className="px-6 py-3">
                    Orbit
                </th>
                <th scope="col" className="px-6 py-3">
                    Launch Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Rocket
                </th>
            </tr>
        </thead>
        <tbody>
       {
        filler.size === 0 
        ?
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">No data of above filter
        <th  scope="row" className="px-6 py-4">516</th>
        </tr>
        :(
         [...filler].map((ele , index) => {
            return (
            <tr key={index} onClick={ () => {hundleModal(ele.flight_number)} }  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4">
                        {index+1}
                    </th>
                    <td className="px-6 py-4">
                      { Date(ele.launch_date_unix).toString().length >= 21 ? Date(ele.launch_date_unix).toString().substr(4,21) : "no" }  
                    </td>
                    <td className="px-6 py-4">
                       {ele.launch_site.site_name} 
                    </td>
                    <td className="px-6 py-4">
                        {ele.mission_name.substr(0,20)}
                    </td>
                    <td className="px-6 py-4">
                        { ele.second_stage ? ele.second_stage.payloads.orbit : "LEO"}
                    </td>
                    <td className="px-6 py-4">
                    <div className = {` ${ele.launch_success ? "text-teal-600 bg-green-100" : "text-red-800 bg-red-100" } focus:outline-none focus:ring focus:ring-violet-300 rounded-full font-bold p-2 inline`} >
                    {ele.launch_success ? "Success" : "Failed"} 
                    </div>
                    </td>
                    <td className="px-6 py-4">
                       {ele.rocket.rocket_name}
                    </td> 
            </tr>
        )})) 
      } 
        </tbody>
    </table>
</div>
        { wait ? (
              <div className='z-10 h-full w-full top-0 left-0 absolute' > 
              <div className='loader' ></div></div>
              ) :
              <div></div>
       }
       </div>

  { OpenModal && <Detail info={ModalData} switch={() => setOpenModal(false) }/> }

    </div>
  )
}

export default Dashboard


       
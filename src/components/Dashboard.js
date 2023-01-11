import React, { useEffect, useState } from 'react'
import axios from "axios";
import Detail from './Detail'
import { useSearchParams } from 'react-router-dom'
import './loader.css'

const Dashboard = () => {

  //  different  states 
  const [OpenModal, setOpenModal] = useState(false)
  const [ModalData, setModalData] = useState([])
  const [filler, setfiller] = useState([])
  const [FilterParams, setFilterParams] = useSearchParams();
  const [time, settime] = useState(FilterParams.get('launch_year') ? FilterParams.get('launch_year') : 'all');
  const [status, setstatus] = useState(FilterParams.get('launch_success') ? FilterParams.get('launch_success') : 'all')
  const [wait, setwait] = useState(true)

  // for loader
  useEffect(() => {
    if (filler.length > 0) {
      setwait(false)
    } else {
      setwait(true)
    }
  }, [filler])

    //to change state of modal
  function hundleModal(id) {
    setModalData(
      filler.filter(ele => ele.flight_number === id)
    )
    setOpenModal(true);
  }
  //to change state of year
  function hundle(e) {
    settime(e.target.value)
  }
  //to change state of success
  function hundle1(e) {
    setstatus(e.target.value)
  }
    
  
  // fetch data according to the url or state of year and success 
  useEffect(() => {

    const first = status === "all" ? '' : `launch_success=${status}`
    const second = time === "all" ? '' : `launch_year=${time}`
    let query = "";
    if (first && second) {
      query = `/?${first}&${second}`
      setFilterParams({ launch_success: status, launch_year: time })
    } else if (first) {
      query = `/?${first}`
      setFilterParams({ launch_success: status })
    } else if (second) {
      query = `/?${second}`
      setFilterParams({ launch_year: time })
    } else {
      setFilterParams({})
    }
    setfiller([]);
    async function fetchData() {
      try {
        await axios.get(`https://api.spacexdata.com/v3/launches${query}`)
          .then(res => res.data)
          .then(ele => {
            setfiller(ele)
          })
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

  }, [status, time])



  return (
    <div>

      <div className='flex justify-around mb-[1rem] ' >
        <select id="Timing" value={time} onChange={hundle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="all">All Past Launchs</option>
          <option value="2015">2015 year</option>
          <option value="2016">2016 year</option>
          <option value="2017">2017 year</option>
          <option value="2018">2018 year</option>
          <option value="2019">2019 year</option>
          <option value="2020">2020 year</option>
        </select>
        <select id="status" value={status} onChange={hundle1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="all">All Launches</option>
          <option value="true">Successful Launches</option>
          <option value="false">Failed Launches</option>
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
                  ? (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4"></th>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4 text-xl">No data for above filter</td>
                    </tr>)
                  : (
                    [...filler].map((ele, index) => {
                      return (
                        <tr key={index} onClick={() => { hundleModal(ele.flight_number) }} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4">
                            {index + 1}
                          </th>
                          <td className="px-6 py-4">
                            {ele.launch_date_utc.substr(0, 10).replaceAll('-', ' ')}
                          </td>
                          <td className="px-6 py-4">
                            {ele.launch_site.site_name}
                          </td>
                          <td className="px-6 py-4">
                            {ele.mission_name.substr(0, 20)}
                          </td>
                          <td className="px-6 py-4">
                            {ele.second_stage ? ele.second_stage.payloads.orbit : "LEO"}
                          </td>
                          <td className="px-6 py-4">
                            <div className={` ${ele.launch_success ? "text-teal-600 bg-green-100" : "text-red-800 bg-red-100"} focus:outline-none focus:ring focus:ring-violet-300 rounded-full font-bold p-2 inline`} >
                              {ele.launch_success ? "Success" : "Failed"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {ele.rocket.rocket_name}
                          </td>
                        </tr>
                      )
                    }))
              }
            </tbody>
          </table>
        </div>
        {wait ? (
          <div className='z-10 h-full w-full top-0 left-0 absolute' >
            <div className='loader' ></div></div>
        ) :
          <div></div>
        }
      </div>

      {OpenModal && <Detail info={ModalData} switch={() => setOpenModal(false)} />}

    </div>
  )
}

export default Dashboard




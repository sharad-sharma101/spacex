import React from 'react'
import Space from './space.jpg'
const Header = () => {
  return (
    <div className='border-b-2 border-black mb-2 bg-neutral-100 ' >
    <div className='flex justify-center  mb-[2rem] ' >
      <img 
      src={Space} 
      alt="Logo"
      height={300}
      width={600}
      />;
    </div>
    </div>
  )
}

export default Header

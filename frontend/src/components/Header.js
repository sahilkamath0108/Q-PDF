import React from 'react'
import logo from '../assets/logo.jpeg'

const Header = () => {
  return (
    <div className=' h-[50px]  flex justify-start gap-4 items-center p-4 '>
     <img src={logo}  width={60} className=' mt-2'></img>
      <div className='text-3xl py-6 px-4 font-serif'>Q-PDF</div>

    </div>
  )
}

export default Header

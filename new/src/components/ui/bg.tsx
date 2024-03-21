import {Fragment} from "react";

export const Bg = () => {
  return (
    <Fragment>
      <div className='bg-gradient-to-r from-[#001524] opacity-80 to-[#001524] absolute w-[450px] h-full z-10'/>
      <div className='bg-gradient-to-r from-[#001524] via-[#001524] via-10% absolute w-[450px] h-full z-10'/>
    </Fragment>
  )
}
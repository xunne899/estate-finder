import React from 'react'
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  return (
<button
className="w-full flex justify-center items-center mt-3 p-2 text-md text-white bg-blue-500 hover:bg-blue-600 rounded-md uppercase"
type="submit"
>
<FcGoogle className='bg-white rounded-md mr-3'/>Continue with Google
</button>
  )
}

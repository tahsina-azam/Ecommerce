import React from 'react'
import { Button } from '@mantine/core'
import { useRouter } from 'next/router'

function GoBackButton() {
    const router =useRouter();
    const goBack = () =>{
        router.push('/products')
    }
  return (
    <div>
      <Button onClick={goBack} className="bg-black hover:bg-black rounded-md mt-4  mb-8 w-full rounded-md bg-gray-900 px-6 py-2  font-medium text-white hover:bg-gray-800" >Go Back</Button>
    </div>
  )
}

export default GoBackButton

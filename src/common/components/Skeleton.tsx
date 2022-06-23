import React from 'react'
import Loader from './Loader'

const Skeleton = () => {
  return (
    <div className='grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 m gap-5'>
      {Array(12).fill(0).map((_,index) => <Loader key={index} />)}
    </div>
  )
}

export default Skeleton
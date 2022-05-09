import React from 'react'
import Loader from './Loader'

const Skeleton = () => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 m gap-5'>
      {Array(6).fill(0).map((_,index) => <Loader key={index} />)}
    </div>
  )
}

export default Skeleton
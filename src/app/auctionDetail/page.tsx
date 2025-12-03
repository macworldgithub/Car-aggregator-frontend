import CarDetail from '@/src/components/AppComponents/CarDetail'
import CarGallery from '@/src/components/AppComponents/CarGallery'
import React from 'react'

const page = () => {
  return (
    <div>
        <CarGallery/>
        <CarDetail/>
    </div>
  )
}

export default page;
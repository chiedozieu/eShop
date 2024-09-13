import React from 'react'
import styles from '../../../styles/style'
import { displayNGNCurrency } from '../../../utils/displayCurrency'
import CountDown from './CountDown'
import { backend_url } from '../../../server'

const EventCard = ({active, data}) => {

 
  return (
    <div className={`w-full mt-20 md:mt-0 block rounded-lg ${active ? 'unset': 'mb-12'} lg:flex p-2`}>
        <div className="w-full lg:w-[50%] m-auto">
          <img src={`${backend_url}${data.images[0]}`} alt="" className='h-[300px] object-cover p-8' />
        </div>
        <div className="w-full lg:w-[50%] flex flex-col justify-center ">
            <h2 className={`${styles.productTitle}`}>
            {data?.name}
            </h2>
            <p className='p-2'>
             {data?.description}
            </p>
            <div className="flex py-2 justify-between">
                <div className="flex">
                    <h5 className='text-[18px] text-[#d55b45] pr-3 line-through font-thin'>
                        {displayNGNCurrency(data.originalPrice)}
                    </h5>
                    <h5 className='text-[20px] text-[#333] font-semibold'>
                        {displayNGNCurrency(data.discountPrice)}
                    </h5>
                </div>
               
            </div>
            <CountDown data={data}/>
        </div>
    </div>
  )
}

export default EventCard 
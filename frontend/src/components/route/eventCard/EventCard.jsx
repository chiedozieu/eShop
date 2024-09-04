import React from 'react'
import styles from '../../../styles/style'
import { displayNGNCurrency } from '../../../utils/displayCurrency'
import CountDown from './CountDown'

const EventCard = ({active}) => {
  return (
    <div className={`w-full mt-20 md:mt-0 block rounded-lg ${active ? 'unset': 'mb-12'} lg:flex p-2`}>
        <div className="w-full lg:w-[50%] m-auto">
          <img src={'https://i0.wp.com/ogtmartng.com/wp-content/uploads/2024/07/latin-en-uhd-4k-tv-un65du7000pxpa-front-black-542481479.webp?fit=650%2C519&ssl=1'} alt="" />
        </div>
        <div className="w-full lg:w-[50%] flex flex-col justify-center ">
            <h2 className={`${styles.productTitle}`}>
            Samsung 55″ Crystal UHD 4K DU7000 Smart TV 
            </h2>
            <p className='p-2'>
            Experience stunning visuals with Samsung's 55″ Crystal UHD 4K DU7000 Smart TV. Enjoy crystal-clear resolution with 4K UHD technology. Immerse yourself in vibrant colors and contrast with Dynamic Crystal Color. Stream your favorite content with built-in Wi-Fi and SmartThings app. Control your TV with voice commands using Amazon Alexa or Google Assistant. Enhance your gaming experience with Motion Xcelerator and Auto Game Mode. Upgrade your viewing experience with this sleek and innovative smart TV.
            </p>
            <div className="flex py-2 justify-between">
                <div className="flex">
                    <h5 className='text-[18px] text-[#d55b45] pr-3 line-through font-thin'>
                        {displayNGNCurrency(1050000)}
                    </h5>
                    <h5 className='text-[20px] text-[#333] font-semibold'>
                        {displayNGNCurrency(999999.99)}
                    </h5>
                </div>
               
            </div>
            <CountDown />
        </div>
    </div>
  )
}

export default EventCard
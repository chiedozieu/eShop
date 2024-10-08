import React, { useEffect } from 'react'
import ShopLogin from '../components/shop/ShopLogin'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ShopLoginPage = () => {
  const navigate = useNavigate()
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  useEffect(() => {
   if(isSeller){
    navigate(`/dashboard`)
   }
  }, [isLoading, isSeller, navigate ])

  window.scrollTo(0,0)
  return (
    <div>
         <ShopLogin />
    </div>
  )
}

export default ShopLoginPage
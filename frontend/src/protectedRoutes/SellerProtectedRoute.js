import React from 'react'
import { Navigate } from 'react-router-dom'

const SellerProtectedRoute = ({isSeller, seller, children}) => {
 if(!isSeller){
    return <Navigate to={`/shop-login`} replace />
 }
 return children;
}

export default SellerProtectedRoute 
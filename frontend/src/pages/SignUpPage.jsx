import React, { useEffect } from 'react'
import SignUp from '../components/SignUp.jsx'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignUpPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
   if(isAuthenticated){
    navigate('/')
   }
  }, [isAuthenticated])
  window.scrollTo(0,0)
  return (
    <div>
        <SignUp />
    </div>
  )
}

export default SignUpPage
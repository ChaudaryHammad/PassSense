import React from 'react'
import MainComp from '../components/MainComp'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ScanPassport() {
  const navigate = useNavigate()
  const {user} = useAuth()

  useEffect(() => {
    if(!user?.isVerified){
      return navigate('/')
    }
  }, [])
  return (
    <div className=''>
        <MainComp/>
    </div>
  )
}

export default ScanPassport
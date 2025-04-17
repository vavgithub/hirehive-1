import React, { useEffect } from 'react'
import { ProductFruits } from 'react-product-fruits'
import useAuth from '../hooks/useAuth'
import { useSelector } from 'react-redux';


function ProductTour() {
    const { data , isLoading } = useAuth();
    // const { candidateData , loading } = useSelector(state => state.candidate) 

    const userInfo = {
        username: data?.email, // REQUIRED - any unique user identifier
        email: data?.email,
        firstname: data?.name,
        lastname: data?.name,
        signUpAt: new Date(),
        role: data?.role,
    }

  return (
     !isLoading && <ProductFruits language='en' workspaceCode='TiRWqIMDqgxyOSKU' user={userInfo} lifeCycle='neverUnmount' />
  )
}

export default ProductTour

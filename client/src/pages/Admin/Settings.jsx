import React, { useState } from 'react'
import Container from '../../components/Cards/Container'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import GoogleIcon from '../../svg/Icons/GoogleIcon'
import { Button } from '../../components/Buttons/Button'
import { googleAuthorize, googleUnAuthorize } from '../../services/auth.service'
import { useAuthContext } from '../../context/AuthProvider'
import LoaderModal from '../../components/Loaders/LoaderModal'
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getRoute, ROUTE_KEY } from '../../config/permissions.config'

function Settings() {
    const [loading,setLoading] = useState(false);
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();   
    const error = searchParams.get('error');

    const handleGoogleAuthorization = async () => {
        setLoading(true)
        const response = await googleAuthorize();
        if(response?.authorizationUrl){
            window.location.href = response.authorizationUrl;
        }
        setLoading(false)
    }

    useEffect(()=>{
        if(error === 'ALLOW_ACCESS'){
            showErrorToast('Error','Please allow all the permissions to get the workspace access.');
            navigate(getRoute(user?.role,ROUTE_KEY.SETTINGS))
        }
    },[error])

    const handleGoogleUnAuthorization = async () => {
        setLoading(true)
        const response = await googleUnAuthorize();
        if(response.status === 'success'){
            queryClient.invalidateQueries(['auth'])
            showSuccessToast('Success',response?.message ?? 'Unauthorized Google Successfully.')
        }
        setLoading(false)
    }

  return (
    <Container>
      <Header HeaderText="Settings" />
      {loading && <LoaderModal />}
      <StyledCard padding={2} extraStyles={'w-full'}>
            <StyledCard backgroundColor={'bg-background-100'} extraStyles={'flex justify-between items-center'}>
                <div className='flex items-center gap-4'>
                        <GoogleIcon/>
                    <h3>Google Workspace</h3>                    
                </div>
                <div>
                    { (user?.hasAuth?.view_calendar && user?.hasAuth?.edit_calendar) ? 
                        <Button type='button' onClick={handleGoogleUnAuthorization} >Unauthorize</Button>
                        :
                        <Button type='button' onClick={handleGoogleAuthorization} >Authorize</Button>
                    }
                </div>
            </StyledCard>
    </StyledCard>
    </Container>
  )
}

export default Settings

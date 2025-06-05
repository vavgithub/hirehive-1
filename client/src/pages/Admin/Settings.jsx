import React, { useState } from 'react'
import Container from '../../components/Cards/Container'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import GoogleIcon from '../../svg/Icons/GoogleIcon'
import { Button } from '../../components/Buttons/Button'
import { googleAuthorize } from '../../services/auth.service'

function Settings() {
    const [open,setOpen] = useState(false);

    const handleGoogleAuthorization = async () => {
        const response = await googleAuthorize();
        if(response?.authorizationUrl){
            window.location.href = response.authorizationUrl;
        }
    }
  return (
    <Container>
      <Header HeaderText="Settings" />
      <StyledCard padding={2} extraStyles={'w-full'}>
            <StyledCard backgroundColor={'bg-background-80'} extraStyles={'flex justify-between items-center'}>
                <div className='flex items-center gap-4'>
                        <GoogleIcon/>
                    <h3>Google Workspace</h3>                    
                </div>
                <div>
                    <Button type='button' onClick={handleGoogleAuthorization} >Authorize</Button>
                </div>
            </StyledCard>
    </StyledCard>
    </Container>
  )
}

export default Settings

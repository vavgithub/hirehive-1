import React, { useState } from 'react'
import Container from '../../components/Cards/Container'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import { Button } from '../../components/Buttons/Button'
import LoaderModal from '../../components/Loaders/LoaderModal'
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast'
import TelegramIcon from '../../svg/Icons/TelegramIcon'
import useCandidateAuth from '../../hooks/useCandidateAuth'
import { disconnectTelegram } from '../../services/candidates.service'
import { fetchCandidateAuthData } from '../../redux/candidateAuthSlice'
import { useDispatch } from 'react-redux'

const TELEGRAM_BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;

function CandidateSettings() {
    const [loading,setLoading] = useState(false);
    const { candidateData } = useCandidateAuth();
    const dispatch = useDispatch();

    const handleTelegramConnect = async () => {
        window.open(`https://t.me/${TELEGRAM_BOT_USERNAME}?start=${candidateData?._id}`, '_blank');
    }


    const handleTelegramDisconnect = async () => {
        try {
            setLoading(true)
            const response = await disconnectTelegram();
            console.log(response)
            if(response.status === 200){
                await dispatch(fetchCandidateAuthData()).unwrap()
                showSuccessToast("Success",response.data?.message || 'Telegram disconnected successfully')
            }
        } catch (error) {
            console.log("Disconnect telegram error : ", error.message);
            showErrorToast("Error",error?.response?.data?.error,"Some error occured")
        }finally{
            setLoading(false)
        }
    }

  return (
    <Container>
      <Header HeaderText="Settings" />
      {loading && <LoaderModal />}
      <StyledCard padding={2} extraStyles={'w-full'}>
            <StyledCard backgroundColor={'bg-background-80'} extraStyles={'flex justify-between md:items-center flex-col gap-4 md:flex-row'}>
                <div className='flex items-center gap-4'>
                        <TelegramIcon/>
                    <h3>Telegram Bot</h3>                    
                </div>
                <div className='place-self-end md:place-self-start w-fit'>
                    { (candidateData?.isTelegramConnected) ? 
                        <Button type='button' onClick={handleTelegramDisconnect} >Disconnect</Button>
                        :
                        <Button type='button' onClick={handleTelegramConnect} >Connect</Button>
                    }
                </div>
            </StyledCard>
    </StyledCard>
    </Container>
  )
}

export default CandidateSettings

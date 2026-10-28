import { useNavigate } from 'react-router-dom';
import { Button } from '../Buttons/Button';
import { GeodeLogo } from '@/components/geode/Logo';


function LogoWrapper({redirectLink = '/', isAuthenticated = true,headerText = '',buttonVariant = 'secondary'}) {
    const navigate = useNavigate();

  return (
    <div className=' mt-2  mb-4 flex justify-between w-full'>
        <div className='flex items-center justify-center gap-8'>
            <span onClick={()=>navigate(redirectLink)} className='cursor-pointer'>
              <GeodeLogo />
            </span>
            {headerText && <h1 className='hidden md:block text-geode-h4 font-geode-heading'>{headerText}</h1>}
        </div>
        {!isAuthenticated && <Button variant={buttonVariant} onClick={() => navigate("/login")}>Login</Button>}
    </div>
  )
}

export default LogoWrapper

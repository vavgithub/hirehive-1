import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../svg/Logo/lightLogo.svg';
import { Button } from '../Buttons/Button';


function LogoWrapper({redirectLink = '/', isAuthenticated = true,headerText = '',buttonVariant = 'secondary'}) {
    const navigate = useNavigate();
    const location = useLocation()

  return (
    <div className=' mt-2  mb-4 flex justify-between w-full'>
        <div className='flex items-center justify-center gap-8'>
            <img onClick={()=>navigate(redirectLink)} className='h-12 cursor-pointer' src={Logo}/>
            {headerText && <h1 className='display-d2  hidden md:block'>{headerText}</h1>}
        </div>
        {!isAuthenticated && <Button variant={buttonVariant} onClick={() => navigate("/login")}>Login</Button>}
    </div>
  )
}

export default LogoWrapper

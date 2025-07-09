import React from 'react'
import { Button } from '../Buttons/Button'
import { useNavigate } from 'react-router-dom'
import StyledCard from '../Cards/StyledCard';

function GlobalErrorHandler() {
    const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <StyledCard>
          <div className="flex flex-col items-center">
            <h1 className="text-blue-600 lg:text-6xl">
              Oops...!
            </h1>

          <p className="typography-body text-font-gray mb-4 text-center">
            Something went wrong while loading this page.
            <br />
            Please go back to the previous screen and try again.
          </p>



            <Button variant="primary" onClick={()=>navigate(-1)}>
              Go back
            </Button>

          </div>
        </StyledCard >
      </div >
    </>
  )
}

export default GlobalErrorHandler

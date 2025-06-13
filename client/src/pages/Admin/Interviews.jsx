import React from "react";
import Container from "../../components/Cards/Container";
import Header from "../../components/utility/Header";
import StyledCard from "../../components/Cards/StyledCard";
import CustomCalendar from "../../components/Calendar/CustomCalendar";
import { useAuthContext } from "../../context/AuthProvider";
import { Button } from "../../components/Buttons/Button";
import IconWrapper from "../../components/Cards/IconWrapper";
import { FcGoogle } from "react-icons/fc";
import { googleAuthorize } from "../../services/auth.service";

function Interviews() {
  const { user } = useAuthContext();
  console.log(user.hasAuth)
  const handleGoogleAuthorization = async () => {
      const response = await googleAuthorize();
      if(response?.authorizationUrl){
          window.location.href = response.authorizationUrl;
      }
  }

  return (
    <Container>
      <Header HeaderText="Calendar"  />
      <StyledCard>
        {(user?.hasAuth?.view_calendar && user?.hasAuth?.view_events) ? 
        <CustomCalendar  /> : 
          <div className="w-full">
            <StyledCard backgroundColor={'bg-background-70'} extraStyles="flex w-fit mx-auto flex-col items-center mb-4 gap-4 ">
              <IconWrapper icon={FcGoogle} inheritColor customStrokeWidth={0} size={0} customIconSize={10} />
              <h3>Authorize Google Calendar</h3>
            </StyledCard>
            <p className="text-center typography-body text-font-gray">
              Connect your Google Calendar to sync events.
            </p>
            <p className="text-center mb-4 typography-body text-font-gray">
              Click "Authorize Google" to continue with HireHive.
            </p>
          <div className="flex justify-center ">
            <Button className="" onClick={handleGoogleAuthorization} >Authorize Google</Button>
          </div>          
          </div>}
      </StyledCard>
    </Container>
  );
}

export default Interviews;

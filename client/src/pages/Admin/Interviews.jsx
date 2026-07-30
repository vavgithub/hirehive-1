import React, { useState } from "react";
import Container from "../../components/Cards/Container";
import Header from "../../components/utility/Header";
import StyledCard from "../../components/Cards/StyledCard";
import CustomCalendar from "../../components/Calendar/CustomCalendar";
import { useAuthContext } from "../../context/AuthProvider";
import { Button } from "../../components/Buttons/Button";
import IconWrapper from "../../components/Cards/IconWrapper";
import { FcGoogle } from "react-icons/fc";
import GoogleIcon from "../../svg/Icons/GoogleIcon";
import { googleAuthorize, googleUnAuthorize } from "../../services/auth.service";
import LoaderModal from "../../components/Loaders/LoaderModal";
import { showSuccessToast } from "../../components/ui/Toast";
import { useQueryClient } from "@tanstack/react-query";

function Interviews() {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const isCalendarAuthorized = user?.hasAuth?.view_calendar && user?.hasAuth?.view_events;

  const handleGoogleAuthorization = async () => {
    setLoading(true);
    const response = await googleAuthorize();
    if (response?.authorizationUrl) {
      window.location.href = response.authorizationUrl;
    }
    setLoading(false);
  };

  const handleGoogleUnAuthorization = async () => {
    setLoading(true);
    const response = await googleUnAuthorize();
    if (response.status === "success") {
      queryClient.invalidateQueries(["auth"]);
      showSuccessToast("Success", response?.message ?? "Unauthorized Google Successfully.");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Header HeaderText="Calendar" />
      {loading && <LoaderModal />}
      <StyledCard>
        {isCalendarAuthorized ? (
          <>
            <CustomCalendar />
            <StyledCard backgroundColor={"bg-background-100"} extraStyles={"flex justify-between items-center mt-4"}>
              <div className="flex items-center gap-4">
                <GoogleIcon />
                <h3>Google Workspace</h3>
              </div>
              <Button type="button" onClick={handleGoogleUnAuthorization}>
                Unauthorize
              </Button>
            </StyledCard>
          </>
        ) : (
          <div className="w-full">
            <StyledCard backgroundColor={"bg-background-100"} extraStyles="flex w-fit mx-auto flex-col items-center mb-4 gap-4 ">
              <IconWrapper icon={FcGoogle} inheritColor customStrokeWidth={0} size={0} customIconSize={10} />
              <h3>Authorize Google Calendar</h3>
            </StyledCard>
            <p className="text-center typography-body text-font-gray">
              Connect your Google Calendar to sync events.
            </p>
            <p className="text-center mb-4 typography-body text-font-gray">
              Click &quot;Authorize Google&quot; to continue with HireHive.
            </p>
            <div className="flex justify-center ">
              <Button className="" onClick={handleGoogleAuthorization}>
                Authorize Google
              </Button>
            </div>
          </div>
        )}
      </StyledCard>
    </Container>
  );
}

export default Interviews;

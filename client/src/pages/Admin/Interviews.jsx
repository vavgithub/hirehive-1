import React from "react";
import Container from "../../components/Cards/Container";
import Header from "../../components/utility/Header";
import StyledCard from "../../components/Cards/StyledCard";
import CustomCalendar from "../../components/Calendar/CustomCalendar";

function Interviews() {

  return (
    <Container>
      <Header HeaderText="Interviews" />
      <CustomCalendar />
    </Container>
  );
}

export default Interviews;

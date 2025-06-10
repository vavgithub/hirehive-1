import React from "react";
import Container from "../../components/Cards/Container";
import Header from "../../components/utility/Header";
import StyledCard from "../../components/Cards/StyledCard";
import CustomCalendar from "../../components/Calendar/CustomCalendar";
import Tabs from "../../components/ui/Tabs";
import IconWrapper from "../../components/Cards/IconWrapper";
import { CircleCheck, CircleX } from "lucide-react";
import { useState } from "react";

function Interviews() {
  const [selectedView,setSelectedView] = useState('list')
    const tabs = [
        {
            name: 'list',
            label: 'List',
        },
        {
            name: 'week',
            label: 'Week',
        },
        {
            name: 'month',
            label: 'Month',
        },

    ];
    const handleTabClick = (tab) => {
        setSelectedView(tab);
    };
  return (
    <Container>
      <Header HeaderText="Interviews" rightContent={<Tabs tabs={tabs} activeTab={selectedView} handleTabClick={handleTabClick}  />} />
      <StyledCard>
        <CustomCalendar calendarType={selectedView.toUpperCase()} />
      </StyledCard>
    </Container>
  );
}

export default Interviews;

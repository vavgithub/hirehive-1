import React, { useState } from "react";
import Container from "../../components/Cards/Container";
import Header from "../../components/utility/Header";
import StyledCard from "../../components/Cards/StyledCard";
import { getStageColor, stagingConfig } from "../../config/staging.config";
import { JOB_PROFILES } from "../../config/jobprofile.config";
import IconWrapper from "../../components/Cards/IconWrapper";
import { ChevronDown, ChevronUp } from "lucide-react";
import StyledTabs from "../../components/ui/StyledTabs";

const guideConfig = 
      Object.values(JOB_PROFILES).map((profile) => {
        return {
          key: profile,
          title: profile,
          description: `${profile} based jobs follow this pattern of stages`,
          isExpandable: true,
          children: [
            {
              title: "Portfolio",
              description:
                "Portfolio round in which the portfolios of the candidates are reviewed",
              color: getStageColor("Portfolio"),
              scoreConfig: 5,
            },
            {
              title: "Screening",
              description:
                "Screening round in which the first interviews are conducted with candidate to review the basic requirements for the job role.",
              color: getStageColor("Screening"),
              scoreConfig: {
                total: 30,
                ...Object.entries(
                  stagingConfig[profile]?.find(
                    (stage) => stage.name === "Screening"
                  ).score
                ).reduce((acc, [key, value]) => {
                  acc[key] = {
                    score: value,
                    description: "Description for " + key,
                  };
                  return acc;
                }, {}),
              },
            },
            {
              title: "Design Task",
              description:
                "Design Task round in which the candidates are assigned with design task and are reviewed",
              color: getStageColor("Design Task"),
              scoreConfig: 5,
            },
            {
              title: "Round 1",
              description:
                "Round 1 is the second round of interview after design task to analyze candidates skills based on task submitted",
              color: getStageColor("Round 1"),
              scoreConfig: 5,
            },
            {
              title: "Round 2",
              description:
                "Round 2 is the final round of interview after all analysis and grading in which final decision is made.",
              color: getStageColor("Round 2"),
              scoreConfig: 5,
            },
          ],
        };
      })

const MapperComponent = ({ config, level }) => {

  return (
    config?.length > 0 &&
    config.map((stage, index) => (
      <div
        key={level + index}
        className={`relative ${level === 1 && "mb-16"} ${
          level > 0 ? "guide-dashed-line ml-8 " : ""
        }`}
      >
        <h2
          className={`typography-${
            level === 0 ? "h3 mb-2 " : level === 1 ? "body" : "large-p"
          }  ${
            stage.color
              ? " bg-background-80 w-fit px-6 py-2 rounded-xl flex mb-2 items-center"
              : ""
          } `}
        >
          {stage.color && (
            <span
              className={"inline-block w-4 h-4 mr-4 rounded-full"}
              style={{
                backgroundColor: stage.color,
              }}
            ></span>
          )}
          {stage?.title}
        </h2>
        <p className="typography-body text-font-gray  mb-4">
          {stage?.description}
        </p>
          <>
            {stage?.scoreConfig &&
              (typeof stage?.scoreConfig !== "object" ? (
                <h3 className="typography-h3 mb-6">
                  Score : {stage?.scoreConfig}
                </h3>
              ) : (
                <div>
                  <h3 className="typography-h3 mb-4">Scoring</h3>
                  <StyledCard
                    padding={3}
                    backgroundColor={"bg-background-70"}
                    extraStyles="flex flex-col gap-4 w-full md:w-[50%] mb-6"
                  >
                    {Object.keys(stage.scoreConfig)
                      .filter((scoring) => scoring !== "total")
                      .map((scoring,index) => (
                        <div key={`scoring-${index+1}`}>
                          <p className="typography-body flex justify-between">
                            {scoring}{" "}
                            <span>{stage.scoreConfig[scoring].score}</span>
                          </p>
                          <p className="typography-body text-font-gray">
                            {stage.scoreConfig[scoring].description}
                          </p>
                        </div>
                      ))}
                  </StyledCard>
                </div>
              ))}
            {stage?.children?.length > 0 && (
              <MapperComponent config={stage?.children} level={level + 1} />
            )}
          </>
      </div>
    ))
  );
};

function getTabsConfig(){
    let count = 0;
    const mainTabs = [];
    let tempArr = [];
    for (let profile of Object.values(JOB_PROFILES)) {
        count++
        if (count === Object.values(JOB_PROFILES)?.length) {
            tempArr.push({
                name: profile,
                label: profile.toUpperCase(),
            });
            mainTabs.push(tempArr);
            tempArr = [];
        } else if (tempArr.length < 4) {
            tempArr.push({
                name: profile,
                label: profile.toUpperCase(),
            });
        } else {
            tempArr.push({
                name: profile,
                label: profile.toUpperCase(),
            });
            mainTabs.push(tempArr);
            tempArr = [];
        }
    }
    return mainTabs
}

function Guide() {
  const mainTabs = getTabsConfig();
  const [activeProfile,setActiveProfile] = useState(Object.values(JOB_PROFILES)[0]);

  const handleActiveProfile = (profile) => {
    setActiveProfile(profile)
  }

  return (
    <Container>
      <Header HeaderText="Guide" />
      <StyledCard>
        <h2 className="typography-h2">Job Profiles</h2>
        <p className="typography-body text-font-gray mt-2 mb-4">
          The available job profiles throughout the application
        </p>
        <div className="flex flex-col gap-4 mb-6">
            {mainTabs?.map((tabs,index) => (
                <StyledTabs
                    key={`main-Profile-${index+1}`}
                    handleTabClick={handleActiveProfile}
                    customBgColor="bg-background-80"
                    tabs={tabs}
                    activeTab={activeProfile}
                />
            ))}
        </div>
        {<MapperComponent config={[guideConfig.find(profile => activeProfile === profile.key)]} level={0} />}
      </StyledCard>
    </Container>
  );
}

export default Guide;

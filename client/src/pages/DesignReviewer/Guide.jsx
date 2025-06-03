import React, { useMemo, useState } from "react";
import Container from "../../components/Cards/Container";
import Header from "../../components/utility/Header";
import StyledCard from "../../components/Cards/StyledCard";
import { getStageColor, stagingConfig } from "../../config/staging.config";
import { JOB_PROFILES, JOB_PROFILES_DETAILS } from "../../config/jobprofile.config";
import IconWrapper from "../../components/Cards/IconWrapper";
import { ChevronDown, ChevronUp, Pencil, RotateCcw } from "lucide-react";
import StyledTabs from "../../components/ui/StyledTabs";
import { InputField } from "../../components/Inputs/InputField";
import { Button } from "../../components/Buttons/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../api/axios";
import { useAuthContext } from "../../context/AuthProvider";
import { hasPermission, PERMISSIONS } from "../../config/permissions.config";
import { showErrorToast, showSuccessToast } from "../../components/ui/Toast";
import CustomToolTip from "../../components/Tooltip/CustomToolTip";
import LoaderModal from "../../components/Loaders/LoaderModal";

const updateScreeningParam = async ({title, description, oldKey, jobProfile }) => {
    const response = await axios.post('/admin/update-screening-param',{description, oldKey, jobProfile, title });
    return response.data
}

const resetScreeningParam = async ({paramId, jobProfile }) => {
    const response = await axios.post('/admin/reset-screening-param',{jobProfile, paramId });
    return response.data
}

const getStage = (profile,title) => 
  stagingConfig[profile]?.find(
  (stage) => stage.name === title
)

const guideConfig = 
      Object.values(JOB_PROFILES).map((profile) => {
        const portfolioStage = getStage(profile,"Portfolio")
        const screeningStage = getStage(profile,"Screening")
        const designTaskStage = getStage(profile,"Design Task")
        const round1Stage = getStage(profile,"Round 1")
        const round2Stage = getStage(profile,"Round 2")

        return {
          key: profile,
          title: profile,
          description: JOB_PROFILES_DETAILS[profile]?.description,
          isExpandable: true,
          scoring: [
            {
              title: "Portfolio",
              description:
               portfolioStage?.description,
              color: getStageColor("Portfolio"),
              scoreConfig: 5,
            },
            {
              title: "Screening",
              description:
               screeningStage?.description,
              color: getStageColor("Screening"),
              scoreConfig: {
                total: 30,
                ...Object.entries(
                  screeningStage.score
                ).reduce((acc, [key, value]) => {
                  acc[key] = {
                    score: value,
                    description: screeningStage?.scoreDetails[key]?.description,
                    isEditable : !!screeningStage?.scoreDetails[key]?.isEditable 
                  };
                  return acc;
                }, {}),
              },
            },
            {
              title: "Design Task",
              description:
              designTaskStage?.description,
              color: getStageColor("Design Task"),
              scoreConfig: 5,
            },
            {
              title: "Round 1",
              description:
              round1Stage?.description,
              color: getStageColor("Round 1"),
              scoreConfig: 5,
            },
            {
              title: "Round 2",
              description:
              round2Stage?.description,
              color: getStageColor("Round 2"),
              scoreConfig: 5,
            },
          ],
        };
      })

const ScoringInput = ({scoring,title,setTitle,description,setDescription, handleCancel, handleSave , handleReset ,canReset}) => (
  <div className="flex flex-col gap-4">
    <p className="typography-body flex justify-between">
      {scoring}
      {canReset && 
      <span>
        <CustomToolTip title={'Reset to default'} arrowed>
          <IconWrapper onClick={handleReset} icon={RotateCcw} size={0} customStrokeWidth={4} />
        </CustomToolTip>
      </span>}
    </p>
    <InputField value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Title" />
    <textarea placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} className="custom-textarea" rows={4} />
    <div className="place-self-end flex gap-4">
      <Button onClick={handleCancel} variant="secondary">Cancel</Button>
      <Button onClick={handleSave} variant="primary" >Save</Button>
    </div>
  </div>
)

const MapperComponent = ({ role, customSchema, config, activeProfile, level , scoringState, setScoringState , isLoading , setIsLoading }) => {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const queryClient = useQueryClient();

  const jobBasedScoringSchema = useMemo(()=>{
    if(activeProfile && customSchema){
      return customSchema[activeProfile]
    }
    return []
  },[activeProfile ,customSchema]);

  const handleEditScoring = (scoringTitle) => {
    const selectedScoring = config.find(stage => stage.title === activeProfile)?.scoring?.find(score => score.title === "Screening")?.scoreConfig[scoringTitle];
    const customScoreParam = jobBasedScoringSchema?.find(score => score.defaultKey === scoringTitle)
    setTitle(customScoreParam?.customKey ? customScoreParam?.customKey : scoringTitle)
    setDescription(customScoreParam?.description ? customScoreParam?.description : selectedScoring?.description)
    setScoringState(prev => {
      const resettedPrev = Object.fromEntries(Object.entries(prev)?.map(([key,value])=>([key,false])))
      return {...resettedPrev,[`${parent?.title}-${scoringTitle}`] : true}
    });
  }

  const updateParamMutation = useMutation({
    mutationFn : updateScreeningParam,
    onMutate : () => {
      setIsLoading(true)
    },
    onSuccess : (response) => {
      queryClient.invalidateQueries('auth')
      setIsLoading(false)
      showSuccessToast("Success",response?.message ?? "Updated Scoring Parameters Successfully.")
    },
    onError: (error) => {
      setIsLoading(false)
      console.error("Mutation error", error);
    }
  })

  const resetParamMutation = useMutation({
    mutationFn : resetScreeningParam,
    onMutate : () => {
      setIsLoading(true)
    },
    onSuccess : (response) => {
      queryClient.invalidateQueries('auth')
      setIsLoading(false)
      showSuccessToast("Success",response?.message ?? "Updated Scoring Parameters Successfully.")
    },
    onError: (error) => {
      setIsLoading(false)
      console.error("Mutation error", error);
    }
  })

  const handleCancel = (scoring) => {
    setScoringState(prev => ({...prev,[`${parent?.title}-${scoring}`] : false}));
  }

  const handleSave = (scoring) => {
    setScoringState(prev => ({...prev,[`${parent?.title}-${scoring}`] : false}));

    updateParamMutation.mutate({
      description,
      title,
      oldKey : scoring , 
      jobProfile : activeProfile
    })
  }

  const handleReset = (scoringTitle) => {
    const customScoreParam = jobBasedScoringSchema?.find(score => score.defaultKey === scoringTitle)

    if(customScoreParam?._id && activeProfile){

      resetParamMutation.mutate({
        paramId : customScoreParam?._id,
        jobProfile : activeProfile
      })
      setScoringState(prev => ({...prev,[`${parent?.title}-${scoringTitle}`] : false}));
    }else{
      showErrorToast("Error","Some error occured on Resetting Scoring Parameter.")
    }
  }

  return (
    config?.length > 0 &&
    config.map((stage, index) => (
      <div
        key={level + index}
        className={`relative `}
      >
        <h2 className="pb-2">
          {stage?.title}
        </h2>
        <p className="typography-body text-font-gray ">
          {stage?.description}
        </p>
        {
          stage?.scoring?.length > 0 && 
          <div className="flex flex-col gap-8 mt-8">
            {stage?.scoring?.map(scoringStage => (
              <StyledCard
                backgroundColor={"bg-background-80"}
                key={'basic-scoring' + level + index + scoringStage?.title}
                extraStyles={`relative  `}
              >
                <div className="flex justify-between gap-8">
                  <div>
                    <p className="typography-body mb-2 flex items-center px-6 py-2 bg-background-70 w-fit rounded-xl">
                      {scoringStage.color && (
                        <span
                          className={"inline-block w-4 h-4 mr-4 rounded-full"}
                          style={{
                            backgroundColor: scoringStage.color,
                          }}
                        ></span>
                      )}
                      {scoringStage?.title}
                    </p>
                    <p className="typography-body  text-font-gray ">
                      {scoringStage?.description}
                    </p>
                  </div>
                  {scoringStage?.scoreConfig && (typeof scoringStage?.scoreConfig !== "object") ? (
                      <h4 className="typography-body py-2">
                        Score : {scoringStage?.scoreConfig}
                      </h4>)
                      :  <h4 className="typography-body mb-4">Total Score : 30</h4>
                      }
                </div>
                <div className="flex justify-end">
                  {(scoringStage?.scoreConfig && typeof scoringStage?.scoreConfig === "object") && (
                      <div className="w-full">
                        <div className="flex flex-col gap-4 w-full mt-4">
                          <div className="grid grid-cols-2 gap-4 items-stretch">
                            {/* Fixed Scoring */}
                            <div className="h-full flex flex-col">
                              <p className="typography-body mb-2">Fixed scoring criteria</p>
                              <StyledCard
                                backgroundColor={'bg-background-70'}
                                extraStyles={'flex flex-col gap-4 h-full'}
                              >
                                {Object.keys(scoringStage.scoreConfig)
                                  .filter(scoring => scoring !== "total" && !scoringStage.scoreConfig[scoring]?.isEditable)
                                  .map((scoring, index) => (
                                    <div key={`fixed-scoring-${index + 1}`}>
                                      <div className="grid grid-cols-4 gap-4">
                                        <p className="typography-body col-span-3 flex flex-col gap-2">
                                          <span className="flex gap-2">
                                            {jobBasedScoringSchema?.find(score => score.defaultKey === scoring)?.customKey || scoring}
                                          </span>
                                          <span className="typography-body text-font-gray w-full">
                                            {jobBasedScoringSchema?.find(score => score.defaultKey === scoring)?.description || scoringStage.scoreConfig[scoring].description}
                                          </span>
                                        </p>
                                        <div className="flex justify-between w-full">
                                          <p className={"flex w-full " + ((hasPermission(role, PERMISSIONS.SHOW_EDIT_SCORING) && scoringStage.scoreConfig[scoring]?.isEditable) ? 'items-center justify-between' : ' justify-end')}>
                                            <span>{scoringStage.scoreConfig[scoring].score}</span>
                                            {(hasPermission(role, PERMISSIONS.SHOW_EDIT_SCORING) && scoringStage.scoreConfig[scoring]?.isEditable) &&
                                              <Button variant='iconSec' onClick={() => handleEditScoring(scoring)} type="button" icon={() => <IconWrapper inheritColor size={0} customIconSize={1} icon={Pencil} />} />}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </StyledCard>
                            </div>

                            {/* Dynamic Scoring */}
                            <div className="h-full flex flex-col">
                              <p className="typography-body mb-2">Dynamic scoring criteria</p>
                              <StyledCard
                                backgroundColor={'bg-background-70'}
                                extraStyles={'flex flex-col gap-4 h-full'}
                              >
                                {Object.keys(scoringStage.scoreConfig)
                                  .filter(scoring => scoring !== "total" && scoringStage.scoreConfig[scoring]?.isEditable)
                                  .map((scoring, index) => (
                                    <div key={`dynamic-scoring-${index + 1}`}>
                                      {(scoringStage.scoreConfig[scoring]?.isEditable && scoringState[`${parent?.title}-${scoring}`]) ? (
                                        <ScoringInput
                                          scoring={scoring}
                                          title={title}
                                          setTitle={setTitle}
                                          description={description}
                                          setDescription={setDescription}
                                          handleCancel={() => handleCancel(scoring)}
                                          handleSave={() => handleSave(scoring)}
                                          handleReset={()=> handleReset(scoring)}
                                          canReset={jobBasedScoringSchema?.find(score => score.defaultKey === scoring)}
                                        />
                                      ) : (
                                        <div className={"grid  gap-4 " + (hasPermission(role, PERMISSIONS.SHOW_EDIT_SCORING) ? 'grid-cols-3' : 'grid-cols-4')}>
                                          <p className={"typography-body  flex flex-col gap-2 " + (hasPermission(role, PERMISSIONS.SHOW_EDIT_SCORING) ? 'col-span-2' : 'col-span-3')}>
                                            <span className="flex gap-2">
                                              {jobBasedScoringSchema?.find(score => score.defaultKey === scoring)?.customKey || scoring}
                                            </span>
                                            <span className="typography-body text-font-gray w-full">
                                              {jobBasedScoringSchema?.find(score => score.defaultKey === scoring)?.description || scoringStage.scoreConfig[scoring].description}
                                            </span>
                                          </p>
                                          <div className="flex justify-between w-full">
                                            <p className={"flex w-full " + ((hasPermission(role, PERMISSIONS.SHOW_EDIT_SCORING) && scoringStage.scoreConfig[scoring]?.isEditable) ? 'items-center justify-between' : ' justify-end')}>
                                              <span>{scoringStage.scoreConfig[scoring].score}</span>
                                              {(hasPermission(role, PERMISSIONS.SHOW_EDIT_SCORING) && scoringStage.scoreConfig[scoring]?.isEditable) &&
                                                <Button variant='iconSec' onClick={() => handleEditScoring(scoring)} type="button" icon={() => <IconWrapper inheritColor size={0} customIconSize={1} icon={Pencil} />} />}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                              </StyledCard>
                            </div>
                          </div>
                        </div>
                      </div>

                    )}
                </div>
              </StyledCard>
            ))}
          </div>
        }
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
        } else if (tempArr.length < 3) {
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
  const [editableScoring,setEditableScoring] = useState(Object.values(JOB_PROFILES)?.map(profile =>{ 
    const hasScoring = stagingConfig[profile]?.find(stage => stage.hasSplitScoring)
    return Object.entries(hasScoring.scoreDetails).filter(([key,param]) => param.isEditable ).map(([key,param]) =>({
      [`${profile}-${key}`] : false
    }))
  }).flat(Infinity))

  const { user } = useAuthContext();
  const [isLoading , setIsLoading] = useState(false);

  const handleActiveProfile = (profile) => {
    setActiveProfile(profile)
  }

  return (
    <Container>
      <Header HeaderText="Guide" />
      {isLoading && <LoaderModal />}
      <StyledCard>
        <div className="flex flex-col gap-2 mb-6">
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
        {<MapperComponent isLoading={isLoading} setIsLoading={setIsLoading} role={user?.role} customSchema={user?.companyDetails?.customScreeningParam ?? null} activeProfile={activeProfile} config={[guideConfig.find(profile => activeProfile === profile.key)]} level={0} scoringState={editableScoring} setScoringState={setEditableScoring} />}
      </StyledCard>
    </Container>
  );
}

export default Guide;






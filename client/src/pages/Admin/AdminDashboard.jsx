import React, { useMemo, useState } from 'react'
import StyledCard from '../../components/Cards/StyledCard'
import ApplicationChart from '../../components/Charts/ApplicationChart'
import MuiCustomStylesForDataGrid from '../../components/tableUtilities/MuiCustomStylesForDataGrid'
import { Button } from '../../components/Buttons/Button'
import axios from '../../api/axios'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { industryTypeOptions, LocationOptions } from '../../components/Register/CompanyDetails'
import LoaderModal from '../../components/Loaders/LoaderModal'
import LeaderBadge from '../../svg/Icons/LeaderBadge'
import { FullTimeIcon } from '../../svg/Checkboxes/FullTimeIcons';
import InterviewsChart from '../../components/Charts/InterviewsChart'
import StageBadge from '../../components/ui/StageBadge'

function AdminDashboard() {
  
  const [viewMore,setViewMore] = useState(false);

  const { data : dashboardDetails , isLoading : isDetailsLoading } = useQuery({
      queryKey: ['admin_dashboard'],
      queryFn: () => axios.get('/admin/dashboard').then(res => res.data),
      enabled : true
  })


  return (
    <div className="container mx-4 pt-4 pb-6 ">
      <div className="flex flex-row justify-between mb-4">
        <h1 className='typography-h1'>Dashboard</h1>
        {isDetailsLoading && <LoaderModal/>}
      </div>
      <MuiCustomStylesForDataGrid/>
      {/* Chart + Company Details Section */}
      <div className='flex gap-4'>
        <StyledCard padding={2} extraStyles={'w-[70%]'}>
          <h2 className='typography-h2'>Monthly Application Trends</h2>
          <ApplicationChart dataArray={dashboardDetails?.applications?.monthlyApplications} />
        </StyledCard>
        <StyledCard padding={2} extraStyles={' w-[30%] flex flex-col items-center gap-6'}>
            <div  className=" w-[8rem]  aspect-square overflow-hidden rounded-full">
                <img src={ "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className="object-cover w-full" />
                <input accept="image/*"  type="file" className="hidden"  />
            </div>
            <div>
                <h2 className='typography-h2'>{dashboardDetails?.companyDetails?.name}</h2>
                <p className='text-font-gray typography-small-p flex gap-2 items-center justify-center'>{LocationOptions.find(data=>data.value === dashboardDetails?.companyDetails?.location)?.label} <span className='w-1 h-1 bg-font-gray rounded-full'></span>{industryTypeOptions.find(data=>data.value === dashboardDetails?.companyDetails?.industryType)?.label} </p>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <p className='typography-large-p flex justify-between w-full'><span className='text-font-gray'>Employees</span> <span>{dashboardDetails?.members?.length ?? 0}</span></p>
                <p className='typography-large-p flex justify-between w-full'><span className='text-font-gray'>Active Jobs</span> <span>{dashboardDetails?.activeJobs ?? 0}</span></p>
                <p className='typography-large-p flex justify-between w-full'><span className='text-font-gray'>Applications Recieved</span> <span>{dashboardDetails?.applications?.totalApplicationsCount ?? 0}</span></p>
                <p className='typography-large-p flex justify-between w-full'><span className='text-font-gray'>Upcoming Interviews</span> <span>{dashboardDetails?.interviews?.totalCount ?? 0}</span></p>
            </div>
        </StyledCard>
      </div>

      <div className='flex gap-4 w-full mt-4'>
        <StyledCard padding={2} extraStyles={'w-[50%]'}>
          <h2 className='typography-h2'>Upcoming Interviews</h2>
          {
            dashboardDetails?.interviews?.upcomingInterviews?.length > 0 ? dashboardDetails.interviews.upcomingInterviews.map(interview =>{
              return(
                <StyledCard key={interview?._id} padding={2} backgroundColor={'bg-background-30'} extraStyles={' mt-4 relative'}>
                    <p className='typography-h3  flex items-center gap-2 w-full ' >
                      <StageBadge stage={interview?.jobApplications?.currentStage} customWidth={'w-[25%]'} />-
                      <span className='typography-body font-semibold w-[60%] text-ellipsis overflow-hidden whitespace-nowrap'>{interview?.firstName + " " + interview?.lastName} & {interview?.assignee?.name}</span>
                    </p>
                    <p className='typography-large-p text-font-gray mt-2'>{new Date(interview?.interviewDate).toLocaleString('en-GB', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        hour12: true 
                    })}</p>
              </StyledCard> 
              )
            }) : <p className='typography-body h-full w-full flex justify-center items-center'>No Upcoming Interviews </p>
          }

        </StyledCard>
        <StyledCard padding={2} extraStyles={'w-[50%]'}>
          <h2 className='typography-h2'>Scheduled Interviews</h2>
          <InterviewsChart dataSet={dashboardDetails?.interviews?.stageBasedInterviewsCount} />    
        </StyledCard>
      </div>

      {/* LeaderBoard */}
      <StyledCard padding={2} extraStyles={'mt-4'}>
      <h2 className='typography-h2'>Leaderboard</h2>
        {/* Leading Positions */}
        <div className='mt-2 grid grid-cols-10 gap-2'>
            {/* Single Lead */}
            {
              dashboardDetails?.leaderBoard?.candidates?.length > 0 ? dashboardDetails.leaderBoard.candidates.filter((_,i)=> i < 10).map((candidate,index) => {
                return (
                  <div className='flex flex-col items-center gap-2 relative'>
                  <div className='absolute bottom-6 right-4'>
                    <div className='relative'>
                      <p className='absolute font-bricolage font-bold flex justify-center items-center w-full h-full'>{index + 1}</p>
                      <LeaderBadge />
                    </div>                
                  </div>
                  <div  className=" w-[5rem] aspect-square overflow-hidden rounded-full ">
                    <img src={candidate?.profilePictureUrl ? candidate?.profilePictureUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className="object-cover w-full" />
                  </div>
                  <p className='typography-large-p whitespace-nowrap w-[8   0%] overflow-hidden text-ellipsis text-center'>{candidate?.firstName + " " + candidate?.lastName}</p>
                </div>
                )
              })
              : <p className='typography-body h-full w-full flex justify-center items-center'>No Candidates </p>
            }
        </div>

        <div className='mt-4 grid grid-cols-3 gap-4'>
          
            {
              dashboardDetails?.leaderBoard?.candidates?.length > 0 && dashboardDetails.leaderBoard.candidates.filter((_,i)=> viewMore ? i >= 0 : i < 6).map((candidate) => {
                return (
                  <StyledCard padding={2} backgroundColor={'bg-background-70'} extraStyles={'flex justify-between'}>
                    <div className='flex gap-2'>
                      <div  className=" w-[3rem] h-[3rem] aspect-square overflow-hidden rounded-full ">
                        <img src={candidate?.profilePictureUrl ? candidate?.profilePictureUrl :"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className="object-cover w-full" />
                      </div>
                      <div>
                        <p className='typography-h3'>{candidate?.firstName + " " + candidate?.lastName}</p>
                        <p className='typography-large-p text-font-gray'>{candidate?.email}</p>
                      </div>
                    </div>
                    <div className='flex flex-col items-end'>
                        <p className='typography-small-p text-font-gray'>Score</p>
                        <p className='typography-h3'>{candidate?.assessmentScore ?? 0}</p>
                    </div>
                  </StyledCard>
                )
              })
            }

        </div>
        {dashboardDetails?.leaderBoard?.candidates?.length > 6 && <div className='w-full flex justify-end mt-4'><Button onClick={()=>setViewMore(!viewMore)} type="button" variant="primary">{viewMore? "View Less" :"View More"}</Button></div>}
      </StyledCard>
    </div>
  )
}

export default AdminDashboard

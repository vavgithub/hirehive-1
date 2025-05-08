import React, { useMemo, useState } from 'react'
import StyledCard from '../../components/Cards/StyledCard'
import ApplicationChart from '../../components/Charts/ApplicationChart'
import MuiCustomStylesForDataGrid from '../../components/tableUtilities/MuiCustomStylesForDataGrid'
import axios from '../../api/axios'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { industryTypeOptions, LocationOptions } from '../../components/Register/CompanyDetails'
import LoaderModal from '../../components/Loaders/LoaderModal'
import InterviewsChart from '../../components/Charts/InterviewsChart'
import StageBadge from '../../components/ui/StageBadge'
import IconWrapper from '../../components/Cards/IconWrapper'
import { CalendarDays, ChevronDown, ChevronUp, ClipboardCheck, Users } from 'lucide-react'
import StatsGrid from '../../components/ui/StatsGrid'
import { DataGrid } from '@mui/x-data-grid'
import { Avatar } from '@mui/material'
import { UNKNOWN_PROFILE_PICTURE_URL } from '../../utility/config'
import { formatIntoDateString } from '../../utility/formatTime'
import { formatUTCToLocalTimeAuto, timezone, UTCToDateFormatted } from '../../utility/timezoneConverter'
import { formatPhoneNumber } from '../../components/Form/PhoneInputField'
import Container from '../../components/Cards/Container'
import Header from '../../components/utility/Header'

function AdminDashboard() {

  const [viewMore, setViewMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [currentLeaderboardPage, setCurrentLeaderboardPage] = useState(0);
  const [leaderboardPageSize, setLeaderboardPageSize] = useState(5);

  const [selectedChartFilter, setSelectedChartFilter] = useState('monthly');

  const navigate = useNavigate();

  const { data: dashboardDetails, isLoading: isDetailsLoading } = useQuery({
    queryKey: ['admin_dashboard'],
    queryFn: () => axios.get(`/admin/dashboard?tz=${timezone}`).then(res => res.data),
    refetchOnWindowFocus: false,
    enabled: true
  })

  const leaderBoardStats = [
    { title: 'Unique Candidates', value: dashboardDetails?.leaderBoard?.totalUniqueCandidatesCount || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Users} /> },
    { title: 'Assessments', value: dashboardDetails?.leaderBoard?.totalAssessmentsDone || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={ClipboardCheck} /> },
  ];

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 230,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className=" flex items-center gap-2 h-12 pl-1">
          <Avatar src={params?.row?.profilePictureUrl || UNKNOWN_PROFILE_PICTURE_URL} sx={{ width: 32, height: 32 }} />
          <p className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{params?.row?.firstName + " " + params?.row?.lastName ?? ""}</p>
        </div>
      )
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 230,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      renderCell: (params) => (
        <p className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{params?.row?.email}</p>
      )
    },
    {
      field: 'phone',
      headerName: 'Phone',
      sortable: false,
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => (<>{formatPhoneNumber(params.value)}</>)
    },
    {
      field: 'score',
      headerName: 'Score',
      headerAlign: "center",
      width: 140,
      disableColumnMenu: true,
      renderCell: (params) => {
        const score = params?.row?.assessmentScore
        return (
          <p className='text-center'>
            {score}
          </p>
        );
      },
    },
    {
      field: 'hourlyRate',
      headerName: 'Hourly Rate',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <span className='h-full flex items-center justify-center'>
          {(params.value === undefined || params.value === 0) ? "-" : params.value}

        </span>
      )
    }, {
      field: 'currentCTC',
      headerName: 'Current CTC',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <span className='h-full flex items-center justify-center'>
          {!params?.value || params.value === 0 ? "-" : params.value}
        </span>
      )
    }, {
      field: 'expectedCTC',
      headerName: 'Expected CTC',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <span className='h-full flex items-center justify-center'>
          {!params?.value || params.value === 0 ? "-" : params.value}
        </span>
      )
    }
  ]

  const jobColumns = [
    {
      field: 'jobTitle',
      headerName: 'Job Title',
      width: 230,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
    },
    {
      field: 'jobProfile',
      headerName: 'Job Profile',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
    },
    {
      field: 'workplaceType',
      headerName: 'Workplace',
      sortable: false,
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: 'applyClickCount',
      headerName: 'Engagement',
      headerAlign: "center",
      align: 'center',
      width: 140,
      disableColumnMenu: true,
    },
    {
      field: 'processed',
      headerName: 'Processed Applications',
      width: 160,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    }, {
      field: 'applied',
      headerName: 'Applied Candidates',
      width: 160,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
    }, {
      field: 'createdAt',
      headerName: 'Posted On',
      width: 180,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <p>{formatIntoDateString(params.value)}</p>
      )
    }
  ]

  const handleLeaderBoardRowClick = (params) => {
    navigate(`/admin/candidates/view-candidate/${params?.row?._id}/${params?.row?.jobApplications?.jobId}`)
  }

  const handleJobRowClick = (params) => {
    navigate(`/admin/jobs/view-job/${params?.row?._id}`)
  }

  return (
    <Container>
      <Header HeaderText="Dashboard" />
      <StyledCard padding={2} extraStyles={'w-full'}>


        <div className="">

          {isDetailsLoading && <LoaderModal />}
        </div>
        <MuiCustomStylesForDataGrid />
        {/* Chart + Company Details Section */}
        <div className='flex gap-4'>
          <StyledCard backgroundColor={'bg-background-80'} extraStyles={'w-[70%]'}>
            <h2 className='typography-h2'>Application Trends</h2>
            <div className='flex my-2 gap-2'>
              <p onClick={() => setSelectedChartFilter('monthly')} className={(selectedChartFilter === 'monthly' ? 'bg-accent-300 text-accent-100' : 'bg-background-60 text-font-gray ') + ' px-6 py-2 typography-large-p rounded-xl cursor-pointer'}>Monthly</p>
              <p onClick={() => setSelectedChartFilter('weekly')} className={(selectedChartFilter === 'weekly' ? 'bg-accent-300 text-accent-100' : 'bg-background-60 text-font-gray ') + ' px-6 py-2 typography-large-p rounded-xl cursor-pointer'}>Weekly</p>
              <p onClick={() => setSelectedChartFilter('daily')} className={(selectedChartFilter === 'daily' ? 'bg-accent-300 text-accent-100' : 'bg-background-60 text-font-gray ') + ' px-6 py-2 typography-large-p rounded-xl cursor-pointer'}>Daily</p>
              <p onClick={() => setSelectedChartFilter('yesterday')} className={(selectedChartFilter === 'yesterday' ? 'bg-accent-300 text-accent-100' : 'bg-background-60 text-font-gray ') + ' px-6 py-2 typography-large-p rounded-xl cursor-pointer'}>Yesterday</p>
            </div>
            <ApplicationChart type={selectedChartFilter} dataArray={selectedChartFilter === "weekly" ? dashboardDetails?.applications?.weeklyApplications : selectedChartFilter === 'daily' ? dashboardDetails?.applications?.dailyApplications : selectedChartFilter === 'yesterday' ? dashboardDetails?.applications?.yesterdaysApplications : dashboardDetails?.applications?.monthlyApplications} />
          </StyledCard>
          <StyledCard backgroundColor={'bg-background-80'} padding={2} extraStyles={' w-[30%] flex flex-col items-center gap-6'}>
            <div className=" w-[8rem]  aspect-square overflow-hidden rounded-full">
              <img src={dashboardDetails?.companyDetails?.logoUrl ? dashboardDetails?.companyDetails?.logoUrl : `${UNKNOWN_PROFILE_PICTURE_URL}`} alt="LOGO" className="object-cover w-full" />
              <input accept="image/*" type="file" className="hidden" />
            </div>
            <div>
              <h2 className='typography-h2 text-center'>{dashboardDetails?.companyDetails?.name}</h2>
              <p className='text-font-gray typography-large-p flex gap-2 items-center justify-center'>{LocationOptions.find(data => data.value === dashboardDetails?.companyDetails?.location)?.label} <span className='w-1 h-1 bg-font-gray rounded-full'></span>{industryTypeOptions.find(data => data.value === dashboardDetails?.companyDetails?.industryType)?.label} </p>
            </div>
            <div className='typography-large-p w-full flex flex-col gap-2'>
              <p className='flex justify-between w-full'><span className='text-font-gray'>Employees</span> <span>{dashboardDetails?.members?.length ?? 0}</span></p>
              <p className='flex justify-between w-full'><span className='text-font-gray'>Active Jobs</span> <span>{dashboardDetails?.activeJobs ?? 0}</span></p>
              <p className='flex justify-between w-full'><span className='text-font-gray'>Applications Recieved</span> <span>{dashboardDetails?.applications?.totalApplicationsCount ?? 0}</span></p>
              <p className='flex justify-between w-full'><span className='text-font-gray'>Upcoming Interviews</span> <span>{dashboardDetails?.interviews?.totalCount ?? 0}</span></p>
            </div>
          </StyledCard>
        </div>

        <div className='flex gap-4 w-full mt-4'>
          <StyledCard backgroundColor={'bg-background-80'} extraStyles={'overflow-hidden w-[45%]'}>
            <h2 className='typography-h2'>Upcoming Interviews</h2>
            {
              dashboardDetails?.interviews?.upcomingInterviews?.length > 0 ? dashboardDetails.interviews.upcomingInterviews.map(interview => {
                return (
                  <StyledCard onClick={() => navigate(`/admin/candidates/view-candidate/${interview?._id}/${interview?.jobApplications?.jobId}`)} key={interview?._id} padding={2} backgroundColor={'bg-background-70'} extraStyles={'mt-4 relative cursor-pointer hover:bg-background-60'}>
                    <p className='typography-h3  flex items-center justify-between gap-2 w-full ' >
                      <StageBadge stage={interview?.jobApplications?.currentStage} customWidth={'w-fit'} />
                      <span className='typography-large-p h-full text-font-gray flex gap-2 items-center'><IconWrapper isInActiveIcon size={0} icon={CalendarDays} />{UTCToDateFormatted(interview?.interviewDate)} at {formatUTCToLocalTimeAuto(interview?.interviewDate)}</span>
                    </p>
                    <div className='mt-2 flex max-w-full'>
                      <div className='border-r border-font-gray w-[50%] overflow-hidden'>
                        <p className='typography-h3 whitespace-nowrap text-ellipsis overflow-hidden'>{interview?.firstName + " " + interview?.lastName}</p>
                        <p className='typography-large-p text-font-gray'>Candidate</p>
                      </div>
                      <div className=' w-[50%]'>
                        <p className='typography-h3 text-end whitespace-nowrap text-ellipsis overflow-hidden'>{interview?.assignee?.firstName + " " + interview?.assignee?.lastName}</p>
                        <p className='typography-large-p text-font-gray text-end'>{interview?.assignee?.role ?? "Design Reviewer"}</p>
                      </div>
                    </div>
                  </StyledCard>
                )
              }) : <p className='typography-body h-full w-full flex justify-center items-center'>No Upcoming Interviews </p>
            }

          </StyledCard>
          <StyledCard backgroundColor={'bg-background-80'} extraStyles={'w-[55%]'}>
            <h2 className='typography-h2'>Interviews</h2>
            <InterviewsChart dataSet={dashboardDetails?.interviews?.stageBasedInterviewsCount} />
          </StyledCard>
        </div>

        {/* Top Performing Jobs */}
        <StyledCard backgroundColor={'bg-background-80'} extraStyles={'mt-4 max-w-full '}>
          <h2 className='typography-h2 mb-2 whitespace-nowrap'>Top Performing Jobs </h2>
          <DataGrid
            rows={dashboardDetails?.jobsWithStats ?? []}
            columns={jobColumns}
            autoHeight
            paginationModel={{ page: currentPage, pageSize: pageSize }}
            onPaginationModelChange={(paginationModel) => {
              const { page, pageSize } = paginationModel;
              setCurrentPage(page); // Update your state or perform actions for page change
              setPageSize(pageSize); // Update your state or perform actions for page size change
            }}
            getRowId={(row) => `${row._id}`} // Create a unique ID for each row
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'first-row' : 'second-row'
            }
            localeText={{ noRowsLabel: <p className='typography-body'>No Candidates</p> }}
            pageSizeOptions={[5, 10, 20, 30, 40, 50]}
            onRowClick={(params) => handleJobRowClick(params)}
          />
        </StyledCard>
        {/* LeaderBoard */}
        <StyledCard padding={2} extraStyles={'mt-4'}>
          <h2 className='typography-h2 mb-2'>Leaderboard</h2>
          <StatsGrid stats={leaderBoardStats} />

          {/* Table for LeaderBoard */}
          <div className='mt-4'>
            <DataGrid
              rows={dashboardDetails?.leaderBoard?.candidates ?? []}
              columns={columns}
              autoHeight
              paginationModel={{ page: currentLeaderboardPage, pageSize: leaderboardPageSize }}
              onPaginationModelChange={(paginationModel) => {
                const { page, pageSize } = paginationModel;
                setCurrentLeaderboardPage(page); // Update your state or perform actions for page change
                setLeaderboardPageSize(pageSize); // Update your state or perform actions for page size change
              }}
              getRowId={(row) => `${row._id}`} // Create a unique ID for each row
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'first-row' : 'second-row'
              }
              localeText={{ noRowsLabel: <p className='typography-body'>No Candidates</p> }}
              pageSizeOptions={[5, 10, 20, 30, 40, 50]}
              onRowClick={(params) => handleLeaderBoardRowClick(params)}
            />
          </div>
        </StyledCard>
      </StyledCard>
    </Container>
  )
}

export default AdminDashboard

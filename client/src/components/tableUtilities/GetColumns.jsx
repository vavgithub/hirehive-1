import { Avatar } from "@mui/material";
import { AssignmentIconStroke } from "../../svg/AssignmentIcon";
import CustomToolTip from "../utility/CustomToolTip";
import FileMainIcon from "../../svg/FileMainIcon";
import WebsiteMainIcon from "../../svg/WebsiteMainIcon";
import ResumeIcon from "../../svg/ResumeIcon";
import AssigneeSelector from "../utility/AssigneeSelector";
import { Move, MoveActive } from "../../svg/Buttons/Move";
import { Reject, RejectActive } from "../../svg/Buttons/Reject";
import { getRatingIcon } from "../utility/RatingSelector";
import StatusBadge from "../ui/StatusBadge";
import StageBadge from "../ui/StageBadge";
import { ensureAbsoluteUrl } from "../../utility/ensureAbsoluteUrl";

const getCommonColumns = (handleDocumentClick) => [
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 250,
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (params, row) => {
        const name = `${row?.firstName || ''} ${row?.lastName || ''}`
        const hasGivenAssessment = row.hasGivenAssessment;
        const profilePictureUrl = row?.profilePictureUrl ?? "";
        return {
          name,
          hasGivenAssessment,
          profilePictureUrl
        }
      },
      renderCell: (params) => (
        <div className="name-cell flex items-center gap-2 h-12">
          <Avatar src={params?.value?.profilePictureUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} sx={{ width: 32, height: 32 }}/>
          <p className='flex items-center gap-2'>{params.value.name}
            {params.value.hasGivenAssessment && 
            <span>
                <AssignmentIconStroke  />
            </span>}
          </p>
          <div className="hover-icons h-full flex items-center"
            onClick={(event) => event.stopPropagation()}
          >
            {params.row.portfolio && (
              <a href={ensureAbsoluteUrl(params.row.portfolio)} target="_blank" rel="noopener noreferrer" className="icon-link">
                <CustomToolTip title={'Portfolio'} arrowed>
                  <FileMainIcon sizeClasses={'w-9 h-9'} />
                </CustomToolTip>
              </a>
            )}
            {params.row.website && (
              <a href={ensureAbsoluteUrl(params.row.website)} target="_blank" rel="noopener noreferrer" className="icon-link ">
                <CustomToolTip title={'Website'} arrowed>
                  <WebsiteMainIcon sizeClasses={'w-9 h-9'} />
                </CustomToolTip>
              </a>
            )}
            {params.row.resumeUrl && (
              <button onClick={() => handleDocumentClick(params.row.resumeUrl)} className="icon-link">
                <CustomToolTip title='Resume' arrowed>
                  <ResumeIcon sizeClasses={'w-9 h-9'}/>
                </CustomToolTip>
              </button>
            )}
          </div>
        </div>
      ),
    },
    {
      field: 'currentStage',
      headerName: 'Stage',
      width: 200,
      align:'left',
      headerAlign : 'left',
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className='h-full flex items-center justify-start'>
          <StageBadge stage={params.value} />
        </div>
      )
    },
  ];

  const getExpAndCtcColumns = (role) => [
    ...(role === 'Hiring Manager' ? [
      {
        field: 'currentCTC',
        headerName: 'Current CTC',
        width: 130,
        align :'center',
        headerAlign : 'center',
        disableColumnMenu: true,
      }, 
      {
        field: 'expectedCTC',
        headerName: 'Expected CTC',
        width: 130,
        align :'center',
        headerAlign : 'center',
        disableColumnMenu: true,
      },
    ] : []), 
    {
      field: 'experience',
      headerName: "Experience",
      width: 130,
      align:'center',
      headerAlign : 'center',
      disableColumnMenu: true,
    },
  ]

  const getInfoColumns =  () => [
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
      sortable: false,
      disableColumnMenu: true,
      renderCell : (params) =>(
        <CustomToolTip title={params.value} arrowed size={2}>
          <p className='w-full font-outfit text-white overflow-hidden text-start whitespace-nowrap text-ellipsis'>{params.value}</p>
        </CustomToolTip>
      )
    },
    
    {
      field: 'phone',
      headerName: 'Phone',
      sortable: false,
      width: 130,
      disableColumnMenu: true,
    },
  ]

  export const getReadOnlyColumns = (role,handleDocumentClick)=> {

    return ([
      ...getCommonColumns(handleDocumentClick),
      {
        field: 'status',
        headerName: 'Status',
        width: 200,
        align:'center',
        headerAlign : 'left',
        disableColumnMenu: true,
        renderCell: (params) => (
          <div className='h-full flex items-center justify-start'>
            <StatusBadge status={params.row.status} />
          </div>
        ),
      },
      ...getExpAndCtcColumns(role),
      {
        field: 'jobTitle',
        headerName: 'Applied For',
        width: 200,
        align:'center',
        headerAlign : 'center',
        disableColumnMenu: true,
        renderCell : (params) =>(
          <p className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{params.value}</p>
        )
      },
      ...getInfoColumns()  
    ])
  };

  export const getDefaultColumns = (role,canMove,canReject,handleAssigneeChange,handleMoveClick,handleRejectClick,handleRatingClick,handleDocumentClick) => [
    ...getCommonColumns(handleDocumentClick),
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      disableColumnMenu: true,
      valueGetter: (value,row) =>{
        const currentStage = row.currentStage;
        const status = row.stageStatuses[currentStage]?.status || 'Unknown';
        return status;
      }, 
      renderCell: (params) => {
        const status = params.value
        return (
          <div className='h-full flex items-center'>
            <StatusBadge status={status} />
          </div>
        );
      },
    },
    {
      field: 'score',
      headerName: 'Score',
      headerAlign : "center",
      width: 120,
      disableColumnMenu: true,
      valueGetter: (value,row) =>{
        const currentStage = row.currentStage;
        let score = 0;
        if(currentStage === "Screening"){
          let attitudeScore = parseInt(row.stageStatuses[currentStage]?.score?.Attitude ?? 0);
          let communicationScore = parseInt(row.stageStatuses[currentStage]?.score?.Communication ?? 0);
          let uxScore = parseInt(row.stageStatuses[currentStage]?.score?.UX ?? 0);
          let uiScore = parseInt(row.stageStatuses[currentStage]?.score?.UI ?? 0);
          let techScore = parseInt(row.stageStatuses[currentStage]?.score?.Tech ?? 0);
          let budgetScore = parseInt(row.stageStatuses[currentStage]?.score?.Budget ?? 0);
          score = attitudeScore + communicationScore + uiScore + uxScore + techScore + budgetScore; 
        }else{
          score = row.stageStatuses[currentStage]?.score || 0;
        }
        
        return score;
      }, 
      renderCell: (params) => {
        const score = params.value
        return (
          <p className='text-center'>
            {score}
          </p>
        );
      },
    },
    {
      field: 'assignee',
      headerName: 'Assignee',
      width: 100,
      disableColumnMenu: true,
      valueGetter: (value,row) => {
        return row.stageStatuses[row.currentStage]?.assignedTo
      },
      renderCell: (params) => {
        const isDisabled = params?.row?.stageStatuses[params?.row?.currentStage]?.status === 'Reviewed' || 
        params?.row?.stageStatuses[params?.row?.currentStage]?.status === 'Rejected';  
        return (
          <div className='flex items-center justify-center h-full'
            onClick={(event) => event.stopPropagation()}
          >
            <AssigneeSelector
              mode="icon"
              disabled={isDisabled}
              value={params.row.stageStatuses[params.row.currentStage]?.assignedTo}
              onChange={(newAssignee) => handleAssigneeChange(
                params.row._id,
                params.row.currentStage,
                newAssignee
              )}
              onSelect={() => { }}
            />
          </div>
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className='flex h-full items-center gap-2'
          onClick={(event) => event.stopPropagation()}
        >
          <button
            onClick={() => handleMoveClick(params.row)}
            disabled={(params?.row?.stageStatuses[params?.row?.currentStage]?.status === "Reviewed" && params?.row?.stageStatuses[params?.row?.currentStage]?.scheduledDate) || !canMove(params.row)}
          >
            {!(params?.row?.stageStatuses[params?.row?.currentStage]?.status === "Reviewed" && params?.row?.stageStatuses[params?.row?.currentStage]?.scheduledDate) && canMove(params.row) ? <MoveActive /> : <Move />}
          </button>
          <button
            onClick={() => handleRejectClick(params.row)}
            disabled={(params?.row?.stageStatuses[params?.row?.currentStage]?.status === "Reviewed" && params?.row?.stageStatuses[params?.row?.currentStage]?.scheduledDate) || !canReject(params.row)}
          >
            {!(params?.row?.stageStatuses[params?.row?.currentStage]?.status === "Reviewed" && params?.row?.stageStatuses[params?.row?.currentStage]?.scheduledDate) && canReject(params.row) ? <RejectActive /> : <Reject />}
          </button>
          <button className={(params?.row?.stageStatuses[params?.row?.currentStage]?.status === "Reviewed" && params?.row?.stageStatuses[params?.row?.currentStage]?.scheduledDate) || params?.row?.stageStatuses[params?.row?.currentStage]?.status === "Rejected" ? "text-font-gray" : "text-white"} disabled={(params?.row?.stageStatuses[params?.row?.currentStage]?.status === "Reviewed" && params?.row?.stageStatuses[params?.row?.currentStage]?.scheduledDate) || params?.row?.stageStatuses[params?.row?.currentStage]?.status === "Rejected"} onClick={(e) => handleRatingClick(e, params.row)}>
            {getRatingIcon(params.row.rating)}
          </button>
        </div>
      )
    },
    ...getExpAndCtcColumns(role),
    ...getInfoColumns()  
  ];
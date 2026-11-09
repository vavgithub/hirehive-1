import CustomToolTip from "../Tooltip/CustomToolTip";
import { GeodeAvatar } from '@/components/geode/Avatar';
import AssigneeSelector from "../MUIUtilities/AssigneeSelector";
import { getRatingIcon } from "../MUIUtilities/RatingSelector";
import StatusBadge from "../ui/StatusBadge";
import StageBadge from "../ui/StageBadge";
import { ensureAbsoluteUrl } from "../../utility/ensureAbsoluteUrl";
import IconWrapper from "../Cards/IconWrapper";
import { CircleCheck, CircleX, ClipboardCheck, FileUser, FolderOpen, Globe, Paintbrush } from '@/components/geode/icons';
import { formatPhoneNumber } from "../Form/PhoneInputField";
import { hasPermission, PERMISSIONS } from "../../config/permissions.config";
import ShortlistSparkleIcon from "../../svg/Icons/ShortlistSparkleIcon";

const getCommonColumns = (handleDocumentClick) => [
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 250,
    cellClassName: '',
    headerClassName: '',
    sortable: false,
    disableColumnMenu: true,
    valueGetter: (params, row) => {
      const name = `${row?.firstName || ''} ${row?.lastName || ''}`
      const hasGivenAssessment = row.assessmentResponse;
      const profilePictureUrl = row?.profilePictureUrl ?? "";
      return {
        name,
        hasGivenAssessment,
        profilePictureUrl
      }
    },
    renderCell: (params) => {
      return(
      <div className="name-cell inline-flex items-center gap-geode-2">
        <span className="geode-avatar-sm">
          <GeodeAvatar src={params?.value?.profilePictureUrl} name={params.value.name} />
        </span>
        <p className='flex items-center gap-2'>{params.value.name}
          {params.value.hasGivenAssessment &&
            <span>
              <IconWrapper size={3} customIconSize={1} icon={ClipboardCheck} />
            </span>}
        </p>
        <div className="hover-icons flex items-center"
          onClick={(event) => event.stopPropagation()}
        >
          {params.row.portfolio && (
            <a href={ensureAbsoluteUrl(params.row.portfolio)} target="_blank" rel="noopener noreferrer" className="icon-link">
              <CustomToolTip title={'Portfolio'} arrowed>
                <IconWrapper hasBg size={3} icon={FolderOpen} />
              </CustomToolTip>
            </a>
          )}
          {params.row.website && (
            <a href={ensureAbsoluteUrl(params.row.website)} target="_blank" rel="noopener noreferrer" className="icon-link ">
              <CustomToolTip title={'Website'} arrowed>
                <IconWrapper hasBg size={3} icon={Globe} />
              </CustomToolTip>
            </a>
          )}
          {params.row.resumeUrl && (
            <button onClick={() => handleDocumentClick(params.row.resumeUrl)} className="icon-link">
              <CustomToolTip title='Resume' arrowed>
                <IconWrapper hasBg size={3} icon={FileUser} />
              </CustomToolTip>
            </button>
          )}
        </div>
      </div>
    )},
  },
  {
    field: 'currentStage',
    headerName: 'Stage',
    width: 200,
    align: 'left',
    sortable: false,
    headerAlign: 'left',
    disableColumnMenu: true,
    renderCell: (params) => (
      <div className='h-full flex items-center justify-start gap-2'>
        <StageBadge withBg={false} stage={params.value} />
        {params.row.shortlisted === true &&
        typeof (params.row.stageStatuses?.Portfolio?.aiScore ?? params.row.aiScore) === 'number' &&
        params.row.jobProfile === 'Brand Designer' ? (
          <CustomToolTip title="Shortlisted by AI" arrowed>
            <IconWrapper hasBg size={3} icon={ShortlistSparkleIcon} />
          </CustomToolTip>
        ) : (params.row.aiTriggerStatus === 'awaiting_discovery' ||
            params.row.aiTriggerStatus === 'permanently_failed') ? (
          <CustomToolTip
            title={
              <div>
                <div style={{ fontWeight: 600 }}>Needs human evaluation</div>
                <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>This portfolio requires human evaluation</div>
              </div>
            }
            arrowed
          >
            <IconWrapper hasBg size={3} icon={Paintbrush} />
          </CustomToolTip>
        ) : null}
      </div>
    )
  },
];

const getExpCols = () => [
    {
    field: 'experience',
    headerName: "Experience",
    width: 130,
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
  },
]

const getCtcColumns = (role, disableCTC = false, disableHourly = false) => [
  ...(hasPermission(role,PERMISSIONS.SHOW_TABLE_BUDGET_DETAILS) ? [
    ...(disableHourly ? [] : [{
      field: 'hourlyRate',
      secondary: true,
      headerName: 'Hourly Rate',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <span className='h-full flex items-center justify-center'>
          {(params.value === undefined || params.value === 0) ? "-" : params.value}

        </span>
      )
    }]),
    ...(disableCTC ? [] : [{
      field: 'currentCTC',
      secondary: true,
      headerName: 'Current CTC',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <span className='h-full flex items-center justify-center'>
          {!params?.value || params.value === 0 ? "-" : params.value}
        </span>
      )
    }]),
    ...(disableCTC ? [] : [{
      field: 'expectedCTC',
      secondary: true,
      headerName: 'Expected CTC',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <span className='h-full flex items-center justify-center'>
          {!params?.value || params.value === 0 ? "-" : params.value}
        </span>
      )
    }]),
  ] : []),
]

const getInfoColumns = () => [
  {
    field: 'email',
    secondary: true,
    headerName: 'Email',
    width: 220,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <CustomToolTip title={params.value} arrowed size={2}>
        <span className="break-all">{params.value}</span>
      </CustomToolTip>
    )
  },

  {
    field: 'phone',
    secondary: true,
    headerName: 'Phone',
    sortable: false,
    width: 130,
    disableColumnMenu: true,
    renderCell: (params) => ( <>{formatPhoneNumber(params.value)}</> )
  },
]

const getAssigneeColumn = (handleAssigneeChange, isClosed = false) => ({
  field: 'assignee',
  headerName: 'Assignee',
  sortable: false,
  width: 220,
  disableColumnMenu: true,
  valueGetter: (value, row) => row.stageStatuses?.[row.currentStage]?.assignedTo,
  renderCell: (params) => {
    const isDisabled = params?.row?.stageStatuses?.[params?.row?.currentStage]?.status === 'Reviewed' ||
      params?.row?.stageStatuses?.[params?.row?.currentStage]?.status === 'Rejected' || isClosed;
    return (
      <div className='flex items-center justify-center h-full'
        onClick={(event) => event.stopPropagation()}
      >
        <AssigneeSelector
          disabled={isDisabled}
          value={params.row.stageStatuses?.[params.row.currentStage]?.assignedTo}
          onChange={(newAssignee) => handleAssigneeChange(
            params.row._id,
            params.row.currentStage,
            newAssignee,
            params.row.jobId
          )}
          onSelect={() => { }}
        />
      </div>
    )
  },
});

export const getReadOnlyColumns = (role, handleDocumentClick, disableCTC, disableHourly, handleAssigneeChange = () => {}) => {

  return ([
    ...getCommonColumns(handleDocumentClick),
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      align: 'center',
      sortable: false,
      headerAlign: 'left',
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className='h-full flex items-center justify-start'>
          <StatusBadge status={params.row.status} />
        </div>
      ),
    },
    ...getExpCols(),
    getAssigneeColumn(handleAssigneeChange),
    ...getCtcColumns(role, disableCTC, disableHourly),
    {
      field: 'jobTitle',
      headerName: 'Applied For',
      width: 200,
      align: 'center',
      sortable: false,
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => params.value
    },
    ...getInfoColumns()
  ])
};

export const getDefaultColumns = (role, canMove, canReject, handleAssigneeChange, handleMoveClick, handleRejectClick, handleRatingClick, handleDocumentClick, isClosed,disableCTC,disableHourly) => [
  ...getCommonColumns(handleDocumentClick),
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    sortable: false,
    disableColumnMenu: true,
    valueGetter: (value, row) => {
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
  ...getExpCols(),
  getAssigneeColumn(handleAssigneeChange, isClosed),
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 280,
    disableColumnMenu: true,
    renderCell: (params) => {
      const stageStatus = params?.row?.stageStatuses[params?.row?.currentStage]
      const locked = stageStatus?.status === "Reviewed" && stageStatus?.scheduledDate
      const moveDisabled = locked || !canMove(params.row) || isClosed
      const rejectDisabled = locked || !canReject(params.row) || isClosed
      const rateDisabled = locked || stageStatus?.status === "Rejected" || isClosed
      return (
      <div className='flex h-full items-center gap-2'
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm"
          aria-label="Move stage"
          onClick={() => handleMoveClick(params.row)}
          disabled={moveDisabled}
        >
          <IconWrapper icon={CircleCheck} size={0} customIconSize={5} isInActiveIcon={moveDisabled} />
          Move
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm"
          aria-label="Reject candidate"
          onClick={() => handleRejectClick(params.row)}
          disabled={rejectDisabled}
        >
          <IconWrapper icon={CircleX} size={0} customIconSize={5} isInActiveIcon={rejectDisabled} />
          Reject
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm"
          aria-label="Rate candidate"
          disabled={rateDisabled}
          onClick={(e) => handleRatingClick(e, params.row)}
        >
          {getRatingIcon(params.row.rating)}
          Rate
        </button>
      </div>
      )
    },
  },
  ...getCtcColumns(role,disableCTC,disableHourly),
  {
    field: 'score',
    secondary: true,
    headerName: 'Score',
    headerAlign: "center",
    width: 120,
    disableColumnMenu: true,
    valueGetter: (value, row) => {
      const currentStage = row.currentStage;
      let score = 0;

      const stageScore = row.stageStatuses?.[currentStage]?.score;

      if (currentStage === "Screening" && typeof stageScore === "object") {
        score = Object.values(stageScore).reduce(
          (sum, val) => sum + parseInt(val ?? 0),
          0
        );
      } else {
        score = parseInt(stageScore ?? 0);
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
  ...getInfoColumns()
];
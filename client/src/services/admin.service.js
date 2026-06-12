import axios from "./axios";
const ADMIN_BASE_URL = '/admin'

//GET
export const getAdminDashboard = (timezone) => axios.get(`${ADMIN_BASE_URL}/dashboard?tz=${timezone}`).then(res => res.data)

export const getAdminDashboardSecondary = () => axios.get(`${ADMIN_BASE_URL}/dashboard-secondary`).then(res => res.data)

export const getAllTeamMembers = () => axios.get(ADMIN_BASE_URL + '/get-all-members').then(res => res.data)

export const fetchCalendarDetails = async (startDate,endDate,calendarType) => {
    const { data } = await axios.get(`/admin/get-calendar-details?startDate=${startDate}&endDate=${endDate}&calendarType=${calendarType}`);
    return data;
};

//POST
export const addMember = async ({teamMember}) => {
    const response = await axios.post(ADMIN_BASE_URL + '/add-member',{teamMember});
    return response?.data
}

export const approveRequest = async ({ email }) => {
    const response = await axios.post(ADMIN_BASE_URL + '/register/approve-request', { email });
    return response?.data
}

export const rejectRequest = async ({ email }) => {
    const response = await axios.post(ADMIN_BASE_URL + '/register/reject-request', { email });
    return response?.data
}

export const removeTeamMember = async ({ email }) => {
    const response = await axios.post(ADMIN_BASE_URL + `/remove-member`, { email });
    return response?.data
}
export const reInviteMember = async ({ memberId }) => {
  const response = await axios.post(ADMIN_BASE_URL + '/re-invite-member', { memberId });
  return response?.data
}

export const changeMemberStatus = async ({ memberId }) => {
  const response = await axios.post(ADMIN_BASE_URL + '/change-member-status', { memberId });
  return response?.data
}

export const updateScreeningParam = async ({title, description, oldKey, jobProfile }) => {
    const response = await axios.post(ADMIN_BASE_URL + '/update-screening-param',{description, oldKey, jobProfile, title });
    return response.data
}

export const resetScreeningParam = async ({paramId, jobProfile }) => {
    const response = await axios.post(ADMIN_BASE_URL + '/reset-screening-param',{jobProfile, paramId });
    return response.data
}

//PATCH
export const editMember = async ({ teamMember, memberId }) => {
  const response = await axios.patch(ADMIN_BASE_URL + '/edit-member', { teamMember, memberId });
  return response?.data
}
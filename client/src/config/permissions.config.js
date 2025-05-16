export const ROLES = {
  ADMIN: "Admin",
  HIRING_MANAGER: "Hiring Manager",
  DESIGN_REVIEWER: "Design Reviewer",
  CANDIDATE: "Candidate",
};

export const PERMISSIONS = {
  SHOW_KEBAB: "show_kebab",
  SHOW_JOB_SWITCH: "show_job_switch",
  SHOW_CANDIDATE_PROFILE_CARD: "show_candidate_profile_card",
  SHOW_CANDIDATE_PROFILE_RATING: "show_candidate_profile_rating",
  SHOW_CANDIDATE_PROFILE_PERSONAL_DETAILS:
    "show_candidate_profile_personal_details",
  SHOW_CANDIDATE_PROFILE_ASSESSMENT_RESPONSE:
    "show_candidate_profile_assessment_response",
  SHOW_CANDIDATE_PROFILE_SHORTLIST_BUTTON:
    "show_candidate_profile_shortlist_button",
  SHOW_CANDIDATE_PROFILE_CURRENT_REVIEWER:
    "show_candidate_profile_current_reviewer",
  SHOW_CANDIDATE_PROFILE_NOTES_SECTION: "show_candidate_profile_notes_section",
  SHOW_TAB_CANDIDATE_DETAIL: "show_tab_candidate_detail",
  SHOW_JOBCARD_MANAGEMENT_OPTION: "show_jobcard_management_option",
  SHOW_JOBCARD_COMPANY_NAME: "show_jobcard_company_name",
  SHOW_JOBCARD_JOB_IS_PUBLIC: "show_jobcard_job_is_public",
  SHOW_FILTER_PART_TIME: "show_filter_part_time",
  SHOW_ADDITIONAL_QUESTIONS: "show_additional_questions",
  SHOW_TABLE_BUDGET_DETAILS: "show_table_budget_details",
  SHOW_CANDIDATE_TAB_DETAIL_EDIT: "show_candidate_tab_detail_edit",
  SHOW_PIN_UNPIN_OPTION: "show_pin_unpin_option",
};

export const ROUTE_KEY = {
  CANDIDATES_ASSESSMENT_RESPONSE: "candidates_assessment_response",
  JOBS_ASSESSMENT_RESPONSE: "jobs_assessment_response",
  SHORTLISTED_ASSESSMENT_RESPONSE: "shortlisted_assessment_response",
  JOBS_EDIT_CANDIDATE_PROFILE: "jobs_edit_candidate_profile",
  CANDIDATES_EDIT_CANDIDATE_PROFILE: "candidates_edit_candidate_profile",
  SHORTLISTED_EDIT_CANDIDATE_PROFILE: "shortlisted_edit_candidate_profile",
  JOBS_VIEW_CANDIDATE: "jobs_view_candidate",
  CANDIDATES_VIEW_CANDIDATE: "candidates_view_candidate",
  DASHBOARD: "dashboard",
  JOBS: "jobs",
  ALLJOBS: "all-jobs",
  ASSESSMENTS: "assessments",
  VIEW_ASSESSMENTS_QUESTIONS: "view_assessments_questions",
  PROFILE: "profile",
  REVIEWS: "reviews",
  TEAMS: "teams",
  GUIDE : "guide",
  SHORTLISTED: "shortlisted",
  SHORTLISTED_VIEW_CANDIDATE: "shortlisted_view_candidate",
  CANDIDATES: "candidates",
  ALL_CANDIDATES: "all_candidates",
  EDIT_JOB: "edit_job",
  CREATE_JOB: "create_job",
  JOBS_VIEW_JOB: "jobs_view_job",
};

export const ROLE_CONFIG = {
  [ROLES.ADMIN]: {
    permissions: [
      PERMISSIONS.SHOW_KEBAB,
      PERMISSIONS.SHOW_JOB_SWITCH,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_CARD,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_RATING,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_PERSONAL_DETAILS,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_ASSESSMENT_RESPONSE,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_SHORTLIST_BUTTON,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_CURRENT_REVIEWER,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_NOTES_SECTION,
      PERMISSIONS.SHOW_TAB_CANDIDATE_DETAIL,
      PERMISSIONS.SHOW_JOBCARD_MANAGEMENT_OPTION,
      PERMISSIONS.SHOW_JOBCARD_JOB_IS_PUBLIC,
      PERMISSIONS.SHOW_FILTER_PART_TIME,
      PERMISSIONS.SHOW_ADDITIONAL_QUESTIONS,
      PERMISSIONS.SHOW_TABLE_BUDGET_DETAILS,
      PERMISSIONS.SHOW_CANDIDATE_TAB_DETAIL_EDIT,
      PERMISSIONS.SHOW_PIN_UNPIN_OPTION
    ],
    routes: {
      [ROUTE_KEY.CANDIDATES_ASSESSMENT_RESPONSE]: "/admin/candidates/all-candidates/assessment",
      [ROUTE_KEY.JOBS_ASSESSMENT_RESPONSE]: "/admin/jobs/all-jobs/assessment",
      [ROUTE_KEY.SHORTLISTED_ASSESSMENT_RESPONSE]: "/admin/candidates/shortlisted/assessment",
      [ROUTE_KEY.JOBS_EDIT_CANDIDATE_PROFILE]: "/admin/jobs/all-jobs/edit-candidate",
      [ROUTE_KEY.CANDIDATES_EDIT_CANDIDATE_PROFILE]: "/admin/candidates/all-candidates/edit-candidate",
      [ROUTE_KEY.SHORTLISTED_EDIT_CANDIDATE_PROFILE]: "/admin/candidates/shortlisted/edit-candidate",
      [ROUTE_KEY.JOBS_VIEW_CANDIDATE]: "/admin/jobs/all-jobs/view-candidate",
      [ROUTE_KEY.CANDIDATES_VIEW_CANDIDATE]: "/admin/candidates/all-candidates/view-candidate",
      [ROUTE_KEY.DASHBOARD]: "/admin/dashboard",
      [ROUTE_KEY.JOBS]: "/admin/jobs",
      [ROUTE_KEY.ALLJOBS]: "/admin/jobs/all-jobs",
      [ROUTE_KEY.ASSESSMENTS]: "/admin/jobs/assessments",
      [ROUTE_KEY.VIEW_ASSESSMENTS_QUESTIONS]: "/admin/jobs/assessments",
      [ROUTE_KEY.TEAMS]: "/admin/teams",
      [ROUTE_KEY.SHORTLISTED]: "/admin/candidates/shortlisted",
      [ROUTE_KEY.SHORTLISTED_VIEW_CANDIDATE]: "/admin/candidates/shortlisted/view-candidate",
      [ROUTE_KEY.CANDIDATES]: "/admin/candidates",
      [ROUTE_KEY.ALL_CANDIDATES]: "/admin/candidates/all-candidates",
      [ROUTE_KEY.PROFILE]: "/admin/profile",
      [ROUTE_KEY.EDIT_JOB]: "/admin/jobs/all-jobs/edit-job",
      [ROUTE_KEY.CREATE_JOB]: "/admin/jobs/all-jobs/create-job",
      [ROUTE_KEY.JOBS_VIEW_JOB]: "/admin/jobs/all-jobs/view-job",
    },
  },
  [ROLES.HIRING_MANAGER]: {
    permissions: [
      PERMISSIONS.SHOW_KEBAB,
      PERMISSIONS.SHOW_JOB_SWITCH,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_CARD,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_RATING,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_PERSONAL_DETAILS,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_ASSESSMENT_RESPONSE,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_SHORTLIST_BUTTON,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_CURRENT_REVIEWER,
      PERMISSIONS.SHOW_CANDIDATE_PROFILE_NOTES_SECTION,
      PERMISSIONS.SHOW_TAB_CANDIDATE_DETAIL,
      PERMISSIONS.SHOW_JOBCARD_MANAGEMENT_OPTION,
      PERMISSIONS.SHOW_JOBCARD_JOB_IS_PUBLIC,
      PERMISSIONS.SHOW_FILTER_PART_TIME,
      PERMISSIONS.SHOW_ADDITIONAL_QUESTIONS,
      PERMISSIONS.SHOW_TABLE_BUDGET_DETAILS,
      PERMISSIONS.SHOW_CANDIDATE_TAB_DETAIL_EDIT,
      PERMISSIONS.SHOW_PIN_UNPIN_OPTION
    ],
    routes: {
      [ROUTE_KEY.CANDIDATES_ASSESSMENT_RESPONSE]: "/hiring-manager/candidates/all-candidates/assessment",
      [ROUTE_KEY.JOBS_ASSESSMENT_RESPONSE]: "/hiring-manager/jobs/all-jobs/assessment",
      [ROUTE_KEY.SHORTLISTED_ASSESSMENT_RESPONSE]: "/hiring-manager/candidates/shortlisted/assessment",
      [ROUTE_KEY.JOBS_EDIT_CANDIDATE_PROFILE]: "/hiring-manager/jobs/all-jobs/edit-candidate",
      [ROUTE_KEY.CANDIDATES_EDIT_CANDIDATE_PROFILE]: "/hiring-manager/candidates/all-candidates/edit-candidate",
      [ROUTE_KEY.SHORTLISTED_EDIT_CANDIDATE_PROFILE]: "/hiring-manager/candidates/shortlisted/edit-candidate",
      [ROUTE_KEY.JOBS_VIEW_CANDIDATE]: "/hiring-manager/jobs/all-jobs/view-candidate",
      [ROUTE_KEY.CANDIDATES_VIEW_CANDIDATE]:
        "/hiring-manager/candidates/all-candidates/view-candidate",
      [ROUTE_KEY.DASHBOARD]: "/hiring-manager/dashboard",
      [ROUTE_KEY.JOBS]: "/hiring-manager/jobs",
      [ROUTE_KEY.ALLJOBS]: "/hiring-manager/jobs/all-jobs",
      [ROUTE_KEY.ASSESSMENTS]: "/hiring-manager/jobs/assessments",
      [ROUTE_KEY.VIEW_ASSESSMENTS_QUESTIONS]: "/hiring-manager/jobs/assessments",
      [ROUTE_KEY.PROFILE]: "/hiring-manager/profile",
      [ROUTE_KEY.SHORTLISTED]: "/hiring-manager/candidates/shortlisted",
      [ROUTE_KEY.SHORTLISTED_VIEW_CANDIDATE]: "/hiring-manager/candidates/shortlisted/view-candidate",
      [ROUTE_KEY.CANDIDATES]: "/hiring-manager/candidates",
      [ROUTE_KEY.ALL_CANDIDATES]: "/hiring-manager/candidates/all-candidates",
      [ROUTE_KEY.EDIT_JOB]: "/hiring-manager/jobs/all-jobs/edit-job",
      [ROUTE_KEY.CREATE_JOB]: "/hiring-manager/jobs/all-jobs/create-job",
      [ROUTE_KEY.JOBS_VIEW_JOB]: "/hiring-manager/jobs/all-jobs/view-job",
    },
  },
  [ROLES.DESIGN_REVIEWER]: {
    permissions: [PERMISSIONS.SHOW_CANDIDATE_PROFILE_CARD],
    routes: {
      [ROUTE_KEY.DASHBOARD]: "/design-reviewer/dashboard",
      [ROUTE_KEY.PROFILE]: "/design-reviewer/profile",
      [ROUTE_KEY.GUIDE]: "/design-reviewer/guide",
      [ROUTE_KEY.REVIEWS]: "/design-reviewer/reviews",
      [ROUTE_KEY.CANDIDATES]: "/design-reviewer/candidates",
    },
  },
  [ROLES.CANDIDATE]: {
    permissions: [
      PERMISSIONS.SHOW_TAB_CANDIDATE_DETAIL,
      PERMISSIONS.SHOW_JOBCARD_COMPANY_NAME,
    ],
  },
};

export function hasPermission(role, permission) {
  if (!role || !permission) {
    return false;
  }
  return ROLE_CONFIG[role]?.permissions.includes(permission) || false;
}

export function hasRoutePermission(role, routeKey) {
  if (!role || !routeKey) {
    return false;
  }
  return !!ROLE_CONFIG[role]?.routes[routeKey];
}

export function getRoute(role, routeKey) {
  if (!!ROLE_CONFIG[role]?.routes[routeKey]) {
    return ROLE_CONFIG[role]?.routes[routeKey];
  }
}

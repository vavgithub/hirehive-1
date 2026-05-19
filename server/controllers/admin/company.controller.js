import { asyncHandler } from '../../utils/asyncHandler.js';
import { Company } from '../../models/admin/company.model.js';
import { captureError } from "../../utils/errorHandler.js";

export const getMultiReviewerSettings = asyncHandler(async (req, res) => {
  const companyId = req.user?.company_id;
  if (!companyId) {
    return res.status(400).json({ message: 'Company not found for current user' });
  }

  const company = await Company.findById(companyId).select('multiReviewerSettings');
  if (!company) {
    return res.status(404).json({ message: 'Company not found' });
  }

  return res.status(200).json({
    multiReviewerSettings: company.multiReviewerSettings ?? { enabled: false, jobProfiles: [] },
  });
});

export const updateMultiReviewerSettings = asyncHandler(async (req, res) => {
  const companyId = req.user?.company_id;
  if (!companyId) {
    return res.status(400).json({ message: 'Company not found for current user' });
  }

  const { enabled, jobProfiles } = req.body ?? {};

  const updated = await Company.findByIdAndUpdate(
    companyId,
    {
      $set: {
        'multiReviewerSettings.enabled': Boolean(enabled),
        'multiReviewerSettings.jobProfiles': Array.isArray(jobProfiles) ? jobProfiles : [],
      },
    },
    { new: true, select: 'multiReviewerSettings' }
  );

  if (!updated) {
    return res.status(404).json({ message: 'Company not found' });
  }

  return res.status(200).json({
    message: 'Multi-reviewer settings updated',
    multiReviewerSettings: updated.multiReviewerSettings,
  });
});


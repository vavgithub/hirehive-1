import React, { useState } from 'react'
import Container from '../../components/Cards/Container'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import GoogleIcon from '../../svg/Icons/GoogleIcon'
import { Button } from '../../components/Buttons/Button'
import { googleAuthorize, googleUnAuthorize } from '../../services/auth.service'
import { useAuthContext } from '../../context/AuthProvider'
import LoaderModal from '../../components/Loaders/LoaderModal'
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getRoute, ROUTE_KEY } from '../../config/permissions.config'
import { getMultiReviewerSettings, updateMultiReviewerSettings } from '../../services/company.service'

function Settings() {
    const [loading,setLoading] = useState(false);
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();   
    const error = searchParams.get('error');

    const [multiReviewerEnabled, setMultiReviewerEnabled] = useState(false);
    const [multiReviewerJobProfiles, setMultiReviewerJobProfiles] = useState([]);
    const [multiReviewerDirty, setMultiReviewerDirty] = useState(false);

    const MULTI_REVIEWER_JOB_PROFILE_OPTIONS = [
        { label: "Brand Identity", value: "Brand Designer" },
        { label: "UI UX", value: "UI UX" },
        { label: "Product Designer", value: "Product Designer" },
    ];

    const handleGoogleAuthorization = async () => {
        setLoading(true)
        const response = await googleAuthorize();
        if(response?.authorizationUrl){
            window.location.href = response.authorizationUrl;
        }
        setLoading(false)
    }

    useEffect(()=>{
        if(error === 'ALLOW_ACCESS'){
            showErrorToast('Error','Please allow all the permissions to get the workspace access.');
            navigate(getRoute(user?.role,ROUTE_KEY.SETTINGS))
        }
    },[error])

    useEffect(() => {
        const load = async () => {
            try {
                const response = await getMultiReviewerSettings();
                const settings = response?.multiReviewerSettings;
                setMultiReviewerEnabled(Boolean(settings?.enabled));
                setMultiReviewerJobProfiles(Array.isArray(settings?.jobProfiles) ? settings.jobProfiles : []);
                setMultiReviewerDirty(false);
            } catch (e) {
                // keep page functional; show toast only if needed
            }
        };
        load();
    }, []);

    const handleGoogleUnAuthorization = async () => {
        setLoading(true)
        const response = await googleUnAuthorize();
        if(response.status === 'success'){
            queryClient.invalidateQueries(['auth'])
            showSuccessToast('Success',response?.message ?? 'Unauthorized Google Successfully.')
        }
        setLoading(false)
    }

    const toggleJobProfile = (value) => {
        setMultiReviewerDirty(true);
        setMultiReviewerJobProfiles((prev) => {
            if (prev.includes(value)) return prev.filter((v) => v !== value);
            return [...prev, value];
        });
    };

    const handleSaveMultiReviewerSettings = async () => {
        try {
            setLoading(true);
            const response = await updateMultiReviewerSettings({
                enabled: multiReviewerEnabled,
                jobProfiles: multiReviewerEnabled ? multiReviewerJobProfiles : [],
            });
            if (response?.message) {
                showSuccessToast("Success", response.message);
            }
            // Refresh cached admin/company details (used by GlobalStaging)
            queryClient.invalidateQueries(['auth']);
            setMultiReviewerDirty(false);
        } catch (e) {
            showErrorToast("Error", e?.response?.data?.message || "Failed to update settings");
        } finally {
            setLoading(false);
        }
    };

  return (
    <Container>
      <Header HeaderText="Settings" />
      {loading && <LoaderModal />}
      <StyledCard padding={2} extraStyles={'w-full'}>
            <StyledCard backgroundColor={'bg-background-100'} extraStyles={'flex justify-between items-center'}>
                <div className='flex items-center gap-4'>
                        <GoogleIcon/>
                    <h3>Google Workspace</h3>                    
                </div>
                <div>
                    { (user?.hasAuth?.view_calendar && user?.hasAuth?.edit_calendar) ? 
                        <Button type='button' onClick={handleGoogleUnAuthorization} >Unauthorize</Button>
                        :
                        <Button type='button' onClick={handleGoogleAuthorization} >Authorize</Button>
                    }
                </div>
            </StyledCard>
            <StyledCard backgroundColor={'bg-background-100'} extraStyles={'flex flex-col gap-4 mt-4'}>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <h3>Portfolio multi-reviewer</h3>
                        <p className='typography-small-p text-font-gray'>Allow assigning up to 3 reviewers for portfolio stage</p>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={multiReviewerEnabled}
                            onChange={(e) => { setMultiReviewerEnabled(e.target.checked); setMultiReviewerDirty(true); }}
                            className="appearance-none outline-none border h-5 w-9 rounded-full bg-background-80 checked:bg-accent-100 relative transition-colors"
                        />
                        <span className='typography-body text-font-main'>{multiReviewerEnabled ? "On" : "Off"}</span>
                    </label>
                </div>

                {multiReviewerEnabled && (
                    <div className='flex flex-col gap-2'>
                        <p className='typography-small-p text-font-gray'>Job profiles</p>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                            {MULTI_REVIEWER_JOB_PROFILE_OPTIONS.map((opt) => {
                                const selected = multiReviewerJobProfiles.includes(opt.value);
                                return (
                                    <div
                                        key={opt.value}
                                        className={"px-4 py-2 min-h-11 rounded-xl flex items-center cursor-pointer hover-outline " + (selected ? 'selection-primary' : "bg-background-80")}
                                        onClick={() => toggleJobProfile(opt.value)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selected}
                                            onChange={() => toggleJobProfile(opt.value)}
                                            className="appearance-none outline-none border mr-3 h-4 w-4 cursor-pointer rounded bg-background-100 hover:border-grey-100 checked:bg-accent-100 checked:border-accent-100 peer"
                                        />
                                        <span className='typography-body overflow-hidden whitespace-nowrap text-ellipsis'>{opt.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className='flex justify-end'>
                    <Button type='button' onClick={handleSaveMultiReviewerSettings} disabled={!multiReviewerDirty}>
                        Save
                    </Button>
                </div>
            </StyledCard>
    </StyledCard>
    </Container>
  )
}

export default Settings

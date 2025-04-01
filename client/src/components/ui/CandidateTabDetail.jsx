import React, { useEffect, useState } from 'react';
import PencilIcon, { PencilEditIcon } from '../../svg/Buttons/PencilIcon';
import { Controller, useForm } from 'react-hook-form';
import { InputField } from '../Form/FormFields';
import { validationRules } from '../../utility/validationRules';
import axios from '../../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showErrorToast, showSuccessToast } from './Toast';
import StyledCard from '../Cards/StyledCard';
import CustomHeading from '../Heading/CustomHeading';
import { GridRow } from '../Grid/GridRow';
import { Button } from '../Buttons/Button';

const updateProfessionalDetails = async ({experience, noticePeriod, currentCTC, expectedCTC, hourlyRate , id, jobId}) => {
    const response = await axios.patch(`/admin/candidate/update-candidate/${id}/${jobId}`,{experience, noticePeriod, currentCTC, expectedCTC, hourlyRate });
    return response?.data
}

const Card = ({ title, children, gridLayout = false , extraClass }) => (
  <div className={`bg-background-90 p-4 rounded-xl mb-4 ${extraClass}`} >
    <h2 className="typography-h3 mb-5">{title}</h2>
    <div className={gridLayout ? "grid grid-cols-2 gap-3" : ""}>{children}</div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-2">
    
    <span className="text-font-gray typography-body">{label}</span>
    <span className="typography-body">{value}</span>
  </div>
);

const Experience = ({ company, position, startDate, endDate, index }) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-white mb-2">Experience {index + 1}</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <GridRow label="Company Name" value={company} />
        <GridRow label="Position" value={position} />
        <GridRow label="Start Date" value={startDate} />
        <GridRow label="End Date" value={endDate} />
      </div>
    </div>
  );

  const CandidateTabDetail = ({ data , job ,candidateId , role}) => {
    const [isEditing,setIsEditing] = useState(false);
    
    const { control ,reset, handleSubmit , setError } = useForm({
      defaultValues : {
        experience : 0,
        noticePeriod : 0 ,
        currentCTC : 0,
        expectedCTC : 0,
        hourlyRate : 0,
      },
      mode : "onChange"
    })

    const queryClient = useQueryClient();

    useEffect(() => {
      if (job?.professionalInfo) {
        reset({
          experience: job.professionalInfo.experience ?? 0,
          noticePeriod: job.professionalInfo.noticePeriod ?? 0,
          currentCTC: job.professionalInfo.currentCTC ?? 0,
          expectedCTC: job.professionalInfo.expectedCTC ?? 0,
          hourlyRate: job.professionalInfo.hourlyRate ?? 0,
        });
      }
    }, [job, reset]); // Ensure `reset` is in the dependency array

    const updateProfessionalDetailsMutation = useMutation({
      mutationFn : updateProfessionalDetails,
      onSuccess : (data) => {
        queryClient.invalidateQueries(['candidate', candidateId, job?.jobId])
        setIsEditing(false)
        showSuccessToast("Success",data?.message || "Candidate details updated successfully");
      },
      onError : (error) => {
        showErrorToast("Error",error?.response?.data?.message || "Error updating candidate details")
      }
    })
    
    const handleEditDetails = (data) => {
      if(job?.jobType === "Contract" || job?.jobType === "Part Time"){
        if(data?.hourlyRate?.toString().trim() === ""){
          setError("hourlyRate",{type : "required" , message : "Hourly Rate is required"})
          return 
        }
      }
      if(job?.jobType === "Full Time"){
        if(data?.currentCTC?.toString().trim() === ""){
          setError("currentCTC",{type : "required" , message : "Current CTC is required"})
          return 
        }
        if(data?.expectedCTC?.toString().trim() === ""){
          setError("expectedCTC",{type : "required" , message : "Expected CTC is required"})
          return 
        }
      }
      updateProfessionalDetailsMutation.mutate({
        id : candidateId,
        jobId : job?.jobId,
        expectedCTC  : data?.expectedCTC,
        hourlyRate : data?.hourlyRate,
        currentCTC : data?.currentCTC,
        experience : data?.experience,
        noticePeriod : data?.noticePeriod
      })
    }

    return (
        <div>
          <form onSubmit={handleSubmit(handleEditDetails)}>
            <Card title="Professional Details" gridLayout={true} extraClass={" relative "}>
                {!isEditing ? <>
                  {data.professionalDetails.map((detail, index) => (
                      <DetailRow key={index} label={detail.label} value={detail.value} />
                  ))}
                  {(job?.jobStatus === "open" && (role === "Admin" || role === "Hiring Manager")) && 
                  <div onClick={()=>setIsEditing(!isEditing)} className='absolute right-4 bottom-4 p-2 bg-background-70 hover:bg-background-60 rounded-xl cursor-pointer'>
                    <PencilIcon />    
                  </div>}
                </> : 
                <>
                  <Controller
                  name="experience"
                  control={control}
                  defaultValue={""}
                  rules={validationRules.experience}
                  render={({ field, fieldState: { error } }) => (
                    <InputField
                      type="number"
                      id="experience"
                      label="Experience"
                      labelStyles="text-font-gray"
                      extraClass="no-spinner"
                      rowWise
                      value={field.value ?? 0}
                      onChange={field.onChange}
                      error={error}
                      errorMessage={error?.message}
                    />
                    )}
                  />
                  <Controller
                    name="noticePeriod"
                    control={control}
                    defaultValue={""}
                    rules={validationRules.noticePeriod}
                    render={({ field, fieldState: { error } }) => (
                      <InputField
                        type="number"
                        id="noticePeriod"
                        label="Notice Period"
                        labelStyles="text-font-gray"
                        extraClass="no-spinner"
                        rowWise
                        value={field.value ?? 0}
                        onChange={field.onChange}
                        error={error}
                        errorMessage={error?.message}
                      />
                    )}
                  />
                  {/* Only show full-time fields if data exists */}
                  {!(job?.jobType === 'Contract' || job?.jobType === 'Part Time') ? (
                    <>
                      <Controller
                        name="currentCTC"
                        control={control}
                        defaultValue={""}
                        rules={validationRules.currentCTC}
                        render={({ field, fieldState: { error } }) => (
                          <InputField
                            type="number"
                            id="currentCTC"
                            label="Current CTC"
                            labelStyles="text-font-gray"
                            extraClass="no-spinner"
                            rowWise
                            value={field.value ?? 0}
                            onChange={field.onChange}
                            error={error}
                            errorMessage={error?.message}
                          />
                        )}
                      />
                      <Controller
                        name="expectedCTC"
                        control={control}
                        defaultValue={""}
                        rules={validationRules.expectedCTC}
                        render={({ field, fieldState: { error } }) => (
                          <InputField
                            type="number"
                            id="expectedCTC"
                            label="Expected CTC"
                            labelStyles="text-font-gray"
                            extraClass="no-spinner"
                            rowWise
                            value={field.value ?? 0}
                            onChange={field.onChange}
                            error={error}
                            errorMessage={error?.message}
                          />
                        )}
                      />
                  </>
                ) : (
                  <Controller
                    name="hourlyRate"
                    control={control}
                    defaultValue={""}
                    rules={validationRules.hourlyRate}
                    render={({ field, fieldState: { error } }) => (
                      <InputField
                        type="number"
                        id="hourlyRate"
                        label="Hourly Rate"
                        labelStyles="text-font-gray"
                        extraClass="no-spinner"
                        rowWise
                        value={field.value ?? 0}
                        onChange={field.onChange}
                        error={error}
                        errorMessage={error?.message}
                      />
                    )}
                  />)}
                  <div className="col-span-2 place-self-end flex gap-4 mt-4">
                    <Button onClick={()=>setIsEditing(false)} type="button" variant="secondary" >Cancel</Button>
                    <Button 
                    type="Submit" 
                    >Save</Button>
                  </div>
                </>
                }
            </Card>
          </form>

          <StyledCard padding={2}>
            <CustomHeading  label={"Skill Set"} />
            <div className="flex flex-wrap gap-2">
                  {data.skillSet.map((skill, index) => (
                      <span key={index} className="bg-background-70 rounded-full typography-body py-3 px-4">
                          {skill}
                      </span>
                  ))}
              </div>
          </StyledCard>
      </div>
  );
};

// Remove the exampleData since we're using real data now
export default CandidateTabDetail;
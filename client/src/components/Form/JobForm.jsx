import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import SkillsInput from '../Inputs/SkillsInput';
import { dropdownOptions, dummySkills } from '../Dropdowns/dropdownOptions';
import { Button } from '../Buttons/Button';
import Que from '../QuestionUtilities/Que';
import TextEditor from '../utility/TextEditor';
import { InputField } from '../Inputs/InputField';
import { ExperienceField } from '../FormUtilities/ExperienceField';
import { BudgetField } from '../FormUtilities/BudgetField';
import IconWrapper from '../Cards/IconWrapper';
import { Bookmark, CirclePlus } from 'lucide-react';
import TickCheckbox from '../Checkboxes/TickCheckbox';
import CustomPill from '../Badge/CustomPill';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import TemplateModal from '../Modals/TemplateModal';
import GlobalDropDown from '../Dropdowns/GlobalDropDown';

function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}

const fetchAssessmentTemplates = async() => {
    const response = await axios.get(`/jobs/get-assessment-templates`, { withCredentials: true });
    return response.data;
}

const JobForm = ({ initialData, onSubmit,isLoading, isEditing, initialQuestions }) => {
  const { control, handleSubmit, watch, setValue, setError, getValues,clearErrors, formState: { errors, isValid } } = useForm({
    defaultValues: {
      jobTitle: '',
      workplaceType: '',
      employeeLocation: '',
      employmentType: '',
      jobProfile: '',
      isPublic: true,
      experienceFrom: 0,
      experienceTo: 1,
      budgetFrom: 0,
      budgetTo: 1,
      jobDescription: '',
      assessment_id : '',
      skills: [],
      ...initialData
    },
    mode: 'onChange'
  });

  const watchedFields = watch();

  const { data: assessmentTemplates, isassessmentLoading } = useQuery({
    queryKey: ['getAllAssessmentTemplates'],
    queryFn: () => fetchAssessmentTemplates(),
    staleTime : Infinity,
    retry : false
  });

  const [previewAssessment,setPreviewAssessment] = useState(false);

  let areAllFieldsFilled = isValid &&
    watchedFields.jobTitle &&
    watchedFields.workplaceType &&
    watchedFields.employeeLocation &&
    watchedFields.employmentType &&
    watchedFields.jobProfile &&
    watchedFields.assessment_id &&
    watchedFields.jobDescription &&
    watchedFields.skills &&
    watchedFields.skills.length > 0 &&
    watchedFields.experienceFrom !== undefined &&
    watchedFields.experienceTo !== undefined 
    // &&
    // watchedFields.budgetFrom !== undefined &&
    // watchedFields.budgetTo !== undefined;
    
    if(Array.isArray(watchedFields.questions)){
      for(let question of watchedFields.questions){
        if(question.text.trim() === ""){
          areAllFieldsFilled = false
          break
        }
      }
    }

    // Use useEffect to handle the logic for setting the error
    useEffect(() => { 
      if (watchedFields.budgetFrom > 0 && watchedFields.budgetTo < watchedFields.budgetFrom) {
        setError("budgetTo", {
          type: "manual",
          message: "Budget Range Mismatch!!"
        });
      }else if(!watchedFields.budgetTo){
        setError("budgetTo", {
          type: "manual",
          message: "Default Budget Range is 0 - 1"
        });
      } else {
        // Clear the error when the condition is no longer met
        clearErrors('budgetTo');
      }
    }, [watchedFields.budgetFrom, watchedFields.budgetTo, setError]);

    if(watchedFields.budgetFrom > 0){
      if(watchedFields.budgetTo < watchedFields.budgetFrom){
        areAllFieldsFilled = false
      }
    }

    // Use useEffect to handle the logic for setting the error
    useEffect(() => { 
      if(watchedFields.experienceFrom > 0){
        if(watchedFields.experienceTo < watchedFields.experienceFrom){
          setError("experienceTo", {
            type: "manual",
            message: "Experience values mismatch!!"
          });
          areAllFieldsFilled = false
        }else{
          clearErrors('experienceTo')
        }
      }else{
        clearErrors('experienceTo')
      }
      
    }, [watchedFields.experienceFrom, watchedFields.experienceTo, setError]);    

    if(!watchedFields.budgetTo){
      areAllFieldsFilled = false
    }

  

  const handleFormSubmit = (data) => {
    onSubmit(data, false);
  };

  const handleSaveForLater = () => {
    const currentValues = getValues();
    onSubmit(currentValues, true);
  };

  // Function to strip HTML tags
  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>/g, '').trim(); // Removes all HTML tags and trims spaces
  };

  const customDescriptionValidation = (value) =>{
    if(!stripHtmlTags(value)){
      return "Job description is required"
    }else{
      return true
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit(handleFormSubmit)} className='container-form mx-auto'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Controller
          name="jobTitle"
          control={control}
          rules={{ required: "Job title is required" }}
          render={({ field ,fieldState : { error }}) => (
            <InputField
              type="text"
              id="jobTitle"
              label="Job Title"
              extraClass={"mt-1"}
              required
              {...field}
              error={error}
              errorMessage={error?.message}
            />
          )}
        />

        {Object.keys(dropdownOptions).map((field) => (
          <Controller
            key={field}
            name={field}
            control={control}
            rules={{ required: `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required` }}
            render={({ field: { onChange, value } ,fieldState : { error }}) => (
              <GlobalDropDown 
                label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                options={dropdownOptions[field].filter(opt => opt.value !== '')}
                customPlaceholder={dropdownOptions[field].find(opt => opt.value === '')?.label}
                searchEnabled={field === "employeeLocation"}
                value={value}
                required
                error={error}
                errorMessage={error?.message}
                onChange={onChange}
              />
            )}
          />
        ))}

        {/* this is dummy div for adding gap , please dont remonve this */}
        <div>

        </div>

        <Controller
          name="experienceFrom"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <ExperienceField
              value={{
                from: value,
                to: watchedFields.experienceTo
              }}
              errors={errors}
              onChange={(newValue) => {
                onChange(newValue.from);
                setValue('experienceTo', newValue.to);
              }}
              required
            />
          )}
        />

        <Controller
          name="budgetFrom"
          control={control}
          // rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <BudgetField
              value={{
                from: value,
                to: watchedFields.budgetTo
              }}
              onChange={(newValue) => {
                onChange(newValue.from);
                setValue('budgetTo', newValue.to);
              }}
              errors={errors}
              employmentType={watchedFields.employmentType}
            />
          )}
        />

        <Controller
          name="jobDescription"
          control={control}
          rules={{ required: "Job description is required" ,validate : customDescriptionValidation}}
          render={({ field , fieldState : {error} }) => (
            <div className='w-full relative'>
              <label htmlFor="jobDescription" className="typography-body block mb-2">Job Description{<span className="text-red-100">*</span>}</label>
              <TextEditor htmlData={field?.value} loaded={isEditing} errors={error} placeholder={"Write a Job Description"} setEditorContent={(data)=>setValue('jobDescription',data)} />
              {error && <p className="text-red-500 absolute typography-small-p top-[18rem]">{error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="skills"
          control={control}
          rules={{
            required: 'Skills are required',
            validate: (value) =>
              Array.isArray(value) && value.length > 0 ? true : 'Please add at least one skill',
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="w-full mb-4 relative">
              <label htmlFor="skills" className="typography-body mb-2">
                Skills<span className="text-red-100">*</span>
              </label>
              <SkillsInput
                value={field.value || []}
                onChange={field.onChange}
                allSkills={dummySkills}
                error={error}
              />
              {error && <p className="text-red-500 absolute typography-small-p top-[78px]">{error.message}</p>}
            </div>
          )}
        />
      </div>
      {/* Assessment Selection */}
      <Controller
          name="assessment_id"
          control={control}
          rules={{
            required: 'Assessment is required',
          }}
          render={({ field: { onChange, value } , fieldState: { error }  })=>(
            <div className='mt-6 relative'>
            <label htmlFor="assessment" className="typography-body block mb-2">Assessment{<span className="text-red-100">*</span>}</label>
                <div className='flex flex-wrap gap-4'>
                  {
                    assessmentTemplates?.map(template => (
                      <CustomPill variant="selective" data={template} value={value} hasInfoButton infoButtonClick={(label)=>setPreviewAssessment(template)} error={error} key={template?._id}  selected={value === template?._id} onChange={onChange} />
                    ))
                  }
                </div>
                {error && <p className="text-red-500 absolute typography-small-p top-[72px]">{error.message}</p>}
            </div>
          )}
          />
      <Controller
        name="questions"
        control={control}
        defaultValue={initialQuestions || []}
        rules={{
          validate: (value) => {
            if(value?.length > 0){
              let questions = [];
              for(let question of value){
                if(hasDuplicates(question.options)){
                  return 'Please remove duplicate options.'
                }
              }
              for(let question of value){
                questions.push(question.text)
              }
              if(hasDuplicates(questions)){
                return 'Please remove duplicate questions.'
              }
            }
            return true;
          },
        }}
        render={({ field: { onChange, value } , fieldState: { error }  }) => (
          <Que
            onQuestionsChange={onChange}
            initialQuestions={value}
            error={error}
          />
        )}
      />

      <div className="flex justify-between mt-6">
        <div>
        <Controller
          name="isPublic"
          control={control}
          render={({ field: { onChange, value } , fieldState: { error }  }) => (
            <TickCheckbox
              id="publicCheck"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              label="Show on Homepage"
              className="flex items-center gap-2 hover:bg-background-60 hover:text-accent-100 p-2 rounded-xl"
            />
            )}
          />
        </div>
        <div className='flex gap-4'>
            {!isEditing && (
              <Button
                variant="secondary"
                type="button"
                icon={()=><IconWrapper icon={Bookmark} inheritColor size={0} customIconSize={5} customStrokeWidth={5} />}
                onClick={handleSaveForLater}
              >
                Save For Later
              </Button>
            )}
            <Button
              variant="primary"
              type="submit"
              icon={()=><IconWrapper icon={CirclePlus} inheritColor size={0} customIconSize={5} customStrokeWidth={5} />}
              iconPosition="left"
              disabled={isLoading}
            >
              {isEditing ? isLoading ? 'Saving...' : 'Save' : isLoading ? 'Creating...' :'Create A Job Listing'}

            </Button>
        </div>

        {isEditing && watchedFields.status === 'draft' && (
          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, false))}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Make It Active
          </button>
        )}
      </div>
    </form>

    {/* Template display Modal */}
    <TemplateModal open={previewAssessment} assessment={previewAssessment} onClose={()=>setPreviewAssessment(false)}  />
    </>
  );
};

export default JobForm;
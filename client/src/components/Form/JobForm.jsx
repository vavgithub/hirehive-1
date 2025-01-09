import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputField, CustomDropdown, ExperienceField, BudgetField } from './FormFields';
import SkillsInput from '../utility/SkillsInput';
import { dropdownOptions, dummySkills } from '../Form/dropdownOptions';
import { Button } from '../ui/Button';
import Next from '../../svg/Buttons/Next';
import SaveForLater from '../../svg/Buttons/SaveForLater';
import Que from './Que';
import Create from '../../svg/Buttons/Create';
import TextEditor from '../utility/TextEditor';

const JobForm = ({ initialData, onSubmit,isLoading, isEditing, initialQuestions }) => {
  const { control, handleSubmit, watch, setValue, setError, getValues,clearErrors, formState: { errors, isValid } } = useForm({
    defaultValues: {
      jobTitle: '',
      workplaceType: '',
      employeeLocation: '',
      employmentType: '',
      jobProfile: '',
      experienceFrom: 0,
      experienceTo: 1,
      budgetFrom: 0,
      budgetTo: 1,
      jobDescription: '',
      skills: [],
      ...initialData
    },
    mode: 'onChange'
  });

  const watchedFields = watch();



  let areAllFieldsFilled = isValid &&
    watchedFields.jobTitle &&
    watchedFields.workplaceType &&
    watchedFields.employeeLocation &&
    watchedFields.employmentType &&
    watchedFields.jobProfile &&
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

  

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='container-form mx-auto'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
              <CustomDropdown
                field={field}
                label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                options={dropdownOptions[field]}
                value={value}
                required
                error={error}
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
            />
          )}
        />

        <Controller
          name="jobDescription"
          control={control}
          rules={{ required: "Job description is required" }}
          render={({ field , fieldState : {error} }) => (
            <div className='w-full relative'>
              <label htmlFor="jobDescription" className="typography-body block mb-4">Job Description{<span className="text-red-100">*</span>}</label>
              <TextEditor/>
              {/* <textarea
                {...field}
                id="jobDescription"
                placeholder="Write a Job Description"
                className={`${error ? '!border !border-red-500' : 'border border-transparent'}  w-full rounded-xl px-3 py-2 bg-background-40 font-outfit hover:bg-background-60 outline-none focus:outline-teal-300 resize-none`}
                rows="10"
              /> */}
              {error && <p className="text-red-500 absolute typography-small-p top-[18.5rem]">{error.message}</p>}
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
              {error && <p className="text-red-500 absolute typography-small-p top-[85px]">{error.message}</p>}
            </div>
          )}
        />
      </div>

      <Controller
        name="questions"
        control={control}
        defaultValue={initialQuestions || []}
        render={({ field: { onChange, value } }) => (
          <Que
            onQuestionsChange={onChange}
            initialQuestions={value}
          />
        )}
      />

      <div className="flex justify-end mt-4">
        <div className='flex gap-4'>
            {!isEditing && (
              <Button
                variant="secondary"
                type="button"
                icon={SaveForLater}
                onClick={handleSaveForLater}
              >
                Save For Later
              </Button>
            )}
            <Button
              variant="primary"
              type="submit"
              icon={Create}
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
  );
};

export default JobForm;
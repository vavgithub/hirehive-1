import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputField, CustomDropdown, ExperienceField, BudgetField } from './FormFields';
import SkillsInput from '../utility/SkillsInput';
import { dropdownOptions, dummySkills } from '../Form/dropdownOptions';
import { Button } from '../ui/Button';
import Next from '../../svg/Buttons/Next';
import SaveForLater from '../../svg/Buttons/SaveForLater';
import Que from './Que';

const JobForm = ({ initialData, onSubmit, isEditing, initialQuestions }) => {
  const { control, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
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

  const areAllFieldsFilled = isValid &&
    watchedFields.jobTitle &&
    watchedFields.workplaceType &&
    watchedFields.employeeLocation &&
    watchedFields.employmentType &&
    watchedFields.jobProfile &&
    watchedFields.jobDescription &&
    watchedFields.skills.length > 0 &&
    watchedFields.experienceFrom !== undefined &&
    watchedFields.experienceTo !== undefined &&
    watchedFields.budgetFrom !== undefined &&
    watchedFields.budgetTo !== undefined;

  console.log('Form validity:', { isValid, areAllFieldsFilled, watchedFields, errors });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <Controller
          name="jobTitle"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              id="jobTitle"
              label="Job Title"
              required
              {...field}
            />
          )}
        />

        {Object.keys(dropdownOptions).map((field) => (
          <Controller
            key={field}
            name={field}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <CustomDropdown
                field={field}
                label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                options={dropdownOptions[field]}
                value={value}
                required
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
          rules={{ required: true }}
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
              required
            />
          )}
        />

        <Controller
          name="jobDescription"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className='w-full'>
              <label htmlFor="jobDescription" className="typography-body block mb-2">Job Description{<span className="text-red-100">*</span>}</label>
              <textarea
                {...field}
                id="jobDescription"
                placeholder="Write a job description"
                className="w-full rounded-xl px-3 py-2 bg-background-40  outline-none focus:outline-teal-300"
                required
                rows="10"
              />
            </div>
          )}
        />

        <Controller
          name="skills"
          control={control}
          rules={{ required: true, validate: (value) => value.length > 0 }}
          render={({ field: { onChange, value } }) => (
            <div className="w-full mb-4">
              <label htmlFor="skills" className="typograhpy-body mb-2">Skills{<span className="text-red-100">*</span>}</label>
              <SkillsInput
                skills={value}
                setSkills={onChange}
                allSkills={dummySkills}
              />
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
          <div className='w-[240px]'>
            <Button
              variant="secondary"
              type="button"
              icon={SaveForLater}
              onClick={handleSubmit((data) => handleFormSubmit({ ...data, status: 'draft' }))}
            >
              Save For Later
            </Button>
          </div>
          <div className='w-[240px]'>
            <Button
              variant="primary"
              type="submit"
              icon={Next}
              disabled={!areAllFieldsFilled}
            >
              {isEditing ? 'Save' : 'Next'}
            </Button>
          </div>
        </div>

        {isEditing && watchedFields.status === 'draft' && (
          <button
            type="button"
            onClick={handleSubmit((data) => handleFormSubmit({ ...data, status: 'active' }))}
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
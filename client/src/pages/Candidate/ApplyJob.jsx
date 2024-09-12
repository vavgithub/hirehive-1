import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import { InputField } from '../../components/Form/FormFields'
import SkillsInput from '../../components/utility/SkillsInput'
import { Button } from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'

const ApplyJob = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [skills, setSkills] = useState([]);  // State to hold skills
  const allSkills = ["JavaScript", "React", "Node.js", "Python", "Java"];  // Example list of all skills

  const onSubmit = (data) => console.log(data)

  const navigate = useNavigate();

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className='typography-h3 mx-16 mt-8 mb-4'>Personal Details</h3>
      <div className='grid grid-cols-2 gap-4 px-16'>

        <Controller
          name="First Name"
          control={control}
          render={({ field }) => (
            <InputField
              id="firstName"
              label="First Name"
              required={true}
              {...field}
            />
          )}
        />

        <Controller
          name="Last Name"
          control={control}
          render={({ field }) => (
            <InputField
              id="lastName"
              label="Last Name"
              required={true}
              {...field}
            />
          )}
        />

        <Controller
          name="Email"
          control={control}
          render={({ field }) => (
            <InputField
              id="email"
              label="Email"
              required={true}
              {...field}
            />
          )}
        />

        <Controller
          name="Phone Number"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              id="phoneNumber"
              label="Phone Number"
              required={true}
              {...field}
            />
          )}
        />
      </div>

      <h3 className='typography-h3 mx-16 mt-8 mb-4'>Resume & Portfolio </h3>

      <div className='grid grid-cols-2 gap-4 mx-16'>


        <Controller
          name="Portfolio"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              id="portfolio"
              label="Portfolio"
              required={true}
              {...field}
            />
          )}
        />


        <Controller
          name="Website"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              id="website"
              label="Website"
              required={true}
              {...field}
            />
          )}
        />
      </div>

      <h3 className='typography-h3 mx-16 mt-8 mb-4'>Professional Details </h3>
      <div className='grid grid-cols-2 gap-4 mx-16'>

        <Controller
          name="Experience (In Years)"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              id="Experience (In Years)"
              label="Experience (In Years)"
              required={true}
              {...field}
            />
          )}
        />

        <Controller
          name="Notice Period (In days)"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              id="Notice Period (In days)"
              label="Notice Period (In days)"
              required={true}
              {...field}
            />
          )}
        />

        <Controller
          name="Current CTC (In LPA)"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              id="Current CTC (In LPA)"
              label="Current CTC (In LPA)"
              required={true}
              {...field}
            />
          )}
        />


        <Controller
          name="Expected CTC (In LPA)"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              id="Expected CTC (In LPA)"
              label="Expected CTC (In LPA)"
              required={true}
              {...field}
            />
          )}
        />

        <div>


          <span>Enter Skills</span>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <SkillsInput
                skills={skills}
                setSkills={setSkills}
                allSkills={allSkills}
                {...field}
              />
            )}
          />
        </div>


      </div>

      {errors.exampleRequired && <span>This field is required</span>}

      <div className='flex mt-6 justify-end gap-4 mr-16 mb-6'>

        <div className='w-[269px]'>
          <Button type="button" onClick={()=>(navigate(-1))} variant="secondary">
            Cancel
          </Button>
        </div>

        <div className='w-[269px]'>
          <Button type="submit" variant="primary">
            Next
          </Button>
        </div>

      </div>

    </form>
  )
}
export default ApplyJob
import React from 'react'
import { Controller } from 'react-hook-form';

function AdditionalQuestions({jobDetails, control ,errors}) {
  return (
    <>
        <h2 className="typography-h3 mb-4">Additional Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobDetails?.questions.map((question, index) => (
            <div key={question?._id} className="bg-background-30 rounded-xl p-4">
            <Controller
                key={question._id}
                name={`question-${question._id}`}
                control={control}
                defaultValue=""
                rules={{ required: question.required }}
                render={({ field }) => (
                <div>
                    <label className="block mb-4 typography-body">
                    Q{index + 1}. {question.text}
                    {question.required && (
                        <span className="text-red-500 ml-1">*</span>
                    )}
                    </label>
                    <div className="grid grid-cols-2 gap-4" style={{gridAutoRows:"1fr"}}>
                    {question.type === "multiple" ? (
                        question.options.map((option, optionIndex) => {
                        const inputId = `question-${question._id}-option-${optionIndex}`;

                        return (
                            <div
                            key={optionIndex}
                            className="px-4 py-2 min-h-11 rounded-xl flex bg-background-60 items-center cursor-pointer hover:bg-background-70"
                            onClick={() => {
                                field.onChange(option);
                                document.getElementById(inputId).focus();
                            }}
                            >
                            <input
                                type="radio"
                                id={inputId}
                                value={option}
                                checked={field.value === option}
                                onChange={() => field.onChange(option)}
                                className="mr-2 appearance-none border-2 rounded-full form-radio h-5 aspect-square max-h-5 w-5 max-w-5 checked:ring-offset-[5px] checked:ring-offset-black-100 checked:bg-teal-100 checked:ml-[4px] checked:mr-[12px] checked:ring-[2px] checked:w-3 checked:h-3 checked:border-0 checked:ring-teal-100"
                            />
                            <label className='typography-body overflow-hidden whitespace-nowrap text-ellipsis' htmlFor={inputId}>{option}</label>
                            </div>
                        );
                        })
                    ) : (
                        <div
                        className="w-full cursor-pointer"
                        onClick={() => {
                            const inputId = `question-${question._id}-input`;
                            document.getElementById(inputId).focus();
                        }}
                        >
                        <input
                            id={`question-${question._id}-input`}
                            type={question.answerType === "number" ? "number" : "text"}
                            {...field}
                            className="w-full p-2 bg-background-40 rounded outline-none focus:outline-teal-300 "
                            placeholder="Enter your answer"
                        />
                        </div>
                    )}
                    
                    </div>
                    {errors[`question-${question._id}`] && (
                        <span className="text-red-500 typography-small-p">This field is required</span>
                    )}
                </div>
                )}
            />
            </div>
        ))}
        </div>
    </>
  )
}

export default AdditionalQuestions

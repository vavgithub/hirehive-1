import React from 'react'
import { Controller } from 'react-hook-form';

function AdditionalQuestions({jobDetails, control ,errors}) {
  return (
    <>
        <h3 className="mb-4">Additional Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobDetails?.questions.map((question, index) => (
            <div key={question?._id} className="bg-background-90 rounded-xl p-4">
            <Controller
                key={question._id}
                name={`question-${question._id}`}
                control={control}
                defaultValue=""
                rules={{ required: question.required ,
                    validate: (value) => {
                        if (question.answerType === "number" && value < 0) {
                            return "Negative numbers are not allowed";
                        }
                        if (question.answerType === "link") {
                            const trimmed = typeof value === "string" ? value.trim() : "";
                            if (!trimmed) {
                                return true; // empty handled by required
                            }
                            if (!/^https?:\/\/.+/i.test(trimmed)) {
                                return "Please enter a valid link (starting with http:// or https://)";
                            }
                        }
                        return true;
                    },
                }}
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
                            className={"px-4 py-2 min-h-11 rounded-xl flex  items-center cursor-pointer hover-outline " + (field.value === option ? 'selection-primary' : "bg-background-80")}
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
                                className="custom-radio"
                            />
                            <label className='typography-body overflow-hidden whitespace-nowrap text-ellipsis' htmlFor={inputId}>{option}</label>
                            </div>
                        );
                        })
                    ) : question.type === 'multi-select' ? (
                        question.options.map((option, optionIndex) => {
                        const inputId = `question-${question._id}-option-${optionIndex}`;

                        const handleMultiSelectClick = (onChange,values,option) => {
                                if(values && Array.isArray(values)){
                                    if(values.includes(option)){
                                        onChange(values.filter(val => val !== option));
                                    }else{
                                        onChange([...values,option]);
                                    }
                                }else{
                                    onChange([option]);
                                }
                        }

                        return (
                            <div
                            key={optionIndex}
                            className={"px-4 py-2 min-h-11 rounded-xl flex  items-center cursor-pointer hover-outline " + (field.value?.includes(option) ? 'selection-primary' : "bg-background-80")}
                            onClick={() => {
                                handleMultiSelectClick(field.onChange,field.value,option)
                                document.getElementById(inputId).focus();
                            }}
                            >
                            <input
                                type="checkbox"
                                id={inputId}
                                value={option}
                                checked={field.value?.includes(option)}
                                onClick={(event) => event.stopPropagation()}
                                onChange={() => handleMultiSelectClick(field.onChange, field.value, option)}
                                className="geode-check"
                            />
                            <label className="text-sm" htmlFor={inputId}>{option}</label>
                            </div>
                        );
                        })
                    )
                    : (
                        <div
                        className="w-full cursor-pointer"
                        onClick={() => {
                            const inputId = `question-${question._id}-input`;
                            document.getElementById(inputId).focus();
                        }}
                        >
                        <input
                            id={`question-${question._id}-input`}
                            type={question.answerType === "number" ? "number" : question.answerType === "link" ? "url" : "text"}
                            {...field}
                            onWheel={(event) => event.currentTarget.blur()}
                            className="w-full p-2 bg-background-80 rounded outline-none focus:outline-teal-300 no-spinner"
                            placeholder={question.answerType === "link" ? "Paste your link here (https://...)" : "Enter your answer"}
                        />
                        </div>
                    )}
                    
                    </div>
                    {errors[`question-${question._id}`] && (
                        <span className="text-red-500 typography-small-p">{errors[`question-${question._id}`].message || "This field is required"}</span>
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

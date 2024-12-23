import React, { useEffect, useState } from 'react'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'
import TextQuestion from './TextQuestion'

const Que = ({ onQuestionsChange, initialQuestions = [] }) => {
    const [open, setOpen] = useState(false)
    const [questions, setQuestions] = useState(initialQuestions)
    const [isLastQuestionValid, setIsLastQuestionValid] = useState(true)

    useEffect(() => {
        onQuestionsChange(questions);
    }, [questions, onQuestionsChange]);
    

    const toggleDropdown = () => {
        setOpen(!open)
    }
    const addQuestion = (type) => {
        const newQuestion = {
            id: Date.now(),
            type,
            text: '',
            options: type === 'multiple' ? [''] : [],
            required: false,
            answerType: type === 'text' ? 'text' : undefined,
        }
        setQuestions(prev=>[...prev, newQuestion])
        setOpen(false)
        setIsLastQuestionValid(false)
    }

    const updateQuestion = (updatedQuestion) => {
        const updatedQuestions = questions.map(q => 
          q._id ? (q._id === updatedQuestion._id ? updatedQuestion : q) :( q.id === updatedQuestion.id ? updatedQuestion : q)
        );
        setQuestions(updatedQuestions);
    }

    const deleteQuestion = (id) => {
        setQuestions(questions.filter(q => (q._id ||  q?.id) !== id))
        if (questions.length > 0) {
            setIsLastQuestionValid(true)
        }
    }

    const copyQuestion = (questionToCopy) => {
        const { _id, ...restOfCopied } = questionToCopy
        const copiedQuestion = {
            ...restOfCopied,
            id: Date.now()
        }
        setQuestions([...questions, copiedQuestion])
        setIsLastQuestionValid(true)
    }

    const handleQuestionValidityChange = (isValid) => {
        setIsLastQuestionValid(isValid)
    }

    return (
        <div className="bg-background-80  ">
            <div className='pt-4 flex flex-col justify-between h-full '>
                <span className='typography-body mb-4'>Additional Questions </span>
                <div className='bg-background-30 rounded-xl h-full flex flex-col items-center justify-start border border-dashed border-gray-500'>
                    {questions.length === 0 ? (
                        <>
                            <p className='typography-body text-font-gray p-8'>
                                Add additional questions to your job post to help evaluate your candidates more thoroughly
                            </p>
                        </>
                    ) : (
                        questions.map((question, index) => (
                            question.type === 'multiple' 
                                ? <MultipleChoiceQuestion 
                                    key={question?.id ? question.id : question._id} 
                                    question={question}
                                    onUpdate={updateQuestion}
                                    onDelete={() => deleteQuestion(question?.id ? question.id : question._id)}
                                    onCopy={() => copyQuestion(question)}
                                    initialEditMode={index === questions.length - 1}
                                    onValidityChange={index === questions.length - 1 ? handleQuestionValidityChange : undefined}
                                    questionNumber={index + 1}
                                  />
                                : <TextQuestion 
                                    key={question?.id ? question.id : question._id} 
                                    question={question}
                                    onUpdate={updateQuestion}
                                    onDelete={() => deleteQuestion(question?.id ? question.id : question._id)}
                                    onCopy={() => copyQuestion(question)}
                                    initialEditMode={index === questions.length - 1}
                                    onValidityChange={index === questions.length - 1 ? handleQuestionValidityChange : undefined}
                                    questionNumber={index + 1}
                                  />
                        ))
                    )}

                    <div className='w-[240px] relative mb-4'>
                        <div 
                            className={`text-font-primary cursor-pointer typography-large ${!isLastQuestionValid && questions.length > 0 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            onClick={isLastQuestionValid ? toggleDropdown : undefined}
                        >
                            + Add question
                        </div>
    
                        {open && (
                            <div className='bg-background-70 mt-2 rounded-xl absolute bottom-6 w-full'>
                                <ul className='p-2 typography-body'>
                                    <li className='p-2 cursor-pointer hover:bg-background-60' onClick={() => addQuestion('multiple')}>Multiple Choice</li>
                                    <li className='p-2 cursor-pointer hover:bg-background-60' onClick={() => addQuestion('text')}>Text</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Que
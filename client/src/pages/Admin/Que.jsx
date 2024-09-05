import React, { useState } from 'react'
import Header from '../../components/utility/Header'
import { Button } from '../../components/ui/Button'
import Skip from '../../svg/Buttons/Skip'
import GOD from "../../svg/Background/Que.svg"
import TextQuestion from '../../components/TextQuestion'
import MultipleChoiceQuestion from '../../components/MultipleChoiceQuestion'

const Que = () => {
    const [open, setOpen] = useState(false)
    const [questions, setQuestions] = useState([])
    const [isLastQuestionValid, setIsLastQuestionValid] = useState(true)

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
        setQuestions([...questions, newQuestion])
        setOpen(false)
        setIsLastQuestionValid(false)
    }

    const updateQuestion = (updatedQuestion) => {
        setQuestions(questions.map(q => 
            q.id === updatedQuestion.id ? updatedQuestion : q
        ))
    }

    const deleteQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id))
        if (questions.length > 0) {
            setIsLastQuestionValid(true)
        }
    }

    const copyQuestion = (questionToCopy) => {
        const copiedQuestion = {
            ...questionToCopy,
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
            <div className='p-4 flex flex-col justify-between h-full '>
                <span className='typography-body'>Additional Questions </span>
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
                                    key={question.id} 
                                    question={question}
                                    onUpdate={updateQuestion}
                                    onDelete={() => deleteQuestion(question.id)}
                                    onCopy={() => copyQuestion(question)}
                                    initialEditMode={index === questions.length - 1}
                                    onValidityChange={index === questions.length - 1 ? handleQuestionValidityChange : undefined}
                                    questionNumber={index + 1}
                                  />
                                : <TextQuestion 
                                    key={question.id} 
                                    question={question}
                                    onUpdate={updateQuestion}
                                    onDelete={() => deleteQuestion(question.id)}
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
                            <div className='bg-background-70 mt-2 rounded-xl absolute w-full'>
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
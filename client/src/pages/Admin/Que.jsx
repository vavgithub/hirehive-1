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

    const toggleDropdown = () => {
        setOpen(!open)
    }

    const addQuestion = (type) => {
        const newQuestion = {
            id: Date.now(),
            type,
            text: '',
            options: type === 'multiple' ? ['Option 1', 'Option 2'] : [],
            required: false,
            isEditing: true
        }
        setQuestions(questions.map(q => ({ ...q, isEditing: false })).concat(newQuestion))
        setOpen(false)
    }

    const updateQuestion = (updatedQuestion) => {
        setQuestions(questions.map(q => 
            q.id === updatedQuestion.id ? { ...updatedQuestion, isEditing: false } : { ...q, isEditing: false }
        ))
    }

    const deleteQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id))
    }

    const copyQuestion = (questionToCopy) => {
        const copiedQuestion = {
            ...questionToCopy,
            id: Date.now(),
            isEditing: false
        }
        setQuestions([...questions, copiedQuestion])
    }

    return (
        <div className="bg-background-80 h-screen">
            <div className='p-4 flex flex-col justify-between h-full'>
                <Header HeaderText="Additional Questions"></Header>
                <div className='bg-background-30 rounded-xl h-full flex flex-col items-center justify-start ml-auto mr-auto pl-16 pr-16 overflow-y-auto'>
                    {questions.length === 0 ? (
                        <>
                            <img src={GOD} alt="" />
                            <p className='typography-body text-font-gray p-8'>
                                Add additional questions to your job post to help evaluate your candidates more thoroughly
                            </p>
                        </>
                    ) : (
                        questions.map(question => (
                            question.type === 'multiple' 
                                ? <MultipleChoiceQuestion 
                                    key={question.id} 
                                    question={question}
                                    onUpdate={updateQuestion}
                                    onDelete={() => deleteQuestion(question.id)}
                                    onCopy={() => copyQuestion(question)}
                                    isEditing={question.isEditing}
                                  />
                                : <TextQuestion 
                                    key={question.id} 
                                    question={question}
                                    onUpdate={updateQuestion}
                                    onDelete={() => deleteQuestion(question.id)}
                                    onCopy={() => copyQuestion(question)}
                                    isEditing={question.isEditing}
                                  />
                        ))
                    )}

                    <div className='w-[240px] relative mb-4'>
                        <Button variant="secondary" onClick={toggleDropdown}>
                            Add
                        </Button>
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
                <div className='w-full flex flex-row-reverse'>
                    <div className='w-[240px] mr-60 pt-4'>
                        <Button variant="primary" icon={Skip}>
                            Skip
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Que
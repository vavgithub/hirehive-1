import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from '../../api/axios';
import { Button } from '../../components/ui/Button';


const fetchJobDetails = async (id) => {
    const response = await axios.get(`/getJobById/${id}`);
    return response.data;
};

const submitApplication = async ({ jobId, answers }) => {
  const response = await axios.post(`/submitApplication/${jobId}`, { answers });
  return response.data;
};

const MiniForm = () => {
  const { id:mainId } = useParams();
  console.log(mainId);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  const { data: jobDetails, isLoading, error } = useQuery({
    queryKey: ['jobDetails', mainId],
    queryFn: () => fetchJobDetails(mainId),
  });

  const mutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      navigate('/application-submitted');
    },
    onError: (error) => {
      console.error('Error submitting application:', error);
      // Handle error (e.g., show error message to user)
    },
  });

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({ jobId, answers });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { jobTitle, questions = [] } = jobDetails || {};

  return (
    <div className="bg-background-80 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Application for {jobTitle}</h1>
      <h2 className="text-xl mb-4">Additional Questions</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question.id} className="mb-4">
            <label className="block mb-2">
              {index + 1}. {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {question.type === 'multiple' ? (
              question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2">
                  <input
                    type="radio"
                    id={`question-${question.id}-option-${optionIndex}`}
                    name={`question-${question.id}`}
                    value={option}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    required={question.required}
                    className="mr-2"
                  />
                  <label htmlFor={`question-${question.id}-option-${optionIndex}`}>{option}</label>
                </div>
              ))
            ) : (
              <input
                type={question.answerType === 'number' ? 'number' : 'text'}
                value={answers[question.id] || ''}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                required={question.required}
                className="w-full no-spinner p-2 bg-background-40 rounded outline-none focus:outline-teal-300"
                placeholder="Enter your answer"
              />
            )}
          </div>
        ))}
        <div className="mt-4">
          <Button type="submit" variant="primary" disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting...' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
};



export default MiniForm
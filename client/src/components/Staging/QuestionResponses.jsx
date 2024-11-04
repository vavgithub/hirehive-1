import { useState } from "react";

const QuestionResponses = ({ responses }) => {
    const [openIndex, setOpenIndex] = useState(0);

  if (!responses || responses.length === 0) {
    return (
      <div className="p-4 text-center text-font-gray">
        No question responses available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="typography-h3">Application Questions</h3>
        <span className="typography-small-p text-font-gray">
          {responses.length} Questions
        </span>
      </div>
      
      <div className="space-y-4">
        {responses.map((response, index) => (
          <div 
            key={response.questionId} 
            className="border border-background-80 rounded-lg overflow-hidden"
          >
            {/* Accordion Header */}
            <button
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="w-full flex items-center justify-between p-4 hover:bg-background-80 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-background-80 flex items-center justify-center">
                  <span className="text-sm text-font-primary">{index + 1}</span>
                </div>
                <span className="typography-body text-font-gray">
                  {response.question.text}
                  {response.question.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </span>
              </div>
              
              {/* Chevron Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Accordion Content */}
            {openIndex === index && (
              <div className="p-4 pt-0 border-t border-background-80">
                <div className="pl-10">
                  {response.question.type === 'multiple' ? (
                    <div className="flex flex-wrap gap-2">
                      {/* Show all options with the selected one highlighted */}
                      {response.question.options.map((option) => (
                        <span 
                          key={option}
                          className={`px-3 py-1 rounded-full ${
                            option === response.answer 
                              ? 'bg-primary text-white' 
                              : 'bg-background-80 text-font-gray'
                          }`}
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-background-80 p-3 rounded-lg typography-body text-white">
                      {response.answer}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionResponses;


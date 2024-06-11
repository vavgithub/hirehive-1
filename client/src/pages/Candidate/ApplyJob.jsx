import React, { useState } from 'react'
import FormStepper from '../../components/FormStepper'

const one = () => {
    const [file, setFile] = useState(null);
    const [portfolioLink, setPortfolioLink] = useState('');
    const [websiteURL, setWebsiteURL] = useState('');
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle the submission logic here, such as preparing data for an API or form validation
      console.log(file, portfolioLink, websiteURL);
    };
  
    return (
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-md rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Resume*</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20l-12-12z"
                    fill="#fff"
                  />
                  <path
                    d="M28 8v12h12M20 32h8m-4-4v8M12 16h.01M16 16h.01M20 16h.01"
                    stroke="#4a5568"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF up to 10MB</p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Portfolio*</label>
            <input
              type="text"
              name="portfolio-link"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter your portfolio link"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Website*</label>
            <input
              type="text"
              name="website"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter your website URL"
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Next
          </button>
        </form>
      </div>
    );
  }



const FORMS_STEP = [
    {
        name: 'Resume and Portfolio',
        component: ()=> one()
    },
    {
        name: 'Personel Details',
        component: ()=> <div>Personel Details</div>
    },
    {
        name: 'Professional Details',
        component: ()=> <div>Professional Details</div>
    },
    {
        name: 'Skills',
        component: ()=> <div>Skills</div>
    }
]

const ApplyJob = () => {
  return (
    <div>ApplyJob
        <FormStepper stepsConfig={FORMS_STEP} />
    </div>
  )
}


export default ApplyJob
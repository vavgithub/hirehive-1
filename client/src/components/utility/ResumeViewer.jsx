import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '../ui/Button';


const ResumeViewer = ({ documentUrl, onClose }) => {
    const [viewerFailed, setViewerFailed] = useState(false);

    const getViewerUrl = (url) => {
      const encodedUrl = encodeURIComponent(url);
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`;
    };
  
    const viewerUrl = getViewerUrl(documentUrl);
  
    const handleDownload = () => {
      window.open(documentUrl, '_blank');
    };
  
    const handleViewerError = () => {
      setViewerFailed(true);
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
          {!viewerFailed ? (
            <iframe
              src={viewerUrl}
              title="Document Viewer"
              className="w-full flex-grow mb-4"
              onError={handleViewerError}
            />
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <p>Unable to load the document. Please try downloading it instead.</p>
            </div>
          )}
          <div className="flex justify-between">
            <Button onClick={onClose} variant="secondary">Cancel</Button>
            <Button onClick={handleDownload} variant="primary">Download</Button>
          </div>
        </div>
      </div>
    );
  };
export default ResumeViewer;
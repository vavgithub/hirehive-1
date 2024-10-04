import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '../ui/Button';


const ResumeViewer = ({ documentUrl, onClose }) => {
  const [viewerFailed, setViewerFailed] = useState(false);

  const getFileExtension = (url) => {
    return url.split('.').pop().toLowerCase();
  };

  const getViewerUrl = (url) => {
    const encodedUrl = encodeURIComponent(url);
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`;
  };

  const fileExtension = getFileExtension(documentUrl);
  const viewerUrl = getViewerUrl(documentUrl);

  const handleDownload = () => {
    window.open(documentUrl, '_blank');
  };

  const handleViewerError = () => {
    setViewerFailed(true);
  };

  const renderContent = () => {
    if (!viewerFailed) {
      return (
        <iframe
          src={viewerUrl}
          title="Document Viewer"
          className="w-full flex-grow mb-4"
          onError={handleViewerError}
        />
      );
    }

    // Fallback options based on file type
    switch (fileExtension) {
      case 'pdf':
        return (
          <iframe
            src={documentUrl}
            title="PDF Viewer"
            className="w-full flex-grow mb-4"
          />
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <img
            src={documentUrl}
            alt="Document Preview"
            className="max-w-full max-h-full object-contain mb-4"
          />
        );
      default:
        return (
          <div className="flex-grow flex items-center justify-center">
            <p>Preview not available. Please download the file to view it.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        {renderContent()}
        <div className="flex justify-between">
          <Button onClick={onClose} variant="secondary">Cancel</Button>
          <Button onClick={handleDownload} variant="primary">Download</Button>
        </div>
      </div>
    </div>
  );
};
export default ResumeViewer;
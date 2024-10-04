import React from 'react';
import { Button } from '../ui/Button';

const ResumeViewer = ({ documentUrl, onClose }) => {
  const getFileExtension = (url) => {
    return url.split('.').pop().toLowerCase();
  };

  const fileExtension = getFileExtension(documentUrl);

  const getDownloadUrl = (url) => {
    // Parse the Cloudinary URL
    const urlParts = url.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    if (uploadIndex === -1) return url; // Not a Cloudinary URL

    // Insert the download transformation
    urlParts.splice(uploadIndex + 1, 0, 'fl_attachment');

    // Reconstruct the URL
    return urlParts.join('/');
  };

  const handleDownload = () => {
    const downloadUrl = getDownloadUrl(documentUrl);

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (fileExtension === 'pdf') {
      return (
        <iframe
          src={documentUrl}
          width="100%"
          height="100%"
          frameBorder="0"
        >
          This browser does not support PDFs. Please download the PDF to view it.
        </iframe>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-full">
          <p>Preview not available for this file type. Please use the download button to view the file.</p>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex-grow relative overflow-hidden mb-4">
          {renderContent()}
        </div>
        <div className="flex justify-between">
          <Button onClick={onClose} variant="secondary">Cancel</Button>
          <Button onClick={handleDownload} variant="primary">Download</Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;

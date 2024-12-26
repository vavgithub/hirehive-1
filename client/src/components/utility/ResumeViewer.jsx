import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import Loader from '../ui/Loader'; // Import your Loader component

const ResumeViewer = ({ documentUrl, onClose }) => {
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Automatically hide the loader after 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const getFileExtension = (url) => {
    return url.split('.').pop().toLowerCase();
  };

  const getFileName = (url) => {
    return url.split("/").pop().toLowerCase();
  };

  const fileExtension = getFileExtension(documentUrl);

  const getDownloadUrl = (url) => {
    const urlParts = url.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    if (uploadIndex === -1) return url;
    urlParts.splice(uploadIndex + 1, 0, 'fl_attachment');
    return urlParts.join('/');
  };

  const handleDownload = () => {
    const downloadUrl = getDownloadUrl(documentUrl);

    fetch(downloadUrl)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const filename = fileExtension === "pdf" ? '' : `${getFileName(downloadUrl)}.docx`;

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        console.error("Error downloading the file", error);
      });
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
        <iframe
          src={`https://docs.google.com/viewer?url=${documentUrl}&embedded=true`}
          width="100%"
          height="100%"
          frameBorder="0"
        >
          This browser does not support this file type. Please use the download button to view the file.
        </iframe>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-background-100 p-4 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex-grow relative overflow-hidden mb-4">
          {/* Show Loader for a second, then render content */}
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader />
            </div>
          ) : (
            renderContent()
          )}
        </div>
        <div className="flex justify-end gap-4">
            <Button onClick={onClose} variant="secondary">Cancel</Button>
            <Button onClick={handleDownload} variant="primary">Download</Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;

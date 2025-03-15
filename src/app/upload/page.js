"use client"
import { useState } from 'react';

export default function SimpleFileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError('');
      setUploadedFileUrl('');
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      setError('');
      
      // Step 1: Get a presigned URL from your API
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get upload URL');
      }

      const { presignedUrl, url } = await response.json();
      
      // Step 2: Upload directly to the presigned URL
      // Using XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();
      
      // Set up the upload progress handler
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
        }
      };
      
      // Set up completion handler
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadedFileUrl(url);
          setFile(null);
        } else {
          setError(`Upload failed with status ${xhr.status}`);
        }
        setUploading(false);
      };
      
      // Set up error handler
      xhr.onerror = () => {
        setError('Network error occurred during upload');
        setUploading(false);
      };
      
      // Configure and send the request
      xhr.open('PUT', presignedUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      // Skip setting Content-Length as browsers handle this automatically
      // Don't set these headers as they can cause CORS issues:
      // - Origin
      // - Authorization
      xhr.send(file);
      
    } catch (err) {
      console.error('Error during upload process:', err);
      setError(err.message || 'An error occurred during upload');
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">S3 File Upload</h2>
      
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm border border-gray-300 rounded p-2"
          disabled={uploading}
        />
      </div>
      
      <div className="mb-4">
        <button
          onClick={uploadFile}
          disabled={!file || uploading}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>
      
      {uploading && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-center">{progress}%</p>
        </div>
      )}
      
      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}
      
      {uploadedFileUrl && (
        <div className="mb-4 text-green-500">
          File uploaded successfully!{' '}
          <a 
            href={uploadedFileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline"
          >
            View file
          </a>
        </div>
      )}
    </div>
  );
}
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateGroup({ user }) {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFileToS3 = async () => {
    try {
      if (!file) return null;
      
      setUploading(true);
      setUploadProgress(0);
      
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

      const { presignedUrl, url, key } = await response.json();
      
      // Step 2: Upload directly to the presigned URL
      const xhr = new XMLHttpRequest();
      
      // Set up promise to track completion
      const uploadPromise = new Promise((resolve, reject) => {
        // Set up the upload progress handler
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percentComplete);
          }
        };
        
        // Set up completion handler
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({ url, key });
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };
        
        // Set up error handler
        xhr.onerror = () => {
          reject(new Error('Network error occurred during upload'));
        };
      });
      
      // Configure and send the request
      xhr.open('PUT', presignedUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
      
      // Wait for upload to complete
      const fileData = await uploadPromise;
      setUploading(false);
      return fileData;
      
    } catch (err) {
      console.error('Error during upload process:', err);
      setError(err.message || 'An error occurred during upload');
      setUploading(false);
      return null;
    }
  };

  const createGroup = async (e) => {
    e.preventDefault();
    
    if (!user) {
      router.push("/signin");
      return;
    }
    
    if (!groupName.trim()) {
      setError("Group name is required");
      return;
    }
    
    try {
      // First upload the file if one is selected
      let iconData = null;
      if (file) {
        iconData = await uploadFileToS3();
        if (!iconData && file) {
          // If we had a file but upload failed, show error
          setError("Failed to upload icon. Please try again.");
          return;
        }
      }
      
      // Then create the group with the icon URL if available
      const response = await fetch(`/api/groups/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: groupName,
          description: description,
          creatorId: user?._id,
          // Use the icon field for the image location
          iconURL: iconData?.url || `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/uploads/designer.jpeg`,
        }),
      });
      
      if (response.ok) {
        router.push("/groups");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error creating group");
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg border border-gray-200 mx-4 p-4 md:p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Create a New Group
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}
        
        <form onSubmit={createGroup} className="space-y-6">
          <div className="drop-shadow-sm">
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              required
            />
          </div>
          
          <div className="drop-shadow-sm">
            <textarea
              placeholder="Group Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all h-40"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Group Icon (Optional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm border border-gray-200 rounded p-2"
              disabled={uploading}
              accept="image/*"
            />
          </div>
          
          {uploading && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-teal-600 h-2 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-center mt-1 text-gray-500">
                Uploading: {uploadProgress}%
              </p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all hover:shadow-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Create Group"}
          </button>
        </form>
      </div>
    </div>
  );
}
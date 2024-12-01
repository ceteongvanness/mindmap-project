// src/components/FileUploader/FileUploader.tsx
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface FileUploaderProps {
  onFileProcessed: (data: any) => void;
  acceptedFileTypes: string;
  maxSize: number;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileProcessed,
  acceptedFileTypes,
  maxSize,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    processFile(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    if (file.size > maxSize) {
      toast.error('File size exceeds maximum limit');
      return;
    }

    try {
      // Here you would process the file and generate mind map data
      // For now, we'll use sample data
      const sampleData = {
        id: '1',
        label: file.name,
        children: [
          { id: '2', label: 'Generated Topic 1' },
          { id: '3', label: 'Generated Topic 2' },
        ],
      };

      onFileProcessed(sampleData);
      toast.success('File processed successfully');
    } catch (error) {
      toast.error('Error processing file');
      console.error(error);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input
        type="file"
        accept={acceptedFileTypes}
        onChange={handleFileInput}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          Drag a file here or click to upload
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Accepts: {acceptedFileTypes.replace(/,/g, ', ')}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Maximum size: {Math.floor(maxSize / 1024 / 1024)}MB
        </p>
      </label>
    </div>
  );
};
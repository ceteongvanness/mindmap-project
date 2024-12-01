// src/components/MindMap/MindMapExport.tsx
import * as React from 'react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MindMapExportProps, ExportOptions } from '../../types';
import { exportToPDF, exportToPNG } from '../../utils/export';
import { MindMap } from './MindMap';

export const MindMapExport: React.FC<MindMapExportProps> = ({
  watermark,
  fileName = 'mindmap',
  ...mindMapProps
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);
  
    const handleExport = async (format: 'pdf' | 'png') => {
      if (!containerRef.current || isExporting) return;
  
      try {
        setIsExporting(true);
        const loadingToast = toast.loading(`Generating ${format.toUpperCase()}...`);
  
        const exportOptions: ExportOptions = {
          fileName,
          format,
          watermark,
          quality: 1,
          scale: 2,
        };
  
        if (format === 'pdf') {
          await exportToPDF(containerRef.current, exportOptions);
        } else {
          const pngUrl = await exportToPNG(containerRef.current, exportOptions);
          const link = document.createElement('a');
          link.download = `${fileName}.png`;
          link.href = pngUrl;
          link.click();
        }
  
        toast.dismiss(loadingToast);
        toast.success(`${format.toUpperCase()} generated successfully!`);
      } catch (error) {
        console.error(`Error generating ${format}:`, error);
        toast.error(`Failed to generate ${format}. Please try again.`);
      } finally {
        setIsExporting(false);
      }
    };
  
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleExport('png')}
            disabled={isExporting}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Export PNG
          </button>
          <button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Export PDF
          </button>
        </div>
        <div ref={containerRef} className="bg-white">
          <MindMap {...mindMapProps} />
        </div>
      </div>
    );
  };
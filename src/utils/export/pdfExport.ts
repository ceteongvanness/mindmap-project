// src/utils/export/pdfExport.ts
import type { ExportOptions } from '../../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { addWatermark } from './watermark';

export const exportToPDF = async (
    element: HTMLElement,
    options: ExportOptions
  ): Promise<void> => {  
    const canvas = await html2canvas(element, {
      scale: options.scale || 2,
      backgroundColor: '#ffffff',
      logging: false,
    });
  
    const watermarkedCanvas = await addWatermark(canvas, options.watermark);
  
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
      unit: 'mm',
    });
  
    const imgData = watermarkedCanvas.toDataURL('image/png', options.quality || 1);
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${options.fileName || 'mindmap'}.pdf`);
  };
  
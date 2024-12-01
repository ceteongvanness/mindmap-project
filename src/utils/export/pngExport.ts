// src/utils/export/pngExport.ts
import type { ExportOptions } from '../../types';
import html2canvas from 'html2canvas';
import { addWatermark } from './watermark';

export const exportToPNG = async (
  element: HTMLElement,
  options: ExportOptions
): Promise<string> => {
  const canvas = await html2canvas(element, {
    scale: options.scale || 2,
    backgroundColor: '#ffffff',
    logging: false
  });

  const watermarkedCanvas = await addWatermark(canvas, options.watermark);
  return watermarkedCanvas.toDataURL('image/png', options.quality || 1.0);
};
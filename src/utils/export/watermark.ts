// src/utils/watermark.ts
import type { ExportOptions } from '../../types';

export const addWatermark = async (
    canvas: HTMLCanvasElement,
    options?: ExportOptions['watermark']
  ) => {
    if (!options) return canvas;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;
  
    const { text, image, opacity = 0.3, position = 'bottom-right' } = options;
  
    if (text) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.font = '24px Arial';
      ctx.fillStyle = '#888888';
      
      const textWidth = ctx.measureText(text).width;
      let x, y;
  
      switch (position) {
        case 'center':
          x = (canvas.width - textWidth) / 2;
          y = canvas.height / 2;
          break;
        case 'top-left':
          x = 20;
          y = 40;
          break;
        default: // bottom-right
          x = canvas.width - textWidth - 20;
          y = canvas.height - 20;
      }
  
      ctx.fillText(text, x, y);
      ctx.restore();
    }
  
    if (image) {
      const watermarkImage = new Image();
      watermarkImage.src = image;
  
      await new Promise((resolve) => {
        watermarkImage.onload = () => {
          ctx.save();
          ctx.globalAlpha = opacity;
          
          let x, y;
          switch (position) {
            case 'center':
              x = (canvas.width - watermarkImage.width) / 2;
              y = (canvas.height - watermarkImage.height) / 2;
              break;
            case 'top-left':
              x = 20;
              y = 20;
              break;
            default: // bottom-right
              x = canvas.width - watermarkImage.width - 20;
              y = canvas.height - watermarkImage.height - 20;
          }
  
          ctx.drawImage(watermarkImage, x, y);
          ctx.restore();
          resolve(null);
        };
      });
    }
  
    return canvas;
  };
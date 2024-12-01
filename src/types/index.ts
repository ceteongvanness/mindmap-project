// src/types/index.ts
export interface MindMapNode {
    id: string;
    label: string;
    children?: MindMapNode[];
    style?: NodeStyle;
  }
  
  export interface NodeStyle {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fontSize?: number;
  }
  
  export interface ExportOptions {
    fileName?: string;
    format: 'pdf' | 'png';
    watermark?: {
      text?: string;
      image?: string;
      opacity?: number;
      position?: 'center' | 'bottom-right' | 'top-left';
    };
    quality?: number;
    scale?: number;
  }
  
  export interface MindMapProps {
    data: MindMapNode;
    width?: number;
    height?: number;
  }
  
  export interface MindMapExportProps extends MindMapProps {
    fileName?: string;
    watermark?: ExportOptions['watermark'];
  }
// src/components/MindMap/MindMap.tsx
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { MindMapNode, MindMapProps } from '../../types';

interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const MindMap: React.FC<MindMapProps> = ({ 
  data, 
  width = 1000, 
  height = 600 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [positions, setPositions] = useState<Map<string, NodePosition>>(new Map());
  const [isDragging, setIsDragging] = useState(false);
  const [dragNode, setDragNode] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

  const calculatePositions = (
    node: MindMapNode,
    x: number,
    y: number,
    level: number,
    positions: Map<string, NodePosition>
  ) => {
    const nodeWidth = 120;
    const nodeHeight = 40;
    const verticalSpacing = 60;
    const horizontalSpacing = 160;

    positions.set(node.id, {
      x,
      y,
      width: nodeWidth,
      height: nodeHeight,
    });

    if (node.children) {
      const totalHeight = (node.children.length - 1) * verticalSpacing;
      let currentY = y - totalHeight / 2;

      node.children.forEach((child: MindMapNode) => {
        calculatePositions(
          child,
          x + horizontalSpacing,
          currentY,
          level + 1,
          positions
        );
        currentY += verticalSpacing;
      });
    }
  };

  const handleMouseDown = (event: React.MouseEvent, nodeId: string) => {
    event.stopPropagation(); // Prevent panning when dragging nodes
    setIsDragging(true);
    setDragNode(nodeId);
    const nodePos = positions.get(nodeId);
    if (nodePos) {
      setOffset({
        x: event.clientX - nodePos.x * scale,
        y: event.clientY - nodePos.y * scale,
      });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging && dragNode) {
      const newPositions = new Map(positions);
      const nodePos = positions.get(dragNode);
      if (nodePos) {
        newPositions.set(dragNode, {
          ...nodePos,
          x: (event.clientX - offset.x) / scale,
          y: (event.clientY - offset.y) / scale,
        });
        setPositions(newPositions);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragNode(null);
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    const scaleChange = event.deltaY > 0 ? 0.9 : 1.1;
    setScale(Math.min(Math.max(0.1, scale * scaleChange), 4));
  };

  const handlePanStart = (event: React.MouseEvent) => {
    if (!isDragging) {
      setIsPanning(true);
      setLastPanPoint({ x: event.clientX, y: event.clientY });
    }
  };

  const handlePanMove = (event: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: pan.x + (event.clientX - lastPanPoint.x),
        y: pan.y + (event.clientY - lastPanPoint.y)
      });
      setLastPanPoint({ x: event.clientX, y: event.clientY });
    }
  };

  const handlePanEnd = () => {
    setIsPanning(false);
  };

  const renderConnections = (node: MindMapNode) => {
    if (!node.children) return null;

    return node.children.map((child) => {
      const parentPos = positions.get(node.id);
      const childPos = positions.get(child.id);

      if (!parentPos || !childPos) return null;

      return (
        <line
          key={`${node.id}-${child.id}`}
          x1={parentPos.x + parentPos.width}
          y1={parentPos.y + parentPos.height / 2}
          x2={childPos.x}
          y2={childPos.y + childPos.height / 2}
          stroke="#999"
          strokeWidth="2"
        />
      );
    });
  };

  const renderNode = (node: MindMapNode) => {
    const pos = positions.get(node.id);
    if (!pos) return null;

    return (
      <g key={node.id}>
        <rect
          x={pos.x}
          y={pos.y}
          width={pos.width}
          height={pos.height}
          rx="5"
          ry="5"
          fill={node.style?.backgroundColor || '#fff'}
          stroke={node.style?.borderColor || '#333'}
          strokeWidth={node.style?.borderWidth || 2}
          className="cursor-move"
          onMouseDown={(e) => handleMouseDown(e, node.id)}
        />
        <text
          x={pos.x + pos.width / 2}
          y={pos.y + pos.height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={node.style?.fontSize || 14}
          fill={node.style?.textColor || '#000'}
        >
          {node.label}
        </text>
        {renderConnections(node)}
        {node.children?.map((child) => renderNode(child))}
      </g>
    );
  };

  useEffect(() => {
    const newPositions = new Map<string, NodePosition>();
    calculatePositions(data, 100, height / 2, 0, newPositions);
    setPositions(newPositions);
  }, [data, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      onWheel={handleWheel}
      onMouseDown={handlePanStart}
      onMouseMove={(e) => {
        handlePanMove(e);
        handleMouseMove(e);
      }}
      onMouseUp={() => {
        handlePanEnd();
        handleMouseUp();
      }}
      onMouseLeave={() => {
        handlePanEnd();
        handleMouseUp();
      }}
      className="bg-white cursor-grab"
    >
      <g transform={`translate(${pan.x},${pan.y}) scale(${scale})`}>
        {renderNode(data)}
      </g>
    </svg>
  );
};
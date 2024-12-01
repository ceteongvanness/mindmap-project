# React Mind Map Generator

A powerful and flexible mind map generator built with React and TypeScript. Create, customize, and export mind maps in multiple formats with support for styling, zooming, and watermarking.

## 🚀 Features

- **Interactive Mind Map Creation**
  - Drag and drop nodes
  - Zoom and pan functionality
  - Real-time updates
  - Customizable node styling

- **Rich Export Options**
  - PDF export
  - PNG export
  - Custom watermarking (text and image)
  - High-quality output

- **Customization Options**
  - Node colors and styles
  - Connection line styles
  - Font sizes
  - Layout options
  - Custom watermark positioning

## 📦 Installation

```bash
# Using npm
npm install mind-map-generator

# Using yarn
yarn add mind-map-generator
```

### Dependencies

```bash
npm install html2canvas jspdf react-hot-toast
```

## 🔧 Usage

### Basic Usage

```tsx
import { MindMapExport } from 'mind-map-generator';

const App = () => {
  const mindMapData = {
    id: '1',
    label: 'Main Topic',
    children: [
      {
        id: '2',
        label: 'Subtopic 1',
        children: [
          { id: '4', label: 'Detail 1' },
          { id: '5', label: 'Detail 2' },
        ],
      },
      {
        id: '3',
        label: 'Subtopic 2',
        children: [
          { id: '6', label: 'Detail 3' },
          { id: '7', label: 'Detail 4' },
        ],
      },
    ],
  };

  return (
    <MindMapExport
      data={mindMapData}
      width={1000}
      height={600}
      fileName="my-mindmap"
    />
  );
};
```

### With Custom Styling

```tsx
const StyledMindMap = () => {
  const mindMapData = {
    id: '1',
    label: 'Main Topic',
    style: {
      backgroundColor: '#e3f2fd',
      textColor: '#1565c0',
      borderColor: '#1565c0',
      fontSize: 16,
    },
    children: [
      // ... child nodes
    ],
  };

  return (
    <MindMapExport
      data={mindMapData}
      width={1000}
      height={600}
      defaultStyle={{
        backgroundColor: '#ffffff',
        textColor: '#333333',
        borderColor: '#666666',
        borderWidth: 2,
        fontSize: 14,
      }}
      connectionStyle={{
        color: '#999999',
        width: 2,
        style: 'curved',
      }}
    />
  );
};
```

### With Watermark

```tsx
const WatermarkedMindMap = () => {
  return (
    <MindMapExport
      data={mindMapData}
      watermark={{
        text: "Company Confidential",
        // or image: "/path/to/watermark.png",
        opacity: 0.3,
        position: "bottom-right"
      }}
    />
  );
};
```

## 🔍 API Reference

### MindMapExport Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `MindMapNode` | The mind map data structure |
| `width?` | `number` | Width of the mind map canvas (default: 1000) |
| `height?` | `number` | Height of the mind map canvas (default: 600) |
| `fileName?` | `string` | Name for exported files (default: 'mindmap') |
| `defaultStyle?` | `NodeStyle` | Default styling for all nodes |
| `connectionStyle?` | `ConnectionStyle` | Styling for connection lines |
| `watermark?` | `WatermarkOptions` | Watermark configuration |

### Types

```typescript
interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
  style?: NodeStyle;
}

interface NodeStyle {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  fontSize?: number;
}

interface WatermarkOptions {
  text?: string;
  image?: string;
  opacity?: number;
  position?: 'center' | 'bottom-right' | 'top-left';
}
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/your-username/mind-map-generator.git

# Install dependencies
cd mind-map-generator
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📄 License

MIT License - feel free to use this project for your personal or commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Bug Report

If you find a bug, kindly open an issue here by including your search query and the expected result.

## 💡 Feature Request

If you'd like to request a new function, feel free to do so by opening an issue here. Please include sample queries and their corresponding expected results.

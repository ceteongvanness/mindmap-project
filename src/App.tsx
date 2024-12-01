// src/App.tsx
import { MindMapExport } from './components/MindMap';

const sampleData = {
  id: '1',
  label: 'Main Topic',
  style: {
    backgroundColor: '#e3f2fd',
    textColor: '#1565c0',
    borderColor: '#1565c0',
    fontSize: 16,
  },
  children: [
    {
      id: '2',
      label: 'Subtopic 1',
      style: {
        backgroundColor: '#f3e5f5',
        textColor: '#7b1fa2',
        borderColor: '#7b1fa2',
      },
      children: [
        { id: '4', label: 'Detail 1' },
        { id: '5', label: 'Detail 2' },
      ],
    },
    {
      id: '3',
      label: 'Subtopic 2',
      style: {
        backgroundColor: '#e8f5e9',
        textColor: '#2e7d32',
        borderColor: '#2e7d32',
      },
      children: [
        { id: '6', label: 'Detail 3' },
        { id: '7', label: 'Detail 4' },
      ],
    },
  ],
};

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <MindMapExport
        data={sampleData}
        width={1000}
        height={600}
        fileName="my-mindmap"
        watermark={{
          text: "My Mind Map",
          opacity: 0.3,
          position: "bottom-right"
        }}
      />
    </div>
  );
}

export default App;

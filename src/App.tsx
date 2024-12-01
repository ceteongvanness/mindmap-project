// src/App.tsx
import * as React from 'react';
import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { TabNavigation } from './components/TabNavigation';
import { MindMapExport } from './components/MindMap';
import { Toaster } from 'react-hot-toast';
import { TabType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('pdf');
  const [mindMapData, setMindMapData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-8">
          {!mindMapData ? (
            <div className="bg-white rounded-lg shadow-md p-8">
              <FileUploader
                onFileProcessed={setMindMapData}
                acceptedFileTypes={getAcceptedFileTypes(activeTab)}
                maxSize={10 * 1024 * 1024} // 10MB
              />
            </div>
          ) : (
            <MindMapExport
              data={mindMapData}
              width={1000}
              height={600}
              fileName="generated-mindmap"
            />
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

const getAcceptedFileTypes = (tab: TabType): string => {
  switch (tab) {
    case 'pdf':
      return '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv';
    case 'image':
      return '.jpg,.jpeg,.png,.gif';
    case 'audio':
      return '.mp3,.wav,.ogg';
    default:
      return '*';
  }
};

export default App;
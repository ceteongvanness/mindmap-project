// src/components/TabNavigation/TabNavigation.tsx
import * as React from 'react';
import { HelpCircle, FileText, AlignLeft, Globe, Youtube, ImageIcon, Music } from 'lucide-react';
import { TabType } from '../../types';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: Tab[] = [
    { id: 'ask', label: 'Ask Anything', icon: <HelpCircle /> },
    { id: 'pdf', label: 'PDF/Doc', icon: <FileText /> },
    { id: 'text', label: 'Long Text', icon: <AlignLeft /> },
    { id: 'website', label: 'Website', icon: <Globe /> },
    { id: 'youtube', label: 'YouTube', icon: <Youtube /> },
    { id: 'image', label: 'Image', icon: <ImageIcon /> },
    { id: 'audio', label: 'Audio', icon: <Music /> },
  ];

  return (
    <div className="flex justify-between space-x-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
            activeTab === tab.id
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          {tab.icon}
          <span className="mt-2 text-sm">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
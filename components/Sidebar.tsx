
import React from 'react';
import { motion } from 'framer-motion';
import { FileSystemItem, FileType } from '../types';
import { FolderIcon, ProjectIcon, ImageIcon, TextIcon, AppIcon } from '../constants';

interface SidebarProps {
  fileSystem: FileSystemItem[];
  currentPath: string[];
  navigateTo: (path: string[]) => void;
}

const TreeItem: React.FC<{
  item: FileSystemItem;
  level: number;
  currentPath: string[];
  navigateTo: (path: string[]) => void;
  path: string[];
}> = ({ item, level, currentPath, navigateTo, path }) => {
  const isCurrent = currentPath.join('/') === path.join('/');
  const isOpen = currentPath.join('/').startsWith(path.join('/'));

  const getIcon = (type: FileType) => {
    switch (type) {
      case FileType.FOLDER: return <FolderIcon className="w-5 h-5" />;
      case FileType.PROJECT: return <ProjectIcon className="w-5 h-5" />;
      case FileType.IMAGE: return <ImageIcon className="w-5 h-5" />;
      case FileType.TEXT: return <TextIcon className="w-5 h-5" />;
      case FileType.APP: return <AppIcon className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div>
      <div
        onClick={() => navigateTo(path)}
        className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-200 ${
          isCurrent ? 'bg-blue-500/20 text-blue-500 dark:text-blue-400' : 'hover:bg-gray-500/10'
        }`}
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
      >
        {getIcon(item.type)}
        <span className="text-sm font-medium truncate">{item.name}</span>
      </div>
      {item.type === FileType.FOLDER && isOpen && item.children && (
        <div className="mt-1">
          {item.children.map(child => (
            <TreeItem
              key={child.id}
              item={child}
              level={level + 1}
              currentPath={currentPath}
              navigateTo={navigateTo}
              path={[...path, child.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ fileSystem, currentPath, navigateTo }) => {
  return (
    <div className="h-full w-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-lg p-4 flex flex-col">
      <div className="flex items-center space-x-2 mb-4 px-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <nav className="flex-grow overflow-y-auto pr-1">
        {fileSystem.map(item => (
          <TreeItem key={item.id} item={item} level={0} currentPath={currentPath} navigateTo={navigateTo} path={[item.id]} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

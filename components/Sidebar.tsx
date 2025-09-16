
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSystemItem, FileType } from '../types';
import { FolderIcon, ProjectIcon, ImageIcon, TextIcon, AppIcon } from '../constants';

interface SidebarProps {
  fileSystem: FileSystemItem[];
  currentPath: string[];
  navigateTo: (path: string[]) => void;
  expandedFolders: string[];
  toggleFolder: (folderId: string) => void;
}

const TreeItem: React.FC<{
  item: FileSystemItem;
  level: number;
  currentPath: string[];
  navigateTo: (path: string[]) => void;
  path: string[];
  expandedFolders: string[];
  toggleFolder: (folderId: string) => void;
}> = ({ item, level, currentPath, navigateTo, path, expandedFolders, toggleFolder }) => {
  const isCurrent = currentPath.join('/') === path.join('/');
  const isOpen = expandedFolders.includes(item.id);
  const hasChildren = item.type === FileType.FOLDER && item.children && item.children.length > 0;

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

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleFolder(item.id);
    }
  };

  const handleNavigate = () => {
    navigateTo(path);
    if (hasChildren && !isOpen) {
      toggleFolder(item.id);
    }
  };

  return (
    <div>
      <div
        onClick={handleNavigate}
        className={`flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200 ${
          isCurrent ? 'bg-blue-500/20 text-blue-500 dark:text-blue-400' : 'hover:bg-gray-500/10'
        }`}
        style={{ paddingLeft: `${level * 1.25 + 0.5}rem` }}
      >
        <div className="w-6 flex-shrink-0 flex items-center justify-center">
          {hasChildren && (
            <button
              onClick={handleToggle}
              className="p-1 rounded-full hover:bg-gray-500/20"
              aria-label={isOpen ? `Collapse ${item.name}` : `Expand ${item.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2 truncate">
          {getIcon(item.type)}
          <span className="text-sm font-medium truncate">{item.name}</span>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            {item.children.map(child => (
              <TreeItem
                key={child.id}
                item={child}
                level={level + 1}
                currentPath={currentPath}
                navigateTo={navigateTo}
                path={[...path, child.id]}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ fileSystem, currentPath, navigateTo, expandedFolders, toggleFolder }) => {
  return (
    <div className="h-full w-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-lg p-4 flex flex-col">
      <div className="flex items-center space-x-2 mb-4 px-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <nav className="flex-grow overflow-y-auto pr-1">
        {fileSystem.map(item => (
          <TreeItem 
            key={item.id} 
            item={item} 
            level={0} 
            currentPath={currentPath} 
            navigateTo={navigateTo} 
            path={[item.id]} 
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSystemItem, FileType } from './types';
import { initialFileSystem } from './constants';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Background from './components/Background';
import ThemeToggle from './components/ThemeToggle';
import { findItemByPath, findParentByPath, searchFileSystem, SearchResult } from './utils/fileSystemUtils';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fileSystem, setFileSystem] = useState<FileSystemItem[]>(initialFileSystem);
  const [currentPath, setCurrentPath] = useState<string[]>(['root']);
  const [activeFile, setActiveFile] = useState<FileSystemItem | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['root']);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchFileSystem(searchQuery, fileSystem);
  }, [searchQuery, fileSystem]);

  const navigateTo = useCallback((path: string[]) => {
    setActiveFile(null);
    setCurrentPath(path);
    setSearchQuery(''); // Clear search on navigation
    // Also expand the folders in the path
    setExpandedFolders(prev => {
        const newExpanded = new Set(prev);
        path.forEach(id => newExpanded.add(id));
        return Array.from(newExpanded);
    });
  }, []);

  const openFile = useCallback((file: FileSystemItem) => {
    if (file.type === FileType.FOLDER) {
      setCurrentPath(prev => [...prev, file.id]);
      setActiveFile(null);
    } else {
      setActiveFile(file);
    }
    setSearchQuery(''); // Clear search on file open
  }, []);

  const closeFile = useCallback(() => {
    setActiveFile(null);
  }, []);

  const goBack = useCallback(() => {
    if (activeFile) {
      closeFile();
    } else if (currentPath.length > 1) {
      setCurrentPath(prev => prev.slice(0, -1));
    }
  }, [activeFile, closeFile, currentPath.length]);

  const addFileToCurrentDir = useCallback((newFile: FileSystemItem) => {
    setFileSystem(prevFileSystem => {
      const newFileSystem = JSON.parse(JSON.stringify(prevFileSystem));
      const parentDir = findItemByPath(currentPath, newFileSystem) as FileSystemItem & { children: FileSystemItem[] };
      if (parentDir && parentDir.type === FileType.FOLDER) {
        if(!parentDir.children) parentDir.children = [];
        parentDir.children.push(newFile);
      }
      return newFileSystem;
    });
  }, [currentPath]);

  const toggleFolder = useCallback((folderId: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  }, []);

  const handleNavigateToProjects = () => navigateTo(['root', 'projects']);
  const handleOpenAboutFile = () => {
      const aboutFile = findItemByPath(['root', 'about'], fileSystem);
      if(aboutFile) {
          openFile(aboutFile);
      }
  };
  const handleOpenCertificatesFile = () => {
      const certFile = findItemByPath(['root', 'certificates'], fileSystem);
      if(certFile) {
          openFile(certFile);
      }
  };

  const currentDirectory = findItemByPath(currentPath, fileSystem);
  const parentDirectory = findParentByPath(currentPath, fileSystem);

  return (
    <div className="w-screen h-screen overflow-hidden font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Background />
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className="flex h-full w-full p-4 md:p-6 lg:p-8 gap-4">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-64 hidden md:block"
            >
              <Sidebar
                fileSystem={fileSystem}
                currentPath={currentPath}
                navigateTo={navigateTo}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <MainContent
          currentDirectory={currentDirectory}
          activeFile={activeFile}
          openFile={openFile}
          closeFile={closeFile}
          goBack={goBack}
          currentPath={currentPath}
          addFileToCurrentDir={addFileToCurrentDir}
          parentDirectory={parentDirectory}
          navigateTo={navigateTo}
          onNavigateToProjects={handleNavigateToProjects}
          onOpenAboutFile={handleOpenAboutFile}
          onOpenCertificatesFile={handleOpenCertificatesFile}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
        />
      </div>
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="md:hidden fixed bottom-4 left-4 z-50 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  );
};

export default App;

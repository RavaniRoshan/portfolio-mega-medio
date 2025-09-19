import React from 'react';
import { motion } from 'framer-motion';
import { FileSystemItem, FileType } from '../types';
import { FolderIcon, ProjectIcon, ImageIcon, TextIcon, AppIcon, CertificateIcon, MusicIcon } from '../constants';
import { findItemByPath } from '../utils/fileSystemUtils';
import { initialFileSystem } from '../constants';

interface FileIconProps {
  item: FileSystemItem;
  onClick: () => void;
  setPreviewItem: (item: FileSystemItem | null) => void;
}

const FileIcon: React.FC<FileIconProps> = ({ item, onClick, setPreviewItem }) => {

  const getIcon = (type: FileType) => {
    switch (type) {
      case FileType.FOLDER: return <FolderIcon />;
      case FileType.PROJECT: return <ProjectIcon />;
      case FileType.IMAGE: return <ImageIcon />;
      case FileType.TEXT: return <TextIcon />;
      case FileType.APP: return <AppIcon />;
      case FileType.CERTIFICATE: return <CertificateIcon />;
      case FileType.MUSIC: return <MusicIcon />;
      default: return null;
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => {
        if (item.type === FileType.IMAGE) {
          setPreviewItem(item);
        } else {
          setPreviewItem(null);
        }
      }}
      onMouseLeave={() => setPreviewItem(null)}
      onClick={onClick}
      onDoubleClick={onClick}
      className="relative flex flex-col items-center justify-center text-center p-4 cursor-pointer rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
    >
      {getIcon(item.type)}
      <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 break-words w-24">{item.name}</span>
    </motion.div>
  );
};

interface BreadcrumbsProps {
    currentPath: string[];
    navigateTo: (path: string[]) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPath, navigateTo }) => {
    const pathItems = currentPath.map((id, index) => {
        const pathSlice = currentPath.slice(0, index + 1);
        const item = findItemByPath(pathSlice, initialFileSystem);
        return { name: item?.name || 'Unknown', path: pathSlice };
    });

    return (
        <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            {pathItems.map((item, index) => (
                <React.Fragment key={index}>
                    <span 
                        onClick={() => navigateTo(item.path)}
                        className="cursor-pointer hover:text-blue-500"
                    >
                        {item.name}
                    </span>
                    {index < pathItems.length - 1 && <span className="mx-2">/</span>}
                </React.Fragment>
            ))}
        </nav>
    )
}

interface FileExplorerViewProps {
  directory?: FileSystemItem;
  openFile: (item: FileSystemItem) => void;
  goBack: () => void;
  currentPath: string[];
  parentDirectory?: FileSystemItem;
  navigateTo: (path: string[]) => void;
  setPreviewItem: (item: FileSystemItem | null) => void;
}

const FileExplorerView: React.FC<FileExplorerViewProps> = ({ directory, openFile, goBack, currentPath, parentDirectory, navigateTo, setPreviewItem }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    },
  };
  
  return (
    <div className="flex flex-col h-full w-full">
        <header className="flex items-center p-4 border-b border-black/10 dark:border-white/10 flex-shrink-0">
            <button onClick={goBack} disabled={currentPath.length <= 1} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <Breadcrumbs currentPath={currentPath} navigateTo={navigateTo} />
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
            {directory && directory.type === FileType.FOLDER && directory.children ? (
                <motion.div 
                    className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {directory.children.map(item => (
                        <FileIcon key={item.id} item={item} onClick={() => openFile(item)} setPreviewItem={setPreviewItem} />
                    ))}
                </motion.div>
            ) : (
                <div className="text-center text-gray-500 mt-10">This folder is empty.</div>
            )}
        </main>
    </div>
  );
};

export default FileExplorerView;

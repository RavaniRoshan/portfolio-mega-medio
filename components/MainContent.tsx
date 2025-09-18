import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileSystemItem } from '../types';
import FileExplorerView from './FileExplorerView';
import FileView from './FileView';
import AIGenerator from './AIGenerator';
import LandingPage from './LandingPage';

interface MainContentProps {
  currentDirectory?: FileSystemItem;
  activeFile: FileSystemItem | null;
  openFile: (file: FileSystemItem) => void;
  closeFile: () => void;
  goBack: () => void;
  currentPath: string[];
  addFileToCurrentDir: (newFile: FileSystemItem) => void;
  parentDirectory?: FileSystemItem;
  navigateTo: (path: string[]) => void;
  onNavigateToProjects: () => void;
  onOpenAboutFile: () => void;
  onOpenCertificatesFile: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  currentDirectory,
  activeFile,
  openFile,
  closeFile,
  goBack,
  currentPath,
  addFileToCurrentDir,
  parentDirectory,
  navigateTo,
  onNavigateToProjects,
  onOpenAboutFile,
  onOpenCertificatesFile,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -20 },
  };

  const isAiGeneratorActive = activeFile?.type === 'app';
  const isLandingPage = currentPath.length === 1 && currentPath[0] === 'root' && !activeFile;

  return (
    <div className="flex-1 h-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-lg flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {isLandingPage ? (
          <motion.div
            key="landing-page"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="w-full h-full"
          >
            <LandingPage
              onNavigateToProjects={onNavigateToProjects}
              onOpenAboutFile={onOpenAboutFile}
              onOpenCertificatesFile={onOpenCertificatesFile}
            />
          </motion.div>
        ) : isAiGeneratorActive ? (
           <motion.div
            key="ai-generator"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="w-full h-full"
           >
            <AIGenerator file={activeFile!} close={closeFile} addFileToCurrentDir={addFileToCurrentDir} />
          </motion.div>
        ) : activeFile ? (
          <motion.div
            key={activeFile.id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="w-full h-full"
          >
            <FileView file={activeFile} closeFile={closeFile} />
          </motion.div>
        ) : (
          <motion.div
            key={currentPath.join('/')}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="w-full h-full"
          >
            <FileExplorerView
              directory={currentDirectory}
              openFile={openFile}
              goBack={goBack}
              currentPath={currentPath}
              parentDirectory={parentDirectory}
              navigateTo={navigateTo}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainContent;

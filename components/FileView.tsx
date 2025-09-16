
import React from 'react';
import { motion } from 'framer-motion';
import { FileSystemItem, FileType } from '../types';

interface FileViewProps {
  file: FileSystemItem;
  closeFile: () => void;
}

const FileView: React.FC<FileViewProps> = ({ file, closeFile }) => {
  const content = file.content;

  const renderContent = () => {
    if (!content) {
      return <div className="text-center p-8">No content available for this file.</div>;
    }

    switch (file.type) {
      case FileType.PROJECT:
      case FileType.IMAGE:
        return (
          <div className="p-4 sm:p-8">
            {content.imageUrl && (
              <img src={content.imageUrl} alt={content.title} className="w-full h-auto max-h-96 object-cover rounded-lg mb-6 shadow-lg" />
            )}
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{content.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{content.description}</p>
            {content.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {content.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-sm rounded-full">{tag}</span>
                ))}
              </div>
            )}
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{content.longDescription}</p>
            {content.url && (
              <a href={content.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-blue-500 hover:underline">
                Visit Project
              </a>
            )}
          </div>
        );
      case FileType.TEXT:
        return (
            <div className="p-4 sm:p-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{content.title}</h1>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{content.longDescription}</p>
            </div>
        );
      default:
        return <div className="text-center p-8">Cannot display this file type.</div>;
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
        <header className="flex items-center p-4 border-b border-black/10 dark:border-white/10 flex-shrink-0">
            <button onClick={closeFile} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <h2 className="font-semibold truncate">{file.name}</h2>
        </header>
        <main className="flex-1 overflow-y-auto">
            {renderContent()}
        </main>
    </div>
  );
};

export default FileView;

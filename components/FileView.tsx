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
      case FileType.CERTIFICATE:
        return (
            <div className="p-4 sm:p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{content.title}</h1>
                <ul className="space-y-4">
                    {content.longDescription?.split('\n').filter(line => line.trim() !== '').map((line, index) => {
                        if (line.startsWith('http')) {
                            return <li key={index}><a href={line} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-500 hover:underline">See All Certificates</a></li>
                        }
                        const [title, details] = line.split('—');
                        return (
                            <li key={index} className="flex items-start p-4 rounded-lg bg-black/5 dark:bg-white/5">
                                <svg className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{details}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
        case FileType.MUSIC:
            const linkRegex = /\[(.*?)\]\((.*?)\)/g;
            return (
                <div className="p-4 sm:p-8">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{content.title}</h1>
                    <ul className="space-y-3">
                        {content.longDescription?.split('\n').filter(line => line.trim() !== '').map((line, index) => {
                            // Reset regex state for each line
                            const matches = [...line.matchAll(linkRegex)];
                            if (matches.length > 0) {
                                const [, text, url] = matches[0];
                                return (
                                    <li key={index}>
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200 group">
                                            <svg className="w-5 h-5 text-pink-500 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
                                            <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-pink-500 dark:group-hover:text-pink-400">{text}</span>
                                            <svg className="w-4 h-4 ml-auto text-gray-400 dark:text-gray-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M5 12h13"></path></svg>
                                        </a>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
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

import React from 'react';
import { motion } from 'framer-motion';
import { FileSystemItem, FileType } from '../types';
import { SearchResult } from '../utils/fileSystemUtils';
import { FolderIcon, ProjectIcon, ImageIcon, TextIcon, AppIcon, CertificateIcon, MusicIcon } from '../constants';
import { findItemByPath } from '../utils/fileSystemUtils';
import { initialFileSystem } from '../constants';


const getIcon = (type: FileType) => {
    const props = { className: "w-8 h-8 flex-shrink-0" };
    switch (type) {
      case FileType.FOLDER: return <FolderIcon {...props} />;
      case FileType.PROJECT: return <ProjectIcon {...props} />;
      case FileType.IMAGE: return <ImageIcon {...props} />;
      case FileType.TEXT: return <TextIcon {...props} />;
      case FileType.APP: return <AppIcon {...props} />;
      case FileType.CERTIFICATE: return <CertificateIcon {...props} />;
      case FileType.MUSIC: return <MusicIcon {...props} />;
      default: return null;
    }
};

const ResultPath: React.FC<{ path: string[] }> = ({ path }) => {
    // We only want to show the path of the parent folders, so slice(1, -1) to remove root and the item itself.
    const pathItems = path.slice(1, -1).map((id, index) => {
        // We need to provide the full path up to the current item to find it
        const item = findItemByPath(path.slice(0, index + 2), initialFileSystem);
        return item?.name || '';
    });

    if (pathItems.length === 0) return null;

    return (
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            in {pathItems.join(' / ')}
        </span>
    );
};


interface SearchResultsViewProps {
    searchQuery: string;
    results: SearchResult[];
    navigateTo: (path: string[]) => void;
    openFile: (file: FileSystemItem) => void;
    clearSearch: () => void;
}

const SearchResultsView: React.FC<SearchResultsViewProps> = ({ searchQuery, results, navigateTo, openFile, clearSearch }) => {
    const handleResultClick = (result: SearchResult) => {
        if (result.item.type === FileType.FOLDER) {
            navigateTo(result.path);
        } else {
            openFile(result.item);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="flex flex-col h-full w-full">
            <header className="flex items-center p-4 border-b border-black/10 dark:border-white/10 flex-shrink-0">
                <button onClick={clearSearch} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 mr-4" aria-label="Back to file explorer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="font-semibold truncate">
                    Search results for: <span className="font-bold text-gray-900 dark:text-gray-100">"{searchQuery}"</span>
                </h2>
            </header>
            <main className="flex-1 p-4 overflow-y-auto">
                {results.length > 0 ? (
                    <motion.ul
                        className="space-y-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {results.map((result) => (
                            <motion.li
                                key={result.item.id + result.path.join('-')}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className="p-3 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
                                onClick={() => handleResultClick(result)}
                                onDoubleClick={() => handleResultClick(result)}
                            >
                                {getIcon(result.item.type)}
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-medium truncate text-gray-800 dark:text-gray-200">{result.item.name}</p>
                                    <ResultPath path={result.path} />
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>
                ) : (
                    <div className="text-center text-gray-500 mt-10">
                        <p className="text-lg font-semibold">No results found.</p>
                        <p className="text-sm">Try searching for a project, file, or folder name.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchResultsView;

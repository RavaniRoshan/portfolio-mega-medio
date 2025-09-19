import React from 'react';
import { motion } from 'framer-motion';
import { FileSystemItem, FileType } from '../types';

const PreviewPanel: React.FC<{ item: FileSystemItem }> = ({ item }) => {
  const { name, type, content } = item;

  return (
    <motion.div
      layout
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className="w-80 flex-shrink-0 h-full border-l border-black/10 dark:border-white/10 p-5 flex flex-col bg-black/5 dark:bg-white/5"
    >
      <div className="flex-grow overflow-y-auto pr-2">
        {type === FileType.IMAGE && content?.imageUrl && (
          <motion.div layout="position" className="mb-4">
            <img src={content.imageUrl} alt={name} className="w-full rounded-lg shadow-lg aspect-square object-cover" />
          </motion.div>
        )}
        
        <motion.h3 layout="position" className="text-xl font-bold mb-4 truncate text-gray-800 dark:text-gray-100">{name}</motion.h3>
        
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex">
            <span className="font-semibold w-24 flex-shrink-0">File Type:</span>
            <span className="capitalize">{type}</span>
          </div>
          {content?.description && (
            <div className="flex flex-col pt-2">
              <span className="font-semibold mb-1">Description:</span>
              <p className="leading-relaxed">{content.description}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PreviewPanel;

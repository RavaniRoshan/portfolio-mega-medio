
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateImage } from '../services/geminiService';
import { FileSystemItem, FileType } from '../types';

interface AIGeneratorProps {
  file: FileSystemItem;
  close: () => void;
  addFileToCurrentDir: (newFile: FileSystemItem) => void;
}

const AIGenerator: React.FC<AIGeneratorProps> = ({ file, close, addFileToCurrentDir }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!generatedImage) return;
    
    const newFile: FileSystemItem = {
      id: `img-${Date.now()}`,
      name: `${prompt.substring(0, 20).trim()}.png`,
      type: FileType.IMAGE,
      content: {
        title: prompt,
        description: `AI-generated image for: "${prompt}"`,
        imageUrl: generatedImage
      }
    };
    addFileToCurrentDir(newFile);
    close();
  };
  
  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center p-4 border-b border-black/10 dark:border-white/10 flex-shrink-0">
        <button onClick={close} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-semibold truncate">{file.name}</h2>
      </header>
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold mb-2">AI Image Generator</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{file.content?.description}</p>
          <div className="flex flex-col space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A surrealist painting of a cat playing a piano in space"
              className="w-full p-3 rounded-lg bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 resize-none h-28"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate Image'
              )}
            </button>
             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center bg-black/5 dark:bg-white/5 rounded-lg p-4 min-h-[300px]">
          {generatedImage ? (
            <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} className="w-full flex flex-col items-center gap-4">
               <img src={generatedImage} alt="AI generated art" className="max-w-full max-h-80 rounded-lg shadow-lg" />
               <button onClick={handleSave} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200">
                Save to Gallery
               </button>
            </motion.div>
          ) : (
            <div className="text-center text-gray-500">
              Your generated image will appear here.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AIGenerator;

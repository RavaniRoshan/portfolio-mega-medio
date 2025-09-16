import React from 'react';
import { motion, Variants } from 'framer-motion';

interface LandingPageProps {
  onNavigateToProjects: () => void;
  onOpenAboutFile: () => void;
}

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 114.75 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.8 0-1.22.54-1.42 1.07-.08.2-.1.47-.1.74V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.2 1.04 3.2 3.58V19z" />
    </svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.72-1.89-8.83-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.7-.02-1.37-.21-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.14.15-.28 0-.55-.03-.81-.08.55 1.7 2.14 2.94 4.03 2.97-1.47 1.15-3.33 1.84-5.35 1.84-.35 0-.69-.02-1.03-.06 1.9 1.23 4.15 1.95 6.56 1.95 7.88 0 12.19-6.54 12.19-12.2 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.22z" />
    </svg>
);


const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToProjects, onOpenAboutFile }) => {
  const parentContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };
  
  const skills = ['React', 'TypeScript', 'Node.js', 'Framer Motion', 'Tailwind CSS', 'Gemini API'];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-8 overflow-y-auto">
      <div className="absolute top-6 left-6 flex space-x-4 z-10">
        <motion.button
          onClick={onNavigateToProjects}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-gray-800 dark:text-gray-200 font-semibold transition-colors duration-300 hover:bg-white/20"
        >
          Projects
        </motion.button>
        <motion.button
          onClick={onOpenAboutFile}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-gray-800 dark:text-gray-200 font-semibold transition-colors duration-300 hover:bg-white/20"
        >
          About
        </motion.button>
      </div>

      <motion.div 
        className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-20"
        variants={parentContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full md:w-1/2 text-center md:text-left">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100">
            Ravani Roshan
          </motion.h1>
          <motion.h2 variants={itemVariants} className="mt-2 text-xl md:text-2xl font-medium text-blue-500 dark:text-blue-400">
            Senior Frontend Engineer
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-6 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0">
            Crafting beautiful, intuitive, and performant user experiences. I specialize in building modern web applications with a focus on clean code and delightful animations.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-8">
             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Core Technologies</h3>
             <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {skills.map(skill => (
                <div key={skill} className="px-4 py-2 rounded-md bg-black/5 dark:bg-white/10 text-sm font-medium">
                  {skill}
                </div>
              ))}
             </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="w-full md:w-1/3 flex flex-col items-center justify-center gap-8">
            <motion.div 
              className="w-48 h-48 md:w-64 md:h-64 relative flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute w-full h-full rounded-full border-2 border-dashed border-blue-500/50 animate-pulse"></div>
              <div className="absolute w-3/4 h-3/4 rounded-full border-2 border-dashed border-purple-500/50 animate-pulse" style={{animationDelay: '1s'}}></div>
              <svg className="w-24 h-24 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </motion.div>
            <div className="flex space-x-6">
                <motion.a href="https://github.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4 }} className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-gray-800 dark:text-gray-200">
                    <GithubIcon />
                </motion.a>
                <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4 }} className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-gray-800 dark:text-gray-200">
                    <LinkedInIcon />
                </motion.a>
                <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4 }} className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-gray-800 dark:text-gray-200">
                    <TwitterIcon />
                </motion.a>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;

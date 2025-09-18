import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, Variants, useInView, animate, useMotionValue } from 'framer-motion';

interface LandingPageProps {
  onNavigateToProjects: () => void;
  onOpenAboutFile: () => void;
  onOpenCertificatesFile: () => void;
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

const AnimatedStat = ({ value, label, suffix = '' }: { value: number, label: string, suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            animate(count, value, { duration: 2, ease: "easeOut" });
        }
    }, [isInView, value, count]);

    return (
        <div ref={ref} className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-4xl md:text-5xl font-bold text-blue-400">
                <motion.span>{rounded}</motion.span>{suffix}+
            </h3>
            <p className="mt-2 text-sm text-gray-400">{label}</p>
        </div>
    );
};


const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToProjects, onOpenAboutFile, onOpenCertificatesFile }) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  
  const skills = ['Python', 'JavaScript', 'Rust', 'React', 'AI/ML', 'Full-Stack'];
  const achievements = ['Building innovative AI solutions', 'Active open-source contributions', 'Winning hackathons and competitions', 'Committed to continuous learning'];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div ref={scrollRef} className="relative w-full h-full flex flex-col overflow-y-auto">
      <motion.div 
        style={{ y: bgY1 }}
        className="absolute top-[-20%] left-[5%] w-72 h-72 bg-purple-500/20 dark:bg-purple-500/30 rounded-full filter blur-3xl opacity-50 will-change-transform" 
      />
      <motion.div 
        style={{ y: bgY2 }}
        className="absolute bottom-[-10%] right-[5%] w-96 h-96 bg-blue-500/20 dark:bg-blue-500/30 rounded-full filter blur-3xl opacity-50 will-change-transform" 
      />
      
      <header className="px-6 md:px-8 pt-6 md:pt-8 z-10">
        <div className="flex space-x-2 md:space-x-4">
            <motion.button onClick={onNavigateToProjects} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 text-sm md:px-5 md:py-2.5 rounded-full font-semibold transition-colors duration-300 bg-black/5 dark:bg-white/5 backdrop-blur-lg border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10">Projects</motion.button>
            <motion.button onClick={onOpenAboutFile} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 text-sm md:px-5 md:py-2.5 rounded-full font-semibold transition-colors duration-300 bg-black/5 dark:bg-white/5 backdrop-blur-lg border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10">About</motion.button>
            <motion.button onClick={onOpenCertificatesFile} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 text-sm md:px-5 md:py-2.5 rounded-full font-semibold transition-colors duration-300 bg-black/5 dark:bg-white/5 backdrop-blur-lg border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10">Certificates</motion.button>
        </div>
      </header>

      <main className="px-6 md:px-8 z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center relative">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-gray-100">Ravani Roshan</h1>
                <h2 className="mt-3 text-xl md:text-2xl font-medium text-blue-500 dark:text-blue-400">Computer Science & Engineering Student</h2>
                <p className="mt-6 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Highly motivated student with expertise in full-stack development and artificial intelligence. Passionate about building innovative applications and contributing to open-source.
                </p>
                <div className="mt-8 flex justify-center space-x-6">
                    <motion.a href="https://github.com/RavaniRoshan" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4 }} className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-gray-800 dark:text-gray-200"><GithubIcon /></motion.a>
                    <motion.a href="https://www.linkedin.com/in/roshan-ravani-3a79882a3/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4 }} className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-gray-800 dark:text-gray-200"><LinkedInIcon /></motion.a>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="absolute bottom-10 animate-bounce">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </motion.div>
        </section>

        {/* Stats Section */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="py-20 md:py-32">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
                <AnimatedStat value={1200} label="GitHub Commits" />
                <AnimatedStat value={8} label="AI Models Fine-Tuned" />
                <AnimatedStat value={3} label="Hackathons Won" />
                <AnimatedStat value={120} label="Typing Speed (WPM)" suffix=" " />
             </div>
        </motion.section>

        {/* Achievements & Skills Section */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="py-20 md:py-32 grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
                 <h3 className="text-3xl font-bold mb-6">Key Achievements</h3>
                 <ul className="space-y-4">
                    {achievements.map((ach, i) => (
                        <motion.li key={i} custom={i} variants={{ hidden: {opacity: 0, x: -20}, visible: {opacity: 1, x: 0, transition: {delay: i * 0.15}}}} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="flex items-start">
                            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{ach}</span>
                        </motion.li>
                    ))}
                 </ul>
            </div>
             <div>
                <h3 className="text-3xl font-bold mb-6">Core Technologies</h3>
                <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                    <motion.div key={skill} custom={i} variants={{ hidden: {opacity: 0, scale: 0.8}, visible: {opacity: 1, scale: 1, transition: {delay: i * 0.1}}}} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="px-4 py-2 rounded-lg bg-black/5 dark:bg-white/10 text-md font-medium">
                    {skill}
                    </motion.div>
                ))}
                </div>
            </div>
        </motion.section>
      </main>
    </div>
  );
};

export default LandingPage;
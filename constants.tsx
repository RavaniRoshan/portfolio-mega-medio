import React from 'react';
import { FileSystemItem, FileType } from './types';

export const FolderIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-yellow-500 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

export const ProjectIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-blue-500 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

export const ImageIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-green-500 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const TextIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-gray-500 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const AppIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-purple-500 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const CertificateIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-indigo-500 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-3-4l-1.06-1.06a3.536 3.536 0 115.002 0L15 13m-3 4a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const MusicIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-pink-500 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l10-3v13M9 19c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm10-13c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" />
  </svg>
);


export const initialFileSystem: FileSystemItem[] = [
  {
    id: 'root',
    name: 'Home',
    type: FileType.FOLDER,
    children: [
      {
        id: 'readme',
        name: 'README.md',
        type: FileType.TEXT,
        content: {
            title: 'Welcome to My Portfolio!',
            description: 'A quick guide to this interactive portfolio.',
            longDescription: `Hello! I'm Ravani Roshan.

This is my interactive portfolio, designed to look and feel like a modern operating system's file explorer. You can navigate through folders, open files to learn more about me and my work, and even use the built-in AI to generate images.

Here's a quick tour:
- **Projects:** Contains my key projects, categorized for easy browsing.
- **Gallery:** A collection of images that inspire me.
- **About Me.txt:** A little about my background and skills.
- **Certificates.md:** My professional certifications.
- **Music.md:** My favorite coding playlist.
- **AI Image Gen:** An app that uses the Gemini API to generate images from a text prompt.

Feel free to explore!`,
        }
      },
      {
        id: 'projects',
        name: 'Projects',
        type: FileType.FOLDER,
        children: [
          {
            id: 'projects-ai',
            name: 'AI & Automation',
            type: FileType.FOLDER,
            children: [
              {
                id: 'project-nidera',
                name: 'Nidera Browser',
                type: FileType.PROJECT,
                content: {
                  title: 'Nidera: AI-Powered Browser',
                  description: 'An AI-powered Chromium browser for intelligent automation.',
                  imageUrl: 'https://picsum.photos/seed/nidera/800/600',
                  tags: ['AI', 'Chromium', 'Automation', 'Rust'],
                  longDescription: 'Nidera is a revolutionary browser built on Chromium, infused with AI to automate repetitive tasks, streamline workflows, and provide intelligent suggestions. It leverages machine learning models to understand user behavior and proactively assist in browsing, research, and data entry.'
                }
              },
              {
                id: 'project-regusense',
                name: 'ReguSense AI',
                type: FileType.PROJECT,
                content: {
                  title: 'ReguSense AI: Compliance SaaS',
                  description: 'An AI-powered SaaS for navigating regulatory compliance.',
                  imageUrl: 'https://picsum.photos/seed/regusense/800/600',
                  tags: ['SaaS', 'AI/ML', 'Compliance', 'Python'],
                  longDescription: 'ReguSense AI is a Software-as-a-Service platform that helps businesses stay on top of complex regulatory requirements. Using natural language processing and machine learning, it scans, analyzes, and summarizes regulatory documents, flagging potential compliance issues and saving hundreds of hours of manual work. (Jul 2022 - Nov 2023)'
                }
              },
            ]
          },
          {
            id: 'projects-web',
            name: 'Web & Productivity',
            type: FileType.FOLDER,
            children: [
               {
                id: 'project-daywise',
                name: 'DayWise Planner',
                type: FileType.PROJECT,
                content: {
                  title: 'DayWise: AI Personal Planner',
                  description: 'A personal day planner app with Notion-style organization and Gemini AI.',
                  imageUrl: 'https://picsum.photos/seed/daywise/800/600',
                  tags: ['Productivity', 'Gemini AI', 'React', 'Full-Stack'],
                  url: 'https://example.com',
                  longDescription: 'DayWise is a smart personal planner designed to bring structure and intelligence to your daily routine. It features a flexible, Notion-style editor, integrates with Gemini AI to help you set and refine goals, and includes robust tracking to monitor your progress over time. (Sept 2018 - Dec 2023)'
                }
              },
              {
                id: 'project-blendtools',
                name: 'BlendTools',
                type: FileType.PROJECT,
                content: {
                  title: 'BlendTools: Blender Workflow Suite',
                  description: 'A collection of workflow enhancement tools for Blender.',
                  imageUrl: 'https://picsum.photos/seed/blendtools/800/600',
                  tags: ['Blender', 'Python', '3D Modeling', 'Open-Source'],
                  longDescription: 'BlendTools is an open-source suite of scripts and add-ons for Blender, the 3D creation software. It aims to automate repetitive tasks, add new procedural modeling capabilities, and simplify complex workflows for artists and animators. (Jan 2024 - Apr 2025)'
                }
              },
            ]
          }
        ]
      },
      {
        id: 'about',
        name: 'About Me.txt',
        type: FileType.TEXT,
        content: {
            title: 'About Ravani Roshan',
            description: 'A little bit about my background and skills.',
            longDescription: `Highly motivated Computer Science Engineering student with expertise in full-stack development and artificial intelligence. 

Skilled in Python, JavaScript, Rust, React, and AI/ML. Passionate about building innovative applications, I am an active open-source contributor, a multiple hackathon winner, and currently pursuing my studies at Silver Oak University.

I thrive on challenges and am dedicated to leveraging technology to solve real-world problems.`
        }
      },
      {
        id: 'certificates',
        name: 'Certificates.md',
        type: FileType.CERTIFICATE,
        content: {
            title: 'Certificates & Credentials',
            description: 'A collection of my certifications.',
            longDescription: `Building toward Computer Use with Anthropic—DeepLearning.AI, LLM (Mar 2025)
Front End Development Libraries—freeCodeCamp, React.js (Feb 2025)
Machine Learning with Python—freeCodeCamp, Python (Dec 2024)
Prompt Engineering for Vision Models—DeepLearning.AI (Dec 2024)
Introduction to Generative AI—Google Cloud (Nov 2024)
Foundational C# with Microsoft—freeCodeCamp (Nov 2024)
Computer Vision—Kaggle (Nov 2024)
https://my-personalportfolio.vercel.app/certificates
`
        }
      },
       {
        id: 'music',
        name: 'Music.md',
        type: FileType.MUSIC,
        content: {
            title: 'Coding & Creativity Playlist',
            description: 'My favorite tracks for focus and inspiration.',
            longDescription: `[Winning Speech](https://open.spotify.com/track/3FqtduiaqnFYvBgKuc6QWQ)
[Courtside](https://open.spotify.com/track/5wqMM6wOwXmX4rc1C3lUkd)
[Timeless (feat. Playboi Carti)](https://open.spotify.com/track/1Es7AUAhQvapIcoh3qMKDL)
[Popular (with Playboi Carti & Madonna)](https://open.spotify.com/track/5xP9lQYA8YQmQh6BOxcAnR)
[48 Rhymes](https://open.spotify.com/track/6voByoJq77rN6FITdRhtLb)
[Azizam](https://open.spotify.com/track/0GRc3eGTg8HBdWLRGYgqIc)
[Ed Sheeran](https://open.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V)`
        }
      },
      {
        id: 'ai-image-generator',
        name: 'AI Image Gen',
        type: FileType.APP,
        content: {
            title: 'AI Image Generator',
            description: 'Create unique images with AI. Type a prompt and see the magic!',
        }
      },
      {
        id: 'gallery',
        name: 'Gallery',
        type: FileType.FOLDER,
        children: [
           {
            id: 'gallery-places',
            name: 'Places',
            type: FileType.FOLDER,
            children: [
                {
                    id: 'gallery-ahmedabad',
                    name: 'Ahmedabad Cityscape',
                    type: FileType.IMAGE,
                    content: {
                        title: 'Ahmedabad Cityscape',
                        description: 'The vibrant and modern cityscape of Ahmedabad.',
                        imageUrl: 'https://picsum.photos/seed/ahmedabad/800/600'
                    }
                },
                {
                    id: 'gallery-gujarat',
                    name: 'Gujarat Architecture',
                    type: FileType.IMAGE,
                    content: {
                        title: 'Gujarat Architecture',
                        description: 'The intricate and historical architecture found in Gujarat.',
                        imageUrl: 'https://picsum.photos/seed/gujarat/800/600'
                    }
                },
            ]
           },
           {
            id: 'gallery-workspace',
            name: 'My Workspace',
            type: FileType.IMAGE,
            content: {
                title: 'Tech & Development Workspace',
                description: 'A glimpse into the creative coding environment.',
                imageUrl: 'https://picsum.photos/seed/workspace/800/600'
            }
           }
        ]
      }
    ]
  }
];
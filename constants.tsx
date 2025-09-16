
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


export const initialFileSystem: FileSystemItem[] = [
  {
    id: 'root',
    name: 'Home',
    type: FileType.FOLDER,
    children: [
      {
        id: 'projects',
        name: 'Projects',
        type: FileType.FOLDER,
        children: [
          {
            id: 'project-1',
            name: 'E-commerce Platform',
            type: FileType.PROJECT,
            content: {
              title: 'E-commerce Platform',
              description: 'A full-stack e-commerce solution with React and Node.js.',
              imageUrl: 'https://picsum.photos/seed/project1/800/600',
              tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
              url: 'https://example.com',
              longDescription: 'This project involved building a scalable and performant e-commerce website from scratch. Key features include a product catalog, user authentication, a shopping cart, and an order management system for administrators. The frontend is built with React and Tailwind CSS for a modern, responsive user experience.'
            }
          },
          {
            id: 'project-2',
            name: 'Data Visualization Dashboard',
            type: FileType.PROJECT,
            content: {
              title: 'Data Visualization Dashboard',
              description: 'An interactive dashboard for visualizing complex datasets.',
              imageUrl: 'https://picsum.photos/seed/project2/800/600',
              tags: ['D3.js', 'React', 'Data Viz'],
              longDescription: 'This dashboard allows users to explore large datasets through interactive charts and graphs. Built with React and D3.js, it features real-time data updates and customizable views to help users uncover insights and trends effectively.'
            }
          },
        ]
      },
      {
        id: 'about',
        name: 'About Me.txt',
        type: FileType.TEXT,
        content: {
            title: 'About Me',
            description: 'A little bit about my background and skills.',
            longDescription: `Hello! I'm a passionate senior frontend engineer with a deep expertise in creating delightful and performant user experiences. With a strong background in React, TypeScript, and modern web technologies, I love tackling complex challenges and building beautiful, intuitive interfaces.

My journey in software development has been driven by a curiosity for how things work and a desire to build tools that make a difference. I thrive in collaborative environments and am always eager to learn and share knowledge with my team.

When I'm not coding, you can find me exploring new coffee shops, hiking in the mountains, or experimenting with new creative coding projects.
`
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
            id: 'gallery-1',
            name: 'Mountain Landscape',
            type: FileType.IMAGE,
            content: {
                title: 'Mountain Landscape',
                description: 'A beautiful mountain range at sunset.',
                imageUrl: 'https://picsum.photos/seed/gallery1/800/600'
            }
           }
        ]
      }
    ]
  }
];

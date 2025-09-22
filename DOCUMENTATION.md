# OS Portfolio: An Interactive Portfolio - Full Documentation

## 1. Project Overview

This project is a personal portfolio reimagined as a desktop operating system's file explorer. It provides a unique and interactive way for visitors to explore projects, skills, and personal information. Instead of a traditional, linear website, this portfolio offers a dynamic and engaging experience, inviting users to click around, open files, and discover content in a non-linear fashion.

The primary goal of this project is to showcase technical skills in frontend development, UI/UX design, and API integration, while also presenting a creative and memorable portfolio.

## 2. Features

- **Interactive File System:** Navigate a simulated file system with a familiar folder and file structure. Users can double-click to open folders and files.
- **AI Image Generator:** A built-in application that connects to the Google Gemini API, allowing users to generate unique images from text prompts.
- **Project Showcase:** Detailed views for each project, including a description, list of technologies used, images, and links.
- **Light & Dark Mode:** A theme toggle allows users to switch between light and dark modes for comfortable viewing. The chosen theme is persisted in the browser.
- **File Search:** A search bar provides the ability to quickly find files and projects within the portfolio.
- **Responsive Design:** The portfolio is fully responsive and works on a range of devices, from desktops to mobile phones.
- **Smooth Animations:** The UI is enhanced with smooth and subtle animations using Framer Motion, improving the user experience.

## 3. Technologies Used

- **React:** The core of the application is built with React, a JavaScript library for building user interfaces. It allows for the creation of reusable UI components and manages the application's state.
- **TypeScript:** The project is written in TypeScript, a statically typed superset of JavaScript. This adds type safety to the codebase, reducing bugs and improving developer experience.
- **Vite:** Vite is used as the build tool and development server. It offers a faster and leaner development experience compared to other bundlers.
- **Tailwind CSS:** All styling is done using Tailwind CSS, a utility-first CSS framework. It allows for rapid UI development by composing utility classes directly in the markup.
- **Framer Motion:** This library is used for animations. It provides a simple and powerful way to create fluid and complex animations.
- **Google Gemini API:** The AI Image Generator feature is powered by the Google Gemini API, which takes a text prompt and returns a generated image.

## 4. Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/os-portfolio.git
    cd os-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a `.env.local` file in the root of the project and add your Gemini API key:
    ```
    VITE_GEMINI_API_KEY=your_gemini_api_key
    ```
    *Note: The variable must be prefixed with `VITE_` for Vite to expose it to the client-side code.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## 5. File System Structure

The portfolio's content is organized using a simulated file system. This structure is defined in `src/constants.tsx` and the types are defined in `src/types.ts`.

### `FileType` Enum

This enum defines the different types of items that can exist in the file system.

```typescript
export enum FileType {
  FOLDER = 'folder',
  PROJECT = 'project',
  IMAGE = 'image',
  TEXT = 'text',
  APP = 'app',
  CERTIFICATE = 'certificate',
  MUSIC = 'music',
}
```

### `FileSystemItem` Interface

This interface defines the shape of each item in the file system.

```typescript
export interface FileSystemItem {
  id: string; // A unique identifier for the item
  name: string; // The name of the file or folder
  type: FileType; // The type of the item, from the FileType enum
  children?: FileSystemItem[]; // If the item is a folder, this contains its children
  content?: {
    title: string;
    description: string;
    imageUrl?: string;
    tags?: string[];
    url?: string;
    longDescription?: string;
  };
}
```

### `initialFileSystem`

This is the main data structure for the portfolio, located in `src/constants.tsx`. It is an array of `FileSystemItem` objects that represents the entire file and folder hierarchy. The root of the file system is an item with the `id` of `'root'`.

## 6. Component Architecture

The application is built with a modular component architecture. Here are the main components and their roles:

- **`App.tsx`**: This is the root component of the application. It manages the global state, including the current file system, navigation path, active file, theme, and search query. It also contains the main layout of the application.

- **`Sidebar.tsx`**: The sidebar component displays the file system as a tree structure. It allows for navigation between folders.

- **`MainContent.tsx`**: This component is the main view area. It displays either the `FileExplorerView` or the `FileView`, depending on whether a file is open. It also contains the search bar and navigation controls.

- **`FileExplorerView.tsx`**: This component displays the contents of the current directory, showing folders and files as icons.

- **`FileView.tsx`**: When a file is opened, this component displays its content. It renders different views based on the file's `type` (e.g., a project view, a text view, an image view).

- **`AIGenerator.tsx`**: This component provides the UI for the AI Image Generator. It takes a user's prompt and uses the `geminiService` to fetch an image.

- **`ThemeToggle.tsx`**: A simple component that allows the user to switch between light and dark themes.

- **`Background.tsx`**: This component renders the animated background of the portfolio.

## 7. Customization

The portfolio is designed to be easily customizable. All the content is driven by the `initialFileSystem` object in `src/constants.tsx`.

To add your own projects, about information, images, etc., you need to modify this data structure.

### Adding a New Project

1.  Navigate to the `projects` folder within the `initialFileSystem` object.
2.  Find the appropriate category (e.g., `AI & Automation` or `Web & Productivity`), or create a new one.
3.  Add a new `FileSystemItem` object with `type: FileType.PROJECT`.
4.  Fill in the `content` object with your project's details.

**Example:**

```javascript
{
  id: 'my-new-project',
  name: 'My New Project',
  type: FileType.PROJECT,
  content: {
    title: 'My Awesome New Project',
    description: 'A brief description of my project.',
    imageUrl: 'path/to/your/image.jpg',
    tags: ['React', 'Node.js', 'API'],
    longDescription: 'A more detailed description of the project, its features, and the development process.'
  }
}
```

### Modifying Other Content

You can modify any other content in the same way. Find the relevant `FileSystemItem` in `initialFileSystem` and update its `content`. You can also add new folders and files as needed. Just ensure that each `id` is unique.

## 8. Deployment

This Vite-based React application can be deployed to any static site hosting service. Here are the general steps:

1.  **Build the application:**
    Run the build command to generate the static files.
    ```bash
    npm run build
    ```
    This will create a `dist` folder in the root of the project, which contains the optimized production build.

2.  **Deploy to a hosting service:**
    You can deploy the contents of the `dist` folder to a service like Vercel, Netlify, or GitHub Pages.

    **Vercel/Netlify:**
    - Connect your Git repository to Vercel or Netlify.
    - Configure the build settings:
        - **Build Command:** `npm run build`
        - **Output Directory:** `dist`
    - Deploy the site.

    **GitHub Pages:**
    - You will need to configure your `vite.config.ts` to set the correct `base` path.
    - Follow a guide for deploying Vite applications to GitHub Pages.

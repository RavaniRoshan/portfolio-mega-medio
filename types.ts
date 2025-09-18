export enum FileType {
  FOLDER = 'folder',
  PROJECT = 'project',
  IMAGE = 'image',
  TEXT = 'text',
  APP = 'app',
  CERTIFICATE = 'certificate',
  MUSIC = 'music',
}

export interface FileSystemItem {
  id: string;
  name: string;
  type: FileType;
  children?: FileSystemItem[];
  content?: {
    title: string;
    description: string;
    imageUrl?: string;
    tags?: string[];
    url?: string;
    longDescription?: string;
  };
}

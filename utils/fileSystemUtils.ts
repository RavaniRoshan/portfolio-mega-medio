import { FileSystemItem } from '../types';

export const findItemByPath = (path: string[], items: FileSystemItem[]): FileSystemItem | undefined => {
  if (!path || path.length === 0) return undefined;

  let currentLevel = items;
  let foundItem: FileSystemItem | undefined;

  for (const id of path) {
    foundItem = currentLevel.find(item => item.id === id);
    if (foundItem && foundItem.children) {
      currentLevel = foundItem.children;
    } else if (foundItem) {
      // It's a file, continue to match path
    } else {
      return undefined;
    }
  }

  return foundItem;
};

export const findParentByPath = (path: string[], items: FileSystemItem[]): FileSystemItem | undefined => {
    if (path.length <= 1) return undefined;
    const parentPath = path.slice(0, -1);
    return findItemByPath(parentPath, items);
}

export interface SearchResult {
  item: FileSystemItem;
  path: string[];
}

export const searchFileSystem = (
  query: string,
  items: FileSystemItem[],
  currentPath: string[] = []
): SearchResult[] => {
  if (!query) return [];

  let results: SearchResult[] = [];
  const lowerCaseQuery = query.toLowerCase();

  for (const item of items) {
    const itemPath = [...currentPath, item.id];
    if (item.name.toLowerCase().includes(lowerCaseQuery)) {
      results.push({ item, path: itemPath });
    }

    if (item.children && item.children.length > 0) {
      results = results.concat(searchFileSystem(query, item.children, itemPath));
    }
  }

  return results;
};

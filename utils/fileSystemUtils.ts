
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

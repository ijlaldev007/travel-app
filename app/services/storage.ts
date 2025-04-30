/**
 * Firebase Storage service
 * 
 * This file provides utility functions for Firebase Storage operations.
 */

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  UploadMetadata,
  StorageReference,
} from 'firebase/storage';

import { storage } from '@/services/firebase';

/**
 * Storage folders
 */
export enum StorageFolders {
  PROFILE_IMAGES = 'profile-images',
  TRIP_IMAGES = 'trip-images',
  LOCATION_IMAGES = 'location-images',
  ACTIVITY_IMAGES = 'activity-images',
}

/**
 * Get a reference to a storage location
 * @param path - The path in storage
 * @returns A storage reference
 */
export const getStorageRef = (path: string): StorageReference => {
  return ref(storage, path);
};

/**
 * Upload a file to storage
 * @param file - The file to upload
 * @param folder - The folder to upload to
 * @param fileName - The name to give the file (defaults to original name)
 * @param metadata - Optional metadata for the file
 * @returns The download URL of the uploaded file
 */
export const uploadFile = async (
  file: File,
  folder: StorageFolders,
  fileName?: string,
  metadata?: UploadMetadata
): Promise<string> => {
  const name = fileName || `${Date.now()}-${file.name}`;
  const path = `${folder}/${name}`;
  const storageRef = getStorageRef(path);
  
  await uploadBytes(storageRef, file, metadata);
  return getDownloadURL(storageRef);
};

/**
 * Get the download URL for a file
 * @param path - The path to the file
 * @returns The download URL
 */
export const getFileUrl = async (path: string): Promise<string> => {
  const storageRef = getStorageRef(path);
  return getDownloadURL(storageRef);
};

/**
 * Delete a file from storage
 * @param path - The path to the file
 * @returns A promise that resolves when the operation is complete
 */
export const deleteFile = async (path: string): Promise<void> => {
  const storageRef = getStorageRef(path);
  return deleteObject(storageRef);
};

/**
 * List all files in a folder
 * @param folder - The folder to list
 * @returns An array of file references
 */
export const listFiles = async (folder: StorageFolders): Promise<StorageReference[]> => {
  const folderRef = getStorageRef(folder);
  const result = await listAll(folderRef);
  return result.items;
};

/**
 * Generate a unique file name
 * @param originalName - The original file name
 * @returns A unique file name
 */
export const generateUniqueFileName = (originalName: string): string => {
  const extension = originalName.split('.').pop();
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${extension}`;
};

export default {
  getStorageRef,
  uploadFile,
  getFileUrl,
  deleteFile,
  listFiles,
  generateUniqueFileName,
  StorageFolders,
};

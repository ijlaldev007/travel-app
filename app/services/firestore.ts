/**
 * Firestore database service
 * 
 * This file provides utility functions for Firestore database operations.
 */

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
  DocumentReference,
  CollectionReference,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '@/services/firebase';

/**
 * Collection names in Firestore
 */
export enum Collections {
  USERS = 'users',
  TRIPS = 'trips',
  LOCATIONS = 'locations',
  ACTIVITIES = 'activities',
  BOOKINGS = 'bookings',
  REVIEWS = 'reviews',
}

/**
 * Get a reference to a collection
 * @param collectionName - The name of the collection
 * @returns A collection reference
 */
export const getCollection = <T = DocumentData>(
  collectionName: Collections
): CollectionReference<T> => {
  return collection(db, collectionName) as CollectionReference<T>;
};

/**
 * Get a reference to a document
 * @param collectionName - The name of the collection
 * @param documentId - The ID of the document
 * @returns A document reference
 */
export const getDocumentRef = <T = DocumentData>(
  collectionName: Collections,
  documentId: string
): DocumentReference<T> => {
  return doc(db, collectionName, documentId) as DocumentReference<T>;
};

/**
 * Create or update a document
 * @param collectionName - The name of the collection
 * @param documentId - The ID of the document
 * @param data - The data to set
 * @param merge - Whether to merge the data with existing data
 * @returns A promise that resolves when the operation is complete
 */
export const setDocument = async <T extends DocumentData>(
  collectionName: Collections,
  documentId: string,
  data: T,
  merge = true
): Promise<void> => {
  const docRef = getDocumentRef(collectionName, documentId);
  return setDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
    ...(merge ? {} : { createdAt: serverTimestamp() }),
  }, { merge });
};

/**
 * Get a document by ID
 * @param collectionName - The name of the collection
 * @param documentId - The ID of the document
 * @returns The document data or null if not found
 */
export const getDocument = async <T = DocumentData>(
  collectionName: Collections,
  documentId: string
): Promise<T | null> => {
  const docRef = getDocumentRef<T>(collectionName, documentId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  
  return null;
};

/**
 * Update a document
 * @param collectionName - The name of the collection
 * @param documentId - The ID of the document
 * @param data - The data to update
 * @returns A promise that resolves when the operation is complete
 */
export const updateDocument = async <T extends DocumentData>(
  collectionName: Collections,
  documentId: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = getDocumentRef(collectionName, documentId);
  return updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete a document
 * @param collectionName - The name of the collection
 * @param documentId - The ID of the document
 * @returns A promise that resolves when the operation is complete
 */
export const deleteDocument = async (
  collectionName: Collections,
  documentId: string
): Promise<void> => {
  const docRef = getDocumentRef(collectionName, documentId);
  return deleteDoc(docRef);
};

/**
 * Query documents in a collection
 * @param collectionName - The name of the collection
 * @param constraints - Query constraints (where, orderBy, limit, etc.)
 * @returns An array of documents matching the query
 */
export const queryDocuments = async <T = DocumentData>(
  collectionName: Collections,
  ...constraints: QueryConstraint[]
): Promise<T[]> => {
  const collectionRef = getCollection<T>(collectionName);
  const q = query(collectionRef, ...constraints);
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as T));
};

/**
 * Convert a Firestore timestamp to a JavaScript Date
 * @param timestamp - The Firestore timestamp
 * @returns A JavaScript Date object
 */
export const timestampToDate = (timestamp: Timestamp): Date => {
  return timestamp.toDate();
};

/**
 * Get the current server timestamp
 * @returns A Firestore server timestamp
 */
export const getServerTimestamp = () => {
  return serverTimestamp();
};

export default {
  getCollection,
  getDocumentRef,
  setDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  queryDocuments,
  timestampToDate,
  getServerTimestamp,
  Collections,
};

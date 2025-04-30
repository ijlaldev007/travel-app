// Import using path aliases
import { SITE_NAME } from '@constants/index';
import { formatCurrency, formatDate, appConfig } from '@utils/index';
import { useState, useEffect } from 'react';
import { firebaseConfig } from '@/utils/env';
import { auth, db } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, limit, query } from 'firebase/firestore';

// Firebase Connection Test Component
const FirebaseConnectionTest = () => {
  const [authStatus, setAuthStatus] = useState<string>('Checking...');
  const [dbStatus, setDbStatus] = useState<string>('Checking...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check Firebase Auth connection
    const unsubscribe = onAuthStateChanged(auth,
      (user) => {
        setAuthStatus(user ? `Authenticated as ${user.email}` : 'Not authenticated');
      },
      (error) => {
        setAuthStatus('Error connecting to Firebase Auth');
        setError(error.message);
      }
    );

    // Check Firestore connection
    const checkFirestore = async () => {
      try {
        setDbStatus('Connecting to Firestore...');
        // Try to query a collection (will work even if empty)
        const usersQuery = query(collection(db, 'users'), limit(1));
        await getDocs(usersQuery);
        setDbStatus('Connected to Firestore successfully');
      } catch (err) {
        setDbStatus('Error connecting to Firestore');
        setError((err as Error).message);
      }
    };

    checkFirestore();

    // Cleanup auth listener
    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-6 p-4 bg-green-50 rounded-lg">
      <h2 className="text-xl font-semibold">Firebase Connection Status</h2>
      <p className="mt-2">Project ID: {firebaseConfig.projectId}</p>
      <p className="mt-1">Auth Status: {authStatus}</p>
      <p className="mt-1">Database Status: {dbStatus}</p>
      {error && (
        <div className="mt-2 p-3 bg-red-100 text-red-700 rounded">
          <p className="font-semibold">Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const tripPrice = 1299.99;
  const departureDate = new Date(2025, 5, 15); // June 15, 2025

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{appConfig.name}</h1>
      <p className="mt-2">Welcome to our travel app!</p>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold">Featured Trip</h2>
        <p className="mt-2">Price: {formatCurrency(tripPrice)}</p>
        <p className="mt-1">Departure: {formatDate(departureDate)}</p>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold">Environment Info</h2>
        <p className="mt-2">App Name: {appConfig.name}</p>
        <p className="mt-1">App URL: {appConfig.url}</p>
        <p className="mt-1">API URL: {appConfig.apiUrl}</p>
      </div>

      {/* Firebase Connection Test */}
      <FirebaseConnectionTest />
    </div>
  )
}

export default Home
// Import using path aliases
import { SITE_NAME } from '@constants/index';
import { formatCurrency, formatDate, appConfig } from '@utils/index';

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
    </div>
  )
}

export default Home
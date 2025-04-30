// Import using path aliases
import { SITE_NAME } from '@constants/index';
import { formatCurrency, formatDate } from '@utils/index';

const Home = () => {
  const tripPrice = 1299.99;
  const departureDate = new Date(2025, 5, 15); // June 15, 2025

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{SITE_NAME}</h1>
      <p className="mt-2">Welcome to our travel app!</p>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold">Featured Trip</h2>
        <p className="mt-2">Price: {formatCurrency(tripPrice)}</p>
        <p className="mt-1">Departure: {formatDate(departureDate)}</p>
      </div>
    </div>
  )
}

export default Home
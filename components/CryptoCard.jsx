import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

export default function CryptoCard({ data }) {
  const isPositive = data.price_change_percentage_24h >= 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center space-x-3">
        <img 
          src={data.image} 
          alt={data.name}
          className="h-8 w-8"
        />
        <div>
          <h3 className="font-bold">{data.name}</h3>
          <p className="text-gray-500 text-sm">{data.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold">${data.current_price.toLocaleString()}</p>
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <ArrowUpIcon className="h-5 w-5" />
          ) : (
            <ArrowDownIcon className="h-5 w-5" />
          )}
          <span>{Math.abs(data.price_change_percentage_24h).toFixed(2)}%</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Market Cap: ${data.market_cap.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
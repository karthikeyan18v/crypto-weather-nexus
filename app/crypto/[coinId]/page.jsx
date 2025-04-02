'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoHistory } from '@/lib/store/slices/cryptoSlice';
import PriceChart from '@/components/PriceChart';

export default function CryptoDetail({ params }) {
  const dispatch = useDispatch();
  const { data, history } = useSelector((state) => ({
    data: state.crypto.data.find(coin => coin.id === params.coinId),
    history: state.crypto.history[params.coinId]
  }));

  useEffect(() => {
    if (params.coinId) {
      dispatch(fetchCryptoHistory(params.coinId));
    }
  }, [dispatch, params.coinId]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4 mb-6">
          <img 
            src={data.image} 
            alt={data.name}
            className="h-12 w-12"
          />
          <h1 className="text-3xl font-bold">{data.name} ({data.symbol.toUpperCase()})</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <PriceChart data={history} coinId={params.coinId} />
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Current Price</h3>
              <p className="text-2xl font-bold">${data.current_price.toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold">24h Change</h3>
                <p className={data.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {data.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold">Market Cap</h3>
                <p>${data.market_cap.toLocaleString()}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold">24h Volume</h3>
                <p>${data.total_volume.toLocaleString()}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold">ATH</h3>
                <p>${data.ath.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
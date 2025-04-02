'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../lib/store/slices/weatherSlice ';
import { fetchCrypto } from '../lib/store/slices/cryptoSlice';
import { fetchNews } from '../lib/store/slices/newsSlice';
import CryptoCard from '../components/CryptoCard';
import WeatherCard from '../components/WeatherCard';
import NewsCard from '../components/NewsCard';


export default function Home() {
  const dispatch = useDispatch();
  const { 
    data: weatherData, 
    loading: weatherLoading, 
    error: weatherError 
  } = useSelector(state => state.weather);
  
  const { 
    data: cryptoData, 
    loading: cryptoLoading, 
    error: cryptoError 
  } = useSelector(state => state.crypto);
  
  const { 
    data: newsData, 
    loading: newsLoading, 
    error: newsError 
  } = useSelector(state => state.news);

  useEffect(() => {
    dispatch(fetchWeather());
    dispatch(fetchCrypto());
    dispatch(fetchNews());
  }, [dispatch]);

  if (weatherError || cryptoError || newsError) {
    return <div className="p-4 text-red-500">Error loading data</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Weather Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Weather</h2>
        {weatherLoading ? (
          <div>Loading weather...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {weatherData?.map(city => (
              <WeatherCard key={city.id} data={city} />
            ))}
          </div>
        )}
      </section>

      {/* Crypto Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cryptocurrencies</h2>
        {cryptoLoading ? (
          <div>Loading crypto data...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {cryptoData?.map(coin => (
              <CryptoCard key={coin.id} data={coin} />
            ))}
          </div>
        )}
      </section>

      {/* News Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">News</h2>
        {newsLoading ? (
          <div>Loading news...</div>
        ) : (
          <div className="space-y-4">
            {newsData?.map(article => (
              <NewsCard key={article.article_id} data={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
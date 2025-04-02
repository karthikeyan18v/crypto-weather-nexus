export default function WeatherCard({ data }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-bold">{data.name}</h3>
        <div className="flex justify-between mt-2">
          <span className="text-3xl">{Math.round(data.main.temp)}°C</span>
          <div className="text-right">
            <p>Humidity: {data.main.humidity}%</p>
            <p className="capitalize">{data.weather[0].description}</p>
          </div>
        </div>
      </div>
    );
  }
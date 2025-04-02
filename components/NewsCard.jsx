export default function NewsCard({ data }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">{data.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {data.description || 'No description available'}
        </p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">{data.source_id}</span>
          <a 
            href={data.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Read more
          </a>
        </div>
      </div>
    );
  }
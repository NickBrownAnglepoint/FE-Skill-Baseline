import { useState, useEffect } from 'react';

    const useGetData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cacheName = 'user-data-cache'; // Name of the cache

        useEffect(() => {
            const fetchData = async () => {
            setLoading(true);
            try {
            const cache = await caches.open(cacheName);
            const cachedURLData = await cache.match(url);
            
            if (cachedURLData) {
                const cachedData = await cachedURLData.json();
                setData(cachedData);
            } else {
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error('Network error: response did not return 200');
                }

                cache.put(url, response.clone());

                const result = await response.json();
                setData(result);
            }
            
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);
    
    return { data, loading, error };
};

export default useGetData;

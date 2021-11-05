import { useCallback, useEffect, useState } from "react";

async function fetchJson (...args) {
  const res = await fetch(...args);
  return res.json();
}

export function useLaunches() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    (async () => {
      const launches = await fetchJson('https://api.spacexdata.com/v3/launches'); 
      const rockets = await fetchJson('https://api.spacexdata.com/v3/rockets');

      setLaunches(launches.map((launch) => ({
        ...launch,
        rocket: {
          ...launch.rocket,
          ...rockets.find((rocket) => rocket.rocket_id === launch.rocket.rocket_id)
        },
      })))

    })();
  }, []);
  return launches;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites') || '[]'));

  const toggle = useCallback((key) => {
    console.log(key);
    if (favorites.includes(key)) {
      setFavorites(favorites.filter(favorite => favorite !== key));
    } else {
      setFavorites([
        ...favorites,
        key,
      ]);
    };  
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return [
    favorites,
    toggle,
  ];
}
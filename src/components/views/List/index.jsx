import { useMemo, useState } from 'react';
import LaunchCard from '../../compounds/LaunchCard';
import { useFavorites, useLaunches } from '../../../utils/hooks';
import logo from '../../../assets/spacex-logo.svg';
import { Tabs } from '../../compounds/Tabs';


import styles from './styles.module.scss';

const TABS = [
  {
    caption: 'All',
    key: 'all',
  },
  {
    caption: 'Favorites',
    key: 'favorites'
  },
];

export default function Lst(props) {
  const launches = useLaunches();
  const [favorites, toggleFavorite] = useFavorites();
  const [search, setSearch] = useState('');
  const [currentTab, setCurrentTab] = useState(TABS[0].key);

  const filtered = useMemo(() => {
    return launches
      .filter((launch) => {
        return search ? new RegExp(search, 'i').test(launch.mission_name) : true;
      })
      .filter((launch) => {
        return currentTab === 'favorites' ? favorites.includes(launch.mission_name) : true;
      });
  }, [launches, search, favorites, currentTab]);

  return (
    <div>
      <div className={styles.header}>
        <img src={logo} alt="SpaceX" className={styles.logo}/>
        <h2 className={styles.title}>Launches</h2>
        <Tabs tabs={TABS} value={currentTab} onChange={setCurrentTab} />
      </div>
      <div className={styles.content}>
        <div className={styles.filters}>
          <input
            value={search}
            placeholder="Search all launches..."
            onChange={ev => setSearch(ev.target.value)}
            className={styles['search-input']}
          />
        </div>
        <div className={styles.total}>
          Total ({filtered.length})
        </div>
        <div className={styles.list}>
          {filtered.map((launch) => (
            <LaunchCard
              key={`id-${launch.mission_name}`}
              launch={launch}
              favorite={favorites.includes(launch.mission_name)}
              toggleFavorite={() => toggleFavorite(launch.mission_name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

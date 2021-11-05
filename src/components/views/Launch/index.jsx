import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { useLaunches } from '../../../utils/hooks';

import styles from './styles.module.scss';

export default function Launch(props) {
  const route = useRouteMatch();


  const launches = useLaunches();
  const launch = useMemo(() => {
    return launches.find((launch) => launch.mission_name === route.params.mission_name)
  }, [launches, route.params.mission_name])

  
  const rocketImageUri = useMemo(() => launch?.rocket.flickr_images[0], [launch]);
  const date = useMemo(() => dayjs(launch?.launch_date_utc).format('MMMM D, YYYY'), [launch]);
  
  if (!launch) return null;

  return (
    <div>
      <div
        className={styles.header}
        style={{
          backgroundImage: `url(${rocketImageUri})`
        }}
      >
        <div className={styles.date}>{date}</div>
        <div className={styles.name}>{launch.rocket.rocket_name}</div>
        <div className={styles.description}>{launch.rocket.description}</div>
      </div>
      <div className={styles.counters}>
        <div className={styles.counter}>
          <div className={styles.number}>{1}</div>
          <div className={styles.label}>Total Launches</div>
        </div>
        <div className={styles.counter}>
          <div className={styles.number}>{1}</div>
          <div className={styles.label}>Total Launches</div>
        </div>
        <div className={styles.counter}>
          <div className={styles.number}>{1}</div>
          <div className={styles.label}>Total Launches</div>
        </div>
      </div>
      <div className={styles.content}>
        Content
      </div>  
    </div>
  );
};

import clsx from "clsx";

import styles from './styles.module.scss';

export function Tabs({ tabs, value, onChange }) {
  return (
    <ul className={styles.tabs}>
      {tabs.map((tab) => (
        <li
          key={tab.key}
          className={clsx(styles.tab, value === tab.key && styles.current )}
          onClick={ev => onChange(tab.key)}
        >
          {tab.caption}
        </li>
      ))}
    </ul>
  );
};

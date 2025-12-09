import { FC } from 'react';

import styles from './Footer.module.css';

const Footer: FC = () => (
  <footer>
    <div className={styles.footer}>
      <span>
        Created by{' '}
        <a href="https://github.com/DedRobin" target="_blank">
          DedRobin
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;

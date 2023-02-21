'use client';

import '../../styles/globals.css';
import styles from './breaking.module.css';

export default function Page() {
  return (
    <div className={styles.component}>
      <div>BREAKING</div>
      <div>
        <button onClick={(e) => console.log(e.b.c)}>
          break this
        </button>
      </div>
    </div>
  );
}

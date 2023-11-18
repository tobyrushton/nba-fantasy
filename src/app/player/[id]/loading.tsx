import 'server-only'

import { FC } from 'react'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import styles from './Player.module.scss'

const Loading: FC = () => (
    <div className={styles.wrapper}>
        <div className={styles.head}>
            <span>
                <div
                    className={styles.loadingItem}
                    style={{ width: '20rem', height: '2.5rem' }}
                />
                <ul style={{ marginTop: '.5rem' }}>
                    <li>
                        <div
                            className={styles.loadingItem}
                            style={{ width: '8rem' }}
                        />
                    </li>
                    <li>
                        <div
                            className={styles.loadingItem}
                            style={{ width: '3rem' }}
                        />
                    </li>
                </ul>
            </span>
            <span>
                <ul aria-label="stats">
                    <li aria-label="pts">
                        <p>PTS</p>
                        <p>~~</p>
                    </li>
                    <li aria-label="reb">
                        <p>REB</p>
                        <p>~~</p>
                    </li>
                    <li aria-label="ast">
                        <p>AST</p>
                        <p>~~</p>
                    </li>
                    <li aria-label="stl">
                        <p>STL</p>
                        <p>~~</p>
                    </li>
                    <li aria-label="blk">
                        <p>BLK</p>
                        <p>~~</p>
                    </li>
                    <li aria-label="to">
                        <p>TO</p>
                        <p>~~</p>
                    </li>
                    <li aria-label="fg_pct">
                        <p>FG%</p>
                        <p>~~</p>
                    </li>
                    <li aria-label="3pt_pct">
                        <p>3P%</p>
                        <p>~~</p>
                    </li>
                    <li aria-label="ts_pct">
                        <p>TS%</p>
                        <p>~~</p>
                    </li>
                    <li aria-label="fpts">
                        <p>FTSY</p>
                        <p>~~</p>
                    </li>
                </ul>
            </span>
        </div>
        <div className={styles.body}>
            <div className={styles.bodyItem}>
                <h2>Game Log</h2>
                <span className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>MIN</th>
                                <th>PTS</th>
                                <th>REB</th>
                                <th>AST</th>
                                <th>STL</th>
                                <th>BLK</th>
                                <th>TO</th>
                                <th>FG%</th>
                                <th>3P%</th>
                                <th>TS%</th>
                                <th>FTSY</th>
                            </tr>
                        </thead>
                    </table>
                    <span className={styles.spinnerWrapper}>
                        <LoadingSpinner />
                    </span>
                </span>
            </div>
            <div className={styles.bodyItem}>
                <h2>Stats</h2>
                <span className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Splits</th>
                                <th>GP</th>
                                <th>MIN</th>
                                <th>FGM</th>
                                <th>FGA</th>
                                <th>FG%</th>
                                <th>3PM</th>
                                <th>3PA</th>
                                <th>3P%</th>
                                <th>FTM</th>
                                <th>FTA</th>
                                <th>FT%</th>
                                <th>TS%</th>
                                <th>OREB</th>
                                <th>DREB</th>
                                <th>REB</th>
                                <th>AST</th>
                                <th>STL</th>
                                <th>BLK</th>
                                <th>PF</th>
                                <th>TO</th>
                                <th>PTS</th>
                                <th>FTSY</th>
                            </tr>
                        </thead>
                    </table>
                    <span className={styles.spinnerWrapper}>
                        <LoadingSpinner />
                    </span>
                </span>
            </div>
        </div>
    </div>
)

export default Loading

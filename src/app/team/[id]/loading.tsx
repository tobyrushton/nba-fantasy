import 'server-only'
import { FC } from 'react'
import Image from 'next/image'
import styles from './Teams.module.scss'

const Loading: FC = () => (
    <div className={styles.wrapper}>
        <div
            className={styles.loadingItem}
            style={{
                width: '20rem',
                height: '2rem',
            }}
        />
        <div className={styles.body}>
            <div className={styles.roster}>
                <h3>Roster</h3>
                <ul
                    style={{
                        paddingLeft: '1rem',
                    }}
                >
                    {new Array(15).fill(0).map((_, i) => (
                        // no alternative, this is a loading component
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={i} style={{ marginTop: '.25rem' }}>
                            <div
                                className={styles.loadingItem}
                                style={{
                                    width: `${Math.random() * (90 - 60) + 60}%`,
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.leadersWrapper}>
                <h2>Leaders</h2>
                <div className={styles.leaders}>
                    {[
                        'Points Per Game',
                        'Rebounds Per Game',
                        'Assists Per Game',
                        'Steals Per Game',
                        'Blocks Per Game',
                        'Fantasy Points Per Game',
                    ].map((stat, i) => (
                        // no alternative, this is a loading component
                        // eslint-disable-next-line react/no-array-index-key
                        <div className={styles.leader} key={i}>
                            <h3>{stat}</h3>
                            <div className={styles.leaderTop}>
                                <Image
                                    className={styles.loadingPlayer}
                                    src="https://a.espncdn.com/i/headshots/nba/players/full/3112335.png"
                                    alt="Loading"
                                    fill
                                />
                            </div>
                            <div className={styles.leaderBottom}>
                                {new Array(3).fill(0).map((_, index) => (
                                    <div
                                        className={styles.loadingBottomImage}
                                        // no alternative, this is a loading component
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={index}
                                    >
                                        <Image
                                            className={styles.loadingPlayer}
                                            src="https://a.espncdn.com/i/headshots/nba/players/full/3112335.png"
                                            alt="Loading"
                                            fill
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
)

export default Loading

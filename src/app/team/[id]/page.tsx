import 'server-only'

import { FC } from 'react'
import Link from 'next/link'
import { LeaderList } from './LeadersList'
import { getAllStats } from './getAllStats'
import styles from './Teams.module.scss'

interface ITeamPageProps {
    params: {
        id: string
    }
}

const Page: FC<ITeamPageProps> = async ({ params: { id } }) => {
    const [team, playerSeasonStatsAndStatsAndHeadshots] = await getAllStats(id)
    return (
        <div className={styles.wrapper}>
            <h2>{team.full_name}</h2>
            <div className={styles.body}>
                <div className={styles.roster}>
                    <h3>Roster</h3>
                    {playerSeasonStatsAndStatsAndHeadshots.map(player => (
                        <Link
                            href={`/player/${player[1].id}`}
                            key={player[1].id}
                        >
                            <ul>
                                <li>
                                    {player[1].first_name} {player[1].last_name}
                                </li>
                                <li>{player[1].position}</li>
                            </ul>
                        </Link>
                    ))}
                </div>
                <div className={styles.leadersWrapper}>
                    <h2>Leaders</h2>
                    <LeaderList
                        playerSeasonStatsAndStatsAndHeadshots={
                            playerSeasonStatsAndStatsAndHeadshots
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default Page

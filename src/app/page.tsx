import 'server-only'

import { FC } from 'react'
import Link from 'next/link'
import styles from './page.module.scss'

const getData = async (): Promise<team.ITeam[]> => {
    const res = await fetch('https://www.balldontlie.io/api/v1/teams')
    const data = await res.json()
    return data.data
}

const Home: FC = async () => {
    const teams = await getData()
    const splitTeams: team.ITeam[][] = []
    // splits into 2d array of 3 teams
    while (teams.length) splitTeams.push(teams.splice(0, 3))

    return (
        <main>
            <div className={styles.wrapper}>
                <h2>Search By Team</h2>
                <div className={styles.teamList}>
                    {splitTeams.map((teamList, i) => (
                        // disabled as no other unique key is available
                        // eslint-disable-next-line react/no-array-index-key
                        <div className={styles.teamRow} key={i}>
                            {teamList.map(team => (
                                <Link
                                    className={styles.team}
                                    href={`/team/${team.id}`}
                                    key={team.id}
                                >
                                    <h3>{team.full_name}</h3>
                                    <p>{team.abbreviation}</p>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Home

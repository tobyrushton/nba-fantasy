import 'server-only'

import { FC } from 'react'
import Link from 'next/link'
import styles from './page.module.scss'

const getData = async (): Promise<team.ITeam[]> => {
    const res = await fetch('https://api.balldontlie.io/v1/teams', {
        headers: {
            Authorization: `${process.env.BALL_DONT_LIE_API_KEY}`,
        },
    })
    const data = await res.json()
    return data.data
}

type TDivisionNames =
    | 'Atlantic'
    | 'Central'
    | 'Southeast'
    | 'Northwest'
    | 'Pacific'
    | 'Southwest'

interface IDivision {
    name: TDivisionNames
    teams: team.ITeam[]
}

interface IConference {
    name: 'Eastern' | 'Western'
    divisions: IDivision[]
}

const findByDivision = (
    teams: team.ITeam[],
    division: TDivisionNames
): team.ITeam[] => {
    return teams.filter(team => team.division === division)
}

const splitTeamsIntoConferences = (teams: team.ITeam[]): IConference[] => {
    const conferences: IConference[] = [
        {
            name: 'Eastern',
            divisions: [
                { name: 'Atlantic', teams: findByDivision(teams, 'Atlantic') },
                { name: 'Central', teams: findByDivision(teams, 'Central') },
                {
                    name: 'Southeast',
                    teams: findByDivision(teams, 'Southeast'),
                },
            ],
        },
        {
            name: 'Western',
            divisions: [
                {
                    name: 'Northwest',
                    teams: findByDivision(teams, 'Northwest'),
                },
                { name: 'Pacific', teams: findByDivision(teams, 'Pacific') },
                {
                    name: 'Southwest',
                    teams: findByDivision(teams, 'Southwest'),
                },
            ],
        },
    ]

    return conferences
}

const Home: FC = async () => {
    const teams = await getData()
    const splitTeams = splitTeamsIntoConferences(teams)

    return (
        <main>
            <div className={styles.wrapper}>
                <h2>Search By Team</h2>
                <div className={styles.teamsContainer}>
                    {splitTeams.map(conference => (
                        <div
                            className={styles.conferenceContainer}
                            key={conference.name}
                        >
                            <h3>{conference.name} Conference</h3>
                            {conference.divisions.map(division => (
                                <div
                                    className={styles.division}
                                    key={division.name}
                                >
                                    <h4>{division.name} Division</h4>
                                    <ul>
                                        {division.teams.map(team => (
                                            <li key={team.id}>
                                                <Link href={`/team/${team.id}`}>
                                                    {team.full_name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Home

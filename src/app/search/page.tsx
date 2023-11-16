import 'server-only'

import { ReactElement } from 'react'
import PlayerBar from '@/components/playerbar/PlayerBar'
import styles from './Search.module.scss'

interface ISearchProps {
    searchParams: {
        term: string
    }
}

const Search = async ({
    searchParams: { term },
}: ISearchProps): Promise<ReactElement> => {
    // requests data for all matching users
    const res = await fetch(
        `https://www.balldontlie.io/api/v1/players?search=${term}&per_page=100`
    )
    const data = (await res.json()) as { data: player.IPlayer[] }
    const players = data.data

    // requests stats for all matching users for the current season
    const playersWithStatsAndUndefined: [
        player.IPlayer,
        player.IPlayerSeasonStats | undefined,
    ][] = await Promise.all(
        players.map(async player => {
            const statsRes = await fetch(
                `https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=${player.id}`,
                {
                    next: {
                        revalidate: 3600,
                    },
                }
            )
            const statsData = (await statsRes.json()) as {
                data: player.IPlayerSeasonStats[]
            }

            const stats = statsData.data[0]
            return [player, stats]
        })
    )

    // removes all players without stats who haven't played this season
    const playersWithStats: [player.IPlayer, player.IPlayerSeasonStats][] =
        playersWithStatsAndUndefined.filter(
            ([__, stats]) => stats !== undefined
        ) as [player.IPlayer, player.IPlayerSeasonStats][]

    return (
        <div className={styles.container}>
            {playersWithStats.map(([player, stats]) => (
                <PlayerBar
                    player={player}
                    playerSeasonStats={stats}
                    key={`player${player.id}`}
                />
            ))}
        </div>
    )
}

export default Search

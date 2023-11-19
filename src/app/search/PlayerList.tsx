import 'server-only'

import { FC } from 'react'
import PlayerBar from '@/components/playerbar/PlayerBar'
import styles from './Search.module.scss'

interface IPlayerListProps {
    search: string
}

type TMeta = {
    total_pages: number
    current_page: number
    next_page: number
    per_page: number
    total_count: number
}

export const PlayerList: FC<IPlayerListProps> = async ({ search }) => {
    // requests data for all matching users
    const response = await fetch(
        `https://www.balldontlie.io/api/v1/players?search=${search}&per_page=100`
    )
    const data = (await response.json()) as {
        data: player.IPlayer[]
        meta: TMeta
    }
    const players = data.data

    // if more pages exist, continue fetching
    if (data.meta.total_pages > 1) {
        await Promise.all(
            new Array(data.meta.total_pages - 1).fill(0).map(async (_, i) => {
                const res = await fetch(
                    `https://www.balldontlie.io/api/v1/players?search=${search}&per_page=100&page=${
                        i + 2
                    }`
                )
                const playerData = (await res.json()) as {
                    data: player.IPlayer[]
                    meta: TMeta
                }
                players.push(...playerData.data)
            })
        )
    }

    // split players into max 300 player chunks
    const splitPlayers: player.IPlayer[][] = []
    const splitSize = 300
    for (let i = 0; i < players.length; i += splitSize) {
        splitPlayers.push(players.slice(i, i + splitSize))
    }

    const statsData: player.IPlayerSeasonStats[] = []

    // request all season data for each chunk
    await Promise.all(
        splitPlayers.map(async playerChunk => {
            let requestString =
                'https://www.balldontlie.io/api/v1/season_averages?'

            playerChunk.forEach(player => {
                requestString += `player_ids[]=${player.id}&`
            })

            const res2 = await fetch(requestString, {
                next: {
                    revalidate: 3600,
                },
            })

            const seasonAveragesData = (await res2.json()) as {
                data: player.IPlayerSeasonStats[]
            }

            statsData.push(...seasonAveragesData.data)
        })
    )

    // remove players with no stats -> not current players
    const playersWithStats: [player.IPlayer, player.IPlayerSeasonStats][] =
        statsData.map(stats => {
            const player = players.find(
                plyer => parseInt(plyer.id, 10) === stats.player_id
            )
            return [player as player.IPlayer, stats]
        })

    return (
        <div className={styles.container}>
            {playersWithStats.map(([player, stats]) => (
                <PlayerBar
                    player={player}
                    playerSeasonStats={stats}
                    key={`player${player.id}`}
                />
            ))}
            {
                // if no players are found, display message
                playersWithStats.length === 0 && <p>No players found</p>
            }
        </div>
    )
}

import 'server-only'

import { ReactElement } from 'react'
import { calculateFantasy } from '@/lib/calculateFantasy'
import { calculateTS } from '@/lib/calculateTS'
import { round } from '@/lib/round'
import styles from './Player.module.scss'

interface IPlayerProps {
    params: {
        id: string
    }
}

const getPlayer = async (
    id: string
): Promise<[player.IPlayer, player.IPlayerSeasonStats]> => {
    const res = await fetch(`https://www.balldontlie.io/api/v1/players/${id}`)
    const player = await res.json()

    const res2 = await fetch(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
    )
    const playerSeasonStats = await res2.json()

    return [player, playerSeasonStats.data[0]]
}

const Player = async ({ params }: IPlayerProps): Promise<ReactElement> => {
    const [player, playerSeasonStats] = await getPlayer(params.id)
    return (
        <div className={styles.player}>
            <div className={styles.head}>
                <span>
                    <p>
                        {player.first_name} {player.last_name}
                    </p>
                    <ul>
                        <li>{player.team.name}</li>
                        <li>{player.position}</li>
                    </ul>
                </span>
                <span>
                    <ul aria-label="stats">
                        <li aria-label="pts">
                            <p>PTS</p>
                            <p>{playerSeasonStats.pts}</p>
                        </li>
                        <li aria-label="reb">
                            <p>REB</p>
                            <p>{playerSeasonStats.reb}</p>
                        </li>
                        <li aria-label="ast">
                            <p>AST</p>
                            <p>{playerSeasonStats.ast}</p>
                        </li>
                        <li aria-label="stl">
                            <p>STL</p>
                            <p>{playerSeasonStats.stl}</p>
                        </li>
                        <li aria-label="blk">
                            <p>BLK</p>
                            <p>{playerSeasonStats.blk}</p>
                        </li>
                        <li aria-label="to">
                            <p>TO</p>
                            <p>{playerSeasonStats.turnover}</p>
                        </li>
                        <li aria-label="fg_pct">
                            <p>FG%</p>
                            <p>{round(playerSeasonStats.fg_pct * 100)}</p>
                        </li>
                        <li aria-label="3pt_pct">
                            <p>3P%</p>
                            <p>{round(playerSeasonStats.fg3_pct * 100)}</p>
                        </li>
                        <li aria-label="ts_pct">
                            <p>TS%</p>
                            <p>
                                {calculateTS({
                                    pts: playerSeasonStats.pts,
                                    fga: playerSeasonStats.fga,
                                    fta: playerSeasonStats.fta,
                                })}
                            </p>
                        </li>
                        <li aria-label="fpts">
                            <p>FTSY</p>
                            <p>{calculateFantasy(playerSeasonStats)}</p>
                        </li>
                    </ul>
                </span>
            </div>
        </div>
    )
}

export default Player

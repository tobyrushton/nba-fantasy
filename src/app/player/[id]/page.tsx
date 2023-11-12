import 'server-only'

import { ReactElement } from 'react'
import { calculateFantasy } from '@/lib/calculateFantasy'
import { calculateTS } from '@/lib/calculateTS'
import { round } from '@/lib/round'
import { LastTen } from './lastTen'
import styles from './Player.module.scss'

interface IPlayerProps {
    params: {
        id: string
    }
}

const getPlayer = async (
    id: string
): Promise<
    [player.IPlayer, player.IPlayerSeasonStats, player.IPlayerGameStats[]]
> => {
    const res = await fetch(`https://www.balldontlie.io/api/v1/players/${id}`)
    const player = await res.json()

    const res2 = await fetch(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
    )
    const playerSeasonStats = await res2.json()

    const res3 = await fetch(
        `https://www.balldontlie.io/api/v1/stats?seasons[]=2023&player_ids[]=${id}&per_page=100`
    )
    const playerGameLog = await res3.json()

    return [player, playerSeasonStats.data[0], playerGameLog.data]
}

const Player = async ({ params }: IPlayerProps): Promise<ReactElement> => {
    const [player, playerSeasonStats, playerGameLog] = await getPlayer(
        params.id
    )
    return (
        <div className={styles.wrapper}>
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
            <div className={styles.body}>
                <div>
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
                            <tbody>
                                {playerGameLog.map(game => (
                                    <tr key={game.id}>
                                        <td>
                                            {new Date(
                                                game.game.date
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>{game.min}</td>
                                        <td>{game.pts}</td>
                                        <td>{game.reb}</td>
                                        <td>{game.ast}</td>
                                        <td>{game.stl}</td>
                                        <td>{game.blk}</td>
                                        <td>{game.turnover}</td>
                                        <td>{round(game.fg_pct * 100)}</td>
                                        <td>{round(game.fg3_pct * 100)}</td>
                                        <td>
                                            {calculateTS({
                                                pts: game.pts,
                                                fga: game.fga,
                                                fta: game.fta,
                                            })}
                                        </td>
                                        <td>{calculateFantasy(game)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </span>
                </div>
                <div>
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
                            <tbody>
                                <tr>
                                    <th>Season</th>
                                    <th>{playerSeasonStats.games_played}</th>
                                    <th>{playerSeasonStats.min}</th>
                                    <th>{playerSeasonStats.fgm}</th>
                                    <th>{playerSeasonStats.fga}</th>
                                    <th>
                                        {round(playerSeasonStats.fg_pct * 100)}
                                    </th>
                                    <th>{playerSeasonStats.fg3m}</th>
                                    <th>{playerSeasonStats.fg3a}</th>
                                    <th>
                                        {round(playerSeasonStats.fg3_pct * 100)}
                                    </th>
                                    <th>{playerSeasonStats.ftm}</th>
                                    <th>{playerSeasonStats.fta}</th>
                                    <th>
                                        {round(playerSeasonStats.ft_pct * 100)}
                                    </th>
                                    <th>
                                        {calculateTS({
                                            pts: playerSeasonStats.pts,
                                            fga: playerSeasonStats.fga,
                                            fta: playerSeasonStats.fta,
                                        })}
                                    </th>
                                    <th>{playerSeasonStats.oreb}</th>
                                    <th>{playerSeasonStats.dreb}</th>
                                    <th>{playerSeasonStats.reb}</th>
                                    <th>{playerSeasonStats.ast}</th>
                                    <th>{playerSeasonStats.stl}</th>
                                    <th>{playerSeasonStats.blk}</th>
                                    <th>{playerSeasonStats.pf}</th>
                                    <th>{playerSeasonStats.turnover}</th>
                                    <th>{playerSeasonStats.pts}</th>
                                    <th>
                                        {calculateFantasy(playerSeasonStats)}
                                    </th>
                                </tr>
                                <tr>
                                    <th>L10</th>
                                    <LastTen
                                        lastTen={playerGameLog.slice(-10)}
                                    />
                                </tr>
                            </tbody>
                        </table>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Player

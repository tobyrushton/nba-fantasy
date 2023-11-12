import 'server-only'

import { FC } from 'react'
import { round } from '@/lib/round'
import { calculateFantasy } from '@/lib/calculateFantasy'
import { calculateTS } from '@/lib/calculateTS'

interface ILastTenProps {
    lastTen: player.IPlayerGameStats[]
}

const averageMinutes = (lastTen: player.IPlayerGameStats[]): string => {
    const minutes = lastTen.map(game => parseInt(game.min, 10))
    const averageMin = minutes.reduce((a, b) => a + b, 0) / minutes.length

    const minPart = Math.floor(averageMin)
    const secPart = Math.round((averageMin - minPart) * 60)

    return `${minPart}:${secPart.toString().padStart(2, '0')}`
}

const average = (arr: number[]): number => {
    return round(arr.reduce((a, b) => a + b, 0) / arr.length)
}

export const LastTen: FC<ILastTenProps> = ({ lastTen }) => {
    const lastTenPlayed = lastTen.filter(game => game.min !== '00')
    const fgm = average(lastTenPlayed.map(game => game.fgm))
    const fga = average(lastTenPlayed.map(game => game.fga))
    const fg3m = average(lastTenPlayed.map(game => game.fg3m))
    const fg3a = average(lastTenPlayed.map(game => game.fg3a))
    const ftm = average(lastTenPlayed.map(game => game.ftm))
    const fta = average(lastTenPlayed.map(game => game.fta))

    const lastTenStats: player.IPlayerSeasonStats = {
        player_id: 0, // not needed
        season: 0, // not needed
        games_played: lastTenPlayed.length,
        min: averageMinutes(lastTenPlayed),
        fgm,
        fga,
        fg_pct: fgm / fga,
        fg3m,
        fg3a,
        fg3_pct: fg3m / fg3a,
        ftm,
        fta,
        ft_pct: ftm / fta,
        oreb: average(lastTenPlayed.map(game => game.oreb)),
        dreb: average(lastTenPlayed.map(game => game.dreb)),
        reb: average(lastTenPlayed.map(game => game.reb)),
        ast: average(lastTenPlayed.map(game => game.ast)),
        stl: average(lastTenPlayed.map(game => game.stl)),
        blk: average(lastTenPlayed.map(game => game.blk)),
        pf: average(lastTenPlayed.map(game => game.pf)),
        turnover: average(lastTenPlayed.map(game => game.turnover)),
        pts: average(lastTenPlayed.map(game => game.pts)),
    }

    return (
        <>
            <th>{lastTenStats.games_played}</th>
            <th>{lastTenStats.min}</th>
            <th>{lastTenStats.fgm}</th>
            <th>{lastTenStats.fga}</th>
            <th>{round(lastTenStats.fg_pct * 100)}</th>
            <th>{lastTenStats.fg3m}</th>
            <th>{lastTenStats.fg3a}</th>
            <th>{round(lastTenStats.fg3_pct * 100)}</th>
            <th>{lastTenStats.ftm}</th>
            <th>{lastTenStats.fta}</th>
            <th>{round(lastTenStats.ft_pct * 100)}</th>
            <th>
                {calculateTS({
                    pts: lastTenStats.pts,
                    fga: lastTenStats.fga,
                    fta: lastTenStats.fta,
                })}
            </th>
            <th>{lastTenStats.oreb}</th>
            <th>{lastTenStats.dreb}</th>
            <th>{lastTenStats.reb}</th>
            <th>{lastTenStats.ast}</th>
            <th>{lastTenStats.stl}</th>
            <th>{lastTenStats.blk}</th>
            <th>{lastTenStats.pf}</th>
            <th>{lastTenStats.turnover}</th>
            <th>{lastTenStats.pts}</th>
            <th>{calculateFantasy(lastTenStats)}</th>
        </>
    )
}

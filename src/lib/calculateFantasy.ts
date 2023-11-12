// calculated using ESPN standard scoring
// https://www.espn.co.uk/fantasy/basketball/story/_/id/30296896/espn-fantasy-default-points-league-scoring-explained
interface IFantasyParams {
    pts: number
    fgm: number
    fg3m: number
    fga: number
    ftm: number
    fta: number
    reb: number
    ast: number
    stl: number
    blk: number
    turnover: number
}

export const calculateFantasy = (stats: IFantasyParams): number => {
    let total = 0
    // positive stats
    total += stats.pts
    total += stats.fg3m
    total += stats.fgm * 2
    total += stats.ftm
    total += stats.reb
    total += stats.ast * 2
    total += stats.stl * 4
    total += stats.blk * 4

    // negative stats
    total -= stats.fga
    total -= stats.fta
    total -= stats.turnover * 2

    return Math.round((total + Number.EPSILON) * 100) / 100
}

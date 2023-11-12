/* eslint @typescript-eslint/no-unused-vars: 0 */
// disabled rule due to it producing error

namespace player {
    interface IPlayer {
        id: string
        first_name: string
        last_name: string
        position: string
        height_feet: number | null
        height_inches: number | null
        weight_pounds: number | null
        team: team.ITeam
    }

    interface IPlayerSeasonStats {
        games_played: number
        player_id: number
        season: number
        min: string
        fgm: number
        fga: number
        fg3m: number
        fg3a: number
        ftm: number
        fta: number
        oreb: number
        dreb: number
        reb: number
        ast: number
        stl: number
        blk: number
        turnover: number
        pf: number
        pts: number
        fg_pct: number
        fg3_pct: number
        ft_pct: number
    }

    interface IPlayerGameStats {
        id: number
        ast: number
        blk: number
        dreb: number
        fg3_pct: number
        fg3a: number
        fg3m: number
        fg_pct: number
        fga: number
        fgm: number
        ft_pct: number
        fta: number
        ftm: number
        game: {
            id: number
            date: string
            home_team_id: number
            home_team_score: number
            season: number
            visitor_team_id: number
            visitor_team_score: number
        }
        min: string
        oreb: number
        pf: number
        player: {
            id: number
            first_name: string
            last_name: string
            position: string
            team_id: number
        }
        pts: number
        reb: number
        stl: number
        team: team.ITeam
        turnover: number
    }
}
